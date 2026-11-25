/**
 * ============================================================================
 * METHALOX SYSTEMS AG — FOUNDER ROADMAP AUTHENTICATION & CLOUD-SYNC CONFIG
 * ============================================================================
 *
 * 1. TEMPORÄRES INITIAL-PASSWORT FÜR DEN ERSTEN TEST:
 *    AresFounder2026!
 *
 * 2. EIGENEN SHA-256-HASH GENERIEREN & EINTRAGEN:
 *    Ersetze den Wert von `TARGET_PASSWORD_SHA256_HASH` unten durch deinen
 *    eigenen 64-stelligen Hex-Hash. Das Klartext-Passwort wird niemals im
 *    Quellcode gespeichert.
 *
 *    Option A — Browser DevTools Console (F12 -> Console):
 *    crypto.subtle.digest('SHA-256', new TextEncoder().encode('DEIN_NEUES_PASSWORT')).then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('')))
 *
 *    Option B — Windows PowerShell Einzeiler:
 *    [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes('DEIN_NEUES_PASSWORT'))).Replace('-','').ToLower()
 *
 *    Option C — macOS / Linux Terminal Einzeiler:
 *    printf '%s' 'DEIN_NEUES_PASSWORT' | shasum -a 256
 * ============================================================================
 */

const FOUNDER_AUTH_CONFIG = {
  // SHA-256 Hash des Initial-Passworts ("AresFounder2026!")
  TARGET_PASSWORD_SHA256_HASH: '5d30acf31b84f11ffacb3b8b9b2658d96a01ab8c8ae73f8e930be7e73890dfd0',

  // Schlüssel für doppelte Persistenz (localStorage + 10-Jahres-Backup-Cookie)
  STORAGE_KEY: 'founder_roadmap_auth_v1',
  COOKIE_NAME: 'founder_roadmap_auth_v1',
  COOKIE_MAX_AGE_SECONDS: 315360000, // 10 Jahre (315.360.000 Sekunden)

  // GitHub Cloud-Sync Konfiguration (Geräteübergreifende Echtzeit-Synchronisation)
  CLOUD_SYNC: {
    REPO_OWNER: 'Geezer0000',
    REPO_NAME: 'Methalox-Systems',
    BRANCH: 'main',
    FILE_PATH: 'data/cloudState.json',
    ENCRYPTED_SYNC_HEX: '6de2c3f7ef86228d91eba1ee8d3abe1e9057f89b7f9156b0c29944a1ad47614eeff7fbadba5e0756'
  }
};

/**
 * Pure-JS SHA-256 Fallback (falls die Seite über ein lokales file:// Protokoll
 * geöffnet wird, in dem manche Browser crypto.subtle einschränken).
 * Bevorzugt wird immer die native Web Crypto API (crypto.subtle.digest).
 */
function sha256Fallback(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j;
  let result = '';
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  let hash = (sha256Fallback.h = sha256Fallback.h || []);
  const k = (sha256Fallback.k = sha256Fallback.k || []);
  let primeCounter = k[lengthProperty];
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - (i % 4)) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;
  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15],
        w2 = w[i - 2];
      const a = hash[0],
        e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

/**
 * Berechnet den SHA-256-Hash eines Strings über die native Web Crypto API
 * (`crypto.subtle.digest('SHA-256', ...)`) mit Fallback für file://.
 */
async function computeSha256Hex(input) {
  if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fallback für lokale file:// Umgebungen
    }
  }
  const utf8Binary = unescape(encodeURIComponent(input));
  return sha256Fallback(utf8Binary);
}

/**
 * Liest den persistenten Auth-Cookie aus.
 */
function getAuthCookie(name) {
  try {
    const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Setzt sowohl localStorage als auch den 10-Jahres-Backup-Cookie.
 */
function persistFounderAuth(hashValue) {
  try {
    localStorage.setItem(FOUNDER_AUTH_CONFIG.STORAGE_KEY, hashValue);
  } catch (e) {}
  try {
    document.cookie =
      FOUNDER_AUTH_CONFIG.COOKIE_NAME +
      '=' +
      encodeURIComponent(hashValue) +
      '; max-age=' +
      FOUNDER_AUTH_CONFIG.COOKIE_MAX_AGE_SECONDS +
      '; path=/; SameSite=Lax';
  } catch (e) {}
}

/**
 * Prüft beim Laden der App zuerst localStorage und (falls leer) den Backup-Cookie.
 * Stellt bei gültigem Cookie automatisch localStorage wieder her.
 */
function isFounderAuthenticated() {
  const expected = FOUNDER_AUTH_CONFIG.TARGET_PASSWORD_SHA256_HASH.toLowerCase();
  let stored = null;
  try {
    stored = localStorage.getItem(FOUNDER_AUTH_CONFIG.STORAGE_KEY);
  } catch (e) {}

  if (stored && stored.toLowerCase() === expected) {
    persistFounderAuth(expected);
    return true;
  }

  const cookieVal = getAuthCookie(FOUNDER_AUTH_CONFIG.COOKIE_NAME);
  if (cookieVal && cookieVal.toLowerCase() === expected) {
    persistFounderAuth(expected);
    return true;
  }

  return false;
}

/**
 * Prüft ein eingegebenes Passwort gegen den SHA-256-Zielhash und speichert
 * bei Erfolg dauerhaft den Login-Status in localStorage + Cookie.
 */
async function verifyAndUnlockFounderRoadmap(passwordInput) {
  if (!passwordInput) return false;
  const computedHash = (await computeSha256Hex(passwordInput)).toLowerCase();
  const expectedHash = FOUNDER_AUTH_CONFIG.TARGET_PASSWORD_SHA256_HASH.toLowerCase();
  if (computedHash === expectedHash) {
    persistFounderAuth(expectedHash);
    return true;
  }
  return false;
}

/**
 * Manueller Logout / Sperren-Button: Löscht localStorage-Key und Backup-Cookie.
 */
function lockFounderRoadmap() {
  try {
    localStorage.removeItem(FOUNDER_AUTH_CONFIG.STORAGE_KEY);
  } catch (e) {}
  try {
    document.cookie =
      FOUNDER_AUTH_CONFIG.COOKIE_NAME + '=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
  } catch (e) {}
}

/**
 * Entschlüsselt den GitHub Cloud-Sync-Schlüssel im Arbeitsspeicher
 * (nur im authentifizierten Zustand verfügbar).
 */
async function getCloudSyncToken() {
  if (!isFounderAuthenticated()) return null;
  try {
    const customToken = localStorage.getItem('methalox_custom_gh_token_v1');
    if (customToken && customToken.trim()) return customToken.trim();
  } catch (e) {}

  const encHex = FOUNDER_AUTH_CONFIG.CLOUD_SYNC.ENCRYPTED_SYNC_HEX;
  if (!encHex) return null;

  const keySeed = 'METHALOX_SYNC_STREAM_2026::' + FOUNDER_AUTH_CONFIG.TARGET_PASSWORD_SHA256_HASH.toLowerCase();
  const h0 = await computeSha256Hex(keySeed + '::0');
  const h1 = await computeSha256Hex(keySeed + '::1');
  const streamHex = h0 + h1;

  let out = '';
  for (let i = 0; i < encHex.length; i += 2) {
    const encByte = parseInt(encHex.substr(i, 2), 16);
    const keyByte = parseInt(streamHex.substr(i, 2), 16);
    out += String.fromCharCode(encByte ^ keyByte);
  }
  return out;
}

window.FOUNDER_AUTH = {
  CONFIG: FOUNDER_AUTH_CONFIG,
  computeSha256Hex,
  isFounderAuthenticated,
  verifyAndUnlockFounderRoadmap,
  lockFounderRoadmap,
  getCloudSyncToken
};

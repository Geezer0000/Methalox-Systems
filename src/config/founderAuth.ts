/**
 * ============================================================================
 * METHALOX SYSTEMS AG — FOUNDER ROADMAP AUTHENTICATION CONFIGURATION (TS)
 * ============================================================================
 *
 * 1. TEMPORÄRES INITIAL-PASSWORT FÜR DEN ERSTEN TEST:
 *    AresFounder2026!
 *
 * 2. EIGENEN SHA-256-HASH GENERIEREN & EINTRAGEN:
 *    Ersetze den Wert von `TARGET_PASSWORD_SHA256_HASH` unten (sowie in
 *    `config/founderAuth.js`) durch deinen eigenen 64-stelligen Hex-Hash.
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

export interface FounderAuthConfig {
  readonly TARGET_PASSWORD_SHA256_HASH: string;
  readonly STORAGE_KEY: string;
  readonly COOKIE_NAME: string;
  readonly COOKIE_MAX_AGE_SECONDS: number;
}

export const FOUNDER_AUTH_CONFIG: FounderAuthConfig = {
  // SHA-256 Hash des Initial-Passworts ("AresFounder2026!")
  TARGET_PASSWORD_SHA256_HASH: '5d30acf31b84f11ffacb3b8b9b2658d96a01ab8c8ae73f8e930be7e73890dfd0',
  STORAGE_KEY: 'founder_roadmap_auth_v1',
  COOKIE_NAME: 'founder_roadmap_auth_v1',
  COOKIE_MAX_AGE_SECONDS: 315360000 // 10 Jahre
};

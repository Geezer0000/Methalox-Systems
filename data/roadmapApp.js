/**
 * ============================================================================
 * METHALOX SYSTEMS AG — FOUNDER COMMAND CENTER (OPERATIONEN & STRATEGIE)
 * Authentifizierung, Sub-Tab-Management, Operationen-Engine (Phasen 0–9),
 * Grand-Strategy-Dossier (Säulen 1–5, ASML-Matrix, Macht-Scorecard, Log)
 * & Abwärtskompatibles v1/v2 JSON-Backup-System
 * ============================================================================
 */

(function () {
  const OPS_STORAGE_KEY = 'methalox_founder_roadmap_state_v1';
  const STRATEGY_STORAGE_KEY = 'methalox_founder_strategy_state_v1';
  const SUBTAB_STORAGE_KEY = 'methalox_founder_active_subtab_v1';

  // Active Sub-Tab ('operationen' | 'strategie')
  let activeSubTab = 'operationen';

  // Operationen Filter & View State
  let currentViewMode = 'both'; // 'timeline' | 'deepdive' | 'both'
  let currentTrackFilter = 'all'; // 'all' | 'studium' | 'militaer' | 'technik' | 'finanzierung' | 'team' | 'recht' | 'open_only'
  let currentSearchQuery = '';
  let collapsedPhases = {}; // { [phaseId]: boolean }

  // Persistent Operationen Progress State (Checkboxes & Notes)
  let userState = {
    checkedItems: {}, // { [itemId]: boolean }
    phaseNotes: {},   // { [phaseId]: string }
    lastUpdated: null
  };

  // Persistent Strategie State (ASML Matrix, Power Scorecard, Pillar Notes & Decision Log)
  let strategyState = {
    asmlMatrixStatus: {}, // { [dimId]: 'Konzept' | 'Im Aufbau' | 'Validiert' | 'Dominant' }
    scorecardChecked: {}, // { [milestoneId]: boolean }
    pillarNotes: {},      // { [pillarId]: string }
    pillarNotesOpen: {},  // { [pillarId]: boolean }
    decisionLog: [],      // Array<{ id, date, category, title, details }>
    lastUpdated: null
  };

  /**
   * Lädt den zuletzt geöffneten Sub-Tab ('operationen' oder 'strategie') aus localStorage
   */
  function loadActiveSubTab() {
    try {
      const saved = localStorage.getItem(SUBTAB_STORAGE_KEY);
      if (saved === 'operationen' || saved === 'strategie') {
        activeSubTab = saved;
      }
    } catch (e) {
      activeSubTab = 'operationen';
    }
  }

  /**
   * Speichert den aktiven Sub-Tab in localStorage
   */
  function setActiveSubTab(tabName) {
    if (tabName !== 'operationen' && tabName !== 'strategie') return;
    activeSubTab = tabName;
    try {
      localStorage.setItem(SUBTAB_STORAGE_KEY, activeSubTab);
    } catch (e) {}
    renderProtectedRoadmap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Lädt den gespeicherten Operationen-Fortschritt aus localStorage oder initialisiert
   * die Default-Werte (Phase 0 HS25 & FS26 als abgeschlossen markiert).
   */
  function loadRoadmapState() {
    const data = window.FOUNDER_ROADMAP_DATA;
    if (!data) return;

    const defaults = {};
    data.phases.forEach(phase => {
      (phase.checklist || []).forEach(item => {
        if (item.defaultChecked) defaults[item.id] = true;
      });
      (phase.stageGates || []).forEach(sg => {
        if (sg.defaultChecked) defaults[sg.id] = true;
      });
    });

    try {
      const raw = localStorage.getItem(OPS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        userState.checkedItems = Object.assign({}, defaults, parsed.checkedItems || {});
        userState.phaseNotes = parsed.phaseNotes || {};
        userState.lastUpdated = parsed.lastUpdated || null;
      } else {
        userState.checkedItems = defaults;
        userState.phaseNotes = {};
      }
    } catch (e) {
      userState.checkedItems = defaults;
      userState.phaseNotes = {};
    }
  }

  /**
   * Speichert Operationen-Fortschritt sofort persistent in localStorage
   * und plant einen automatischen GitHub Cloud-Sync Push.
   */
  function saveRoadmapState(skipCloud) {
    userState.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(OPS_STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {}
    if (!skipCloud) {
      scheduleCloudPush();
    }
  }

  /**
   * Lädt den gespeicherten Strategie-State aus localStorage oder initialisiert Defaults.
   */
  function loadStrategyState() {
    const stratData = window.FOUNDER_STRATEGY_DATA;
    const defaultMatrix = {};
    if (stratData && stratData.asmlChokepointMatrix) {
      stratData.asmlChokepointMatrix.forEach(row => {
        defaultMatrix[row.id] = row.defaultStatus || 'Konzept';
      });
    }

    try {
      const raw = localStorage.getItem(STRATEGY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        strategyState.asmlMatrixStatus = Object.assign({}, defaultMatrix, parsed.asmlMatrixStatus || {});
        strategyState.scorecardChecked = parsed.scorecardChecked || {};
        strategyState.pillarNotes = parsed.pillarNotes || {};
        strategyState.pillarNotesOpen = parsed.pillarNotesOpen || {};
        strategyState.decisionLog = Array.isArray(parsed.decisionLog) ? parsed.decisionLog : [];
        strategyState.lastUpdated = parsed.lastUpdated || null;
      } else {
        strategyState.asmlMatrixStatus = defaultMatrix;
        strategyState.scorecardChecked = {};
        strategyState.pillarNotes = {};
        strategyState.pillarNotesOpen = {};
        strategyState.decisionLog = [];
      }
    } catch (e) {
      strategyState.asmlMatrixStatus = defaultMatrix;
      strategyState.scorecardChecked = {};
      strategyState.pillarNotes = {};
      strategyState.pillarNotesOpen = {};
      strategyState.decisionLog = [];
    }
  }

  /**
   * Speichert Strategie-Fortschritt sofort persistent in localStorage
   * und plant einen automatischen GitHub Cloud-Sync Push.
   */
  function saveStrategyState(skipCloud) {
    strategyState.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(strategyState));
    } catch (e) {}
    if (!skipCloud) {
      scheduleCloudPush();
    }
  }

  /**
   * Hilfsfunktion: HTML Escaping
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Berechnet alle Live-KPIs für das Executive Top-Dashboard unter OPERATIONEN
   */
  function calculateKPIs() {
    const data = window.FOUNDER_ROADMAP_DATA;
    let totalItems = 0;
    let checkedCount = 0;

    data.phases.forEach(phase => {
      (phase.checklist || []).forEach(item => {
        totalItems++;
        if (userState.checkedItems[item.id]) checkedCount++;
      });
      (phase.stageGates || []).forEach(sg => {
        totalItems++;
        if (userState.checkedItems[sg.id]) checkedCount++;
      });
    });

    const overallPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

    // Berechne ECTS dynamisch basierend auf erledigten Semestern
    let ectsEarned = 0;
    if (userState.checkedItems['p0-c1']) ectsEarned += 32; // HS25
    if (userState.checkedItems['p0-c3']) ectsEarned += 31; // FS26
    if (userState.checkedItems['p1-sg1']) ectsEarned += 32; // HS26
    if (userState.checkedItems['p3-c1']) ectsEarned += 30; // FS28
    if (userState.checkedItems['p3-c3']) ectsEarned += 32; // HS28
    if (userState.checkedItems['p3-c7'] && userState.checkedItems['p3-c8']) ectsEarned += 37; // FS29
    if (userState.checkedItems['p4-c1']) ectsEarned += 18; // HS29
    if (userState.checkedItems['p4-c3']) ectsEarned += 23; // FS30
    if (userState.checkedItems['p4-c5']) ectsEarned += 55; // HS30
    if (userState.checkedItems['p4-c8']) ectsEarned += 10; // FS31

    const ectsTotal = data.meta.ectsTotalTarget; // 300 ECTS
    const ectsOpen = Math.max(0, ectsTotal - ectsEarned);
    const ectsPercent = Math.min(100, Math.round((ectsEarned / ectsTotal) * 100));

    let currentTrlNum = 1;
    if (userState.checkedItems['p3-c7']) currentTrlNum = 2;
    if (userState.checkedItems['p4-sg1'] || userState.checkedItems['p5-sg1']) currentTrlNum = 3;
    if (userState.checkedItems['p6-c3']) currentTrlNum = 4;
    if (userState.checkedItems['p6-sg1']) currentTrlNum = 5;
    if (userState.checkedItems['p7-c3']) currentTrlNum = 6;
    if (userState.checkedItems['p7-sg1']) currentTrlNum = 7;
    if (userState.checkedItems['p8-c2']) currentTrlNum = 8;
    if (userState.checkedItems['p8-sg1']) currentTrlNum = 9;

    return {
      totalItems,
      checkedCount,
      overallPercent,
      ectsEarned,
      ectsOpen,
      ectsTotal,
      ectsPercent,
      currentTrlNum
    };
  }

  /**
   * Aktualisiert die Schloss-Icons in der Hauptnavigation (🔒 vs 🔓)
   */
  function updateNavigationLockIcons(isUnlocked) {
    const desktopIcon = document.getElementById('roadmap-nav-lock-icon');
    const mobileIcon = document.getElementById('roadmap-mobile-lock-icon');
    if (desktopIcon) desktopIcon.textContent = isUnlocked ? '🔓' : '🔒';
    if (mobileIcon) mobileIcon.textContent = isUnlocked ? '🔓' : '🔒';
  }

  /**
   * Rendert einen Track-Badge für einen Checklist-Eintrag
   */
  function renderTrackBadge(track) {
    const map = {
      studium: { label: 'Studium & Minor', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
      militaer: { label: 'Militär (Lt)', cls: 'bg-slate-100 text-slate-700 border-slate-300' },
      technik: { label: 'Technik & TRL', cls: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
      finanzierung: { label: 'Finanzierung', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
      team: { label: 'Team & Hiring', cls: 'bg-purple-50 text-purple-800 border-purple-200' },
      recht: { label: 'Recht & IP', cls: 'bg-amber-50 text-amber-800 border-amber-200' }
    };
    const info = map[track] || { label: track, cls: 'bg-slate-100 text-slate-600 border-slate-200' };
    return `<span class="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold rounded border ${info.cls}">${info.label}</span>`;
  }

  /**
   * Rendert eine einzelne Semester-Karte im Halbjahres-Grid (2025–2031)
   */
  function renderAcademicSlotCard(slot) {
    if (!slot || slot.status === 'empty') {
      return `
        <div class="h-full min-h-[118px] rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center p-5 text-slate-500 font-sans text-sm">
          ${escapeHtml(slot ? slot.title : '')}
        </div>
      `;
    }

    const colorStyles = {
      bachelor: 'bg-[#5B9BD5] text-slate-950 hover:bg-[#6AA8E0]',
      military: 'bg-[#9E9A95] text-slate-950 hover:bg-[#ACA8A3]',
      exchange: 'bg-[#F39C55] text-slate-950 hover:bg-[#F7AA6B]',
      master: 'bg-[#A78BFA] text-slate-950 hover:bg-[#B49CFB]',
      transition: 'bg-[#0E7490] text-white hover:bg-[#1588A6]'
    };

    const bgCls = colorStyles[slot.category] || colorStyles.bachelor;
    const isNow = slot.status === 'now';
    const isCompleted = slot.status === 'completed';
    const borderCls = isNow
      ? 'ring-[3px] ring-white shadow-[0_0_25px_rgba(255,255,255,0.28)]'
      : 'border border-black/10';

    const iconMap = {
      grad: `<svg class="w-4 h-4 inline-block mr-1 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>`,
      flag: `<svg class="w-4 h-4 inline-block mr-1 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>`,
      plane: `<svg class="w-4 h-4 inline-block mr-1 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`,
      book: `<svg class="w-4 h-4 inline-block mr-1 opacity-80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
      rocket: `<svg class="w-4 h-4 inline-block mr-1 opacity-90" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`
    };

    const statusBadgeHtml = isCompleted
      ? `<span class="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold text-slate-950" title="Abgeschlossen">✓</span>`
      : isNow
      ? `<span class="px-2.5 py-0.5 rounded-full bg-white text-slate-950 font-bold text-xs shadow-sm">Jetzt</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-black/15 text-[10px] font-mono uppercase tracking-wider opacity-85">Geplant</span>`;

    const subTextCls = slot.category === 'transition' ? 'text-cyan-100' : 'text-slate-900/80';

    return `
      <div onclick="window.FOUNDER_ROADMAP_APP.jumpToPhase('${slot.targetPhaseId}')"
           class="cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 ${bgCls} ${borderCls} flex flex-col justify-between min-h-[124px] group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-1">
            <div class="font-display font-bold text-base flex items-center">
              ${iconMap[slot.icon] || ''}
              <span>${escapeHtml(slot.code)}</span>
            </div>
            ${statusBadgeHtml}
          </div>
          <div class="font-bold text-sm mb-1">${escapeHtml(slot.title)}</div>
          <p class="text-xs leading-snug ${subTextCls} line-clamp-2">${escapeHtml(slot.subtitle)}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-xs font-medium ${subTextCls}">
          <span>${escapeHtml(slot.ectsText)}</span>
          <span class="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] underline">Details →</span>
        </div>
      </div>
    `;
  }

  /**
   * Prüft, ob eine Phase unter den aktuellen Track- und Suchfiltern angezeigt werden soll
   */
  function matchesPhaseFilter(phase) {
    if (currentTrackFilter !== 'all' && currentTrackFilter !== 'open_only') {
      if (!(phase.tracks || []).includes(currentTrackFilter)) {
        return false;
      }
    }

    if (currentTrackFilter === 'open_only') {
      const hasOpenChecklist = (phase.checklist || []).some(item => !userState.checkedItems[item.id]);
      const hasOpenGate = (phase.stageGates || []).some(sg => !userState.checkedItems[sg.id]);
      if (!hasOpenChecklist && !hasOpenGate) return false;
    }

    if (currentSearchQuery.trim() !== '') {
      const q = currentSearchQuery.toLowerCase();
      const haystack = [
        phase.number,
        phase.title,
        phase.timeframe,
        phase.summary,
        ...(phase.checklist || []).map(c => c.text),
        ...(phase.stageGates || []).map(s => s.text),
        ...(phase.academicTech || []).map(a => a.label + ' ' + a.detail),
        ...(phase.financing || []).map(f => f.label + ' ' + f.detail),
        ...(phase.teamOrg || []).map(t => t.label + ' ' + t.detail),
        ...(phase.legalIpPartners || []).map(l => l.label + ' ' + l.detail),
        userState.phaseNotes[phase.id] || ''
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    }

    return true;
  }

  /**
   * Rendert eine detaillierte Phase-Karte für Ansicht B (Deep-Dive unter OPERATIONEN)
   */
  function renderPhaseDeepDiveCard(phase) {
    const allPhaseItems = [...(phase.checklist || []), ...(phase.stageGates || [])];
    const doneCount = allPhaseItems.filter(i => userState.checkedItems[i.id]).length;
    const totalCount = allPhaseItems.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const isCollapsed = !!collapsedPhases[phase.id];
    const isCurrent = phase.status === 'now';
    const isCompleted = phase.status === 'completed' || (totalCount > 0 && doneCount === totalCount);

    const cardBorder = isCurrent
      ? 'border-2 border-methalox-cyan shadow-md'
      : isCompleted
      ? 'border border-emerald-500/50'
      : 'border border-line';

    const statusPillCls = isCurrent
      ? 'bg-methalox-cyan text-white'
      : isCompleted
      ? 'bg-emerald-600 text-white'
      : 'bg-slate-900 text-white';

    const filteredChecklist = (phase.checklist || []).filter(item => {
      if (currentTrackFilter === 'open_only' && userState.checkedItems[item.id]) return false;
      if (
        currentTrackFilter !== 'all' &&
        currentTrackFilter !== 'open_only' &&
        item.track !== currentTrackFilter
      ) {
        return false;
      }
      if (currentSearchQuery.trim() !== '') {
        return item.text.toLowerCase().includes(currentSearchQuery.toLowerCase());
      }
      return true;
    });

    const checklistToRender = filteredChecklist.length > 0 ? filteredChecklist : phase.checklist || [];

    const checklistHtml = checklistToRender
      .map(item => {
        const checked = !!userState.checkedItems[item.id];
        return `
          <label class="flex items-start gap-3.5 p-3.5 rounded-lg border transition-all cursor-pointer select-none ${
            checked
              ? 'bg-emerald-50/40 border-emerald-200 text-slate-500'
              : 'bg-white border-line hover:border-slate-400 text-charcoal'
          }">
            <input type="checkbox"
                   class="mt-1 w-4 h-4 accent-charcoal rounded cursor-pointer shrink-0"
                   ${checked ? 'checked' : ''}
                   onchange="window.FOUNDER_ROADMAP_APP.toggleCheckItem('${item.id}', this.checked)" />
            <div class="flex-1 text-sm leading-relaxed">
              <div class="${checked ? 'line-through text-slate-400' : 'text-charcoal font-medium'}">
                ${escapeHtml(item.text)}
              </div>
              <div class="mt-1.5 flex items-center gap-2">
                ${renderTrackBadge(item.track)}
                ${checked ? '<span class="text-[11px] font-mono text-emerald-700 font-semibold">✓ Erledigt</span>' : ''}
              </div>
            </div>
          </label>
        `;
      })
      .join('');

    const stageGatesHtml = (phase.stageGates || [])
      .map(sg => {
        const checked = !!userState.checkedItems[sg.id];
        return `
          <label class="flex items-start gap-3.5 p-3.5 rounded-lg border transition-all cursor-pointer select-none ${
            checked
              ? 'bg-emerald-50/60 border-emerald-300 text-slate-600'
              : 'bg-amber-50/50 border-amber-300 hover:border-amber-400 text-charcoal'
          }">
            <input type="checkbox"
                   class="mt-1 w-4 h-4 accent-mars-vermilion rounded cursor-pointer shrink-0"
                   ${checked ? 'checked' : ''}
                   onchange="window.FOUNDER_ROADMAP_APP.toggleCheckItem('${sg.id}', this.checked)" />
            <div class="flex-1 text-sm leading-relaxed">
              <div class="font-semibold ${checked ? 'line-through text-slate-500' : 'text-charcoal'}">
                ${escapeHtml(sg.text)}
              </div>
              <div class="mt-1 flex items-center gap-2">
                <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-mars-vermilion/10 text-mars-vermilion font-bold">STAGE-GATE MILESTONE</span>
                ${checked ? '<span class="text-[11px] font-mono text-emerald-700 font-semibold">✓ Verifiziert</span>' : ''}
              </div>
            </div>
          </label>
        `;
      })
      .join('');

    const renderInfoList = items =>
      (items || [])
        .map(
          it => `
          <div class="p-3.5 rounded-lg bg-slate-50 border border-line space-y-1">
            <div class="font-bold text-xs text-charcoal font-mono">${escapeHtml(it.label)}</div>
            <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(it.detail)}</p>
          </div>
        `
        )
        .join('');

    const noteValue = userState.phaseNotes[phase.id] || '';

    return `
      <article id="deepdive-${phase.id}" class="bg-white rounded-2xl ${cardBorder} overflow-hidden transition-all">
        <!-- Card Header -->
        <div class="p-6 sm:p-8 bg-slate-50/70 border-b border-line">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-bold px-2.5 py-1 rounded ${statusPillCls}">
                ${escapeHtml(phase.number)} · ${escapeHtml(phase.statusBadge)}
              </span>
              <span class="font-mono text-xs px-2.5 py-1 rounded bg-white border border-line text-slate-700">
                ${escapeHtml(phase.timeframe)}
              </span>
              <span class="font-mono text-xs px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200 text-cyan-900 font-semibold">
                ${escapeHtml(phase.trlBadge)}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <div class="text-right font-mono text-xs">
                <span class="font-bold text-charcoal">${doneCount}/${totalCount}</span>
                <span class="text-slate-500"> (${pct}%)</span>
              </div>
              <button onclick="window.FOUNDER_ROADMAP_APP.toggleCollapsePhase('${phase.id}')"
                      class="px-3 py-1.5 rounded border border-line bg-white hover:bg-slate-100 font-mono text-xs text-charcoal transition-colors">
                ${isCollapsed ? 'Aufklappen ▼' : 'Zuklappen ▲'}
              </button>
            </div>
          </div>

          <h3 class="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight mb-2">
            ${escapeHtml(phase.title)}
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">
            ${escapeHtml(phase.summary)}
          </p>

          <!-- Sub-KPI Pills & Progress Bar -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-4">
            <div class="p-2.5 rounded bg-white border border-line">
              <span class="text-slate-400 block text-[10px]">ECTS / STATUS</span>
              <span class="text-charcoal font-semibold">${escapeHtml(phase.ectsBadge)}</span>
            </div>
            <div class="p-2.5 rounded bg-white border border-line">
              <span class="text-slate-400 block text-[10px]">KAPITAL / FINANZIERUNG</span>
              <span class="text-charcoal font-semibold">${escapeHtml(phase.capitalBadge)}</span>
            </div>
            <div class="p-2.5 rounded bg-white border border-line">
              <span class="text-slate-400 block text-[10px]">TEAM &amp; ORGANISATION</span>
              <span class="text-charcoal font-semibold">${escapeHtml(phase.teamBadge)}</span>
            </div>
          </div>

          <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-charcoal transition-all duration-300" style="width: ${pct}%"></div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="${isCollapsed ? 'hidden' : 'block'} p-6 sm:p-8 space-y-8">
          
          <!-- 1. Operative Schritte & Checkliste -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-charcoal">
                1. OPERATIVE SCHRITTE &amp; CHECKLISTE (EINZELN ABHAKBAR)
              </h4>
              <span class="font-mono text-[11px] text-slate-500">Auto-Save aktiv</span>
            </div>
            <div class="space-y-2.5">
              ${checklistHtml}
            </div>
          </div>

          <!-- 2. Harte Stage-Gate Milestones -->
          <div>
            <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-mars-vermilion mb-3">
              2. HARTE STAGE-GATE MILESTONES (GO / NO-GO KRITERIEN)
            </h4>
            <div class="space-y-2.5">
              ${stageGatesHtml}
            </div>
          </div>

          <!-- 3. 4-Quadranten-Deep-Dive -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-line">
            <div class="space-y-3">
              <h5 class="font-mono text-xs font-bold uppercase tracking-wider text-methalox-cyan">
                AKADEMIK / TECHNIK &amp; TRL
              </h5>
              <div class="space-y-2.5">
                ${renderInfoList(phase.academicTech)}
              </div>
            </div>

            <div class="space-y-3">
              <h5 class="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                FINANZIERUNG &amp; KAPITALSTRATEGIE
              </h5>
              <div class="space-y-2.5">
                ${renderInfoList(phase.financing)}
              </div>
            </div>

            <div class="space-y-3">
              <h5 class="font-mono text-xs font-bold uppercase tracking-wider text-purple-800">
                TEAM, RECRUITING &amp; ORGANISATION
              </h5>
              <div class="space-y-2.5">
                ${renderInfoList(phase.teamOrg)}
              </div>
            </div>

            <div class="space-y-3">
              <h5 class="font-mono text-xs font-bold uppercase tracking-wider text-amber-800">
                RECHT, IP, REGULIERUNG &amp; PARTNERSCHAFTEN
              </h5>
              <div class="space-y-2.5">
                ${renderInfoList(phase.legalIpPartners)}
              </div>
            </div>
          </div>

          <!-- 4. Eigene Notizen pro Phase -->
          <div class="pt-4 border-t border-line">
            <div class="flex items-center justify-between mb-2">
              <label for="note-${phase.id}" class="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                PERSÖNLICHE FOUNDER-NOTIZEN (${escapeHtml(phase.number)})
              </label>
              <span id="note-status-${phase.id}" class="font-mono text-[11px] text-emerald-700">
                Lokal gespeichert ✓
              </span>
            </div>
            <textarea
              id="note-${phase.id}"
              rows="3"
              placeholder="Eigene Notizen, Kontakte, Professoren, Investoren-Feedback oder Deadlines für ${escapeHtml(phase.number)} hier eintragen..."
              oninput="window.FOUNDER_ROADMAP_APP.updatePhaseNote('${phase.id}', this.value)"
              class="w-full p-3.5 rounded-lg border border-line bg-slate-50/60 focus:bg-white focus:border-charcoal focus:outline-none text-xs font-mono text-charcoal leading-relaxed"
            >${escapeHtml(noteValue)}</textarea>
          </div>

        </div>
      </article>
    `;
  }

  /**
   * Rendert den Sub-Tab 1: OPERATIONEN (Bestehende Roadmap & Milestones)
   */
  function renderOperationsSubTab() {
    const data = window.FOUNDER_ROADMAP_DATA;
    const kpi = calculateKPIs();

    // 1. Academic Timeline Rows (2025–2031)
    const academicRowsHtml = data.academicTimelineGrid
      .map(row => {
        const yearCls = row.isCurrentYear
          ? 'text-[#A78BFA] font-extrabold'
          : 'text-white font-bold';
        return `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
            <div class="lg:col-span-1 flex items-center justify-start lg:justify-center font-display text-2xl ${yearCls} py-2">
              ${row.year}
            </div>
            <div class="lg:col-span-5">
              ${renderAcademicSlotCard(row.spring)}
            </div>
            <div class="lg:col-span-6">
              ${renderAcademicSlotCard(row.autumn)}
            </div>
          </div>
        `;
      })
      .join('');

    // 2. Startup Timeline Cards (2031–2040+)
    const startupCardsHtml = data.startupTimelineGrid
      .map(
        card => `
        <div onclick="window.FOUNDER_ROADMAP_APP.jumpToPhase('${card.phaseId}')"
             class="cursor-pointer rounded-2xl p-6 bg-[#181B24] border ${card.cardAccent} transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span class="font-mono text-xs font-bold text-slate-400">${escapeHtml(card.phaseNum)} · ${escapeHtml(card.timeframe)}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${card.badgeColor}">
                ${escapeHtml(card.badge)}
              </span>
            </div>
            <h4 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              ${escapeHtml(card.title)}
            </h4>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">
              ${escapeHtml(card.highlights)}
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 font-mono text-[11px]">
            <div>
              <span class="text-slate-500 block text-[9px]">REIFEGRAD</span>
              <span class="text-cyan-300 font-bold">${escapeHtml(card.trlRange)}</span>
            </div>
            <div>
              <span class="text-slate-500 block text-[9px]">KAPITALZIEL</span>
              <span class="text-emerald-300 font-bold">${escapeHtml(card.capitalTarget)}</span>
            </div>
            <div>
              <span class="text-slate-500 block text-[9px]">TEAMGRÖSSE</span>
              <span class="text-purple-300 font-bold">${escapeHtml(card.teamSize)}</span>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    // 3. Deep-Dive Phase Cards (Teil I & Teil II)
    const matchingPhases = data.phases.filter(matchesPhaseFilter);
    const part1Phases = matchingPhases.filter(p => p.part.startsWith('TEIL I:'));
    const part2Phases = matchingPhases.filter(p => p.part.startsWith('TEIL II:'));

    const part1Html =
      part1Phases.length > 0
        ? `
        <div class="space-y-6">
          <div class="border-b-2 border-charcoal pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="font-mono text-xs uppercase tracking-widest text-mars-vermilion font-bold block">TEIL I (2025–2031)</span>
              <h3 class="text-2xl font-extrabold text-charcoal">Akademisches Fundament, Militär &amp; Spezialisierung</h3>
            </div>
            <span class="font-mono text-xs text-slate-500">BSc + Offiziersschule (Lt) + Asien-Austausch + MSc + Minor DS &amp; Lab Automation</span>
          </div>
          <div class="space-y-6">
            ${part1Phases.map(renderPhaseDeepDiveCard).join('')}
          </div>
        </div>
      `
        : '';

    const part2Html =
      part2Phases.length > 0
        ? `
        <div class="space-y-6 pt-8">
          <div class="border-b-2 border-charcoal pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="font-mono text-xs uppercase tracking-widest text-methalox-cyan font-bold block">TEIL II (2031–2040+)</span>
              <h3 class="text-2xl font-extrabold text-charcoal">Startup-Gründung, Technologie-Entwicklung &amp; Skalierung</h3>
            </div>
            <span class="font-mono text-xs text-slate-500">TRL 1 → TRL 9 · Pre-Seed bis Series C+ / IPO</span>
          </div>
          <div class="space-y-6">
            ${part2Phases.map(renderPhaseDeepDiveCard).join('')}
          </div>
        </div>
      `
        : '';

    const emptyFilterHtml =
      matchingPhases.length === 0
        ? `
        <div class="p-12 border border-line bg-white rounded-2xl text-center space-y-3">
          <div class="font-mono text-sm font-bold text-charcoal">Keine Phasen oder Schritte für diesen Filter gefunden.</div>
          <button onclick="window.FOUNDER_ROADMAP_APP.resetFilters()"
                  class="px-4 py-2 rounded bg-charcoal text-white font-mono text-xs">
            Filter zurücksetzen
          </button>
        </div>
      `
        : '';

    const trlBarsHtml = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .map(n => {
        const active = n <= kpi.currentTrlNum;
        return `<span class="flex-1 h-2 rounded-sm ${
          active ? 'bg-methalox-cyan' : 'bg-slate-200'
        }" title="TRL ${n}"></span>`;
      })
      .join('');

    const showTimeline = currentViewMode === 'timeline' || currentViewMode === 'both';
    const showDeepDive = currentViewMode === 'deepdive' || currentViewMode === 'both';

    return `
      <div class="space-y-12">

        <!-- 1. EXECUTIVE TOP-DASHBOARD (KPI-LEISTE) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <!-- KPI 1: Aktuelle Phase -->
          <div class="p-5 rounded-2xl bg-charcoal text-white flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1.5">
                <span>AKTUELLE PHASE</span>
                <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">NOW</span>
              </div>
              <div class="font-display font-bold text-base leading-snug">
                HS26 – 3. Semester BSc Wirtschaftschemie
              </div>
            </div>
            <div class="mt-4 pt-2.5 border-t border-white/15 font-mono text-[11px] text-slate-300 flex justify-between">
              <span>Phase 1 (UZH)</span>
              <span class="text-amber-300">Ab Jan 27: Militär (Lt)</span>
            </div>
          </div>

          <!-- KPI 2: Gesamtfortschritt -->
          <div class="p-5 rounded-2xl bg-white border border-line flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                <span>GESAMTFORTSCHRITT</span>
                <span class="text-charcoal font-bold">${kpi.overallPercent}%</span>
              </div>
              <div class="text-2xl font-extrabold text-charcoal font-display">
                ${kpi.checkedCount} <span class="text-sm font-normal text-slate-500">/ ${kpi.totalItems} Milestones</span>
              </div>
            </div>
            <div class="mt-3">
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                <div class="h-full bg-emerald-600 transition-all duration-300" style="width: ${kpi.overallPercent}%"></div>
              </div>
              <span class="font-mono text-[10px] text-slate-500">Dynamisch aus allen Phasen berechnet</span>
            </div>
          </div>

          <!-- KPI 3: Studienfortschritt ECTS -->
          <div class="p-5 rounded-2xl bg-white border border-line flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                <span>STUDIENFORTSCHRITT (ECTS)</span>
                <span class="text-blue-700 font-bold">${kpi.ectsPercent}%</span>
              </div>
              <div class="text-2xl font-extrabold text-charcoal font-display">
                ${kpi.ectsEarned} <span class="text-sm font-normal text-slate-500">/ ${kpi.ectsTotal} ECTS</span>
              </div>
            </div>
            <div class="mt-3">
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                <div class="h-full bg-blue-600 transition-all duration-300" style="width: ${kpi.ectsPercent}%"></div>
              </div>
              <span class="font-mono text-[10px] text-slate-500">${kpi.ectsEarned} erledigt · ${kpi.ectsOpen} offen (BSc + MSc + Minor)</span>
            </div>
          </div>

          <!-- KPI 4: Aktuelles & Ziel-TRL -->
          <div class="p-5 rounded-2xl bg-white border border-line flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                <span>TECHNOLOGY READINESS</span>
                <span class="text-methalox-cyan font-bold">ZIEL: TRL 9</span>
              </div>
              <div class="text-2xl font-extrabold text-charcoal font-display">
                TRL ${kpi.currentTrlNum} <span class="text-sm font-normal text-slate-500">→ TRL 9</span>
              </div>
            </div>
            <div class="mt-3">
              <div class="flex gap-1 mb-1.5">
                ${trlBarsHtml}
              </div>
              <span class="font-mono text-[10px] text-slate-500">Labor (1–3) → EM (5) → QM (7) → Flight (9)</span>
            </div>
          </div>

          <!-- KPI 5: Kapitalziel & Headcount-Aufbau -->
          <div class="p-5 rounded-2xl bg-white border border-line flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                <span>FINANZIERUNG &amp; TEAM</span>
                <span class="text-mars-vermilion font-bold">2031–2040+</span>
              </div>
              <div class="text-lg font-extrabold text-charcoal font-display leading-tight">
                CHF 70–135+ Mio.
              </div>
            </div>
            <div class="mt-3 pt-2 border-t border-line font-mono text-[10px] text-slate-600 space-y-0.5">
              <div class="flex justify-between"><span>Pre-Seed/Seed:</span> <span class="font-bold">2 → 15 FTE</span></div>
              <div class="flex justify-between"><span>Series A/B/C+:</span> <span class="font-bold">40 → 300+ FTE</span></div>
            </div>
          </div>

        </div>

        <!-- 2. ANSICHTS-UMSCHALTER, TRACK-FILTER & VOLLTEXTSUCHE -->
        <div class="p-5 rounded-2xl bg-white border border-line space-y-4 shadow-sm">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span class="text-slate-400 mr-1">ANSICHT:</span>
              <button onclick="window.FOUNDER_ROADMAP_APP.setViewMode('both')"
                      class="px-3.5 py-1.5 rounded-lg border transition-all ${
                        currentViewMode === 'both'
                          ? 'bg-charcoal text-white border-charcoal font-semibold'
                          : 'bg-slate-50 text-slate-600 border-line hover:bg-slate-100'
                      }">
                Kombinierte Ansicht (A + B)
              </button>
              <button onclick="window.FOUNDER_ROADMAP_APP.setViewMode('timeline')"
                      class="px-3.5 py-1.5 rounded-lg border transition-all ${
                        currentViewMode === 'timeline'
                          ? 'bg-charcoal text-white border-charcoal font-semibold'
                          : 'bg-slate-50 text-slate-600 border-line hover:bg-slate-100'
                      }">
                Ansicht A: Master-Timeline (2025–2040+)
              </button>
              <button onclick="window.FOUNDER_ROADMAP_APP.setViewMode('deepdive')"
                      class="px-3.5 py-1.5 rounded-lg border transition-all ${
                        currentViewMode === 'deepdive'
                          ? 'bg-charcoal text-white border-charcoal font-semibold'
                          : 'bg-slate-50 text-slate-600 border-line hover:bg-slate-100'
                      }">
                Ansicht B: Phasen-Deep-Dive
              </button>
            </div>

            <div class="relative flex-1 max-w-md">
              <input
                id="roadmap-search-input"
                type="text"
                value="${escapeHtml(currentSearchQuery)}"
                placeholder="Volltextsuche (z.B. Sabatier, Singapur, Venture Kick, Series A, TRL 7)..."
                oninput="window.FOUNDER_ROADMAP_APP.setSearchQuery(this.value)"
                class="w-full pl-3.5 pr-8 py-1.5 rounded-lg border border-line bg-slate-50 focus:bg-white focus:border-charcoal focus:outline-none font-mono text-xs text-charcoal"
              />
              ${
                currentSearchQuery
                  ? `<button onclick="window.FOUNDER_ROADMAP_APP.setSearchQuery('')" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-charcoal font-mono text-xs">✕</button>`
                  : ''
              }
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line">
            <div class="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span class="text-slate-400 mr-1">TRACK-FILTER:</span>
              ${[
                { id: 'all', label: 'Alle' },
                { id: 'studium', label: 'Studium & Minor' },
                { id: 'militaer', label: 'Militär' },
                { id: 'technik', label: 'Technik & TRL' },
                { id: 'finanzierung', label: 'Finanzierung' },
                { id: 'team', label: 'Team & Hiring' },
                { id: 'recht', label: 'Recht & IP' },
                { id: 'open_only', label: 'Nur offene Punkte' }
              ]
                .map(
                  f => `
                  <button onclick="window.FOUNDER_ROADMAP_APP.setTrackFilter('${f.id}')"
                          class="px-3 py-1 rounded-full border transition-all ${
                            currentTrackFilter === f.id
                              ? 'bg-methalox-cyan text-white border-methalox-cyan font-semibold'
                              : 'bg-white text-slate-600 border-line hover:border-slate-400'
                          }">
                    ${escapeHtml(f.label)}
                  </button>
                `
                )
                .join('')}
            </div>

            <div class="flex items-center gap-2 font-mono text-xs">
              <button onclick="window.FOUNDER_ROADMAP_APP.expandAllPhases(true)" class="text-slate-500 hover:text-charcoal underline">Alle aufklappen</button>
              <span class="text-slate-300">|</span>
              <button onclick="window.FOUNDER_ROADMAP_APP.expandAllPhases(false)" class="text-slate-500 hover:text-charcoal underline">Alle zuklappen</button>
            </div>
          </div>
        </div>

        <!-- 3. ANSICHT A: MASTER-TIMELINE (2025–2040+) -->
        <div class="${showTimeline ? 'block' : 'hidden'} space-y-10">
          
          <!-- TEIL 1: TIMELINE 2025–2031 -->
          <div class="rounded-3xl bg-[#11131A] text-white p-6 sm:p-8 shadow-xl border border-slate-800">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-2.5">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight">Timeline 2025–2031 · Studium, Militär &amp; Spezialisierung</h2>
                </div>
                <p class="text-xs text-slate-400 font-mono mt-1">Klicke auf ein beliebiges Semester, um direkt in die operative Detail-Checkliste zu springen.</p>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-xs font-medium">
                <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-[#5B9BD5] inline-block"></span>Bachelor</span>
                <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-[#9E9A95] inline-block"></span>Militärdienst (Lt)</span>
                <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-[#F39C55] inline-block"></span>Austausch (Asien)</span>
                <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-[#A78BFA] inline-block"></span>Master + Minor</span>
              </div>
            </div>

            <div class="hidden lg:grid lg:grid-cols-12 gap-3.5 text-xs font-mono text-slate-400 pb-3 px-1">
              <div class="lg:col-span-1 text-center">Jahr</div>
              <div class="lg:col-span-5">Frühling (FS)</div>
              <div class="lg:col-span-6">Herbst (HS)</div>
            </div>

            <div class="space-y-3.5">
              ${academicRowsHtml}
            </div>
          </div>

          <!-- TEIL 2: STARTUP-TIMELINE 2031–2040+ -->
          <div class="rounded-3xl bg-[#11131A] text-white p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span class="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold block">TEIL 2 · STARTUP-SKALIERUNG (2031–2040+)</span>
                <h2 class="text-xl sm:text-2xl font-bold font-display tracking-tight mt-0.5">
                  Von der AG-Inkorporation (TRL 1) zur planetaren Serienfabrik (TRL 9)
                </h2>
              </div>
              <span class="font-mono text-xs text-slate-400">Klick auf eine Phase öffnet den Deep-Dive ▼</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${startupCardsHtml}
            </div>
          </div>

        </div>

        <!-- 4. ANSICHT B: DETAILLIERTE PHASEN- & AUSFÜHRUNGSANSICHT -->
        <div id="roadmap-deepdive-container" class="${showDeepDive ? 'block' : 'hidden'} space-y-12">
          ${part1Html}
          ${part2Html}
          ${emptyFilterHtml}
        </div>

      </div>
    `;
  }

  /**
   * ===========================================================================
   * SUB-TAB 2: STRATEGIE (GRAND STRATEGY & CHOKEPOINT-DOKTRIN)
   * ===========================================================================
   */
  function renderAsmlStatusBadge(status) {
    const map = {
      'Konzept': 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200',
      'Im Aufbau': 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100',
      'Validiert': 'bg-cyan-50 text-cyan-800 border-cyan-300 hover:bg-cyan-100',
      'Dominant': 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700'
    };
    const cls = map[status] || map['Konzept'];
    return `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs font-bold border transition-all select-none ${cls}">
        <span>${escapeHtml(status)}</span>
        <span class="text-[10px] opacity-70">↻</span>
      </span>
    `;
  }

  function renderStrategyPillarCard(pillar) {
    const isNoteOpen = !!strategyState.pillarNotesOpen[pillar.id];
    const noteText = strategyState.pillarNotes[pillar.id] || '';
    const hasNoteContent = noteText.trim().length > 0;

    // Render structured blocks (Säulen 1–4)
    const blocksHtml = (pillar.blocks || [])
      .map(block => {
        const paragraphsHtml = (block.paragraphs || [])
          .map(p => `<p class="text-sm text-slate-700 leading-relaxed">${escapeHtml(p)}</p>`)
          .join('');

        const subHeadingHtml = block.subHeading
          ? `<div class="font-mono text-xs font-bold uppercase tracking-wider text-charcoal pt-2">${escapeHtml(block.subHeading)}</div>`
          : '';

        const numberedHtml = (block.numberedItems || [])
          .map(
            item => `
            <div class="p-4 border border-line bg-slate-50/70 flex items-start gap-4">
              <span class="font-mono text-xs font-extrabold px-2 py-1 bg-charcoal text-white shrink-0">
                ${escapeHtml(item.num)}
              </span>
              <div class="space-y-1">
                <h5 class="font-bold text-sm text-charcoal">${escapeHtml(item.title)}</h5>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${escapeHtml(item.text)}</p>
              </div>
            </div>
          `
          )
          .join('');

        return `
          <div class="space-y-3.5 pt-5 first:pt-0 border-t first:border-t-0 border-line">
            <h4 class="font-display text-base sm:text-lg font-bold text-charcoal">
              ${escapeHtml(block.heading)}
            </h4>
            ${paragraphsHtml}
            ${subHeadingHtml}
            ${
              numberedHtml
                ? `<div class="grid grid-cols-1 gap-3 pt-1">${numberedHtml}</div>`
                : ''
            }
          </div>
        `;
      })
      .join('');

    // Render Operating Principles grid (Säule 5)
    const principlesHtml = (pillar.principles || [])
      .map(
        pr => `
        <div class="p-5 border border-line bg-slate-50/60 flex flex-col justify-between space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-extrabold px-2 py-0.5 bg-charcoal text-white">
              PRINZIP ${escapeHtml(pr.num)}
            </span>
            <span class="font-mono text-[10px] text-slate-400 uppercase tracking-widest">DOCTRINE</span>
          </div>
          <h4 class="font-bold text-base text-charcoal pt-1">${escapeHtml(pr.title)}</h4>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${escapeHtml(pr.text)}</p>
        </div>
      `
      )
      .join('');

    return `
      <article id="${pillar.anchorId}" class="border border-line border-l-4 ${pillar.borderColor} bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <!-- Pillar Header -->
        <div class="border-b border-line pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono text-xs font-bold uppercase tracking-widest ${pillar.accentColor} block mb-1">
              ${escapeHtml(pillar.number)} // GRAND STRATEGY DOCTRINE
            </span>
            <h3 class="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
              ${escapeHtml(pillar.title)}
            </h3>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              ${escapeHtml(pillar.subtitle)}
            </p>
          </div>

          <button onclick="window.FOUNDER_ROADMAP_APP.toggleStrategyPillarNote('${pillar.id}')"
                  class="px-3.5 py-1.5 border border-line bg-slate-50 hover:bg-slate-100 font-mono text-xs text-charcoal transition-colors shrink-0 self-start md:self-auto">
            ${isNoteOpen ? 'Strategie-Notiz ausblenden ▲' : hasNoteContent ? 'Strategie-Notiz bearbeiten (vorhanden) ▼' : '+ Strategische Notiz / Update ▼'}
          </button>
        </div>

        <!-- Pillar Body -->
        ${blocksHtml ? `<div class="space-y-6">${blocksHtml}</div>` : ''}
        ${
          principlesHtml
            ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${principlesHtml}</div>`
            : ''
        }

        <!-- Expandable Pillar Note Field -->
        <div class="${isNoteOpen || hasNoteContent ? 'block' : 'hidden'} pt-4 border-t border-line">
          <div class="flex items-center justify-between mb-2">
            <label for="strat-note-${pillar.id}" class="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
              EIGENE STRATEGISCHE GEDANKEN &amp; UPDATES (${escapeHtml(pillar.number)})
            </label>
            <span id="strat-note-status-${pillar.id}" class="font-mono text-[11px] text-emerald-700">
              Lokal gespeichert ✓
            </span>
          </div>
          <textarea
            id="strat-note-${pillar.id}"
            rows="3"
            placeholder="Eigene strategische Gedanken, Verhandlungsnotizen, Schlüsselkontakte oder Dossier-Ergänzungen zu ${escapeHtml(pillar.shortNav)}..."
            oninput="window.FOUNDER_ROADMAP_APP.updateStrategyPillarNote('${pillar.id}', this.value)"
            class="w-full p-3.5 border border-line bg-slate-50 focus:bg-white focus:border-charcoal focus:outline-none font-mono text-xs text-charcoal leading-relaxed"
          >${escapeHtml(noteText)}</textarea>
        </div>
      </article>
    `;
  }

  function renderStrategySubTab() {
    const stratData = window.FOUNDER_STRATEGY_DATA;
    if (!stratData) return '';

    // Calculate Power Scorecard Overall & Dimension Progress
    let totalScorecardMilestones = 0;
    let checkedScorecardMilestones = 0;
    stratData.powerScorecardDimensions.forEach(dim => {
      dim.milestones.forEach(m => {
        totalScorecardMilestones++;
        if (strategyState.scorecardChecked[m.id]) checkedScorecardMilestones++;
      });
    });
    const overallScorecardPct =
      totalScorecardMilestones > 0
        ? Math.round((checkedScorecardMilestones / totalScorecardMilestones) * 100)
        : 0;

    // 1. Strategy Header KPIs
    const kpisHtml = stratData.executiveHeader.kpis
      .map(
        k => `
        <div class="p-5 bg-white border border-line border-t-4 ${k.accent} flex flex-col justify-between shadow-sm">
          <div>
            <span class="font-mono text-[10px] uppercase tracking-widest text-slate-500 block mb-1">
              ${escapeHtml(k.label)}
            </span>
            <div class="font-display font-extrabold text-base sm:text-lg text-charcoal leading-snug">
              ${escapeHtml(k.value)}
            </div>
          </div>
          <div class="mt-3 pt-2 border-t border-line font-mono text-[11px] text-slate-600">
            ${escapeHtml(k.subtext)}
          </div>
        </div>
      `
      )
      .join('');

    // 2. Pillars 1–5
    const pillarsHtml = stratData.pillars.map(renderStrategyPillarCard).join('');

    // 3. Modul A: ASML Chokepoint Matrix Rows
    const asmlRowsHtml = stratData.asmlChokepointMatrix
      .map(row => {
        const currentStatus = strategyState.asmlMatrixStatus[row.id] || row.defaultStatus || 'Konzept';
        return `
          <tr class="border-b border-line hover:bg-slate-50/80 transition-colors">
            <td class="p-4 font-bold text-charcoal text-xs sm:text-sm align-top whitespace-nowrap">
              ${escapeHtml(row.dimension)}
            </td>
            <td class="p-4 text-slate-600 text-xs sm:text-sm align-top leading-relaxed">
              ${escapeHtml(row.asmlModel)}
            </td>
            <td class="p-4 text-charcoal font-medium text-xs sm:text-sm align-top leading-relaxed">
              ${escapeHtml(row.ourTarget)}
            </td>
            <td class="p-4 text-slate-600 text-xs sm:text-sm align-top leading-relaxed">
              ${escapeHtml(row.moat)}
            </td>
            <td class="p-4 align-top text-right whitespace-nowrap">
              <button onclick="window.FOUNDER_ROADMAP_APP.cycleAsmlStatus('${row.id}')"
                      title="Klicken zum Weiterschalten: Konzept → Im Aufbau → Validiert → Dominant">
                ${renderAsmlStatusBadge(currentStatus)}
              </button>
            </td>
          </tr>
        `;
      })
      .join('');

    // 4. Modul B: Top-10-Schweiz Einfluss- & Macht-Scorecard
    const scorecardDimsHtml = stratData.powerScorecardDimensions
      .map(dim => {
        const totalDim = dim.milestones.length;
        const doneDim = dim.milestones.filter(m => strategyState.scorecardChecked[m.id]).length;
        const pctDim = totalDim > 0 ? Math.round((doneDim / totalDim) * 100) : 0;

        const milestonesHtml = dim.milestones
          .map(m => {
            const checked = !!strategyState.scorecardChecked[m.id];
            return `
              <label class="flex items-start gap-3.5 p-3.5 border transition-all cursor-pointer select-none ${
                checked
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-500'
                  : 'bg-white border-line hover:border-slate-400 text-charcoal'
              }">
                <input type="checkbox"
                       class="mt-1 w-4 h-4 accent-charcoal cursor-pointer shrink-0"
                       ${checked ? 'checked' : ''}
                       onchange="window.FOUNDER_ROADMAP_APP.toggleScorecardMilestone('${m.id}', this.checked)" />
                <div class="flex-1 text-xs sm:text-sm leading-relaxed">
                  <span class="${checked ? 'line-through text-slate-400' : 'text-charcoal font-medium'}">
                    ${escapeHtml(m.text)}
                  </span>
                </div>
                ${
                  checked
                    ? '<span class="font-mono text-[10px] text-emerald-700 font-bold uppercase shrink-0">Erreicht ✓</span>'
                    : ''
                }
              </label>
            `;
          })
          .join('');

        return `
          <div class="border border-line bg-slate-50/50 p-5 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span class="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  ${escapeHtml(dim.number)}
                </span>
                <h4 class="text-base sm:text-lg font-bold text-charcoal">
                  ${escapeHtml(dim.title)}
                </h4>
              </div>
              <div class="font-mono text-xs font-bold text-charcoal shrink-0">
                ${doneDim} / ${totalDim} Meilensteine (${pctDim}%)
              </div>
            </div>

            <div class="w-full h-2 bg-slate-200 overflow-hidden">
              <div class="h-full ${dim.accentColor} transition-all duration-300" style="width: ${pctDim}%"></div>
            </div>

            <div class="space-y-2">
              ${milestonesHtml}
            </div>
          </div>
        `;
      })
      .join('');

    // 5. Modul C: Strategisches Entscheidungs- & Netzwerk-Log
    const todayIso = new Date().toISOString().slice(0, 10);
    const logEntriesHtml =
      strategyState.decisionLog.length > 0
        ? strategyState.decisionLog
            .map(
              entry => `
            <div class="p-4 border border-line bg-slate-50/70 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div class="space-y-1.5">
                <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span class="px-2 py-0.5 bg-charcoal text-white font-bold">${escapeHtml(entry.date)}</span>
                  <span class="px-2 py-0.5 bg-white border border-line text-slate-700 font-semibold">${escapeHtml(entry.category)}</span>
                  <strong class="text-charcoal font-sans text-sm">${escapeHtml(entry.title)}</strong>
                </div>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">${escapeHtml(entry.details)}</p>
              </div>
              <button onclick="window.FOUNDER_ROADMAP_APP.deleteDecisionLogEntry('${entry.id}')"
                      class="px-2.5 py-1 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-mono text-[11px] shrink-0 self-start">
                Löschen ✕
              </button>
            </div>
          `
            )
            .join('')
        : `
          <div class="p-6 border border-dashed border-line text-center font-mono text-xs text-slate-500">
            Noch keine Einträge im Strategischen Entscheidungs- &amp; Netzwerk-Log protokolliert.
          </div>
        `;

    return `
      <div class="space-y-12">

        <!-- 3.1 STRATEGIE-EXECUTIVE-HEADER (NORDSTERN & 4 KPIS) -->
        <div class="space-y-6">
          <div class="bg-charcoal text-white p-7 sm:p-9 border border-charcoal shadow-sm space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
              <span class="font-mono text-xs uppercase tracking-widest text-mars-vermilion font-bold">
                ${escapeHtml(stratData.executiveHeader.classification)}
              </span>
              <span class="font-mono text-xs text-cyan-300 font-semibold">
                CH-SOVEREIGNTY // ASML-DOCTRINE
              </span>
            </div>
            <div>
              <span class="font-mono text-[11px] uppercase tracking-widest text-slate-400 block mb-1.5">
                ${escapeHtml(stratData.executiveHeader.northStarLabel)}
              </span>
              <p class="text-lg sm:text-2xl font-display font-bold text-white leading-snug">
                ${escapeHtml(stratData.executiveHeader.northStarStatement)}
              </p>
            </div>
          </div>

          <!-- 4 Strategie-KPI-Karten -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${kpisHtml}
          </div>
        </div>

        <!-- STICKY SCHNELLNAVIGATION (ANKER-PILLS) -->
        <div class="sticky top-16 z-30 bg-[#FBFBFA]/95 backdrop-blur-md py-3 px-4 border border-line shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span class="text-slate-400 mr-1 hidden sm:inline">DOSSIER-NAVIGATION:</span>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-vision')"
                    class="px-3 py-1.5 border border-line bg-white hover:border-charcoal text-charcoal font-semibold transition-colors">
              1. VISION
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-zweck')"
                    class="px-3 py-1.5 border border-line bg-white hover:border-charcoal text-charcoal font-semibold transition-colors">
              2. ZWECK
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-politik')"
                    class="px-3 py-1.5 border border-line bg-white hover:border-charcoal text-charcoal font-semibold transition-colors">
              3. POLITIK
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-dualuse')"
                    class="px-3 py-1.5 border border-line bg-white hover:border-charcoal text-charcoal font-semibold transition-colors">
              4. DUAL USE
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-philosophie')"
                    class="px-3 py-1.5 border border-line bg-white hover:border-charcoal text-charcoal font-semibold transition-colors">
              5. PHILOSOPHIE
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-asml')"
                    class="px-3 py-1.5 border border-methalox-cyan/40 bg-cyan-50/70 hover:bg-cyan-100 text-cyan-950 font-bold transition-colors">
              ASML-MATRIX
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-scorecard')"
                    class="px-3 py-1.5 border border-mars-vermilion/40 bg-orange-50/70 hover:bg-orange-100 text-mars-rust font-bold transition-colors">
              MACHT-SCORECARD (${overallScorecardPct}%)
            </button>
            <button onclick="window.FOUNDER_ROADMAP_APP.scrollToStrategySection('strat-sec-log')"
                    class="px-3 py-1.5 border border-line bg-white hover:border-charcoal text-slate-700 font-semibold transition-colors">
              GEOPOLITIK-LOG
            </button>
          </div>
        </div>

        <!-- 3.2 DIE 5 STRATEGIE-SÄULEN (VERTIKALES EXECUTIVE DOSSIER) -->
        <div class="space-y-8">
          ${pillarsHtml}
        </div>

        <!-- ================================================================= -->
        <!-- 3.3 INTERAKTIVE STRATEGIE-MODULE                                  -->
        <!-- ================================================================= -->

        <!-- MODUL A: ASML-CHOKEPOINT-VERGLEICHSMATRIX -->
        <section id="strat-sec-asml" class="border border-charcoal bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div class="border-b border-line pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="font-mono text-xs font-bold uppercase tracking-widest text-methalox-cyan block mb-1">
                INTERAKTIVES STEUERUNGS-MODUL A // MONOPOL-ARCHITEKTUR
              </span>
              <h3 class="text-2xl font-extrabold text-charcoal tracking-tight">
                ASML-Chokepoint-Vergleichsmatrix
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 mt-1">
                Systematischer Abgleich unserer Monopol-Architektur mit dem EUV-Lithografie-Monopol von ASML. Klicke auf den Status-Badge in der rechten Spalte, um den Reifegrad (<code class="font-mono bg-slate-100 px-1 py-0.5">Konzept</code> &rarr; <code class="font-mono bg-slate-100 px-1 py-0.5">Im Aufbau</code> &rarr; <code class="font-mono bg-slate-100 px-1 py-0.5">Validiert</code> &rarr; <code class="font-mono bg-slate-100 px-1 py-0.5">Dominant</code>) fortzuschreiben.
              </p>
            </div>
            <span class="font-mono text-[11px] text-slate-500 shrink-0">Klick auf Status schaltet weiter ↻</span>
          </div>

          <div class="overflow-x-auto border border-line">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-charcoal text-white font-mono text-xs uppercase tracking-wider">
                  <th class="p-4 border-r border-white/15">Monopol-Dimension</th>
                  <th class="p-4 border-r border-white/15">ASML-Vorbild (EUV-Lithografie)</th>
                  <th class="p-4 border-r border-white/15">Unser Zielbild (Autonome Prozesschemie &amp; ISRU)</th>
                  <th class="p-4 border-r border-white/15">Strategischer Schutzgraben</th>
                  <th class="p-4 text-right">Aktueller Status</th>
                </tr>
              </thead>
              <tbody>
                ${asmlRowsHtml}
              </tbody>
            </table>
          </div>
        </section>

        <!-- MODUL B: TOP-10-SCHWEIZ EINFLUSS- & MACHT-SCORECARD (2026–2045) -->
        <section id="strat-sec-scorecard" class="border border-charcoal bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div class="border-b border-line pb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span class="font-mono text-xs font-bold uppercase tracking-widest text-mars-vermilion block mb-1">
                INTERAKTIVES STEUERUNGS-MODUL B // REALPOLITISCHE SYSTEMRELEVANZ
              </span>
              <h3 class="text-2xl font-extrabold text-charcoal tracking-tight">
                Top-10-Schweiz Einfluss- &amp; Macht-Scorecard (2026–2045)
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 mt-1">
                Messbare Meilensteine über alle 5 Macht-Dimensionen auf dem Weg zur strukturellen Unersetzbarkeit in Industrie, Bundesbern, Kapitalallokation, Geopolitik und Wissenschaft.
              </p>
            </div>

            <div class="p-4 bg-slate-50 border border-line min-w-[240px]">
              <div class="flex items-center justify-between font-mono text-xs mb-1.5">
                <span class="text-slate-500">GESAMT-MACHT-INDEX</span>
                <span class="font-bold text-charcoal">${checkedScorecardMilestones} / ${totalScorecardMilestones} (${overallScorecardPct}%)</span>
              </div>
              <div class="w-full h-2.5 bg-slate-200 overflow-hidden">
                <div class="h-full bg-charcoal transition-all duration-300" style="width: ${overallScorecardPct}%"></div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            ${scorecardDimsHtml}
          </div>
        </section>

        <!-- MODUL C: STRATEGISCHES DOSSIER & GEOPOLITIK-LOG -->
        <section id="strat-sec-log" class="border border-charcoal bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div class="border-b border-line pb-5">
            <span class="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
              INTERAKTIVES STEUERUNGS-MODUL C // INTELLIGENCE &amp; NETWORK LOG
            </span>
            <h3 class="text-2xl font-extrabold text-charcoal tracking-tight">
              Strategisches Entscheidungs- &amp; Netzwerk-Log
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">
              Chronologisches Dossier für Schlüsselkontakte in Bundesbern, armasuisse, Swiss Space Office, ETH/UZH-Lehrstühle, Tier-1-Investoren sowie strategische Grundsatzentscheidungen.
            </p>
          </div>

          <!-- Formular für neuen Log-Eintrag -->
          <form onsubmit="window.FOUNDER_ROADMAP_APP.addDecisionLogEntry(event)" class="p-5 bg-slate-50 border border-line space-y-4">
            <div class="font-mono text-xs font-bold uppercase tracking-wider text-charcoal">
              + NEUEN DOSSIER- / NETZWERK-EINTRAG PROTOKOLLIEREN
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div class="sm:col-span-3">
                <label class="block font-mono text-[10px] uppercase text-slate-500 mb-1">Datum</label>
                <input id="strat-log-date" type="date" value="${todayIso}" required
                       class="w-full px-3 py-2 border border-line bg-white font-mono text-xs text-charcoal focus:border-charcoal focus:outline-none" />
              </div>
              <div class="sm:col-span-4">
                <label class="block font-mono text-[10px] uppercase text-slate-500 mb-1">Strategische Dimension</label>
                <select id="strat-log-category"
                        class="w-full px-3 py-2 border border-line bg-white font-mono text-xs text-charcoal focus:border-charcoal focus:outline-none">
                  <option value="Bundesbern & Politik">Bundesbern &amp; Politik (WBF/VBS/SiK)</option>
                  <option value="armasuisse & Militär">armasuisse (W+T) &amp; Schweizer Armee</option>
                  <option value="ETH/UZH & Wissenschaft">ETH / UZH &amp; Forschungsallianzen</option>
                  <option value="Investoren & Kapital">Investoren, Family Office &amp; Grants</option>
                  <option value="Geopolitik & Dual-Use">Geopolitik, SECO &amp; Dual-Use</option>
                  <option value="Strategischer Beschluss">Strategischer Grundsatzbeschluss</option>
                </select>
              </div>
              <div class="sm:col-span-5">
                <label class="block font-mono text-[10px] uppercase text-slate-500 mb-1">Kontaktperson / Institution / Betreff</label>
                <input id="strat-log-title" type="text" required placeholder="z.B. Treffen armasuisse W+T / Unitectra IP-Strategie..."
                       class="w-full px-3 py-2 border border-line bg-white font-mono text-xs text-charcoal focus:border-charcoal focus:outline-none" />
              </div>
            </div>
            <div>
              <label class="block font-mono text-[10px] uppercase text-slate-500 mb-1">Erkenntnisse, Vereinbarungen &amp; Nächste Schritte</label>
              <textarea id="strat-log-details" rows="2" required placeholder="Details, strategische Implikationen oder vereinbarte Follow-ups..."
                        class="w-full p-3 border border-line bg-white font-mono text-xs text-charcoal focus:border-charcoal focus:outline-none"></textarea>
            </div>
            <div class="flex justify-end">
              <button type="submit"
                      class="px-5 py-2.5 bg-charcoal hover:bg-slate-800 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors">
                Eintrag dauerhaft speichern →
              </button>
            </div>
          </form>

          <!-- Liste der protokollierten Einträge -->
          <div class="space-y-3">
            ${logEntriesHtml}
          </div>
        </section>

      </div>
    `;
  }

  /**
   * Rendert das gesamte entsperrte Founder Command Center in #roadmap-protected-mount
   * inklusive Global Header, Sub-Navigation (OPERATIONEN | STRATEGIE) und aktivem Sub-Tab.
   */
  function renderProtectedRoadmap() {
    const mount = document.getElementById('roadmap-protected-mount');
    const loginGate = document.getElementById('roadmap-login-gate');
    if (!mount) return;

    const isAuthed = window.FOUNDER_AUTH && window.FOUNDER_AUTH.isFounderAuthenticated();
    updateNavigationLockIcons(isAuthed);

    if (!isAuthed) {
      // Im unauthentifizierten Zustand DARF WEDER OPERATIONEN NOCH STRATEGIE im DOM sein
      mount.innerHTML = '';
      mount.classList.add('hidden');
      if (loginGate) loginGate.classList.remove('hidden');
      return;
    }

    if (loginGate) loginGate.classList.add('hidden');
    mount.classList.remove('hidden');

    const kpi = calculateKPIs();
    const stratData = window.FOUNDER_STRATEGY_DATA;
    let totalSc = 0;
    let doneSc = 0;
    if (stratData && stratData.powerScorecardDimensions) {
      stratData.powerScorecardDimensions.forEach(d =>
        d.milestones.forEach(m => {
          totalSc++;
          if (strategyState.scorecardChecked[m.id]) doneSc++;
        })
      );
    }

    const activeContentHtml =
      activeSubTab === 'strategie' ? renderStrategySubTab() : renderOperationsSubTab();

    mount.innerHTML = `
      <div class="space-y-10">

        <!-- ================================================================= -->
        <!-- GLOBAL FOUNDER COMMAND CENTER HEADER & SUB-NAVIGATION             -->
        <!-- ================================================================= -->
        <div class="border-b-2 border-charcoal pb-6 space-y-6">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                FOUNDER COMMAND CENTER · DAUERHAFT ENTSPERRT (AUTO-SAVE AKTIV)
              </div>
              <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-charcoal">
                Methalox Systems — Founder OS
              </h1>
              <p class="text-sm sm:text-base text-slate-600 mt-1.5 max-w-3xl">
                Integriertes Steuerungszentrum für operative Exekution (2025–2040+) und langfristige Grand Strategy (ASML-Chokepoint-Doktrin &amp; Schweizer Souveränität).
              </p>
            </div>

            <!-- Globale Aktionen: Cloud-Sync, Backup v2 Export/Import & Sperren -->
            <div class="flex flex-wrap items-center gap-2.5 font-mono text-xs shrink-0">
              <button onclick="window.FOUNDER_ROADMAP_APP.manualCloudSync()"
                      id="cloud-sync-btn"
                      class="px-3.5 py-2 border border-methalox-cyan bg-cyan-50/70 hover:bg-cyan-100 text-cyan-950 font-semibold transition-colors flex items-center gap-1.5"
                      title="Synchronisiert alle Häkchen, Notizen, Matrix-Status und Log-Einträge direkt mit GitHub über alle Geräte">
                <span id="cloud-sync-status-label">☁️ Cloud-Sync (Alle Geräte) ✓</span>
              </button>
              <button onclick="window.FOUNDER_ROADMAP_APP.exportBackupJson()"
                      class="px-3.5 py-2 border border-charcoal bg-white hover:bg-slate-100 text-charcoal font-semibold transition-colors">
                Backup exportieren (JSON)
              </button>
              <button onclick="document.getElementById('roadmap-import-input').click()"
                      class="px-3.5 py-2 border border-charcoal bg-white hover:bg-slate-100 text-charcoal font-semibold transition-colors">
                Backup importieren (JSON)
              </button>
              <input id="roadmap-import-input" type="file" accept=".json,application/json" class="hidden"
                     onchange="window.FOUNDER_ROADMAP_APP.importBackupJson(event)" />
              <button onclick="window.FOUNDER_ROADMAP_APP.handleLockRoadmap()"
                      class="px-3.5 py-2 border border-red-300 bg-red-50 hover:bg-red-100 text-red-800 font-semibold transition-colors"
                      title="Löscht das permanente Login-Token auf diesem Gerät">
                🔒 Sperren / Abmelden
              </button>
            </div>
          </div>

          <!-- PROMINENTE SUB-NAVIGATION (SEGMENTED CONTROL: OPERATIONEN | STRATEGIE) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-200/80 border border-line">
            <button onclick="window.FOUNDER_ROADMAP_APP.setActiveSubTab('operationen')"
                    class="p-4 text-left transition-all flex items-center justify-between ${
                      activeSubTab === 'operationen'
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'bg-white/70 text-charcoal hover:bg-white'
                    }">
              <div>
                <div class="font-mono text-[10px] uppercase tracking-widest ${
                  activeSubTab === 'operationen' ? 'text-cyan-300' : 'text-slate-500'
                }">
                  SUB-TAB 01 // EXECUTION &amp; ROADMAP
                </div>
                <div class="font-display font-extrabold text-lg tracking-tight mt-0.5">
                  OPERATIONEN (2025–2040+)
                </div>
              </div>
              <span class="font-mono text-xs px-2.5 py-1 border ${
                activeSubTab === 'operationen'
                  ? 'border-white/20 bg-white/10 text-white'
                  : 'border-line bg-slate-100 text-slate-700'
              }">
                ${kpi.checkedCount}/${kpi.totalItems} (${kpi.overallPercent}%)
              </span>
            </button>

            <button onclick="window.FOUNDER_ROADMAP_APP.setActiveSubTab('strategie')"
                    class="p-4 text-left transition-all flex items-center justify-between ${
                      activeSubTab === 'strategie'
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'bg-white/70 text-charcoal hover:bg-white'
                    }">
              <div>
                <div class="font-mono text-[10px] uppercase tracking-widest ${
                  activeSubTab === 'strategie' ? 'text-mars-vermilion' : 'text-slate-500'
                }">
                  SUB-TAB 02 // GRAND STRATEGY &amp; GEOPOLITICS
                </div>
                <div class="font-display font-extrabold text-lg tracking-tight mt-0.5">
                  STRATEGIE (ASML-DOKTRIN &amp; MACHT)
                </div>
              </div>
              <span class="font-mono text-xs px-2.5 py-1 border ${
                activeSubTab === 'strategie'
                  ? 'border-white/20 bg-white/10 text-white'
                  : 'border-line bg-slate-100 text-slate-700'
              }">
                Scorecard ${doneSc}/${totalSc}
              </span>
            </button>
          </div>
        </div>

        <!-- ACTIVE SUB-TAB CONTENT -->
        <div>
          ${activeContentHtml}
        </div>

      </div>
    `;
  }

  /**
   * ===========================================================================
   * INTERAKTIVE HANDLER FÜR OPERATIONEN & STRATEGIE
   * ===========================================================================
   */
  function toggleCheckItem(itemId, isChecked) {
    userState.checkedItems[itemId] = !!isChecked;
    saveRoadmapState();
    const scrollY = window.scrollY;
    renderProtectedRoadmap();
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  function updatePhaseNote(phaseId, text) {
    userState.phaseNotes[phaseId] = text;
    saveRoadmapState();
    const indicator = document.getElementById('note-status-' + phaseId);
    if (indicator) {
      const nowStr = new Date().toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      indicator.textContent = 'Gespeichert (' + nowStr + ') ✓';
    }
  }

  function setViewMode(mode) {
    currentViewMode = mode;
    renderProtectedRoadmap();
  }

  function setTrackFilter(track) {
    currentTrackFilter = track;
    renderProtectedRoadmap();
  }

  function setSearchQuery(query) {
    currentSearchQuery = query;
    renderProtectedRoadmap();
    const input = document.getElementById('roadmap-search-input');
    if (input) {
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }

  function resetFilters() {
    currentTrackFilter = 'all';
    currentSearchQuery = '';
    renderProtectedRoadmap();
  }

  function toggleCollapsePhase(phaseId) {
    collapsedPhases[phaseId] = !collapsedPhases[phaseId];
    renderProtectedRoadmap();
  }

  function expandAllPhases(expand) {
    const data = window.FOUNDER_ROADMAP_DATA;
    if (!data) return;
    data.phases.forEach(p => {
      collapsedPhases[p.id] = !expand;
    });
    renderProtectedRoadmap();
  }

  function jumpToPhase(phaseId) {
    activeSubTab = 'operationen';
    try {
      localStorage.setItem(SUBTAB_STORAGE_KEY, activeSubTab);
    } catch (e) {}

    if (currentViewMode === 'timeline') {
      currentViewMode = 'both';
    }
    collapsedPhases[phaseId] = false;
    if (currentTrackFilter !== 'all') {
      currentTrackFilter = 'all';
    }
    renderProtectedRoadmap();

    setTimeout(() => {
      const el = document.getElementById('deepdive-' + phaseId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('ring-4', 'ring-methalox-cyan');
        setTimeout(() => el.classList.remove('ring-4', 'ring-methalox-cyan'), 1800);
      }
    }, 60);
  }

  /**
   * Strategie-Handler: Anker-Sprung, ASML-Status-Zyklus, Macht-Scorecard, Notizen & Log
   */
  function scrollToStrategySection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('ring-2', 'ring-charcoal');
      setTimeout(() => el.classList.remove('ring-2', 'ring-charcoal'), 1400);
    }
  }

  function cycleAsmlStatus(dimId) {
    const stratData = window.FOUNDER_STRATEGY_DATA;
    const cycle = (stratData && stratData.asmlMatrixStatusCycle) || [
      'Konzept',
      'Im Aufbau',
      'Validiert',
      'Dominant'
    ];
    const current = strategyState.asmlMatrixStatus[dimId] || 'Konzept';
    const idx = cycle.indexOf(current);
    const next = cycle[(idx + 1) % cycle.length];
    strategyState.asmlMatrixStatus[dimId] = next;
    saveStrategyState();
    const scrollY = window.scrollY;
    renderProtectedRoadmap();
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  function toggleScorecardMilestone(milestoneId, isChecked) {
    strategyState.scorecardChecked[milestoneId] = !!isChecked;
    saveStrategyState();
    const scrollY = window.scrollY;
    renderProtectedRoadmap();
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  function toggleStrategyPillarNote(pillarId) {
    strategyState.pillarNotesOpen[pillarId] = !strategyState.pillarNotesOpen[pillarId];
    saveStrategyState();
    const scrollY = window.scrollY;
    renderProtectedRoadmap();
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  function updateStrategyPillarNote(pillarId, text) {
    strategyState.pillarNotes[pillarId] = text;
    saveStrategyState();
    const indicator = document.getElementById('strat-note-status-' + pillarId);
    if (indicator) {
      const nowStr = new Date().toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      indicator.textContent = 'Gespeichert (' + nowStr + ') ✓';
    }
  }

  function addDecisionLogEntry(event) {
    if (event) event.preventDefault();
    const dateEl = document.getElementById('strat-log-date');
    const catEl = document.getElementById('strat-log-category');
    const titleEl = document.getElementById('strat-log-title');
    const detailsEl = document.getElementById('strat-log-details');
    if (!titleEl || !detailsEl || !titleEl.value.trim()) return;

    const newEntry = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      date: dateEl && dateEl.value ? dateEl.value : new Date().toISOString().slice(0, 10),
      category: catEl && catEl.value ? catEl.value : 'Strategischer Beschluss',
      title: titleEl.value.trim(),
      details: detailsEl.value.trim()
    };

    strategyState.decisionLog.unshift(newEntry);
    saveStrategyState();
    const scrollY = window.scrollY;
    renderProtectedRoadmap();
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  function deleteDecisionLogEntry(entryId) {
    strategyState.decisionLog = strategyState.decisionLog.filter(e => e.id !== entryId);
    saveStrategyState();
    const scrollY = window.scrollY;
    renderProtectedRoadmap();
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  /**
   * ===========================================================================
   * PERSISTENZ & BACKUP (SCHEMA V2 MIT ABWÄRTSKOMPATIBILITÄT ZU V1)
   * ===========================================================================
   */
  function exportBackupJson() {
    const payload = {
      app: 'Methalox Systems AG — Founder Command Center (Operationen & Strategie)',
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      activeSubTab: activeSubTab,
      operations: {
        checkedItems: userState.checkedItems,
        phaseNotes: userState.phaseNotes,
        lastUpdated: userState.lastUpdated
      },
      strategy: {
        asmlMatrixStatus: strategyState.asmlMatrixStatus,
        scorecardChecked: strategyState.scorecardChecked,
        pillarNotes: strategyState.pillarNotes,
        pillarNotesOpen: strategyState.pillarNotesOpen,
        decisionLog: strategyState.decisionLog,
        lastUpdated: strategyState.lastUpdated
      },
      // Abwärtskompatible Root-Felder für v1-Tools
      checkedItems: userState.checkedItems,
      phaseNotes: userState.phaseNotes
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const datePart = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `methalox-founder-command-backup-v2-${datePart}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Importiert sowohl alte v1-Backups (nur Operationen) als auch neue v2-Backups
   * (Operationen + Strategie), ohne nicht im Import enthaltene Daten zu überschreiben.
   */
  function importBackupJson(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Ungültiges JSON-Objekt');
        }

        // 1. Operationen importieren (unterstützt v2 parsed.operations UND v1 Root-Felder)
        const opsSource =
          parsed.operations && typeof parsed.operations === 'object' ? parsed.operations : parsed;

        if (opsSource.checkedItems && typeof opsSource.checkedItems === 'object') {
          userState.checkedItems = Object.assign({}, userState.checkedItems, opsSource.checkedItems);
        }
        if (opsSource.phaseNotes && typeof opsSource.phaseNotes === 'object') {
          userState.phaseNotes = Object.assign({}, userState.phaseNotes, opsSource.phaseNotes);
        }
        saveRoadmapState();

        // 2. Strategie importieren (nur falls im Backup vorhanden — v1 Backups überschreiben Strategie NICHT)
        if (parsed.strategy && typeof parsed.strategy === 'object') {
          const stratSource = parsed.strategy;
          if (stratSource.asmlMatrixStatus && typeof stratSource.asmlMatrixStatus === 'object') {
            strategyState.asmlMatrixStatus = Object.assign(
              {},
              strategyState.asmlMatrixStatus,
              stratSource.asmlMatrixStatus
            );
          }
          if (stratSource.scorecardChecked && typeof stratSource.scorecardChecked === 'object') {
            strategyState.scorecardChecked = Object.assign(
              {},
              strategyState.scorecardChecked,
              stratSource.scorecardChecked
            );
          }
          if (stratSource.pillarNotes && typeof stratSource.pillarNotes === 'object') {
            strategyState.pillarNotes = Object.assign(
              {},
              strategyState.pillarNotes,
              stratSource.pillarNotes
            );
          }
          if (stratSource.pillarNotesOpen && typeof stratSource.pillarNotesOpen === 'object') {
            strategyState.pillarNotesOpen = Object.assign(
              {},
              strategyState.pillarNotesOpen,
              stratSource.pillarNotesOpen
            );
          }
          if (Array.isArray(stratSource.decisionLog)) {
            strategyState.decisionLog = stratSource.decisionLog;
          }
          saveStrategyState();
        }

        if (parsed.activeSubTab === 'operationen' || parsed.activeSubTab === 'strategie') {
          activeSubTab = parsed.activeSubTab;
          try {
            localStorage.setItem(SUBTAB_STORAGE_KEY, activeSubTab);
          } catch (err) {}
        }

        renderProtectedRoadmap();
        alert('Backup erfolgreich importiert (Operationen & Strategie aktualisiert).');
      } catch (err) {
        alert('Fehler beim Importieren der JSON-Datei. Bitte gültige Backup-Datei wählen.');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  }

  /**
   * ===========================================================================
   * GITHUB CLOUD-SYNC ENGINE (GERÄTEÜBERGREIFENDE BEARBEITUNG AUF PC/LAPTOP/MOBIL)
   * ===========================================================================
   */
  let cloudPushTimer = null;
  let lastKnownCloudSha = null;

  function setCloudSyncIndicator(text) {
    const el = document.getElementById('cloud-sync-status-label');
    if (el) el.textContent = text;
  }

  function applyCloudPayload(parsed) {
    if (!parsed || typeof parsed !== 'object') return false;
    let changed = false;

    const localOpsTime = userState.lastUpdated ? new Date(userState.lastUpdated).getTime() : 0;
    const remoteOpsTime =
      parsed.operations && parsed.operations.lastUpdated
        ? new Date(parsed.operations.lastUpdated).getTime()
        : 0;

    if (parsed.operations && remoteOpsTime > localOpsTime) {
      if (parsed.operations.checkedItems) {
        userState.checkedItems = Object.assign({}, userState.checkedItems, parsed.operations.checkedItems);
      }
      if (parsed.operations.phaseNotes) {
        userState.phaseNotes = Object.assign({}, userState.phaseNotes, parsed.operations.phaseNotes);
      }
      userState.lastUpdated = parsed.operations.lastUpdated;
      try {
        localStorage.setItem(OPS_STORAGE_KEY, JSON.stringify(userState));
      } catch (e) {}
      changed = true;
    }

    const localStratTime = strategyState.lastUpdated ? new Date(strategyState.lastUpdated).getTime() : 0;
    const remoteStratTime =
      parsed.strategy && parsed.strategy.lastUpdated
        ? new Date(parsed.strategy.lastUpdated).getTime()
        : 0;

    if (parsed.strategy && remoteStratTime > localStratTime) {
      if (parsed.strategy.asmlMatrixStatus) {
        strategyState.asmlMatrixStatus = Object.assign(
          {},
          strategyState.asmlMatrixStatus,
          parsed.strategy.asmlMatrixStatus
        );
      }
      if (parsed.strategy.scorecardChecked) {
        strategyState.scorecardChecked = Object.assign(
          {},
          strategyState.scorecardChecked,
          parsed.strategy.scorecardChecked
        );
      }
      if (parsed.strategy.pillarNotes) {
        strategyState.pillarNotes = Object.assign({}, strategyState.pillarNotes, parsed.strategy.pillarNotes);
      }
      if (parsed.strategy.pillarNotesOpen) {
        strategyState.pillarNotesOpen = Object.assign(
          {},
          strategyState.pillarNotesOpen,
          parsed.strategy.pillarNotesOpen
        );
      }
      if (Array.isArray(parsed.strategy.decisionLog)) {
        strategyState.decisionLog = parsed.strategy.decisionLog;
      }
      strategyState.lastUpdated = parsed.strategy.lastUpdated;
      try {
        localStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(strategyState));
      } catch (e) {}
      changed = true;
    }

    return changed;
  }

  async function pullCloudStateFromGitHub() {
    if (!window.FOUNDER_AUTH || !window.FOUNDER_AUTH.isFounderAuthenticated()) return;
    const cfg = window.FOUNDER_AUTH.CONFIG.CLOUD_SYNC;
    if (!cfg) return;

    try {
      setCloudSyncIndicator('☁️ Prüfe Cloud-Stand...');
      const token = await window.FOUNDER_AUTH.getCloudSyncToken();
      const apiUrl = `https://api.github.com/repos/${cfg.REPO_OWNER}/${cfg.REPO_NAME}/contents/${cfg.FILE_PATH}?ref=${cfg.BRANCH}&t=${Date.now()}`;
      const headers = { Accept: 'application/vnd.github.v3+json' };
      if (token) headers.Authorization = 'token ' + token;

      const resp = await fetch(apiUrl, { headers, cache: 'no-store' });
      if (resp.ok) {
        const meta = await resp.json();
        lastKnownCloudSha = meta.sha;
        const rawJson = decodeURIComponent(escape(atob(meta.content.replace(/\s/g, ''))));
        const parsed = JSON.parse(rawJson);
        if (applyCloudPayload(parsed)) {
          renderProtectedRoadmap();
        }
        setCloudSyncIndicator('☁️ Cloud-Sync (Alle Geräte) ✓');
      } else {
        setCloudSyncIndicator('☁️ Lokal gespeichert ✓');
      }
    } catch (e) {
      setCloudSyncIndicator('☁️ Lokal gespeichert ✓');
    }
  }

  async function pushCloudStateToGitHub() {
    if (!window.FOUNDER_AUTH || !window.FOUNDER_AUTH.isFounderAuthenticated()) return;
    const cfg = window.FOUNDER_AUTH.CONFIG.CLOUD_SYNC;
    if (!cfg) return;

    try {
      const token = await window.FOUNDER_AUTH.getCloudSyncToken();
      if (!token) return;

      setCloudSyncIndicator('☁️ Speichere in GitHub Cloud...');
      const apiUrl = `https://api.github.com/repos/${cfg.REPO_OWNER}/${cfg.REPO_NAME}/contents/${cfg.FILE_PATH}`;

      // Aktuelle Datei-SHA abrufen, falls noch nicht bekannt
      if (!lastKnownCloudSha) {
        const getResp = await fetch(`${apiUrl}?ref=${cfg.BRANCH}&t=${Date.now()}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: 'token ' + token
          },
          cache: 'no-store'
        });
        if (getResp.ok) {
          const meta = await getResp.json();
          lastKnownCloudSha = meta.sha;
        }
      }

      const payload = {
        app: 'Methalox Systems AG — Founder Command Center (Cloud-Sync)',
        schemaVersion: 2,
        updatedAt: new Date().toISOString(),
        activeSubTab: activeSubTab,
        operations: {
          checkedItems: userState.checkedItems,
          phaseNotes: userState.phaseNotes,
          lastUpdated: userState.lastUpdated || new Date().toISOString()
        },
        strategy: {
          asmlMatrixStatus: strategyState.asmlMatrixStatus,
          scorecardChecked: strategyState.scorecardChecked,
          pillarNotes: strategyState.pillarNotes,
          pillarNotesOpen: strategyState.pillarNotesOpen,
          decisionLog: strategyState.decisionLog,
          lastUpdated: strategyState.lastUpdated || new Date().toISOString()
        }
      };

      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload, null, 2))));
      const bodyObj = {
        message: 'Founder OS Cloud-Sync Update ' + new Date().toISOString().slice(0, 19).replace('T', ' '),
        content: contentBase64,
        branch: cfg.BRANCH
      };
      if (lastKnownCloudSha) {
        bodyObj.sha = lastKnownCloudSha;
      }

      const putResp = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });

      if (putResp.ok) {
        const resData = await putResp.json();
        if (resData && resData.content && resData.content.sha) {
          lastKnownCloudSha = resData.content.sha;
        }
        setCloudSyncIndicator('☁️ Cloud-Sync (Alle Geräte) ✓');
      } else {
        lastKnownCloudSha = null;
        setCloudSyncIndicator('☁️ Lokal gespeichert ✓');
      }
    } catch (e) {
      setCloudSyncIndicator('☁️ Lokal gespeichert ✓');
    }
  }

  function scheduleCloudPush() {
    if (cloudPushTimer) clearTimeout(cloudPushTimer);
    setCloudSyncIndicator('☁️ Sync ausstehend...');
    cloudPushTimer = setTimeout(() => {
      pushCloudStateToGitHub();
    }, 900);
  }

  async function manualCloudSync() {
    await pullCloudStateFromGitHub();
    await pushCloudStateToGitHub();
  }

  /**
   * Login-Formular Handler
   */
  async function handleLoginSubmit(event) {
    if (event) event.preventDefault();
    const inputEl = document.getElementById('founder-password-input');
    const errEl = document.getElementById('founder-login-error');
    if (!inputEl) return;

    const pwd = inputEl.value;
    const ok = await window.FOUNDER_AUTH.verifyAndUnlockFounderRoadmap(pwd);
    if (ok) {
      inputEl.value = '';
      if (errEl) errEl.classList.add('hidden');
      renderProtectedRoadmap();
      pullCloudStateFromGitHub();
    } else {
      if (errEl) {
        errEl.classList.remove('hidden');
        errEl.textContent = 'Zugriff verweigert: Das eingegebene Passwort stimmt nicht mit dem hinterlegten SHA-256-Hash überein.';
      }
    }
  }

  /**
   * Manueller Logout / Sperren
   */
  function handleLockRoadmap() {
    window.FOUNDER_AUTH.lockFounderRoadmap();
    renderProtectedRoadmap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Initialisierung beim Seitenstart
   */
  function initFounderRoadmap() {
    loadActiveSubTab();
    loadRoadmapState();
    loadStrategyState();
    const isAuthed = window.FOUNDER_AUTH && window.FOUNDER_AUTH.isFounderAuthenticated();
    updateNavigationLockIcons(isAuthed);
    if (isAuthed) {
      renderProtectedRoadmap();
      pullCloudStateFromGitHub();
    }
  }

  window.FOUNDER_ROADMAP_APP = {
    initFounderRoadmap,
    renderProtectedRoadmap,
    setActiveSubTab,
    handleLoginSubmit,
    handleLockRoadmap,
    toggleCheckItem,
    updatePhaseNote,
    setViewMode,
    setTrackFilter,
    setSearchQuery,
    resetFilters,
    toggleCollapsePhase,
    expandAllPhases,
    jumpToPhase,
    scrollToStrategySection,
    cycleAsmlStatus,
    toggleScorecardMilestone,
    toggleStrategyPillarNote,
    updateStrategyPillarNote,
    addDecisionLogEntry,
    deleteDecisionLogEntry,
    exportBackupJson,
    importBackupJson,
    manualCloudSync
  };

  window.addEventListener('DOMContentLoaded', initFounderRoadmap);
})();

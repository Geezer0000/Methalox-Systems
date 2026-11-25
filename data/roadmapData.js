/**
 * ============================================================================
 * METHALOX SYSTEMS AG — FOUNDER MASTER OPERATING SYSTEM (2025–2040+)
 * Vollständige, ungekürzte Datenstruktur (Teil I: 2025–2031 & Teil II: 2031–2040+)
 * ============================================================================
 */

const FOUNDER_ROADMAP_DATA = {
  meta: {
    title: 'Founder Master Operating System (2025–2040+)',
    currentPhaseId: 'phase-1',
    currentPhaseLabel: 'HS26 · 3. Semester BSc Wirtschaftschemie',
    currentSemesterCode: 'HS26',
    ectsCompletedBase: 63,
    ectsTotalBachelor: 194, // 63 (Grundstudium) + 32 (HS26) + 99 (FS28-FS29 inkl. Minor-Start)
    ectsTotalMaster: 106,   // 18 (HS29) + 23 (FS30) + 55 (HS30) + 10 (FS31)
    ectsTotalTarget: 300,   // Gesamtziel BSc + MSc Wirtschaftschemie inkl. Minor Data Science & Lab Automation
    currentTrl: 'TRL 1–2 (Akademisches & Thermodynamisches Fundament)',
    targetTrl: 'TRL 9 (Flight Proven Mars ISRU System)',
    cumulativeFundingTrajectory: [
      { phase: 'Phase 1–4 (2025–2031)', label: 'Bootstrapping & Grants', amount: 'War-Chest + CHF 140k Grants', headcount: '1 → 2–3 Co-Founder' },
      { phase: 'Phase 5 (2031–2032)', label: 'Pre-Seed & Non-Dilutive', amount: 'CHF 0,5 – 1,2 Mio.', headcount: '2 → 4 FTE' },
      { phase: 'Phase 6 (2033–2034)', label: 'Seed-Runde + EIC/ESA', amount: 'CHF 3 – 6 Mio.', headcount: '4 → 12–15 FTE' },
      { phase: 'Phase 7 (2035–2036)', label: 'Series A + Space Co-Funding', amount: 'CHF 15 – 30 Mio.', headcount: '15 → 40–50 FTE' },
      { phase: 'Phase 8 (2037–2039)', label: 'Series B + Projektfinanzierung', amount: 'CHF 50 – 100+ Mio.', headcount: '50 → 120–150 FTE' },
      { phase: 'Phase 9 (Ab 2039+)', label: 'Series C+ / Commercial Scale / IPO', amount: 'Backlog >CHF 100 Mio.', headcount: '150 → 300+ FTE' }
    ]
  },

  /**
   * ANSICHT A — TEIL 1: HALBJAHRES-GRID (2025–2031: FRÜHLING FS / HERBST HS)
   */
  academicTimelineGrid: [
    {
      year: 2025,
      isCurrentYear: false,
      spring: {
        id: 'slot-2025-fs',
        code: '',
        category: 'empty',
        title: 'Vor Studienbeginn',
        subtitle: '',
        details: '',
        ectsText: '',
        status: 'empty',
        targetPhaseId: 'phase-0'
      },
      autumn: {
        id: 'slot-2025-hs',
        code: 'HS25',
        category: 'bachelor',
        icon: 'grad',
        title: 'Bachelor · Semester 1',
        subtitle: 'Grundstudium: Chemie, Mathematik, Physik, Genetik, BWL',
        details: 'Erfolgreicher Start an der UZH (Campus Irchel / Zentrum), 32 ECTS abgeschlossen.',
        ectsText: '32 ECTS bestanden',
        ectsValue: 32,
        status: 'completed',
        targetPhaseId: 'phase-0'
      }
    },
    {
      year: 2026,
      isCurrentYear: true,
      spring: {
        id: 'slot-2026-fs',
        code: 'FS26',
        category: 'bachelor',
        icon: 'grad',
        title: 'Bachelor · Semester 2',
        subtitle: 'Grundstudium: Chemie, Analysis, Physik II, BWL II',
        details: 'Assessment-/Grundstudiums-Basis gelegt (63 ECTS kumuliert), Qualifikation für akademische Exzellenz (u.a. Alfred Werner Legat Leistungsniveau).',
        ectsText: '31 ECTS bestanden',
        ectsValue: 31,
        status: 'completed',
        targetPhaseId: 'phase-0'
      },
      autumn: {
        id: 'slot-2026-hs',
        code: 'HS26',
        category: 'bachelor',
        icon: 'grad',
        title: 'Bachelor · Semester 3',
        subtitle: 'Anorganische, organische und physikalische Chemie I, Spektroskopie & analytische Methoden',
        details: 'Abschluss 3. Semester Wirtschaftschemie & Vorbereitung Militärpause (Januar 2027).',
        ectsText: '32 ECTS offen',
        ectsValue: 32,
        status: 'now',
        targetPhaseId: 'phase-1'
      }
    },
    {
      year: 2027,
      isCurrentYear: false,
      spring: {
        id: 'slot-2027-fs',
        code: 'FS27',
        category: 'military',
        icon: 'flag',
        title: 'Militär · Offiziersausbildung',
        subtitle: 'Schweizer Armee, Offiziersschule (UOS / OS zum Leutnant)',
        details: 'Kaderschulen, Brevetierung zum Leutnant (Lt), Führungsausbildung & Startkapital-Aufbau.',
        ectsText: 'Urlaubssemester UZH',
        ectsValue: 0,
        status: 'planned',
        targetPhaseId: 'phase-2'
      },
      autumn: {
        id: 'slot-2027-hs',
        code: 'HS27',
        category: 'military',
        icon: 'flag',
        title: 'Militär · Offiziersausbildung',
        subtitle: 'Praktischer Dienst (Abverdienen als Leutnant / Zugführer)',
        details: 'Zugsführung unter realem Zeit-/Ressourcenmangel, Aufbau Founder-War-Chest & Säule 3a, Rückkehrplanung FS28.',
        ectsText: 'Praktischer Dienst (Lt)',
        ectsValue: 0,
        status: 'planned',
        targetPhaseId: 'phase-2'
      }
    },
    {
      year: 2028,
      isCurrentYear: false,
      spring: {
        id: 'slot-2028-fs',
        code: 'FS28',
        category: 'bachelor',
        icon: 'grad',
        title: 'Bachelor · Semester 4',
        subtitle: 'Rückkehr an die UZH: Chemie II Module, Synthesepraktikum, Mikroökonomie & Pflichtmodule',
        details: 'Re-Integration in den akademischen Rhythmus, Kontakte zu Forschungsgruppen (Katalyse, Elektrochemie, Lab Automation).',
        ectsText: '30 ECTS offen',
        ectsValue: 30,
        status: 'planned',
        targetPhaseId: 'phase-3'
      },
      autumn: {
        id: 'slot-2028-hs',
        code: 'HS28',
        category: 'bachelor',
        icon: 'grad',
        title: 'Bachelor · Semester 5',
        subtitle: 'Fachstudium: PC-Praktikum, Biochemie I, BWL III, Wahlpflicht Chemie; Start Minor Data Science & Lab Automation',
        details: 'Python, Machine Learning für chemische Prozesse; Themen-/Betreuersuche Bachelorarbeit (Sabatier/PEM) & Bewerbung Asien-Austausch HS29.',
        ectsText: '32 ECTS offen',
        ectsValue: 32,
        status: 'planned',
        targetPhaseId: 'phase-3'
      }
    },
    {
      year: 2029,
      isCurrentYear: false,
      spring: {
        id: 'slot-2029-fs',
        code: 'FS29',
        category: 'bachelor',
        icon: 'grad',
        title: 'Bachelor · Semester 6',
        subtitle: 'Bachelorarbeit, Wahlpflicht Chemie und WWF, Wahlbereich; Minor Data Science & Lab Automation',
        details: 'Bachelorarbeit mit direktem ISRU-Mehrwert (Katalysator-Deaktivierung, Reaktionskinetik, KI-Regelung); Abschluss BSc Wirtschaftschemie.',
        ectsText: '37 ECTS offen',
        ectsValue: 37,
        status: 'planned',
        targetPhaseId: 'phase-3'
      },
      autumn: {
        id: 'slot-2029-hs',
        code: 'HS29',
        category: 'exchange',
        icon: 'plane',
        title: 'Master · Semester 1 · Austausch',
        subtitle: 'Austauschsemester in Asien (Singapur: NUS/NTU oder Peking: Tsinghua/PKU); Wahlpflicht-Credits',
        details: 'Chemical Engineering, Process Automation, Energy/Space Systems, Deep-Tech Entrepreneurship & internationales Netzwerk.',
        ectsText: '18 ECTS offen',
        ectsValue: 18,
        status: 'planned',
        targetPhaseId: 'phase-4'
      }
    },
    {
      year: 2030,
      isCurrentYear: false,
      spring: {
        id: 'slot-2030-fs',
        code: 'FS30',
        category: 'master',
        icon: 'book',
        title: 'Master · Semester 2',
        subtitle: 'Wirtschaftschemie II und IV, Industriepraktikum; Minor DSA 104, DSA 1xx (Lab Automation)',
        details: 'Closed-Loop-Optimierung, Sensorik & Datenpipelines; Industriepraktikum (Elektrolyse, Katalyse, Kryotechnik oder Space-Industrie).',
        ectsText: '23 ECTS offen',
        ectsValue: 23,
        status: 'planned',
        targetPhaseId: 'phase-4'
      },
      autumn: {
        id: 'slot-2030-hs',
        code: 'HS30',
        category: 'master',
        icon: 'book',
        title: 'Master · Semester 3',
        subtitle: 'Wirtschaftschemie I und III, Start der Masterarbeit; Minor DSA 103 (Abschluss Minor-Credits)',
        details: 'Masterarbeit als technologisches Herzstück der Ausgründung (3,55:1 PEM+Sabatier + ML-Steuerung); Unitectra IP-Abklärung & Co-Founder-Suche.',
        ectsText: '55 ECTS offen',
        ectsValue: 55,
        status: 'planned',
        targetPhaseId: 'phase-4'
      }
    },
    {
      year: 2031,
      isCurrentYear: false,
      spring: {
        id: 'slot-2031-fs',
        code: 'FS31',
        category: 'master',
        icon: 'book',
        title: 'Master · Semester 4',
        subtitle: 'Masterarbeit und Masterprüfung; Venture Kick Stage 1, Bridge PoC & ESA BIC Vorbereitung',
        details: 'Verteidigung Masterarbeit, Abschluss MSc Wirtschaftschemie + Minor Data Science & Lab Automation, Pre-Seed-Förderanträge.',
        ectsText: '10 ECTS offen',
        ectsValue: 10,
        status: 'planned',
        targetPhaseId: 'phase-4'
      },
      autumn: {
        id: 'slot-2031-hs',
        code: 'Q3/Q4 2031',
        category: 'transition',
        icon: 'rocket',
        title: 'Übergang in Teil II · Startup-Inkorporation',
        subtitle: 'Gründung Methalox Systems AG, IP-Sicherung & Labor-Prototyp (Phase 5)',
        details: 'Nahtloser Übergang vom MSc-Abschluss in die operative Vollzeit-Gründung (TRL 1 → TRL 3).',
        ectsText: 'TRL 1 → TRL 3',
        ectsValue: 0,
        status: 'planned',
        targetPhaseId: 'phase-5'
      }
    }
  ],

  /**
   * ANSICHT A — TEIL 2: STARTUP-SKALIERUNGS-GRID (2031–2040+)
   */
  startupTimelineGrid: [
    {
      id: 'startup-card-5',
      phaseId: 'phase-5',
      phaseNum: 'PHASE 5',
      timeframe: 'Q3 2031 – Q4 2032 (18 Monate)',
      badge: 'Pre-Seed / Gründung',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      cardAccent: 'border-sky-500/50 hover:border-sky-400',
      title: 'Unternehmensgründung, IP-Sicherung & Labor-Prototyp',
      trlRange: 'TRL 1 → TRL 3',
      capitalTarget: 'CHF 500k – 1,2 Mio. (Grants + Pre-Seed)',
      teamSize: '2 → 4 FTE + Advisory Board',
      highlights: 'AG-Gründung Schweiz, ABV & 4J-Vesting, Prioritäts-Patent, 100h Labor-Benchtop-Demonstrator (3,55:1 O₂:CH₄), Venture Kick & ESA BIC.'
    },
    {
      id: 'startup-card-6',
      phaseId: 'phase-6',
      phaseNum: 'PHASE 6',
      timeframe: '2033 – 2034 (24 Monate)',
      badge: 'Seed',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      cardAccent: 'border-cyan-500/50 hover:border-cyan-400',
      title: 'Seed-Runde, Integriertes Engineering Model (EM) & Dual-Use',
      trlRange: 'TRL 4 → TRL 5',
      capitalTarget: 'CHF 3 – 6 Mio. Seed + EIC/ESA GSTP',
      teamSize: '4 → 12–15 FTE (10–15% ESOP)',
      highlights: 'Integriertes EM in eigener Mars-Simulationskammer (~6–10 mbar CO₂), >1.000h autonomer Dauerbetrieb, optionaler terrestrischer Power-to-Gas-Pilot.'
    },
    {
      id: 'startup-card-7',
      phaseId: 'phase-7',
      phaseNum: 'PHASE 7',
      timeframe: '2035 – 2036 (24 Monate)',
      badge: 'Series A',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      cardAccent: 'border-amber-500/50 hover:border-amber-400',
      title: 'Series A, Raumfahrt-Qualifikation & Qualification Model (QM)',
      trlRange: 'TRL 6 → TRL 7',
      capitalTarget: 'CHF 15 – 30 Mio. Series A',
      teamSize: '15 → 40–50 FTE (VP-Level & ISO 7/8 Reinraum)',
      highlights: 'Qualification Model (Titan/Inconel, Rad-Hard FPGAs), ECSS/NASA-STD TVAC (−120 °C bis +30 °C), Vibrations-/Schocktests, Hosted-Payload-Flugvertrag.'
    },
    {
      id: 'startup-card-8',
      phaseId: 'phase-8',
      phaseNum: 'PHASE 8',
      timeframe: '2037 – 2039 (30 Monate)',
      badge: 'Series B',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      cardAccent: 'border-orange-500/50 hover:border-orange-400',
      title: 'Series B, Flight Model (FM) & Planetare Demonstration',
      trlRange: 'TRL 8 → TRL 9 (Flight Proven)',
      capitalTarget: 'CHF 50 – 100+ Mio. Series B + Projektfinanzierung',
      teamSize: '50 → 120–150 FTE (Mission Control & Serien-Eng.)',
      highlights: 'Flight Model Acceptance Testing, Lander-Integration, Start & realer In-Situ-Demonstrationsbetrieb auf Mond/Mars, Backlog >CHF 100 Mio.'
    },
    {
      id: 'startup-card-9',
      phaseId: 'phase-9',
      phaseNum: 'PHASE 9',
      timeframe: 'Ab 2039+',
      badge: 'Scale-Up / Series C+',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      cardAccent: 'border-emerald-500/50 hover:border-emerald-400',
      title: 'Kommerzielle Skalierung, Full-Scale ISRU-Fabriken & Marktführerschaft',
      trlRange: 'TRL 9 · Multi-Tonnen Serienbetrieb',
      capitalTarget: 'Series C+ / IPO (SIX / NASDAQ)',
      teamSize: '150 → 300+ FTE (CH, USA, EU)',
      highlights: 'Serienproduktion modularer 3,55:1 Methalox-Fabriken, Propellant-as-a-Service (PaaS), Wasser/O₂-Habitate, In-Situ-Polymere & Power-to-X-Lizenzierung.'
    }
  ],

  /**
   * ANSICHT B — DETAILLIERTE PHASEN- & AUSFÜHRUNGSANSICHT (PHASE 0 BIS PHASE 9)
   * 1:1 vollständig und ungekürzt
   */
  phases: [
    // =========================================================================
    // PHASE 0
    // =========================================================================
    {
      id: 'phase-0',
      part: 'TEIL I: AKADEMISCHES FUNDAMENT, MILITÄR & SPEZIALISIERUNG (2025–2031)',
      number: 'PHASE 0',
      title: 'Grundstudium BSc Wirtschaftschemie',
      timeframe: 'HS25 – FS26 (Herbst 2025 – Frühling 2026)',
      status: 'completed',
      statusBadge: 'ABGESCHLOSSEN ✓',
      ectsBadge: '63 ECTS bestanden (32 + 31 ECTS)',
      trlBadge: 'Akademische Basis',
      capitalBadge: 'Studienfinanzierung',
      teamBadge: 'Solo Founder Track',
      tracks: ['studium', 'technik'],
      summary: 'Erfolgreicher Abschluss der ersten beiden Bachelor-Semester an der UZH (Campus Irchel / Zentrum) mit 63 kumulierten ECTS und Qualifikation für akademische Exzellenz.',
      checklist: [
        {
          id: 'p0-c1',
          track: 'studium',
          defaultChecked: true,
          text: 'HS25 (Herbst 2025) – Bachelor Semester 1 [Status: Abgeschlossen ✓ | 32 ECTS bestanden]: Grundstudium Chemie, Mathematik, Physik, Genetik, BWL erfolgreich abgeschlossen.'
        },
        {
          id: 'p0-c2',
          track: 'studium',
          defaultChecked: true,
          text: 'HS25 Meilenstein: Erfolgreicher Start an der UZH (Campus Irchel / Zentrum), 32 ECTS im 1. Semester bestanden.'
        },
        {
          id: 'p0-c3',
          track: 'studium',
          defaultChecked: true,
          text: 'FS26 (Frühling 2026) – Bachelor Semester 2 [Status: Abgeschlossen ✓ | 31 ECTS bestanden]: Grundstudium Chemie, Analysis, Physik II, BWL II erfolgreich abgeschlossen.'
        },
        {
          id: 'p0-c4',
          track: 'studium',
          defaultChecked: true,
          text: 'FS26 Meilenstein: Assessment-/Grundstudiums-Basis gelegt (63 ECTS kumuliert), Qualifikation für akademische Exzellenz (u.a. Alfred Werner Legat Leistungsniveau).'
        }
      ],
      academicTech: [
        {
          label: 'HS25 (Herbst 2025) – Bachelor Semester 1 [32 ECTS bestanden]',
          detail: 'Inhalt: Grundstudium Chemie, Mathematik, Physik, Genetik, BWL. Meilenstein: Erfolgreicher Start an der UZH (Campus Irchel / Zentrum), 32 ECTS abgeschlossen.'
        },
        {
          label: 'FS26 (Frühling 2026) – Bachelor Semester 2 [31 ECTS bestanden]',
          detail: 'Inhalt: Grundstudium Chemie, Analysis, Physik II, BWL II. Meilenstein: Assessment-/Grundstudiums-Basis gelegt (63 ECTS kumuliert), Qualifikation für akademische Exzellenz (u.a. Alfred Werner Legat Leistungsniveau).'
        }
      ],
      financing: [
        {
          label: 'Akademische Exzellenz & Stipendien-Qualifikation',
          detail: 'Leistungsniveau für Exzellenz-Stipendien (u.a. Alfred Werner Legat) durch 63 ECTS in den ersten zwei Semestern erreicht.'
        }
      ],
      teamOrg: [
        {
          label: 'Individuelles Fundament (UZH Campus Irchel / Zentrum)',
          detail: 'Aufbau der interdisziplinären Schnittstellenkompetenz aus Naturwissenschaften (Chemie, Physik, Mathematik) und Betriebswirtschaftslehre.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Universitäre Verankerung',
          detail: 'Immatrikulation und regulärer Studienverlauf BSc Wirtschaftschemie an der Universität Zürich (UZH).'
        }
      ],
      stageGates: [
        {
          id: 'p0-sg1',
          track: 'studium',
          defaultChecked: true,
          text: 'Erfolgreicher Start an der UZH (Campus Irchel / Zentrum) und alle 32 ECTS in HS25 bestanden.'
        },
        {
          id: 'p0-sg2',
          track: 'studium',
          defaultChecked: true,
          text: 'Assessment-/Grundstudiums-Basis vollständig gelegt (63 ECTS kumuliert nach FS26) und Qualifikation für akademische Exzellenz (Alfred Werner Legat Leistungsniveau).'
        }
      ]
    },

    // =========================================================================
    // PHASE 1 (AKTUELL)
    // =========================================================================
    {
      id: 'phase-1',
      part: 'TEIL I: AKADEMISCHES FUNDAMENT, MILITÄR & SPEZIALISIERUNG (2025–2031)',
      number: 'PHASE 1',
      title: 'Abschluss 3. Semester Wirtschaftschemie & Vorbereitung Militärpause',
      timeframe: 'HS26 (Herbst 2026 – Januar 2027)',
      status: 'now',
      statusBadge: 'NOW / AKTUELL',
      ectsBadge: '32 ECTS offen (Ziel: 95 ECTS kumuliert)',
      trlBadge: 'TRL 1 (Thermodynamik & Katalyse-Fundament)',
      capitalBadge: 'Fixkosten-Optimierung & 3a-Vorbereitung',
      teamBadge: 'Solo Founder Track',
      tracks: ['studium', 'technik', 'finanzierung', 'militaer'],
      summary: 'Abschluss aller 32 ECTS des 3. Semesters (Anorganische, Organische und Physikalische Chemie I sowie Spektroskopie) und saubere administrative wie finanzielle Vorbereitung auf das Offiziersjahr 2027.',
      checklist: [
        {
          id: 'p1-c1',
          track: 'studium',
          defaultChecked: false,
          text: '1. Vorlesungen, Übungsserien und Laborpraktika HS26 vollständig und ohne Rückstände abschließen.'
        },
        {
          id: 'p1-c2',
          track: 'studium',
          defaultChecked: false,
          text: '2. Strukturierte Prüfungsvorbereitung (Dezember 2026 / Januar 2027) für alle 32 ECTS-Module.'
        },
        {
          id: 'p1-c3',
          track: 'militaer',
          defaultChecked: false,
          text: '3. Offizielles Gesuch um Studienunterbruch / Urlaubssemester an der UZH für FS27 und HS27 wegen Militärdienst fristgerecht einreichen (inkl. Marschbefehl/Bestätigung).'
        },
        {
          id: 'p1-c4',
          track: 'studium',
          defaultChecked: false,
          text: '4. Prüfungsanmeldungen, Kreditüberträge und administrative Rückkehr-Voraussetzungen für FS28 dokumentieren.'
        },
        {
          id: 'p1-c5',
          track: 'finanzierung',
          defaultChecked: false,
          text: '5. Paralleles Projekt- & Finanz-Housekeeping vor dem Einrücken: Fixkosten minimieren, laufende Nebenprojekte sauber pausieren, Säule-3a-Strategie für das höhere EO-Einkommen 2027 vorbereiten.'
        }
      ],
      academicTech: [
        {
          label: 'Anorganische Chemie I',
          detail: 'Übergangsmetallchemie, Koordinationsverbindungen – direkte wissenschaftliche Basis für heterogene und elektrokatalytische Katalysatoren wie Ruthenium (Ru), Platin (Pt) und Iridium (Ir).'
        },
        {
          label: 'Organische Chemie I',
          detail: 'Reaktionsmechanismen und Synthesegrundlagen.'
        },
        {
          label: 'Physikalische Chemie I',
          detail: 'Thermodynamik, Reaktionsenthalpien, chemische Gleichgewichte und Elektrochemie – essenziell für PEM-Wasserelektrolyse und den exothermen Sabatier-Prozess.'
        },
        {
          label: 'Spektroskopie und analytische Methoden',
          detail: 'Instrumentelle Analytik und spektroskopische Charakterisierung zur Prozess- und Reinheitskontrolle.'
        }
      ],
      financing: [
        {
          label: 'Projekt- & Finanz-Housekeeping vor dem Einrücken',
          detail: 'Laufende Fixkosten vor Januar 2027 konsequent minimieren, Nebenprojekte geordnet pausieren und Säule-3a-Strategie für das höhere EO-/Kader-Einkommen im Militärjahr 2027 vorbereiten.'
        }
      ],
      teamOrg: [
        {
          label: 'Zeit- & Selbstmanagement in der Prüfungsphase',
          detail: 'Fokussierte Bewältigung der 32 ECTS im 3. Semester parallel zur administrativen Vorbereitung des Übergangs in die Offiziersausbildung.'
        }
      ],
      legalIpPartners: [
        {
          label: 'UZH Urlaubssemester & Administration',
          detail: 'Fristgerechte Einreichung des Gesuchs um Studienunterbruch / Urlaubssemester für FS27 und HS27 inkl. Marschbefehl sowie Sicherstellung aller Kreditüberträge für FS28.'
        }
      ],
      stageGates: [
        {
          id: 'p1-sg1',
          track: 'studium',
          defaultChecked: false,
          text: 'Stage-Gate Milestone: Alle 32 ECTS des 3. Semesters bestanden (kumuliert 95 ECTS), sauber genehmigte Beurlaubung an der UZH, nahtloser Übergang in die Offiziersausbildung ab Januar 2027.'
        }
      ]
    },

    // =========================================================================
    // PHASE 2
    // =========================================================================
    {
      id: 'phase-2',
      part: 'TEIL I: AKADEMISCHES FUNDAMENT, MILITÄR & SPEZIALISIERUNG (2025–2031)',
      number: 'PHASE 2',
      title: '1 Jahr Schweizer Armee – Offiziersausbildung (Lt) & Kapitalaufbau',
      timeframe: 'FS27 & HS27 (Januar 2027 – Dezember 2027)',
      status: 'planned',
      statusBadge: 'GEPLANT',
      ectsBadge: 'Urlaubssemester (95 ECTS Stand)',
      trlBadge: 'Leadership & Literatur-Deep-Dive',
      capitalBadge: 'Aufbau Founder-War-Chest & Max. Säule 3a',
      teamBadge: 'Kader-Netzwerk (Co-Founder Scouting)',
      tracks: ['militaer', 'finanzierung', 'team', 'technik'],
      summary: 'Ausbildung und praktischer Dienst als Leutnant (Zugführer) in der Schweizer Armee: Aufbau realer Führungserfahrung unter Belastung, gezielter Kapitalaufbau (Founder-War-Chest) und Netzwerkaufbau im Offizierskader.',
      checklist: [
        {
          id: 'p2-c1',
          track: 'militaer',
          defaultChecked: false,
          text: '1. Erfolgreicher Abschluss der Kaderschulen und Brevetierung zum Leutnant (Lt).'
        },
        {
          id: 'p2-c2',
          track: 'militaer',
          defaultChecked: false,
          text: '2. Führungserfahrung unter realem Zeit-, Stress- und Ressourcenmangel aufbauen (Zugsführung, Einsatzplanung, Risikoanalyse, Kommunikation mit Vorgesetzten und Unterstellten).'
        },
        {
          id: 'p2-c3',
          track: 'finanzierung',
          defaultChecked: false,
          text: '3. Finanzielle Disziplin & Startkapital-Aufbau: Hohe Sparquote aus Sold/EO/Kaderentschädigung realisieren; steueroptimierte Einzahlung des Maximalbetrags in Säule 3a für 2027; Aufbau einer liquiden „Founder-War-Chest“ (Rücklage für Austauschsemester und spätere Startup-Gründung).'
        },
        {
          id: 'p2-c4',
          track: 'team',
          defaultChecked: false,
          text: '4. Netzwerkaufbau im Kader: Kontakte zu technisch und unternehmerisch starken Offizieren (Ingenieure, Informatiker, Juristen, ETH/UZH-Absolventen) aktiv pflegen (potenzielle Co-Founder, Berater oder spätere Mitarbeiter).'
        },
        {
          id: 'p2-c5',
          track: 'technik',
          defaultChecked: false,
          text: '5. Wochenend-Deep-Dive (ohne Überlastung): Fachliteratur zu Mars ISRU, Kryotechnik, PEM-Elektrolyse, heterogener Katalyse und Space Systems Engineering weiterverfolgen; UZH-Rückkehr und Modulwahl für FS28 im Herbst 2027 verbindlich planen.'
        }
      ],
      academicTech: [
        {
          label: 'FS27 (Frühling 2027) – Offiziersschule',
          detail: 'Offiziersausbildung Schweizer Armee (UOS / Offiziersschule zum Leutnant).'
        },
        {
          label: 'HS27 (Herbst 2027) – Praktischer Dienst',
          detail: 'Abverdienen als Leutnant / Zugführer mit voller Führungs- und Ausbildungsverantwortung.'
        },
        {
          label: 'Wochenend-Deep-Dive & Studienplanung FS28',
          detail: 'Kontinuierliches Fachliteratur-Studium zu Mars ISRU, Kryotechnik, PEM-Elektrolyse, heterogener Katalyse und Space Systems Engineering sowie verbindliche Modulwahl für FS28 im Herbst 2027.'
        }
      ],
      financing: [
        {
          label: 'Founder-War-Chest & Säule 3a Maximalbetrag',
          detail: 'Konsequente Sparquote aus Sold, EO und Kaderentschädigung; steueroptimierte Einzahlung des Maximalbetrags in die Säule 3a für 2027; Aufbau einer liquiden Eigenkapital-Rücklage für das Austauschsemester in Asien und die spätere AG-Gründung.'
        }
      ],
      teamOrg: [
        {
          label: 'Führungskompetenz & Offiziers-Netzwerk',
          detail: 'Praktische Zugsführung, Einsatzplanung und Risikoanalyse unter Stress. Gezieltes Scouting technisch und unternehmerisch starker Offiziere (ETH/UZH-Ingenieure, Informatiker, Juristen) als potenzielle Co-Founder oder frühe Schlüsselmitarbeiter.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Fristgerechte UZH-Re-Immatrikulation / Rückmeldung',
          detail: 'Verbindliche administrative Rückmeldung im Herbst 2027 für den nahtlosen Wiedereinstieg in das 4. Bachelor-Semester (FS28).'
        }
      ],
      stageGates: [
        {
          id: 'p2-sg1',
          track: 'militaer',
          defaultChecked: false,
          text: 'Stage-Gate Milestone: Abgeschlossener praktischer Dienst als Leutnant, aufgebaute Eigenkapital-Rücklage, erprobte Führungs- und Krisenkompetenz, rechtzeitige Rückmeldung für FS28 an der UZH.'
        }
      ]
    },

    // =========================================================================
    // PHASE 3
    // =========================================================================
    {
      id: 'phase-3',
      part: 'TEIL I: AKADEMISCHES FUNDAMENT, MILITÄR & SPEZIALISIERUNG (2025–2031)',
      number: 'PHASE 3',
      title: 'Bachelor Wirtschaftschemie Semester 4–6 & Start Minor Data Science & Lab Automation',
      timeframe: 'FS28 – FS29 (Februar 2028 – Juli 2029)',
      status: 'planned',
      statusBadge: 'GEPLANT',
      ectsBadge: '99 ECTS (30 + 32 + 37 ECTS) → 180+ ECTS BSc Abschluss',
      trlBadge: 'TRL 1–2 (Bachelorarbeit ISRU-Katalyse/Kinetik)',
      capitalBadge: 'Stipendien & Austausch-Budgetierung',
      teamBadge: 'Forschungsgruppen-Zugang UZH/ETH',
      tracks: ['studium', 'technik', 'team'],
      summary: 'Wiedereinstieg nach dem Militärdienst, Einstieg in den Minor Data Science & Lab Automation (AI in Chemistry), frühzeitige Bewerbung für das Asien-Austauschsemester und Abschluss der Bachelorarbeit mit direktem ISRU-Prozessbezug.',
      checklist: [
        {
          id: 'p3-c1',
          track: 'studium',
          defaultChecked: false,
          text: 'FS28 (30 ECTS offen): Rückkehr an die UZH – Chemie II Module, Synthesepraktikum, Mikroökonomie und weitere Wirtschaftschemie-Pflichtmodule erfolgreich absolvieren.'
        },
        {
          id: 'p3-c2',
          track: 'team',
          defaultChecked: false,
          text: 'FS28: Re-Integration in den akademischen Rhythmus; erste Kontakte zu Forschungsgruppen an UZH/ETH im Bereich Katalyse, Elektrochemie und Lab Automation knüpfen.'
        },
        {
          id: 'p3-c3',
          track: 'studium',
          defaultChecked: false,
          text: 'HS28 (32 ECTS offen): Fachstudium – Physikalische Chemie Praktikum (PC-Praktikum), Biochemie I, BWL III und Wahlpflicht Chemie abschließen.'
        },
        {
          id: 'p3-c4',
          track: 'technik',
          defaultChecked: false,
          text: 'HS28: Start Minor Data Science & Lab Automation (AI in Chemistry) – Grundlagen Python für wissenschaftliches Rechnen, Datenanalyse, Machine Learning für chemische Prozesse.'
        },
        {
          id: 'p3-c5',
          track: 'technik',
          defaultChecked: false,
          text: 'HS28: Strategische Themen- und Betreuersuche für die Bachelorarbeit (Fokus: Sabatier-Katalyse, Ru/Al₂O₃, PEM-Elektrolyse, Prozessmodellierung oder automatisierte Reaktionsoptimierung).'
        },
        {
          id: 'p3-c6',
          track: 'studium',
          defaultChecked: false,
          text: 'HS28 / FS29: Frühzeitige Bewerbung und Organisation des Austauschsemesters in Asien (Singapur: NUS/NTU oder Peking: Tsinghua/PKU) für HS29 (Fristen 9–12 Monate im Voraus, bereits in HS28 starten!).'
        },
        {
          id: 'p3-c7',
          track: 'technik',
          defaultChecked: false,
          text: 'FS29 (37 ECTS offen): Bachelorarbeit verfassen – empirische oder computergestützte Arbeit mit direktem technologischem Mehrwert für ISRU-Prozesstechnik (z.B. Katalysator-Deaktivierung, Reaktionskinetik, KI-gestützte Regelung).'
        },
        {
          id: 'p3-c8',
          track: 'studium',
          defaultChecked: false,
          text: 'FS29: Abschluss Wahlpflicht Chemie und WWF (Wirtschaftswissenschaftliche Fakultät), Wahlbereich sowie weitere Module des Minors Data Science & Lab Automation.'
        }
      ],
      academicTech: [
        {
          label: 'FS28 (Frühling 2028) – Bachelor Semester 4 [30 ECTS offen]',
          detail: 'Rückkehr an die UZH: Chemie II Module, Synthesepraktikum, Mikroökonomie und weitere Wirtschaftschemie-Pflichtmodule. Re-Integration in den akademischen Rhythmus und Kontaktaufbau zu Forschungsgruppen (Katalyse, Elektrochemie, Lab Automation).'
        },
        {
          label: 'HS28 (Herbst 2028) – Bachelor Semester 5 [32 ECTS offen]',
          detail: 'Fachstudium: Physikalische Chemie Praktikum (PC-Praktikum), Biochemie I, BWL III, Wahlpflicht Chemie. Start Minor Data Science & Lab Automation (AI in Chemistry): Python für wissenschaftliches Rechnen, Datenanalyse, Machine Learning für chemische Prozesse. Themen-/Betreuersuche für Bachelorarbeit.'
        },
        {
          label: 'FS29 (Frühling 2029) – Bachelor Semester 6 [37 ECTS offen]',
          detail: 'Bachelorarbeit mit direktem technologischem Mehrwert für ISRU-Prozesstechnik (Sabatier-Katalyse, Ru/Al₂O₃, PEM-Elektrolyse, Prozessmodellierung oder KI-gestützte Regelung). Abschluss Wahlpflicht Chemie und WWF, Wahlbereich sowie weitere Minor-Module.'
        }
      ],
      financing: [
        {
          label: 'Finanzierung BSc-Endspurt & Asien-Austauschvorbereitung',
          detail: 'Nutzung der im Militärjahr aufgebauten Rücklagen sowie Bewerbung um Mobilitätsstipendien für das anstehende Austauschsemester in Singapur oder Peking.'
        }
      ],
      teamOrg: [
        {
          label: 'Akademisches Forschungsnetzwerk UZH / ETH',
          detail: 'Aufbau enger Beziehungen zu Professoren und Postdocs in der heterogenen Katalyse, Elektrochemie und Laborautomatisierung als Basis für Masterarbeit und späteres Advisory Board.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Bewerbung Asien-Austauschsemester (HS29)',
          detail: 'Fristgerechte Einreichung aller Bewerbungsunterlagen (9–12 Monate Vorlauf, Start in HS28) für NUS/NTU (Singapur) oder Tsinghua/PKU (Peking).'
        }
      ],
      stageGates: [
        {
          id: 'p3-sg1',
          track: 'studium',
          defaultChecked: false,
          text: 'Stage-Gate Milestone: Abschluss BSc Wirtschaftschemie (180+ ECTS), laufender/fortgeschrittener Minor Data Science & Lab Automation, gesicherter Platz für das Austauschsemester in Asien, akademisches Netzwerk zu relevanten Professoren.'
        }
      ]
    },

    // =========================================================================
    // PHASE 4
    // =========================================================================
    {
      id: 'phase-4',
      part: 'TEIL I: AKADEMISCHES FUNDAMENT, MILITÄR & SPEZIALISIERUNG (2025–2031)',
      number: 'PHASE 4',
      title: 'Master Wirtschaftschemie (2 Jahre) inkl. Austauschsemester & Abschluss Minor Data Science & Lab Automation',
      timeframe: 'HS29 – FS31 (September 2029 – Juli 2031)',
      status: 'planned',
      statusBadge: 'GEPLANT',
      ectsBadge: '106 ECTS (18 + 23 + 55 + 10 ECTS) → MSc Abschluss',
      trlBadge: 'TRL 2–3 (Labor-PoC & ML-Prozesssteuerung)',
      capitalBadge: 'Venture Kick Stage 1 (CHF 10k) & Bridge PoC (CHF 130k)',
      teamBadge: '1–2 Technische Co-Founder identifiziert',
      tracks: ['studium', 'technik', 'finanzierung', 'team', 'recht'],
      summary: 'Masterstudium mit Austauschsemester in Asien (Singapur oder Peking), strategischem Industriepraktikum, Abschluss des Minors Data Science & Lab Automation, Masterarbeit als technologisches Herzstück der Ausgründung sowie ersten Pre-Seed-Grants.',
      checklist: [
        {
          id: 'p4-c1',
          track: 'studium',
          defaultChecked: false,
          text: 'HS29 (18 ECTS offen) – Master Semester 1 (Austauschsemester Asien): Studienaufenthalt in Singapur (NUS/NTU) oder Peking (Tsinghua/PKU) mit strategischen Wahlpflichtmodulen (Chemical Engineering, Process Automation, Energy/Space Systems, Deep-Tech Entrepreneurship).'
        },
        {
          id: 'p4-c2',
          track: 'team',
          defaultChecked: false,
          text: 'HS29: Aufbau eines internationalen Netzwerks im asiatischen Hardware-, Chemie- und Deep-Tech-Ökosystem (Zulieferer, Forschungslabore, internationale Investoren).'
        },
        {
          id: 'p4-c3',
          track: 'studium',
          defaultChecked: false,
          text: 'FS30 (23 ECTS offen) – Master Semester 2: Module Wirtschaftschemie II und IV sowie Minor Data Science & Lab Automation (Module DSA 104, DSA 1xx: Vertiefung Laborautomatisierung, Closed-Loop-Optimierung, Sensorik & Datenpipelines).'
        },
        {
          id: 'p4-c4',
          track: 'technik',
          defaultChecked: false,
          text: 'FS30 – Industriepraktikum: Strategische Platzierung in einem hochrelevanten Industrieunternehmen oder Deep-Tech-Startup (Elektrolyse/Wasserstoff-Technik, Industriekatalyse, Prozessautomatisierung, Kryotechnik oder europäische Raumfahrtindustrie wie Beyond Gravity, OHB, Airbus Defence & Space oder Climeworks/Sunfire).'
        },
        {
          id: 'p4-c5',
          track: 'studium',
          defaultChecked: false,
          text: 'HS30 (55 ECTS offen) – Master Semester 3: Module Wirtschaftschemie I und III sowie Minor Data Science & Lab Automation (Modul DSA 103 und Abschluss aller restlichen Minor-Credits).'
        },
        {
          id: 'p4-c6',
          track: 'technik',
          defaultChecked: false,
          text: 'HS30 – Start Masterarbeit: Technologisches Herzstück für die spätere Ausgründung (integriertes Modell & Labor-Proof-of-Concept der asymmetrischen PEM-Elektrolyse + Sabatier-Kopplung für exakt 3,55:1 O₂:CH₄ mit autonomer ML-Prozesssteuerung).'
        },
        {
          id: 'p4-c7',
          track: 'recht',
          defaultChecked: false,
          text: 'HS30 – Pre-Incorporation & IP-Vorbereitung: Frühzeitige Abklärung von Erfindungsrechten (IP) mit UZH Unitectra / ETH transfer; Identifikation von 1–2 technischen Co-Foundern (Aerospace/Thermal/Cryo + Embedded/Systems Engineering).'
        },
        {
          id: 'p4-c8',
          track: 'studium',
          defaultChecked: false,
          text: 'FS31 (10 ECTS offen) – Master Semester 4: Fertigstellung und Verteidigung der Masterarbeit sowie Bestehen der Masterprüfung.'
        },
        {
          id: 'p4-c9',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'FS31 – Nicht-verwässernde Förderanträge vor Studienende einreichen: Venture Kick Stage 1 (CHF 10.000), UZH Entrepreneur Fellowship, Bridge Proof of Concept (CHF 130.000) und Vorbereitung auf ESA BIC Switzerland.'
        }
      ],
      academicTech: [
        {
          label: 'HS29 (Herbst 2029) – Master Semester 1: Austauschsemester Asien [18 ECTS offen]',
          detail: 'Studienaufenthalt in Singapur (NUS/NTU) oder Peking (Tsinghua/PKU). Belegung strategischer Wahlpflichtmodule (Chemical Engineering, Process Automation, Energy/Space Systems, Deep-Tech Entrepreneurship).'
        },
        {
          label: 'FS30 (Frühling 2030) – Master Semester 2 [23 ECTS offen]',
          detail: 'Module Wirtschaftschemie II und IV. Minor Data Science & Lab Automation: Module DSA 104, DSA 1xx (Vertiefung Laborautomatisierung, Closed-Loop-Optimierung, Sensorik & Datenpipelines). Industriepraktikum bei relevanten Deep-Tech-/Space-/PtX-Akteuren (Beyond Gravity, OHB, Airbus Defence & Space, Climeworks, Sunfire).'
        },
        {
          label: 'HS30 (Herbst 2030) – Master Semester 3 [55 ECTS offen]',
          detail: 'Module Wirtschaftschemie I und III. Minor Data Science & Lab Automation: Modul DSA 103 und Abschluss aller restlichen Minor-Credits. Start der Masterarbeit als technologisches Herzstück der Ausgründung (asymmetrische PEM-Elektrolyse + Sabatier-Kopplung für exakt 3,55:1 O₂:CH₄ mit autonomer ML-Prozesssteuerung).'
        },
        {
          label: 'FS31 (Frühling 2031) – Master Semester 4 [10 ECTS offen]',
          detail: 'Fertigstellung und Verteidigung der Masterarbeit sowie Bestehen der Masterprüfung (TRL 2–3 im Labor validiert).'
        }
      ],
      financing: [
        {
          label: 'Erste Non-Dilutive Pre-Seed Grants vor Studienende',
          detail: 'Einreichung von Venture Kick Stage 1 (CHF 10.000), UZH Entrepreneur Fellowship, Bridge Proof of Concept (CHF 130.000) und Bewerbungsvorbereitung für ESA BIC Switzerland.'
        }
      ],
      teamOrg: [
        {
          label: 'Co-Founder Identifikation & Asien-Netzwerk',
          detail: 'Identifikation von 1–2 technischen Co-Foundern (Aerospace/Thermal/Cryo + Embedded/Systems Engineering) aus dem UZH/ETH- und Offiziers-Umfeld sowie Aufbau internationaler Kontakte in Singapur/Peking.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Pre-Incorporation & Unitectra IP-Klärung',
          detail: 'Frühzeitige Abklärung der Erfindungsrechte (IP) aus der Masterarbeit mit UZH Unitectra / ETH transfer zur Sicherstellung einer sauberen späteren Ausgründung.'
        }
      ],
      stageGates: [
        {
          id: 'p4-sg1',
          track: 'studium',
          defaultChecked: false,
          text: 'Stage-Gate Milestone: Abschluss MSc Wirtschaftschemie + vollständiger Minor Data Science & Lab Automation, validiertes Labor-Konzept (TRL 2–3), identifiziertes Gründungsteam, geklärte IP-Strategie, erste Pre-Seed-Förderzusagen.'
        }
      ]
    },

    // =========================================================================
    // PHASE 5
    // =========================================================================
    {
      id: 'phase-5',
      part: 'TEIL II: STARTUP-GRÜNDUNG, TECHNOLOGIE-ENTWICKLUNG & SKALIERUNG (2031–2040+)',
      number: 'PHASE 5',
      title: 'Unternehmensgründung, IP-Sicherung & Pre-Seed / Labor-Prototyp (TRL 1 → TRL 3)',
      timeframe: 'Q3 2031 – Q4 2032 (ca. 18 Monate)',
      status: 'planned',
      statusBadge: 'PRE-SEED / GRÜNDUNG',
      ectsBadge: 'MSc & Minor abgeschlossen',
      trlBadge: 'TRL 1 → TRL 3 (Benchtop Demonstrator)',
      capitalBadge: 'CHF 500k – 1,2 Mio. (Non-Dilutive + Pre-Seed)',
      teamBadge: '2 → 4 FTE + 3er Advisory Board',
      tracks: ['technik', 'finanzierung', 'team', 'recht'],
      summary: 'Juristische Inkorporation in der Schweiz, Sicherung der Kern-IP (Patentanmeldung & Unitectra-Lizenz), Aufbau des 100h-Labor-Benchtop-Demonstrators mit exakt 3,55:1 O₂:CH₄-Output sowie Abschluss der Pre-Seed-Finanzierung.',
      checklist: [
        {
          id: 'p5-c1',
          track: 'recht',
          defaultChecked: false,
          text: 'Recht 1: Gründung der Gesellschaft in der Schweiz (Start als AG mit CHF 100.000 Aktienkapital – bevorzugt von Deep-Tech-VCs – oder GmbH mit späterer Umwandlung; Standort Zürich/Luzern/Zug nahe ETH/UZH/ESA BIC).'
        },
        {
          id: 'p5-c2',
          track: 'recht',
          defaultChecked: false,
          text: 'Recht 2: Ausarbeitung des Aktionärbindungsvertrags (ABV / Shareholder Agreement) inkl. 4-Jahres-Vesting mit 1-Jahres-Cliff für alle Gründer und IP-Transfer-Klauseln.'
        },
        {
          id: 'p5-c3',
          track: 'recht',
          defaultChecked: false,
          text: 'Recht 3: Lizenzierung ggf. universitärer Background-IP (Unitectra) und Einreichung erster eigener Prioritäts-Patentanmeldung (CH/EP → später PCT) für das asymmetrische Elektrolyse-Sabatier-Reaktordesign, Wärmemanagement und autonome KI-Regelungsalgorithmen.'
        },
        {
          id: 'p5-c4',
          track: 'recht',
          defaultChecked: false,
          text: 'Recht 4: Aufbau Buchhaltung, Treuhand, MWST-Registrierung, Sozialversicherungen (AHV/BVG/UVG) und Datenschutz/IT-Compliance.'
        },
        {
          id: 'p5-c5',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 1: Thermodynamisches & stöchiometrisches Gesamtmodell (Aspen Plus / Python Digital Twin) für kontinuierliche 3,55:1 Methalox-Produktion.'
        },
        {
          id: 'p5-c6',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 2: Aufbau eines Labor-Benchtop-Demonstrators (Sub-Scale PEM-Elektrolyseur + Ru/Al₂O₃ Sabatier-Festbettreaktor + Kondensator-Wasserkreislauf) unter Normaldruck/Laborgasbedingungen.'
        },
        {
          id: 'p5-c7',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 3: Experimenteller Nachweis: >98 % CO₂-Konversion, geschlossene Wasserrückführung, kontrollierte asymmetrische O₂-Überschussproduktion, erste Langzeittests (>100 Betriebsstunden) zur Katalysatorstabilität.'
        },
        {
          id: 'p5-c8',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 4: Entwicklung der ersten Software-Version der autonomen Prozessüberwachung (Anomalie-Erkennung & automatische Lastanpassung basierend auf dem Minor Data Science & Lab Automation).'
        },
        {
          id: 'p5-c9',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung 1 (Non-Dilutive): Venture Kick (Stages 1–3, total bis CHF 150.000), ESA BIC Switzerland (EUR 50.000–200.000 + technischer Support & Netzwerk), Innosuisse Start-up Coaching & Innovationsprojekt mit UZH/ETH, Bridge / Gebert Rüf Stiftung.'
        },
        {
          id: 'p5-c10',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung 2 (Pre-Seed Equity / SAFE / Wandeldarlehen): CHF 500k – 1 Mio. von Schweizer Business Angels (SICTIC, BAS), Deep-Tech Pre-Seed-Fonds und Family Offices sichern (Runway: 18 Monate, Burn Rate: ca. CHF 25k–45k/Monat).'
        },
        {
          id: 'p5-c11',
          track: 'team',
          defaultChecked: false,
          text: 'Team & Advisory Board: Kernteam auf 2 → 4 FTE ausbauen (CEO/Chief Chemist + CTO Aerospace/Thermal + 1–2 Engineers für Chemical Process & Embedded Control) sowie 3-köpfiges Advisory Board berufen.'
        },
        {
          id: 'p5-c12',
          track: 'recht',
          defaultChecked: false,
          text: 'Kommerzielle Validierung: Strukturierte Customer-Discovery-Gespräche mit ESA, NASA, kommerziellen Launch-Providern (SpaceX-Ökosystem, Blue Origin, europäische Lander-Hersteller) sowie terrestrischen Power-to-Gas-/E-Fuel-Partnern (Dual-Use).'
        }
      ],
      academicTech: [
        {
          label: 'Digital Twin & Stöchiometrie-Modell (Aspen Plus / Python)',
          detail: 'Vollständiges thermodynamisches und stöchiometrisches Gesamtmodell für die kontinuierliche 3,55:1 Methalox-Produktion.'
        },
        {
          label: 'Labor-Benchtop-Demonstrator (TRL 1 → TRL 3)',
          detail: 'Sub-Scale PEM-Elektrolyseur + Ru/Al₂O₃ Sabatier-Festbettreaktor + Kondensator-Wasserkreislauf unter Normaldruck/Laborgasbedingungen. Nachweis von >98 % CO₂-Konversion, geschlossener Wasserrückführung, kontrollierter asymmetrischer O₂-Überschussproduktion und >100 Betriebsstunden Katalysatorstabilität.'
        },
        {
          label: 'Autonome Prozessüberwachung v1.0',
          detail: 'KI-gestützte Anomalie-Erkennung und automatische Lastanpassung auf Basis der Expertise aus dem Minor Data Science & Lab Automation.'
        }
      ],
      financing: [
        {
          label: 'Priorität 1: Nicht-verwässernde Fördermittel',
          detail: 'Venture Kick (Stages 1–3, total bis CHF 150.000), ESA BIC Switzerland (EUR 50.000–200.000 + technischer Support & Netzwerk), Innosuisse Start-up Coaching & Innovationsprojekt mit UZH/ETH, Bridge / Gebert Rüf Stiftung.'
        },
        {
          label: 'Pre-Seed Equity / Wandeldarlehen (Convertible Loan / SAFE)',
          detail: 'CHF 500k – 1 Mio. von Schweizer Business Angels (SICTIC, BAS), Deep-Tech Pre-Seed-Fonds und Family Offices. Ziel-Runway: 18 Monate bei einer Burn Rate von ca. CHF 25k–45k/Monat.'
        }
      ],
      teamOrg: [
        {
          label: 'Gründerteam (2 FTE)',
          detail: 'CEO & Chief Chemist / Process Architect (Du: Strategie, Fundraising, Chemie/Katalyse, Prozessmodellierung, Partnerschaften) + Co-Founder / CTO (Aerospace / Mechanical / Thermal Engineering: Reaktor-Hardware, Kryotechnik, Druckbehälter, Raumfahrt-Systemarchitektur).'
        },
        {
          label: 'Erste Anstellungen (1–2 FTE) & Advisory Board',
          detail: 'Chemical Process Engineer (Elektrochemie/Katalyse) + Embedded Systems / Control Engineer (Sensorik, SPS/Mikrocontroller, Closed-Loop-Automation). Advisory Board: 1x Chemie/Katalyse-Professor, 1x Ex-ESA/NASA-Systemingenieur, 1x Deep-Tech-Investor.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Inkorporation, ABV & Patentanmeldung',
          detail: 'Gründung AG (CHF 100.000 Aktienkapital) oder GmbH in Zürich/Luzern/Zug. ABV inkl. 4-Jahres-Vesting mit 1-Jahres-Cliff. Unitectra Background-IP-Lizenzierung und Prioritäts-Patentanmeldung (CH/EP → PCT). Strukturierte Customer-Discovery mit ESA, NASA, Launch-Providern und PtX-Partnern.'
        }
      ],
      stageGates: [
        {
          id: 'p5-sg1',
          track: 'technik',
          defaultChecked: false,
          text: 'Stage-Gate 1 (Go/No-Go für Seed): Stabiler 100h-Dauerbetrieb des Labor-Prototyps mit verifiziertem 3,55:1 O₂:CH₄-Output.'
        },
        {
          id: 'p5-sg2',
          track: 'recht',
          defaultChecked: false,
          text: 'Stage-Gate 2 (Go/No-Go für Seed): Eingereichte Patentanmeldung und saubere IP-Chain-of-Title.'
        },
        {
          id: 'p5-sg3',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Stage-Gate 3 (Go/No-Go für Seed): Mindestens 2–3 schriftliche Letters of Intent (LOIs) oder Forschungs-MOUs von Raumfahrt- oder Industriepartnern.'
        }
      ]
    },

    // =========================================================================
    // PHASE 6
    // =========================================================================
    {
      id: 'phase-6',
      part: 'TEIL II: STARTUP-GRÜNDUNG, TECHNOLOGIE-ENTWICKLUNG & SKALIERUNG (2031–2040+)',
      number: 'PHASE 6',
      title: 'Seed-Runde, Integriertes Engineering Model (EM) & Dual-Use-Validierung (TRL 4 → TRL 5)',
      timeframe: '2033 – 2034 (ca. 24 Monate)',
      status: 'planned',
      statusBadge: 'SEED',
      ectsBadge: 'TRL 4 → TRL 5',
      trlBadge: 'TRL 4 → TRL 5 (Engineering Model in Marskammer)',
      capitalBadge: 'CHF 3 – 6 Mio. Seed + EIC / ESA GSTP',
      teamBadge: '4 → 12–15 FTE (inkl. 10–15% ESOP)',
      tracks: ['technik', 'finanzierung', 'team', 'recht'],
      summary: 'Abschluss einer CHF 3–6 Mio. Seed-Runde, Bau des geschlossenen Engineering Models (EM), 1.000-Stunden-Autonomietest in eigener Mars-Atmosphären-Simulationskammer (~6–10 mbar CO₂) und optionaler terrestrischer Dual-Use-Pilot.',
      checklist: [
        {
          id: 'p6-c1',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung 1: CHF 3 – 6 Mio. Seed-Runde mit spezialisiertem europäischem oder US-amerikanischem SpaceTech-/Deep-Tech-VC als Lead-Investor abschließen (Alpine Space Ventures, Seraphim Space, Redalpine, Wingman/Founderful, Lakestar, Expansion).'
        },
        {
          id: 'p6-c2',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung 2: Nicht-verwässernde Kofinanzierung sichern – ESA GSTP (General Support Technology Programme), Horizon Europe / EIC Accelerator (bis EUR 2,5 Mio. Grant + Equity), SERI / Swiss Space Office (SSO) Programme.'
        },
        {
          id: 'p6-c3',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 1: Design und Bau des Engineering Models (EM) als integriertes, geschlossenes System (CO₂-Ansaugung/Kompression aus simulierter Mars-Atmosphäre bei ~6–10 mbar, Staubfiltration, Wasseraufbereitung, asymmetrische PEM-Elektrolyse, thermisch gekoppelter Sabatier-Reaktor, Gasreinigung, Verflüssigungs-Interface).'
        },
        {
          id: 'p6-c4',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 2: Aufbau eines eigenen Teststands inkl. Mars-Atmosphären-Simulationskammer (Niederdruck-CO₂-Testumgebung, Temperaturzyklen).'
        },
        {
          id: 'p6-c5',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 3: Dauerbelastungstest >1.000 Betriebsstunden im vollautonomen Modus (ohne manuelles Eingreifen) mit KI-gestützter Predictive Maintenance und automatischer Störungsbehebung.'
        },
        {
          id: 'p6-c6',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 4 (Terrestrischer Dual-Use-Pilot): Entwicklung einer containerisierten Hochleistungs-Methanisierungs-/Power-to-Gas-Einheit für industrielle CO₂-Quellen oder dezentrale Energiespeicherung zur Generierung früher Umsätze und Feld-Zuverlässigkeitsdaten.'
        },
        {
          id: 'p6-c7',
          track: 'team',
          defaultChecked: false,
          text: 'Team & ESOP: Mitarbeiterbeteiligungsprogramm (ESOP / PSOP Pool von 10–15 %) einführen und Team von 4 auf 12–15 FTE skalieren (Catalysis, Cryogenics, Mechanical/CAD, Embedded/AI, Space Systems, Operations/Finance).'
        },
        {
          id: 'p6-c8',
          track: 'recht',
          defaultChecked: false,
          text: 'Regulierung & Qualität: Exportkontrolle prüfen (SECO Dual-Use / Güterkontrollverordnung, EU Dual-Use, ITAR/EAR), ISO 9001 einführen (Vorbereitung auf ECSS / AS9100) und erste bezahlte ESA/SSO-Studien oder Industriepiloten abschließen.'
        }
      ],
      academicTech: [
        {
          label: 'Integriertes Engineering Model (EM) & Mars-Simulationskammer',
          detail: 'Geschlossenes Gesamtsystem: CO₂-Ansaugung/Kompression bei ~6–10 mbar, Staubfiltration, Wasseraufbereitung, asymmetrische PEM-Elektrolyse, thermisch gekoppelter Sabatier-Reaktor, Gasreinigung und Verflüssigungs-Interface.'
        },
        {
          label: '>1.000h Vollautonomer Dauerbelastungstest',
          detail: 'Betrieb über 1.000 Stunden ohne manuelles Eingreifen mit KI-gestützter Predictive Maintenance und automatischer Störungsbehebung.'
        },
        {
          label: 'Terrestrischer Dual-Use-Pilot (Optionaler Umsatzhebel)',
          detail: 'Containerisierte Hochleistungs-Methanisierungs-/Power-to-Gas-Einheit für industrielle CO₂-Quellen zur Generierung von Non-Dilutive Cashflow und Feld-Zuverlässigkeitsdaten.'
        }
      ],
      financing: [
        {
          label: 'Seed-Runde (CHF 3 – 6 Mio.) & Kapitalallokation',
          detail: 'Lead-VC aus SpaceTech/Deep-Tech (Alpine Space Ventures, Seraphim Space, Redalpine, Founderful, Lakestar, Expansion). Allokation: 55 % R&D & Hardware/Teststand, 25 % Team/Gehälter, 10 % IP/Zertifizierung, 10 % BD & Operations (Runway: 24 Monate).'
        },
        {
          label: 'Institutionelle Grants & Programme',
          detail: 'ESA GSTP (General Support Technology Programme), Horizon Europe / EIC Accelerator (bis EUR 2,5 Mio. Grant + Equity), SERI / Swiss Space Office (SSO).'
        }
      ],
      teamOrg: [
        {
          label: 'Skalierung auf 12–15 FTE & 10–15 % ESOP/PSOP Pool',
          detail: 'Schlüsselrollen: Lead Chemical / Catalysis Engineer (2 FTE), Cryogenics & Thermal Management Engineer (1–2 FTE), Mechanical / CAD & Pressure Systems Engineer (2 FTE), Embedded Software, Autonomy & AI Control Engineers (2–3 FTE), Space Systems & Test Engineer (1–2 FTE), Operations, Lab Manager & Grant/Finance Controller (1–2 FTE).'
        }
      ],
      legalIpPartners: [
        {
          label: 'Exportkontrolle, Qualitätsmanagement & Pilotverträge',
          detail: 'SECO Dual-Use / Güterkontrollverordnung, EU Dual-Use, ITAR/EAR für US-Partner. Aufbau ISO 9001 als Basis für ECSS / AS9100. Abschluss erster bezahlter Machbarkeitsstudien / Entwicklungsverträge (ESA/SSO Study Contracts oder industrielle Pilotverträge).'
        }
      ],
      stageGates: [
        {
          id: 'p6-sg1',
          track: 'technik',
          defaultChecked: false,
          text: 'Stage-Gate 1 (Go/No-Go für Series A): Engineering Model erfolgreich im Mars-Simulationsumfeld auf TRL 5 getestet (>1.000h autonomer Betrieb).'
        },
        {
          id: 'p6-sg2',
          track: 'technik',
          defaultChecked: false,
          text: 'Stage-Gate 2 (Go/No-Go für Series A): Verifizierte Massen-, Volumen- und Leistungsbudgets (SWaP – Size, Weight, and Power) kompatibel mit realen Mars-/Mond-Landern.'
        },
        {
          id: 'p6-sg3',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Stage-Gate 3 (Go/No-Go für Series A): Erste bezahlte Entwicklungs- oder Pilotverträge (>CHF 500k Vertragswert) und starke VC-Pipeline für Series A.'
        }
      ]
    },

    // =========================================================================
    // PHASE 7
    // =========================================================================
    {
      id: 'phase-7',
      part: 'TEIL II: STARTUP-GRÜNDUNG, TECHNOLOGIE-ENTWICKLUNG & SKALIERUNG (2031–2040+)',
      number: 'PHASE 7',
      title: 'Series A, Raumfahrt-Qualifikation & Qualification Model (TRL 6 → TRL 7)',
      timeframe: '2035 – 2036 (ca. 24 Monate)',
      status: 'planned',
      statusBadge: 'SERIES A',
      ectsBadge: 'TRL 6 → TRL 7',
      trlBadge: 'TRL 6 → TRL 7 (Space Qualification Model)',
      capitalBadge: 'CHF 15 – 30 Mio. Series A',
      teamBadge: '15 → 40–50 FTE (VP-Level & Reinraum)',
      tracks: ['technik', 'finanzierung', 'team', 'recht'],
      summary: 'Finanzierung der CHF 15–30 Mio. Series A, Bau und vollständige ECSS/NASA-STD-Raumfahrtqualifikation des Qualification Models (TVAC, Vibration, Schock, EMV, Kryo-Integration) sowie Unterzeichnung eines verbindlichen Hosted-Payload-Flugvertrags.',
      checklist: [
        {
          id: 'p7-c1',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung 1: CHF 15 – 30 Mio. Series A mit internationalem Konsortium aus Tier-1 Deep-Tech-/Space-VCs (Europa + USA) und strategischen Corporate VCs (Luft-/Raumfahrt, Chemie, Energie) abschließen.'
        },
        {
          id: 'p7-c2',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung 2: Institutionelle Raumfahrt-Kofinanzierungen sichern (ESA Exploration Programmes, NASA SBIR/CLPS-Partnering über US-Tochtergesellschaft) und professionelle Finanz-Governance (Board of Directors, monatliches KPI-/Cashflow-Reporting, geprüfter Jahresabschluss) etablieren.'
        },
        {
          id: 'p7-c3',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 1: Konstruktion des Qualification Models (QM) in voller Raumfahrt-Bauweise (leichtbauoptimierte Titan-/Inconel-Legierungen, strahlungsgehärtete Elektronik / Rad-Hard FPGAs, redundante Ventile & Sensorik).'
        },
        {
          id: 'p7-c4',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 2: Vollständige Umwelt- und Raumfahrtqualifikation nach ECSS / NASA-STD durchführen – Vibrations- & Schocktests, Thermal-Vakuum-Tests (TVAC über −120 °C bis +30 °C), EMV-/EMI- und Strahlungstests sowie Kryo-Integration (LOX bei −183 °C, LCH₄ bei −161 °C, Zero-Boil-Off).'
        },
        {
          id: 'p7-c5',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 3: Vollständige Verifikation der autonomen Flight-Software inkl. Kommunikationslatenz-Simulation Erde–Mars von 4–24 Minuten.'
        },
        {
          id: 'p7-c6',
          track: 'team',
          defaultChecked: false,
          text: 'Team & Infrastruktur: Ausbau auf 40–50 FTE inkl. zweiter Führungsebene (VP of Engineering, Head of PA/QA, VP BD & Government Relations, CFO, Supply Chain Lead) sowie Aufbau eigener ISO-7/8-Reinraum- und Integrationsflächen.'
        },
        {
          id: 'p7-c7',
          track: 'recht',
          defaultChecked: false,
          text: 'Expansion & Verträge: Optional US-Tochtergesellschaft (Delaware C-Corp) für NASA/SpaceX/Blue Origin-Zugang gründen; Qualifikation als Tier-1/Tier-2 Subsystem-Lieferant und Abschluss eines verbindlichen Hosted-Payload-/Demonstrationsmissions-Vertrags.'
        }
      ],
      academicTech: [
        {
          label: 'Qualification Model (QM) in Raumfahrt-Bauweise',
          detail: 'Leichtbauoptimierte Titan-/Inconel-Legierungen, strahlungsgehärtete Elektronik (Rad-Hard FPGAs), zweifach redundante Ventile und Sensorik.'
        },
        {
          label: 'ECSS / NASA-STD Umwelt- & Raumfahrtqualifikation',
          detail: 'Vibrations- & Schocktests (Startbelastung Schwerlastraketen), Thermal-Vakuum-Tests (TVAC über −120 °C bis +30 °C), EMV-/EMI- & Strahlungstests sowie kryogene Verflüssigungs- & Lagerungs-Integration (LOX −183 °C, LCH₄ −161 °C, Zero-Boil-Off-Schnittstelle).'
        },
        {
          label: 'Autonome Flight-Software Verifikation',
          detail: 'Hardware-in-the-Loop-Tests unter realer Kommunikationslatenz-Simulation Erde–Mars (4 bis 24 Minuten Verzögerung).'
        }
      ],
      financing: [
        {
          label: 'Series A (CHF 15 – 30 Mio.) & Raumfahrt-Kofinanzierung',
          detail: 'Internationales Konsortium aus Tier-1 Space-/Deep-Tech-VCs und Corporate VCs, flankiert durch ESA Exploration Programmes und NASA SBIR/CLPS-Partnering. Professionelle Governance mit Board of Directors und Big-4/geprüftem Jahresabschluss.'
        }
      ],
      teamOrg: [
        {
          label: 'Ausbau auf 40–50 FTE & VP-Führungsebene',
          detail: 'VP of Engineering / Chief Systems Engineer (mit Flight-Heritage), Head of Quality, Assurance & Space Qualification (PA/QA), VP Business Development & Government Relations (ESA, NASA, Primes), Head of Finance / CFO, Supply Chain & Manufacturing Lead. Eigene ISO-7/8-Reinraum-Integrationsflächen.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Hosted-Payload-Vertrag, AS9100 & US-Präsenz (Delaware C-Corp)',
          detail: 'Verbindlicher Hosted-Payload- oder Demonstrationsmissions-Vertrag auf kommerziellem Mond-/Mars-Lander. Zertifizierung nach AS9100 / ECSS und Qualifikation als Tier-1/Tier-2 Lieferant.'
        }
      ],
      stageGates: [
        {
          id: 'p7-sg1',
          track: 'technik',
          defaultChecked: false,
          text: 'Stage-Gate 1 (Go/No-Go für Series B): Qualification Model besteht TVAC-, Vibrations- und Langzeittests erfolgreich (TRL 6/7 erreicht).'
        },
        {
          id: 'p7-sg2',
          track: 'recht',
          defaultChecked: false,
          text: 'Stage-Gate 2 (Go/No-Go für Series B): Verbindlicher Flug-/Demonstrationsvertrag (Launch Slot & Payload Integration Agreement) unterzeichnet.'
        },
        {
          id: 'p7-sg3',
          track: 'recht',
          defaultChecked: false,
          text: 'Stage-Gate 3 (Go/No-Go für Series B): Zertifiziertes Qualitätsmanagementsystem (AS9100 / ECSS-konform).'
        }
      ]
    },

    // =========================================================================
    // PHASE 8
    // =========================================================================
    {
      id: 'phase-8',
      part: 'TEIL II: STARTUP-GRÜNDUNG, TECHNOLOGIE-ENTWICKLUNG & SKALIERUNG (2031–2040+)',
      number: 'PHASE 8',
      title: 'Series B, Flight Model (FM) & Planetare Demonstration (TRL 8 → TRL 9)',
      timeframe: '2037 – 2039 (ca. 30 Monate)',
      status: 'planned',
      statusBadge: 'SERIES B / FLIGHT',
      ectsBadge: 'TRL 8 → TRL 9',
      trlBadge: 'TRL 8 → TRL 9 (Flight Proven In-Situ)',
      capitalBadge: 'CHF 50 – 100+ Mio. Series B + Projektfinanzierung',
      teamBadge: '50 → 120–150 FTE (Mission Control & Serienbau)',
      tracks: ['technik', 'finanzierung', 'team', 'recht'],
      summary: 'Reinraum-Fertigung und Abnahme des Flight Models (FM), Integration auf dem Lander, Start, erfolgreiche reale In-Situ-Erzeugung von Methan und Sauerstoff im All (TRL 9 Flight Heritage) und Überführung in das Full-Scale-Seriendesign.',
      checklist: [
        {
          id: 'p8-c1',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Finanzierung: CHF 50 – 100+ Mio. Series B + Projektfinanzierung mit Growth-Equity-Investoren, Staatsfonds, strategischen Aerospace- & Energie-Konzernen sowie Milestone-based Payments aus Raumfahrt-Aufträgen sichern.'
        },
        {
          id: 'p8-c2',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 1: Fertigung, Integration und Abnahmetests (Acceptance Testing) des Flight Models (FM) unter Reinraumbedingungen.'
        },
        {
          id: 'p8-c3',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 2: Integration auf dem Träger-Lander, Pre-Launch-Checkout, Start und interplanetarer Transit.'
        },
        {
          id: 'p8-c4',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 3 (In-Situ-Demonstrationsbetrieb auf Mond/Mars): Erfolgreiche reale Erzeugung von Methan und Sauerstoff im angestrebten Mischungsverhältnis unter realen planetaren Bedingungen, Übertragung vollständiger Telemetriedaten zur Erde.'
        },
        {
          id: 'p8-c5',
          track: 'technik',
          defaultChecked: false,
          text: 'Technik 4: Auswertung der Flugdaten, Zertifizierung des Gesamtsystems auf TRL 9 (Flight Proven) und Überführung in das Design der kommerziellen Full-Scale-Anlage (Multi-Tonnen-Methalox-Produktion pro synodischem Zyklus).'
        },
        {
          id: 'p8-c6',
          track: 'team',
          defaultChecked: false,
          text: 'Team & Organisation (50 → 120–150 FTE): Aufbau von eigenem Missionsbetrieb (Mission Control & Telemetry Team), Serienfertigungs-Engineering (Design for Manufacturing), Beschaffung/Qualitätskontrolle für Raumfahrt-Zulieferketten, Legal/Compliance und internationalem Sales/Program-Management.'
        }
      ],
      academicTech: [
        {
          label: 'Flight Model (FM) Acceptance Testing & Launch',
          detail: 'Reinraum-Endmontage, Abnahmetests, Lander-Integration, Pre-Launch-Checkout, Start und Transit.'
        },
        {
          label: 'In-Situ-Demonstrationsbetrieb auf Mond/Mars (TRL 9)',
          detail: 'Reale Erzeugung von Methan und Sauerstoff im Ziel-Mischungsverhältnis unter planetaren Bedingungen inkl. lückenloser Telemetrie zur Erde. Auswertung der Flugdaten für das Full-Scale-Anlagendesign.'
        }
      ],
      financing: [
        {
          label: 'Series B (CHF 50 – 100+ Mio.) & Milestone-Payments',
          detail: 'Growth-Equity-Investoren, Staatsfonds, strategische Aerospace-/Energie-Konzerne sowie projektgebundene Raumfahrt-Aufträge von Agenturen und kommerziellen Missions-Betreibern.'
        }
      ],
      teamOrg: [
        {
          label: 'Skalierung auf 120–150 FTE & 24/7 Mission Control',
          detail: 'Eigenes Mission Control & Telemetry Team, Design-for-Manufacturing (Serienfertigungs-Engineering), Raumfahrt-Supply-Chain-QA, Legal/Compliance und globales Program Management.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Kommerzielle Full-Scale Liefer- & Abnahmeverträge',
          detail: 'Abschluss langfristiger Liefer- und Abnahmeverträge für Full-Scale-Produktionsmodule auf Basis der nachgewiesenen TRL-9-Flight-Heritage.'
        }
      ],
      stageGates: [
        {
          id: 'p8-sg1',
          track: 'technik',
          defaultChecked: false,
          text: 'Stage-Gate 1: Erfolgreicher In-Situ-Betrieb und verifizierte Treibstoffproduktion im All (Flight Heritage / TRL 9).'
        },
        {
          id: 'p8-sg2',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Stage-Gate 2: Erste langfristige Abnahme- oder Lieferverträge für Full-Scale-Produktionsmodule (Backlog >CHF 100 Mio.).'
        }
      ]
    },

    // =========================================================================
    // PHASE 9
    // =========================================================================
    {
      id: 'phase-9',
      part: 'TEIL II: STARTUP-GRÜNDUNG, TECHNOLOGIE-ENTWICKLUNG & SKALIERUNG (2031–2040+)',
      number: 'PHASE 9',
      title: 'Kommerzielle Skalierung, Full-Scale ISRU-Fabriken & Marktführerschaft (Series C+ / 2039+)',
      timeframe: 'Ab 2039+',
      status: 'planned',
      statusBadge: 'SCALE-UP / SERIES C+',
      ectsBadge: 'TRL 9 Serienbetrieb',
      trlBadge: 'TRL 9 (Multi-Tonnen ISRU-Fabriken)',
      capitalBadge: 'Series C+ / IPO (SIX / NASDAQ)',
      teamBadge: '150 → 300+ FTE (CH / USA / EU)',
      tracks: ['technik', 'finanzierung', 'team', 'recht'],
      summary: 'Serienproduktion modularer, stapelbarer Full-Scale-Methalox-Anlagen, Einführung von Propellant-as-a-Service (PaaS), horizontale Expansion in Lebenserhaltung und In-Situ-Synthesechemie sowie Börsengang (IPO) oder globale Marktführerschaft.',
      checklist: [
        {
          id: 'p9-c1',
          track: 'technik',
          defaultChecked: false,
          text: 'Skalierung 1: Serienproduktion modularer, stapelbarer ISRU-Methalox-Anlagen für bemannte und unbemannte Mars-Rückkehrmissionen (exakte 3,55:1 O₂:CH₄-Versorgung für schwere Methalox-Trägersysteme).'
        },
        {
          id: 'p9-c2',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Skalierung 2: Einführung langfristiger „Propellant-as-a-Service“ (PaaS)-Verträge (Lieferung von verflüssigtem Treibstoff direkt in Oberflächentanks oder orbitale Depots).'
        },
        {
          id: 'p9-c3',
          track: 'technik',
          defaultChecked: false,
          text: 'Skalierung 3 (Horizontale Produkt-Expansion): Planetare Wasserextraktion und -aufbereitung, Sauerstoff- und Lebenserhaltungssysteme für Habitate, In-Situ-Synthesechemie (Polymere, Düngemittel, Baustoff-Additive) sowie terrestrische Hochdruck-/Hochtemperatur-Power-to-X-Lizenzierung.'
        },
        {
          id: 'p9-c4',
          track: 'team',
          defaultChecked: false,
          text: 'Organisation (150 → 300+ FTE): Ausbau der internationalen Standorte (Hauptsitz & R&D Schweiz, Aerospace-Hub USA, europäische Integrationszentren).'
        },
        {
          id: 'p9-c5',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Kapitalmarkt & Strategische Optionen: Börsengang (IPO an SIX / NASDAQ), Etablierung als unabhängiger europäisch-globaler Deep-Tech-Marktführer für extraterrestrische Chemie-Infrastruktur oder strategische Allianz mit führenden Raumfahrtkonzernen.'
        }
      ],
      academicTech: [
        {
          label: 'Modulare, stapelbare Full-Scale ISRU-Fabriken',
          detail: 'Seriengefertigte Anlagencluster zur Versorgung bemannter und unbemannter Mars-Rückkehrmissionen mit exakt 3,55:1 O₂:CH₄.'
        },
        {
          label: 'Horizontale Planetare Chemie-Expansion',
          detail: 'Planetare Wasserextraktion und -aufbereitung, Sauerstoff- und Lebenserhaltungssysteme (ECLSS) für Habitate, In-Situ-Synthesechemie (Polymere, Düngemittel, Baustoff-Additive) und terrestrische Power-to-X-Lizenzierung.'
        }
      ],
      financing: [
        {
          label: 'Propellant-as-a-Service (PaaS) & IPO-Readiness (SIX / NASDAQ)',
          detail: 'Langfristige Infrastruktur-Abnahmeverträge für verflüssigten Treibstoff auf der Oberfläche oder in orbitalen Depots. Strategische Kapitalmarktoptionen inkl. Börsengang (IPO an SIX oder NASDAQ).'
        }
      ],
      teamOrg: [
        {
          label: 'Globale Organisation (150 → 300+ FTE)',
          detail: 'Hauptsitz & R&D in der Schweiz, Aerospace-Hub in den USA und europäische Integrations- und Reinraumzentren.'
        }
      ],
      legalIpPartners: [
        {
          label: 'Globales IP-Portfolio & Strategische Allianzen',
          detail: 'Umfassendes internationales Patent- und Lizenzportfolio für extraterrestrische Chemie-Infrastruktur und strategische Allianzen mit Raumfahrt-Primes und Regierungsagenturen.'
        }
      ],
      stageGates: [
        {
          id: 'p9-sg1',
          track: 'technik',
          defaultChecked: false,
          text: 'Stage-Gate 1: Operativer Multi-Tonnen-Serienbetrieb von ISRU-Methalox-Clustern und aktive Propellant-as-a-Service (PaaS)-Versorgung.'
        },
        {
          id: 'p9-sg2',
          track: 'finanzierung',
          defaultChecked: false,
          text: 'Stage-Gate 2: Globale Marktführerschaft für extraterrestrische Chemie-Infrastruktur / erfolgreicher IPO (SIX / NASDAQ).'
        }
      ]
    }
  ]
};

window.FOUNDER_ROADMAP_DATA = FOUNDER_ROADMAP_DATA;

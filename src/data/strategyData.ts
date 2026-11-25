/**
 * ============================================================================
 * METHALOX SYSTEMS AG — GRAND STRATEGY & CHOKEPOINT DOCTRINE DATA (TS)
 * Typisierte Datenstruktur (Säulen 1–5, ASML-Chokepoint-Matrix & Macht-Scorecard)
 * ============================================================================
 */

export type AsmlDimensionStatus = 'Konzept' | 'Im Aufbau' | 'Validiert' | 'Dominant';

export interface StrategyKpi {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly subtext: string;
  readonly accent: string;
}

export interface NumberedStrategyItem {
  readonly num: string;
  readonly title: string;
  readonly text: string;
}

export interface StrategyBlock {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly subHeading?: string;
  readonly numberedItems?: readonly NumberedStrategyItem[];
}

export interface StrategyPillar {
  readonly id: string;
  readonly anchorId: string;
  readonly number: string;
  readonly shortNav: string;
  readonly title: string;
  readonly subtitle: string;
  readonly accentColor: string;
  readonly borderColor: string;
  readonly blocks?: readonly StrategyBlock[];
  readonly principles?: readonly NumberedStrategyItem[];
}

export interface AsmlChokepointRow {
  readonly id: string;
  readonly dimension: string;
  readonly asmlModel: string;
  readonly ourTarget: string;
  readonly moat: string;
  readonly defaultStatus: AsmlDimensionStatus;
}

export interface ScorecardMilestone {
  readonly id: string;
  readonly text: string;
}

export interface PowerScorecardDimension {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly accentColor: string;
  readonly milestones: readonly ScorecardMilestone[];
}

export interface FounderStrategyData {
  readonly executiveHeader: {
    readonly classification: string;
    readonly title: string;
    readonly northStarLabel: string;
    readonly northStarStatement: string;
    readonly kpis: readonly StrategyKpi[];
  };
  readonly pillars: readonly StrategyPillar[];
  readonly asmlMatrixStatusCycle: readonly AsmlDimensionStatus[];
  readonly asmlChokepointMatrix: readonly AsmlChokepointRow[];
  readonly powerScorecardDimensions: readonly PowerScorecardDimension[];
}

// Batch B: KB, KR, LJ, LF, MJ, SW, VK

import type { PersonHistory } from './team-history-a'

export const TEAM_HISTORY_B: Record<string, PersonHistory> = {
  KB: {
    hist: [
      { q: 'Q4 FY25', obj: 'Build a high-performing HR function fit for Jeffries growth', prog: 58, note: 'Employment Hero onboarding 70%, contracts audit 45%, engagement baseline 60%.' },
      { q: 'Q1 FY26', obj: 'Embed Employment Hero and standardise people processes', prog: 74, note: 'HRIS live for all staff 90%, onboarding workflow 80%, payroll integration 60%.' },
      { q: 'Q2 FY26', obj: 'Drive engagement, compliance, and performance frameworks', prog: 63, note: 'Performance review cycle 80%, EBA compliance review 50%, engagement survey 60%.' },
    ],
    patterns: [
      'Employment Hero implementation has been a multi-quarter focus and is largely stable — Q1 FY27 should shift to people outcomes, not system build.',
      'EBA compliance and contract standardisation have consistently sat at 45–50% — these are risk items that need dedicated completion.',
      'Engagement survey scores are being captured but action plans from results are not well evidenced in KRs.',
    ],
    strategic: [
      'EBA compliance and individual contract standardisation across all staff',
      'Performance management cycle — mid-year and annual review delivery',
      'Recruitment pipeline for Operations and Sales roles',
      'Engagement and wellbeing baseline from Employment Hero data',
    ],
  },

  KR: {
    hist: [
      { q: 'Q2 FY26', obj: 'Strengthen HR administration and onboarding delivery', prog: 55, note: 'Onboarding checklist 70%, employment documentation 50%, training registers 40%.' },
      { q: 'Q3 FY26', obj: 'Improve HR documentation quality and recruitment support', prog: 61, note: 'Position descriptions 65%, job ads 80%, induction scheduling 40%.' },
    ],
    patterns: [
      'Induction scheduling and training register completion are the consistent weak points — both require cross-functional cooperation that needs clearer ownership.',
      'Documentation quality has improved from Q2 to Q3 — continue this trajectory in Q1 FY27.',
      'Recruitment support is the emerging growth area — set clearer KRs around time-to-offer and candidate experience.',
    ],
    strategic: [
      'Employment Hero training module management and completion tracking',
      'Position description library — current, accurate, and signed off',
      'Induction scheduling and completion across Operations new starters',
      'Recruitment administration support for Katie Burnett',
    ],
  },

  LJ: {
    hist: [
      { q: 'Q1 FY26', obj: 'Define Jeffries 3-year strategic direction and capital priorities', prog: 68, note: 'Strategic workshops 100%, capital assessment 70%, board narrative 40%.' },
      { q: 'Q2 FY26', obj: 'Strengthen board governance and external stakeholder relationships', prog: 75, note: 'Board meeting cadence 100%, stakeholder engagement 60%, advisory relationships 80%.' },
      { q: 'Q3 FY26', obj: 'Support Post East Waste launch and external partnership development', prog: 50, note: 'Regulatory liaison 60%, partner introductions 50%, investment narrative 40%.' },
    ],
    patterns: [
      'Strategic narrative and board governance are consistently strong — capital and investment documentation tends to lag.',
      'Post East Waste is an emerging priority that has appeared for two quarters without full resolution — Q1 FY27 needs a clear milestone.',
      'External stakeholder and advisory relationships are a high-value activity — ensure dedicated time allocation is in the OKR.',
    ],
    strategic: [
      '3-year strategic plan finalisation and board endorsement',
      'Post East Waste — regulatory pathway and investment structure',
      'External advisory and industry body representation',
      'Capital allocation decisions for FY27 operations',
    ],
  },

  LF: {
    hist: [
      { q: 'Q2 FY26', obj: 'Build Ag revenue pipeline and grower relationships in territory', prog: 49, note: 'Grower visits 60%, CRM entries 50%, product trial placements 40%.' },
      { q: 'Q3 FY26', obj: 'Drive pre-season Ag sales and secure key grower commitments', prog: 62, note: 'Pre-season orders 70%, trial follow-up 65%, agronomist introductions 55%.' },
      { q: 'Q4 FY26', obj: 'Close FY26 Ag season strong and prepare FY27 grower pipeline', prog: 38, note: 'Season close revenue 45%, pipeline documentation 35%, territory review 30%.' },
    ],
    patterns: [
      'Pre-season engagement (Q3) is the strongest quarter — Q1 FY27 should capitalise on post-season follow-up to lock in early FY27 commitments.',
      'CRM discipline and pipeline documentation remain consistently below 50% — this is a structural gap in territory management.',
      'Agronomist and consultant relationships are an untapped multiplier — set a dedicated KR for Q1 FY27.',
    ],
    strategic: [
      'FY27 Ag revenue — grower pipeline and pre-season order conversion',
      'CRM discipline — territory visit logging and opportunity tracking',
      'BioChar and CulChar product trial placements with grower proof points',
      'Agronomist and farm consultant relationship development',
    ],
  },

  MJ: {
    hist: [
      { q: 'Q1 FY26', obj: 'Drive cross-divisional alignment and financial accountability', prog: 77, note: 'Leadership alignment sessions 90%, budget review cadence 80%, strategic priorities communicated 60%.' },
      { q: 'Q2 FY26', obj: 'Accelerate 3-year plan development and capital decisions', prog: 69, note: 'Strategic plan draft 80%, capital proposal 55%, JCS commercial review 70%.' },
      { q: 'Q3 FY26', obj: 'Strengthen operational performance and leadership team capability', prog: 72, note: 'OEE review 75%, leadership team OKR completion 70%, Post East Waste progress 65%.' },
    ],
    patterns: [
      'Consistently mid-70s delivery across strategic and operational objectives — a strong baseline.',
      'Capital decisions and investment proposals tend to lag narrative and governance work — ensure financial data is ready earlier.',
      'Post East Waste has been in progress for multiple quarters — Q1 FY27 needs a defined decision gate or milestone.',
    ],
    strategic: [
      '3-year strategic plan — board endorsement and execution roadmap',
      'Post East Waste — commercial model, regulatory pathway, go/no-go decision',
      'FY27 budget management and monthly financial review cadence',
      'Leadership team capability and OKR culture across Jeffries',
    ],
  },

  SW: {
    hist: [
      { q: 'Q4 FY25', obj: 'Establish operational baseline and leadership structure', prog: 61, note: 'Site structure 80%, ROSS reporting 55%, safety incident reduction 50%.' },
      { q: 'Q1 FY26', obj: 'Drive OEE improvement and reduce unplanned downtime', prog: 58, note: 'OEE baseline 70%, downtime reporting 50%, preventive maintenance 55%.' },
      { q: 'Q2 FY26', obj: 'Strengthen safety culture and operational compliance', prog: 67, note: 'Safety audit completion 80%, incident response time 60%, compliance documentation 60%.' },
    ],
    patterns: [
      'OEE and downtime reporting have been in progress for two quarters — measurement systems need to be finalised before improvement targets make sense.',
      'Safety compliance scores are improving but documentation and audit completion still lag — Q1 FY27 should embed rather than build.',
      'Buckland Park transition is a growing strategic priority — ensure it has dedicated OKR space.',
    ],
    strategic: [
      'OEE improvement and unplanned downtime reduction across Pellet Plant',
      'Buckland Park site transition — operational readiness and timeline',
      'NHVR and environmental compliance across Operations',
      'Labour productivity and shift efficiency across production and logistics',
    ],
  },

  VK: {
    hist: [
      { q: 'Q3 FY25', obj: 'Stabilise Pellet Plant production and reduce reject rates', prog: 55, note: 'Reject rate reduction 60%, shift handover 50%, maintenance scheduling 55%.' },
      { q: 'Q1 FY26', obj: 'Improve ROSS data capture and production reporting accuracy', prog: 63, note: 'ROSS entries 75%, production report accuracy 60%, downtime coding 55%.' },
      { q: 'Q2 FY26', obj: 'Drive OEE improvement and optimise production scheduling', prog: 70, note: 'OEE metric 75%, scheduling adherence 70%, shift leader capability 65%.' },
    ],
    patterns: [
      'Steady improvement trajectory (55→63→70%) — Q1 FY27 targets should step up, particularly on OEE and ROSS data quality.',
      'Downtime coding and ROSS data capture accuracy are the consistent weak spots — invest in shift leader training here.',
      'Production scheduling adherence is improving — formalise this as a standard KR with a defined target percentage.',
    ],
    strategic: [
      'OEE target achievement — Pellet Plant C-100, CulChar, BioChar lines',
      'ROSS production data accuracy and real-time reporting',
      'Reject rate reduction and product quality consistency',
      'Shift leader capability and handover process standardisation',
    ],
  },
}

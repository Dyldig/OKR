// Batch A: AQ, AMV, BRS, CH, CW, DV, DS, DD

export interface PersonHistory {
  hist: { q: string; obj: string; prog: number; note: string }[]
  patterns: string[]
  strategic: string[]
}

export const TEAM_HISTORY_A: Record<string, PersonHistory> = {
  AQ: {
    hist: [
      { q: 'Q2 FY26', obj: 'Formalise maintenance capabilities across site', prog: 52, note: 'Competency matrix 77% complete but contractor pool only 30% — third-party execution gap.' },
      { q: 'Q3 FY26', obj: 'Install grant-funded solar project on schedule', prog: 48, note: 'Project management delivered 100% but site coordination lagged at 35%.' },
      { q: 'Q4 FY26', obj: 'Establish uncompromising maintenance standards across Jeffries sites', prog: 0, note: 'New quarter — confirm which items carry forward from Q3.' },
    ],
    patterns: [
      'Third-party and multi-stakeholder tasks consistently lag internal ones — contractor pool and site coordination have underperformed in two consecutive quarters.',
      'Q4 FY26 at 0% — confirm which items carry forward before setting Q1 FY27 targets.',
      'Build objectives delivered strongly when focused on internal systems; external dependencies are the key risk factor.',
    ],
    strategic: [
      'Maintenance system reliability across Pellet Plant and ROSS production line',
      'Contractor qualification and oversight framework',
      'Post East Waste operational readiness and maintenance support',
    ],
  },

  AMV: {
    hist: [
      { q: 'Q3 FY26', obj: 'Achieve 100% NHVR compliance across Jeffries fleet', prog: 17, note: 'Compliance documentation at 1%, pre-start standardisation at 0% — process not embedded.' },
    ],
    patterns: [
      'NHVR compliance documentation is a critical carry-forward — this is a regulatory risk if not resolved in Q1 FY27.',
      'Only one full quarter of OKR history — use Q1 FY27 to establish a strong, measurable baseline.',
      'Pre-start and end-of-day process standardisation are the foundational gaps; driver engagement and training follow from there.',
    ],
    strategic: [
      'NHVR mass management compliance and documentation',
      'Pre-start and end-of-day process standardisation across all drivers',
      'Driver training and compliance culture across Logistics team',
    ],
  },

  BRS: {
    hist: [
      { q: 'Q4 FY26', obj: 'Grow Ag customer base and support Lintern in territory development', prog: 0, note: 'New quarter — targets: 9 grower visits, territory volume, Major Accounts Plan draft.' },
    ],
    patterns: [
      'First full quarter of OKRs — set a realistic foundation rather than overcommitting.',
      'Visit cadence and pipeline documentation are the leading indicators of future revenue performance.',
      'Major Accounts Plan is a key strategic deliverable — confirm timeline and stakeholder sign-off upfront.',
    ],
    strategic: [
      'Agriculture division growth push alongside Lintern Fairbrother',
      'Major Accounts Plan development and stakeholder presentation',
      'Pre-season grower engagement and pipeline building for FY27',
    ],
  },

  CH: {
    hist: [
      { q: 'Q4 FY25', obj: 'Build a sustainable and capable accounting team', prog: 44, note: 'Onboarding 50%, process documentation 25%, team satisfaction 0%.' },
      { q: 'Q1 FY26', obj: 'Overhaul GP data accuracy and CRM financial alignment', prog: 65, note: 'Audit and code reduction 100% but CRM alignment 20% and invoicing error rate 5%.' },
      { q: 'Q2 FY26', obj: 'Implement AP automation and Employment Hero payroll', prog: 100, note: 'Employment Hero payroll fully delivered — strongest quarter on record.' },
    ],
    patterns: [
      'Finance transformation is a multi-quarter journey — payroll is done, but GP/CRM alignment and AP automation remain incomplete.',
      'Process documentation and team satisfaction KRs consistently underperform — these need dedicated ownership.',
      'AP automation at 2% and product costing review at 0% in Q4 FY26 are critical carry-forwards for Q1 FY27.',
    ],
    strategic: [
      'Full product costing review for manufactured goods (Pellets range, compost)',
      'AP automation go-live via AP Link integration',
      'Management accounts timeliness and monthly reporting cadence',
      'Budget variance management and financial controls',
    ],
  },

  CW: {
    hist: [
      { q: 'Q3 FY26', obj: 'Launch standardised risk assessment framework across operations', prog: 40, note: 'Migration 50%, protocol completion 20%, live assessments 50%.' },
      { q: 'Q4 FY26', obj: 'Design and fully launch risk assessment system', prog: 0, note: 'Continuation of Q3 — framework not yet fully embedded.' },
    ],
    patterns: [
      'Risk framework has been in progress for two consecutive quarters — Q1 FY27 should focus on embedding and measuring usage, not still building.',
      'Training delivery and compliance tracking are the key missing activities that will drive completion.',
      'Protocol completion at 20% in Q3 is the root cause — prioritise finishing documentation before measuring adoption.',
    ],
    strategic: [
      'SA WHS compliance gap closure across all operational sites',
      'Risk assessment framework embedding across Operations team',
      'Training program delivery and completion tracking via Employment Hero',
    ],
  },

  DV: {
    hist: [
      { q: 'Q4 FY25', obj: 'Increase Trade Market Growth vs FY24 baseline', prog: 64, note: 'Operating days and revenue at 85% but customer follow-up at 0%.' },
      { q: 'Q1 FY26', obj: 'Drive strong Powerscaper Q1 performance', prog: 72, note: 'Volume and revenue 65–80%, Trade meetings 80%.' },
      { q: 'Q2 FY26', obj: 'Drive strong Q2 Powerscaper performance', prog: 87, note: 'Volume and revenue both 80%, Trade meetings 100%.' },
    ],
    patterns: [
      'Powerscaper performance has improved consistently — Q1 FY27 targets should step up from the Q2 FY26 baseline.',
      'Customer follow-up and outbound pipeline work remains the weakest KR every quarter — needs dedicated time allocation.',
      'Daily revenue and volume metrics are well-understood and reliable anchors — build from these.',
    ],
    strategic: [
      'Powerscaper volume and daily revenue targets (step up from Q2 FY26)',
      'Trade customer relationships — Tier 1 and Tier 2 visit cadence',
      'Pre-winter pipeline planning and customer retention',
    ],
  },

  DS: {
    hist: [
      { q: 'Q4 FY25', obj: 'Achieve $6m JCS revenue trajectory by FY26 end', prog: 37, note: 'Service futility resolution 50%, partner relationships 28%.' },
      { q: 'Q2 FY26', obj: 'Drive high-impact JCS growth and service quality', prog: 82, note: 'Oversight 90%, visits 60%, opportunity report 95%.' },
      { q: 'Q3 FY26', obj: 'Support sustainable JCS growth and customer retention', prog: 45, note: 'New customer engagement 25%, face-to-face visits 5%.' },
    ],
    patterns: [
      'JCS performance is volatile — strong Q2 (82%) followed by weak Q3 (45%) — consistency mechanisms are needed.',
      'Service futilities have appeared in multiple quarters and are still not fully resolved — this must be a primary Q1 FY27 focus.',
      'Customer engagement velocity (new customer visits within 30 days) is the key lead indicator and consistently underperforms.',
    ],
    strategic: [
      'JCS $6m FY26 revenue — confirm final result and set Q1 FY27 trajectory',
      'Service futility elimination and zero-fault onboarding',
      'Waste partner relationship development (Cleanaway, councils)',
      'New customer onboarding quality and 90-day retention',
    ],
  },

  DD: {
    hist: [
      { q: 'Q4 FY25', obj: 'Drive sustainable sales growth via DJV engagement and pipeline', prog: 72, note: 'Joint meetings 50%, high-value identification 100%, playbook complete.' },
      { q: 'Q1 FY26', obj: 'Improve sales team effectiveness and CRM enablement', prog: 91, note: 'CRM audit 100%, initiatives 85%, training 80%.' },
      { q: 'Q2 FY26', obj: 'Strengthen reseller partnerships and RDN growth', prog: 71, note: 'Rebate overhaul 60%, comms rhythm 60%, proposal 80%, promotions 85%.' },
    ],
    patterns: [
      'Consistently strong delivery (72–91%) — one of the highest performers in the leadership team.',
      'CRM and sales enablement work is largely complete — Q1 FY27 should sustain and measure impact, not rebuild it.',
      'Reseller and RDN strategy is maturing but comms cadence and reporting lag the structural work done.',
    ],
    strategic: [
      'Sales team performance, accountability, and quota attainment',
      'JCS commercial strategy and team enablement (Darren Scott support)',
      'Reseller and RDN programme maturity — comms rhythm and rebate compliance',
      '3-year strategic plan execution from the sales perspective',
    ],
  },
}

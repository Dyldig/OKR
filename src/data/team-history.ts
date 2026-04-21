export const TEAM_HISTORY: Record<string, { hist: { q: string; obj: string; prog: number; note: string }[]; patterns: string[]; strategic: string[] }> = {
  AQ: {
    hist: [
      { q:'Q2 FY26', obj:'Formalise maintenance capabilities', prog:52, note:'Competency matrix 77% but contractor pool 30%. Third-party execution gap.' },
      { q:'Q3 FY26', obj:'Install grant-funded solar project', prog:48, note:'Project management 100% but site coordination 35%. Downstream tasks stall.' },
      { q:'Q4 FY26', obj:'Establish uncompromising maintenance standards', prog:0, note:'New quarter — confirm carryovers before resetting.' },
    ],
    patterns: ['Third-party tasks consistently lag internal ones.','Q4 FY26 at 0% — confirm which items carry forward.','Build objectives deliver strongly when focused on internal systems.'],
    strategic: ['Maintenance system reliability (Pellet Plant, ROSS)','Contractor qualification and oversight','Post East Waste operational readiness'],
  },
  AMV: {
    hist: [
      { q:'Q3 FY26', obj:'Achieve 100% NHVR compliance', prog:17, note:'Compliance documentation 1%, pre-start standardisation 0%. Process not yet embedded.' },
    ],
    patterns: ['NHVR compliance is a critical carry-forward — strong process risk if unresolved.','Only one full quarter of OKR history — use Q1 FY27 to set a strong baseline.'],
    strategic: ['NHVR mass management compliance','Pre-start and end-of-day process standardisation','Driver training and compliance culture'],
  },
  BRS: {
    hist: [
      { q:'Q4 FY26', obj:'Grow Ag customer base and support Lintern', prog:0, note:'New quarter. Focus: 9 visits, territory volume, Major Accounts Plan.' },
    ],
    patterns: ['First full quarter of OKRs — set a realistic foundation, not an overcommit.','Visit cadence and pipeline documentation are the key lead indicators.','Major Accounts Plan is a key deliverable — confirm scope and timeline upfront.'],
    strategic: ['Agriculture division growth push','Major Accounts Plan development','Pre-season grower engagement and pipeline'],
  },
  CH: {
    hist: [
      { q:'Q4 FY25', obj:'Build sustainable accounting team', prog:44, note:'Onboarding 50%, process docs 25%, team satisfaction 0%. Structural work incomplete.' },
      { q:'Q1 FY26', obj:'Overhaul GP data accuracy', prog:65, note:'Audit and code reduction 100% but CRM alignment 20% and invoicing errors 5% lagged.' },
      { q:'Q2 FY26', obj:'Implement AP automation and payroll', prog:100, note:'Employment Hero payroll fully delivered. Strongest quarter.' },
    ],
    patterns: ['Finance transformation is multi-quarter — payroll done, GP/CRM alignment still incomplete.','Process documentation and team satisfaction consistently underperform.','AP automation at 2% and costing review at 0% in Q4 FY26 — critical carry-forwards.'],
    strategic: ['Full product costing review (manufactured goods)','AP automation go-live (AP Link)','Management accounts timeliness','Budget variance management'],
  },
  CW: {
    hist: [
      { q:'Q3 FY26', obj:'Launch standardised risk assessment framework', prog:40, note:'Migration 50%, protocol completion 20%, live assessments 50%. Exists but not embedded.' },
      { q:'Q4 FY26', obj:'Design and fully launch risk assessment system', prog:0, note:'Continuation of Q3 work.' },
    ],
    patterns: ['Risk framework in progress for 2 quarters — Q1 FY27 must focus on embedding, not still building.','Compliance gap analysis and training delivery are the key activities for this role.'],
    strategic: ['SA WHS compliance gap closure','Risk assessment embedding across operations','Training program delivery and tracking'],
  },
  DV: {
    hist: [
      { q:'Q4 FY25', obj:'Increase Trade Market Growth vs FY24', prog:64, note:'Operating days and revenue 85% but customer follow-up 0%.' },
      { q:'Q1 FY26', obj:'Drive strong Powerscaper Q1 performance', prog:72, note:'Volume and revenue 65–80%. Trade meetings 80%.' },
      { q:'Q2 FY26', obj:'Drive strong Q2 Powerscaper performance', prog:87, note:'Volume and revenue both 80%. Trade meetings 100%. Best quarter.' },
    ],
    patterns: ['Powerscaper performance improving consistently — step up Q1 FY27 targets from Q2 FY26 baseline.','Customer follow-up and outbound pipeline work is the weakest KR every quarter.','Daily revenue and volume metrics are well-understood — use these as KR anchors.'],
    strategic: ['Powerscaper volume and daily revenue','Trade customer relationships (Tier 1/2)','Pre-winter pipeline planning and seasonal prep'],
  },
  DS: {
    hist: [
      { q:'Q4 FY25', obj:'Achieve $6m JCS revenue by FY26 end', prog:37, note:'Service futility resolution 50%, partner relationships 28%. Revenue well off pace.' },
      { q:'Q2 FY26', obj:'Drive high-impact JCS growth', prog:82, note:'Oversight 90%, visits 60%, opportunity report 95%. Best quarter.' },
      { q:'Q3 FY26', obj:'Support sustainable JCS growth', prog:45, note:'New customer engagement 25%, face-to-face 5%. Significant drop after strong Q2.' },
    ],
    patterns: ['JCS performance is volatile — strong Q2 followed by weak Q3. Consistency is the challenge.','Service futilities have appeared in multiple quarters and are not fully resolved.','New customer visit within 30 days is the single most important lead indicator.'],
    strategic: ['JCS $6m FY26 revenue — confirm final result','Service futility elimination','Waste partner relationship development','Customer onboarding quality'],
  },
  DD: {
    hist: [
      { q:'Q4 FY25', obj:'Drive sustainable sales growth via DJV engagement', prog:72, note:'Joint meetings 50%, high-value identification 100%, playbook complete.' },
      { q:'Q1 FY26', obj:'Improve sales team effectiveness and CRM enablement', prog:91, note:'CRM audit 100%, initiatives 85%, training 80%. Best completion rate.' },
      { q:'Q2 FY26', obj:'Strengthen reseller partnerships and RDN growth', prog:71, note:'Rebate overhaul 60%, comms rhythm 60%, proposal 80%, promotions 85%.' },
    ],
    patterns: ['Consistently strong delivery (72–91%) — one of the highest performers.','CRM and sales enablement is largely complete — Q1 FY27 should sustain and measure, not rebuild.','Reseller/RDN strategy is maturing but comms and reporting cadence lags structural work.'],
    strategic: ['Sales team performance and accountability','JCS commercial strategy and team enablement','Reseller and RDN programme maturity','3-year strategic plan from sales perspective'],
  },
}

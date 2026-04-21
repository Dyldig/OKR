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
  KB: {
    hist: [
      { q:'Q4 FY25', obj:'Introduce performance management framework', prog:90, note:'Framework designed 100%, leader training 80%. Strong structural delivery.' },
      { q:'Q1 FY26', obj:'Lead Employment Hero setup and readiness', prog:96, note:'Workflows, training, communications all 90–100%. Near-perfect delivery.' },
      { q:'Q2 FY26', obj:'Launch 2025 engagement survey', prog:8, note:'Survey not launched — finalisation 25%, launch 0%, analysis 0%. Critical carry-forward.' },
    ],
    patterns: ['Exceptionally strong at building and launching frameworks — HR infrastructure mostly in place.','Engagement survey from Q2 FY26 is a critical carry-forward — must close before next initiative.','People-facing rollouts stall after design phase — plan for activation, not just delivery.'],
    strategic: ['Employment contract rollout completion','Engagement survey close-out and action planning','Performance management embedding','Position description currency across all roles'],
  },
  KR: {
    hist: [
      { q:'Q4 FY25', obj:'Enhance training and development', prog:60, note:'Pack C policies 60%. Recruitment and onboarding KRs 80–100%.' },
      { q:'Q1 FY26', obj:'Support HRIS setup and CSR capability', prog:68, note:'Data upload 85%, knowledge base 50%, test runs 50%.' },
      { q:'Q2 FY26', obj:'Integrate Employment Hero into the business', prog:90, note:'Training content 90%, delivery 100%, follow-up support 80%. Strong finish.' },
    ],
    patterns: ['Employment Hero is complete — Q1 FY27 must shift to what comes next.','Training delivery is consistently a strength — leverage for Pack D and development programs.','Recruitment and onboarding process quality is a consistent area of solid performance.'],
    strategic: ['Pack D policy implementation','Ongoing training and development calendar','Employment Hero optimisation and reporting','Recruitment process quality'],
  },
  LJ: {
    hist: [
      { q:'Q2 FY26', obj:'Grow Jeffries business impact through relationships', prog:44, note:'Testimonials 50%, customer engagement 50%, strategic meetings 33%.' },
      { q:'Q3 FY26', obj:'Support Ag division through critical Q3', prog:67, note:'Field time 50%, pinch-hit support 75%, Ag meeting cadence 75%.' },
      { q:'Q4 FY26', obj:'Elevate Jeffries impact through key relationships', prog:18, note:'Leadership time 20%, team member time 10%, feedback sessions 25%.' },
    ],
    patterns: ['KRs consistently track "time spent" not outcomes produced — push toward impact-based KRs.','Q4 FY26 at very low progress — confirm whether recency issue or pattern.','Ag division support has been recurring — confirm whether this transitions to Ben/Lintern.'],
    strategic: ['3-year strategic plan development and communication','Sales and JCS commercial oversight','Ag division leadership and support','Key external relationships (Cleanaway, major distributors)'],
  },
  LF: {
    hist: [
      { q:'Q3 FY26', obj:'Drive strong Q3 Ag performance', prog:45, note:'Customer cadence 75%, CRM records 0%, promotions 55%. CRM is a clear gap.' },
      { q:'Q4 FY26', obj:'Convert Q3 groundwork into strong Q4 results', prog:0, note:'New quarter. Targets: Ag product sales, pellet range sales, 9 face-to-face visits.' },
    ],
    patterns: ['CRM record-keeping is consistently 0% — undermines pipeline visibility for the whole Ag team.','Visit cadence is a consistent strength (75%+) — build on this.','Pellet range sales (C-100, CulChar, BioChar) are a key individual contribution target.'],
    strategic: ['Ag product volume (compost, mulch, pellets)','Pellet range sales targets','Pre-season grower engagement and planning'],
  },
  MJ: {
    hist: [
      { q:'Q2 FY26', obj:'Determine feasibility of vermicast and new products', prog:27, note:'Feasibility study 65% but product identification 15% and exec recommendation 0%.' },
      { q:'Q3 FY26', obj:'Build scalable, efficient business systems', prog:43, note:'Manual data reduction 60%, decision standardisation 50%, AI deployment 50%, purpose clarity 10%.' },
      { q:'Q4 FY26', obj:'Develop 3-year strategic plan', prog:0, note:'All four KRs at 0% — rearview review, pre-read, pressure testing, finalisation. Critical priority.' },
    ],
    patterns: ['3-year plan is the most important Q4 FY26 priority — Q1 FY27 must execute against it, not continue planning.','System efficiency initiatives partially complete — close out before adding new strategic work.','Executive OKRs tend to be broad — ensure KRs are genuinely measurable, not activity-based.'],
    strategic: ['3-year strategic plan execution (post-approval)','Post East Waste business establishment','Powerscaper and JCS commercial performance','Business system efficiency and scalability'],
  },
  SW: {
    hist: [
      { q:'Q4 FY25', obj:'Improve safety culture and team engagement', prog:73, note:'Safety schedules 80%, new reporting 65%, random audit process 75%.' },
      { q:'Q1 FY26', obj:'Improve safety culture and team engagement', prog:34, note:'Non-conformances 12%, random walks 24%, risk assessments 65%. Significant dip.' },
      { q:'Q2 FY26', obj:'Improve safety culture and team engagement', prog:68, note:'Safety initiatives 85%, non-conformances 50%, cross-functional safety 70%. Recovery.' },
    ],
    patterns: ['Same objective for 3 consecutive quarters — raise the bar significantly or reframe entirely.','Q4 FY26 Buckland Park single-shift transition is a major change — must feature in Q1 FY27 OKRs.','Labour productivity was added in Q4 FY26 — carry forward with specific targets.'],
    strategic: ['Buckland Park single-shift transition','Safety culture elevation beyond compliance','Team performance and engagement (Operations)','Labour productivity improvement'],
  },
  VK: {
    hist: [
      { q:'Q4 FY25', obj:'Improve ROSS OEE to target levels', prog:78, note:'Weekly meetings 90% but 12,500m3 JOC/JCMC volume target not consistently hit.' },
      { q:'Q1 FY26', obj:'Optimise Fertiliser Plant operations', prog:67, note:'Data capture 100%, 4DX meetings 60%, asset review 40%.' },
      { q:'Q2 FY26', obj:'Optimise Fertiliser Plant and achieve ROSS targets', prog:65, note:'OEE tracking 70%, 4DX 80%, production volume 45%. Volume remains the challenge.' },
    ],
    patterns: ['4DX weekly meeting cadence hits 80–90% every quarter — this is now BAU, not a stretch KR.','Production volume (400 tonnes, 12,500m3) consistently underperforms — this is the real stretch area.','ROSS and Fertiliser Plant have been the focus for 3+ quarters — consider shifting to Maintain/Optimise.'],
    strategic: ['ROSS OEE and throughput improvement','Fertiliser Plant production volume targets','Machine setting optimisation and consistency','Contamination reduction'],
  },
}

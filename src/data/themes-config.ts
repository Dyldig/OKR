export const THEMES = [
  { id:'growth',     icon:'📈', name:'Growth',             desc:'Revenue, volume, new business' },
  { id:'customers',  icon:'🤝', name:'Customers',          desc:'Retention, service, relationships' },
  { id:'operations', icon:'⚙️', name:'Operations',         desc:'Plant, safety, efficiency' },
  { id:'team',       icon:'👥', name:'Team & Leadership',  desc:'People, capability, culture' },
  { id:'strategy',   icon:'🚀', name:'Strategy & Projects',desc:'Initiatives, plans, transformation' },
  { id:'systems',    icon:'💻', name:'Systems & Technology',desc:'CRM, data, automation, tools' },
]

export const FOCUS_AREAS: Record<string, Record<string, {id:string, n:string}[]>> = {
  growth: {
    Sales:      [{ id:'powerscaper',n:'Powerscaper' },{ id:'pellets',n:'Pellets' },{ id:'jcs_rev',n:'JCS Revenue' },{ id:'ag_rev',n:'Ag Revenue' },{ id:'trade',n:'Trade' },{ id:'resellers',n:'Resellers / RDN' }],
    Operations: [{ id:'plant_output',n:'Plant Output' },{ id:'fleet',n:'Fleet Revenue' }],
    Finance:    [{ id:'margin',n:'Margin Improvement' },{ id:'rev_vis',n:'Revenue Visibility' }],
    Executive:  [{ id:'commercial',n:'Commercial Oversight' },{ id:'growth_strat',n:'Growth Strategy' }],
    default:    [{ id:'rev_gen',n:'Revenue Generation' }],
  },
  customers: {
    Sales:      [{ id:'jcs_cust',n:'JCS Customer Health' },{ id:'key_accts',n:'Key Accounts' },{ id:'new_cust',n:'New Customer Acquisition' },{ id:'reseller_rel',n:'Reseller Relationships' },{ id:'ag_cust',n:'Ag Customer Engagement' }],
    Operations: [{ id:'fulfilment',n:'Fulfilment Quality' }],
    default:    [{ id:'cust_rel',n:'Customer Relationships' }],
  },
  operations: {
    Operations: [{ id:'oee',n:'OEE & Plant Reliability' },{ id:'safety',n:'Safety & Compliance' },{ id:'maintenance',n:'Maintenance Standards' },{ id:'buckland',n:'Buckland Park Transition' },{ id:'nhvr',n:'NHVR & Logistics Compliance' },{ id:'env',n:'Environmental Initiatives' },{ id:'labour',n:'Labour Productivity' }],
    Executive:  [{ id:'ops_oversight',n:'Operations Oversight' },{ id:'post_east',n:'Post East Waste' }],
    default:    [{ id:'ops_eff',n:'Operational Efficiency' }],
  },
  team: {
    HR:         [{ id:'perf_mgmt',n:'Performance Management' },{ id:'engagement',n:'Engagement & Wellbeing' },{ id:'contracts',n:'Contracts & Compliance' },{ id:'recruitment',n:'Recruitment & Onboarding' },{ id:'training',n:'Training & Development' }],
    Operations: [{ id:'team_ops',n:'Team Effectiveness' },{ id:'safety_culture',n:'Safety Culture' }],
    Sales:      [{ id:'team_sales',n:'Sales Enablement' },{ id:'coaching',n:'Team Coaching' }],
    Executive:  [{ id:'leadership',n:'Leadership Effectiveness' },{ id:'culture',n:'Culture & Values' }],
    default:    [{ id:'team_gen',n:'Team Effectiveness' }],
  },
  strategy: {
    Executive:  [{ id:'strat_plan',n:'3-Year Strategic Plan' },{ id:'post_east_strat',n:'Post East Waste' },{ id:'cleanaway',n:'Cleanaway / Partnerships' },{ id:'ai_systems',n:'AI & Automation' }],
    Sales:      [{ id:'jcs_strat',n:'JCS Expansion Strategy' },{ id:'ag_strat',n:'Agriculture Strategy' },{ id:'rdn_strat',n:'RDN Strategy' }],
    Operations: [{ id:'innovation',n:'Innovation & Trials' },{ id:'compliance_strat',n:'Compliance Strategy' }],
    Finance:    [{ id:'fin_strat',n:'Financial Infrastructure' },{ id:'costing',n:'Product Costing' }],
    default:    [{ id:'proj',n:'Strategic Project' }],
  },
  systems: {
    HR:         [{ id:'emp_hero',n:'Employment Hero' },{ id:'pos_desc',n:'Position Descriptions' },{ id:'hris_reporting',n:'HR Reporting' }],
    Sales:      [{ id:'crm',n:'CRM Adoption' },{ id:'sales_tools',n:'Sales Playbooks & Tools' }],
    Finance:    [{ id:'ap_auto',n:'AP Automation (AP Link)' },{ id:'gp_crm',n:'GP / CRM Alignment' },{ id:'costing_sys',n:'Product Costing System' }],
    Operations: [{ id:'downtime',n:'Downtime & Maintenance Reporting' },{ id:'risk_fw',n:'Risk Assessment Framework' },{ id:'data_capture',n:'Data Capture & Reporting' }],
    Executive:  [{ id:'bi_tools',n:'BI & Reporting Infrastructure' },{ id:'sys_strategy',n:'Systems Strategy' }],
    default:    [{ id:'sys_gen',n:'Systems & Process' }],
  },
}

export interface TeamMember {
  id: string
  name: string
  role: string
  area: string
  div: string
  mgr: string | null
  level: 'Executive Team' | 'Leadership Team' | 'Individual'
  initials: string
  hints: string[]
  hist: { q: string; obj: string; prog: number; note: string }[]
  patterns: string[]
  strategic: string[]
}

export const TEAM_CORE: Omit<TeamMember, 'hist' | 'patterns' | 'strategic'> [] = [
  { id: 'AQ',  name: 'Arb Quin',             role: 'Maintenance Manager',                area: 'Operations', div: 'Maintenance',  mgr: 'Stuart Williams', level: 'Leadership Team', initials: 'AQ',  hints: ['operations','systems','team'] },
  { id: 'AMV', name: 'Amin Vahidinezhad',     role: 'Logistics Supervisor',               area: 'Operations', div: 'Logistics',    mgr: 'Stuart Williams', level: 'Individual',      initials: 'AV',  hints: ['operations','systems'] },
  { id: 'BRS', name: 'Ben Randall-Smith',     role: 'BD & Major Accounts Manager',        area: 'Sales',      div: 'Sales',        mgr: 'Dylan Digby',     level: 'Leadership Team', initials: 'BR',  hints: ['growth','customers','strategy'] },
  { id: 'CH',  name: 'Chandra Herath',        role: 'Financial Controller',               area: 'Finance',    div: 'Finance',      mgr: 'Martin Jeffries', level: 'Executive Team',  initials: 'CH',  hints: ['systems','strategy','operations'] },
  { id: 'CW',  name: 'Courtney Wilson',       role: 'Operations & Training Administrator',area: 'Operations', div: 'Admin',        mgr: 'Stuart Williams', level: 'Individual',      initials: 'CW',  hints: ['systems','operations','team'] },
  { id: 'DV',  name: 'Damien Verrall',        role: 'Field Sales Rep — Trade',            area: 'Sales',      div: 'Trade',        mgr: 'Dylan Digby',     level: 'Individual',      initials: 'DV',  hints: ['growth','customers'] },
  { id: 'DS',  name: 'Darren Scott',          role: 'Organics Recycling Account Manager', area: 'Sales',      div: 'JCS',          mgr: 'Dylan Digby',     level: 'Leadership Team', initials: 'DS',  hints: ['customers','growth','operations'] },
  { id: 'DD',  name: 'Dylan Digby',           role: 'Head of Sales',                      area: 'Sales',      div: 'Sales',        mgr: 'Martin Jeffries', level: 'Executive Team',  initials: 'DD',  hints: ['strategy','team','growth'] },
  { id: 'KB',  name: 'Katie Burnett',         role: 'HR Manager',                         area: 'HR',         div: 'HR',           mgr: 'Martin Jeffries', level: 'Executive Team',  initials: 'KB',  hints: ['team','systems','strategy'] },
  { id: 'KR',  name: 'Kellie Roberts',        role: 'HR Generalist',                      area: 'HR',         div: 'HR',           mgr: 'Katie Burnett',   level: 'Individual',      initials: 'KR',  hints: ['team','systems'] },
  { id: 'LJ',  name: 'Lachlan Jeffries',      role: 'Executive Chairman',                 area: 'Executive',  div: '',             mgr: 'Martin Jeffries', level: 'Executive Team',  initials: 'LJ',  hints: ['strategy','growth'] },
  { id: 'LF',  name: 'Lintern Fairbrother',   role: 'Account Manager — Agriculture',      area: 'Sales',      div: 'Agriculture',  mgr: 'Dylan Digby',     level: 'Individual',      initials: 'LF',  hints: ['growth','customers','strategy'] },
  { id: 'MJ',  name: 'Martin Jeffries',       role: 'Managing Director',                  area: 'Executive',  div: '',             mgr: null,              level: 'Executive Team',  initials: 'MJ',  hints: ['strategy','growth','team'] },
  { id: 'SW',  name: 'Stuart Williams',       role: 'Operations Manager',                 area: 'Operations', div: 'Operations',   mgr: 'Martin Jeffries', level: 'Executive Team',  initials: 'SW',  hints: ['operations','team','systems'] },
  { id: 'VK',  name: 'Vivek Kurian',          role: 'Production Manager',                 area: 'Operations', div: 'Operations',   mgr: 'Stuart Williams', level: 'Leadership Team', initials: 'VK',  hints: ['operations','systems','strategy'] },
]

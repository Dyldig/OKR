import { TEAM_CORE, type TeamMember } from './team-core'
import { TEAM_HISTORY_A } from './team-history-a'
import { TEAM_HISTORY_B } from './team-history-b'

const TEAM_HISTORY = { ...TEAM_HISTORY_A, ...TEAM_HISTORY_B }

export const TEAM: TeamMember[] = TEAM_CORE.map(p => ({
  ...p,
  ...(TEAM_HISTORY[p.id] ?? { hist: [], patterns: [], strategic: [] }),
}))

export type { TeamMember }

export function getTeamMember(id: string): TeamMember | undefined {
  return TEAM.find(p => p.id === id)
}

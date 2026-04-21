import { TEAM_CORE } from './team-core'
import { TEAM_HISTORY } from './team-history'

export const TEAM = TEAM_CORE.map(p => ({
  ...p,
  ...TEAM_HISTORY[p.id],
}))

export type TeamMember = (typeof TEAM)[number]

export function getTeamMember(id: string) {
  return TEAM.find(p => p.id === id)
}

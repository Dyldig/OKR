export { THEMES, FOCUS_AREAS } from './themes-config'
export { OBJ_TEMPLATES } from './objectives'
export { KR_BANK } from './kr-bank'

import { FOCUS_AREAS } from './themes-config'
import { OBJ_TEMPLATES } from './objectives'
import { KR_BANK } from './kr-bank'

export function getObjectiveText(focusId: string, type: string, quarter: string): string {
  const tmpl = OBJ_TEMPLATES[focusId] ?? OBJ_TEMPLATES.default
  const text = tmpl[type] ?? tmpl.build ?? ''
  return text.replace(/{Q}/g, quarter)
}

export function getKRSuggestions(focusId: string, count = 4): string[] {
  const bank = KR_BANK[focusId] ?? KR_BANK.default
  return bank.slice(0, count)
}

export function getFocusOptions(themeId: string, area: string, div: string) {
  const theme = FOCUS_AREAS[themeId] ?? {}
  const byArea = theme[area] ?? []
  const byDiv  = theme[div]  ?? []
  const byDef  = theme.default ?? []
  const seen   = new Set<string>()
  const merged = [...byArea, ...byDiv, ...byDef].filter(o => {
    if (seen.has(o.id)) return false
    seen.add(o.id)
    return true
  })
  return merged
}

import { useSessionStore } from '../../store/sessionStore'
import { THEMES, getFocusOptions } from '../../data/themes'
import { getTeamMember } from '../../data/team'
import { Badge } from '../shared/Badge'
import { Callout } from '../shared/Card'
import { WizardNav } from '../shared/WizardNav'

export function Step9({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()
  const objectives = currentSession.objectives ?? {}
  const krs = currentSession.krs ?? {}
  const objTypes = currentSession.objTypes ?? {}
  const weights = currentSession.weights ?? {}

  const warnings: string[] = []
  const positives: string[] = []

  // Validation checks
  if (allFocusIds.length > 4) warnings.push(`${allFocusIds.length} focus areas is a lot for one quarter — consider narrowing to 3–4.`)
  allFocusIds.forEach(id => {
    const focusKRs = krs[id] ?? []
    const hasPlaceholders = focusKRs.some(kr => kr.text.includes('[X]') || kr.text.includes('[date]') || kr.text.includes('[metric]'))
    if (hasPlaceholders) warnings.push(`"${getFocusLabel(id)}" has unfilled placeholders — replace [X] values before finalising.`)
    if (focusKRs.length < 2) warnings.push(`"${getFocusLabel(id)}" needs at least 2 key results.`)
  })

  const typeDistribution = allFocusIds.map(id => objTypes[id]).filter(Boolean)
  const uniqueTypes = new Set(typeDistribution)
  if (uniqueTypes.size >= 3 && allFocusIds.length >= 3) positives.push('Good variety of objective types — mix of Build, Improve, and Maintain signals a balanced quarter.')
  if (allFocusIds.length >= 2 && allFocusIds.length <= 3 && warnings.length === 0) positives.push('Well-scoped — 2–3 focus areas with clear objectives and key results is an ideal OKR set.')
  if (allFocusIds.every(id => (krs[id] ?? []).length >= 3)) positives.push('Strong KR coverage — 3+ KRs per objective gives good measurability.')

  function getFocusLabel(focusId: string): string {
    for (const themeId of Object.keys(currentSession.focusAreas ?? {})) {
      const opts = getFocusOptions(themeId, person.area, person.div)
      const opt = opts.find(o => o.id === focusId)
      if (opt) return opt.n
    }
    return focusId
  }

  function getThemeForFocus(focusId: string) {
    for (const [themeId, ids] of Object.entries(currentSession.focusAreas ?? {})) {
      if (ids.includes(focusId)) return THEMES.find(t => t.id === themeId)
    }
    return null
  }

  const typeLabel: Record<string, string> = {
    build: 'Build', improve: 'Improve', maintain: 'Maintain', multi: 'Multi-Quarter',
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Review</h2>
      <p className="text-sm text-stone-500 mb-5">
        Review the full OKR set before generating output. Add any constraints or context.
      </p>

      {warnings.map((w, i) => (
        <Callout key={i} variant="amber" className="mb-2">{w}</Callout>
      ))}
      {positives.map((p, i) => (
        <Callout key={i} variant="green" className="mb-2">✓ {p}</Callout>
      ))}

      <div className="space-y-4 mt-4">
        {allFocusIds.map(focusId => {
          const theme = getThemeForFocus(focusId)
          const type = objTypes[focusId]
          const weight = weights[focusId] ?? 0
          const obj = objectives[focusId] ?? ''
          const focusKRs = krs[focusId] ?? []

          return (
            <div key={focusId} className="bg-white border border-stone-200 rounded-lg overflow-hidden">
              <div className="bg-[#31261D] px-4 py-3">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {theme && <Badge variant="green">{theme.icon} {theme.name}</Badge>}
                  <Badge variant="amber">{typeLabel[type] ?? type}</Badge>
                  <Badge variant="gray">{weight}%</Badge>
                </div>
                <p className="text-white text-sm font-medium">{obj}</p>
              </div>
              <div className="px-4 py-3 space-y-1.5">
                {focusKRs.map((kr, idx) => (
                  <div key={kr.id} className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#878800] text-white text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                      {idx + 1}
                    </span>
                    <p className={`text-sm ${kr.placeholder ? 'text-stone-400 italic' : 'text-stone-700'}`}>
                      {kr.text || <span className="text-red-400">— empty KR —</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
          Constraints or context (optional)
        </label>
        <textarea
          value={currentSession.constraints}
          onChange={e => updateSession({ constraints: e.target.value })}
          rows={3}
          placeholder="e.g. Parental leave in month 2, resource constraints, known blockers, dependencies on other teams…"
          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg resize-none focus:outline-none focus:border-[#878800]"
        />
      </div>

      <WizardNav step={9} total={11} onBack={onBack} onNext={onNext} nextDisabled={warnings.some(w => w.includes('unfilled'))} />
    </div>
  )
}

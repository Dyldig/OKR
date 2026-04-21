import { useEffect } from 'react'
import { useSessionStore } from '../../store/sessionStore'
import { THEMES, getFocusOptions, getObjectiveText } from '../../data/themes'
import { getTeamMember } from '../../data/team'
import { Badge } from '../shared/Badge'
import { WizardNav } from '../shared/WizardNav'

export function Step7({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null

  // Keep hook before early return (rules of hooks)
  useEffect(() => {
    if (!currentSession || !person) return
    const ids = Object.values(currentSession.focusAreas ?? {}).flat()
    const objs = currentSession.objectives ?? {}
    const types = currentSession.objTypes ?? {}
    const missing = ids.filter(id => !objs[id])
    if (missing.length > 0) {
      const generated: Record<string, string> = {}
      missing.forEach(id => {
        const type = types[id] ?? 'improve'
        generated[id] = getObjectiveText(id, type, currentSession.quarter)
      })
      updateSession({ objectives: { ...objs, ...generated } })
    }
  }, [])

  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()
  const objectives: Record<string, string> = currentSession.objectives ?? {}
  const objTypes = currentSession.objTypes ?? {}
  const weights = currentSession.weights ?? {}

  function getFocusLabel(focusId: string): string {
    for (const themeId of Object.keys(currentSession!.focusAreas ?? {})) {
      const opts = getFocusOptions(themeId, person!.area, person!.div)
      const opt = opts.find(o => o.id === focusId)
      if (opt) return opt.n
    }
    return focusId
  }

  function getThemeForFocus(focusId: string) {
    for (const [themeId, ids] of Object.entries(currentSession!.focusAreas ?? {})) {
      if (ids.includes(focusId)) return THEMES.find(t => t.id === themeId)
    }
    return null
  }

  function setObjective(focusId: string, text: string) {
    updateSession({ objectives: { ...objectives, [focusId]: text } })
  }

  const typeLabel: Record<string, string> = {
    build: 'Build', improve: 'Improve', maintain: 'Maintain', multi: 'Multi-Quarter',
  }

  const isValid = allFocusIds.every(id => (objectives[id] ?? '').trim().length > 15)

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Objectives</h2>
      <p className="text-sm text-stone-500 mb-5">
        Review and edit each objective. Pre-generated from role, type, and Jeffries context.
        Objectives should describe outcomes, not tasks.
      </p>

      <div className="space-y-4">
        {allFocusIds.map(focusId => {
          const theme = getThemeForFocus(focusId)
          const type = objTypes[focusId] ?? 'improve'
          const weight = weights[focusId] ?? 0
          const text = objectives[focusId] ?? ''
          const tooShort = text.trim().length > 0 && text.trim().length <= 15

          return (
            <div key={focusId} className="bg-white border border-stone-200 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {theme && <Badge variant="brown">{theme.icon} {theme.name}</Badge>}
                <Badge variant="green">{getFocusLabel(focusId)}</Badge>
                <Badge variant="outline">{typeLabel[type]}</Badge>
                <Badge variant="gray">{weight}%</Badge>
              </div>
              <textarea
                value={text}
                onChange={e => setObjective(focusId, e.target.value)}
                rows={3}
                placeholder="Describe the objective outcome…"
                className={`w-full px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:border-[#878800] ${
                  tooShort ? 'border-red-300' : 'border-stone-300'
                }`}
              />
              {tooShort && (
                <p className="text-xs text-red-500 mt-1">Objective must be more than 15 characters and describe an outcome, not just a task.</p>
              )}
            </div>
          )
        })}
      </div>

      <WizardNav step={7} total={11} onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}

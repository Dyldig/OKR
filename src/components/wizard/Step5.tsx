import { useSessionStore } from '../../store/sessionStore'
import { THEMES } from '../../data/themes'
import { getFocusOptions } from '../../data/themes'
import { getTeamMember } from '../../data/team'
import { WizardNav } from '../shared/WizardNav'
import { useEffect } from 'react'

export function Step5({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()
  const weights: Record<string, number> = currentSession.weights ?? {}

  // Auto-distribute equally on first load
  useEffect(() => {
    const hasWeights = allFocusIds.every(id => weights[id] !== undefined)
    if (!hasWeights && allFocusIds.length > 0) {
      const equal = Math.floor(100 / allFocusIds.length)
      const remainder = 100 - equal * allFocusIds.length
      const auto: Record<string, number> = {}
      allFocusIds.forEach((id, i) => {
        auto[id] = equal + (i === 0 ? remainder : 0)
      })
      updateSession({ weights: auto })
    }
  }, [])

  const total = allFocusIds.reduce((sum, id) => sum + (weights[id] ?? 0), 0)
  const totalColor = total === 100 ? 'text-emerald-600' : total >= 90 && total <= 110 ? 'text-amber-600' : 'text-red-500'
  const isValid = total === 100

  function setWeight(id: string, val: number) {
    updateSession({ weights: { ...weights, [id]: Math.max(0, Math.min(100, val)) } })
  }

  function getFocusLabel(focusId: string): string {
    for (const themeId of Object.keys(currentSession.focusAreas ?? {})) {
      const opts = getFocusOptions(themeId, person.area, person.div)
      const opt = opts.find(o => o.id === focusId)
      if (opt) return opt.n
    }
    return focusId
  }

  function getThemeForFocus(focusId: string): string {
    for (const [themeId, ids] of Object.entries(currentSession.focusAreas ?? {})) {
      if (ids.includes(focusId)) return themeId
    }
    return ''
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Weightings</h2>
      <p className="text-sm text-stone-500 mb-5">
        Assign a percentage weight to each focus area. Total must equal 100%.
      </p>

      <div className="space-y-3 mb-6">
        {allFocusIds.map(id => {
          const themeId = getThemeForFocus(id)
          const theme = THEMES.find(t => t.id === themeId)
          return (
            <div key={id} className="flex items-center gap-4 bg-white border border-stone-200 rounded-lg p-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-stone-400">{theme?.icon} {theme?.name}</div>
                <div className="text-sm font-medium text-[#31261D]">{getFocusLabel(id)}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={weights[id] ?? 0}
                  onChange={e => setWeight(id, parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1.5 text-sm text-center border border-stone-300 rounded-lg focus:outline-none focus:border-[#878800]"
                />
                <span className="text-sm text-stone-500">%</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={`flex items-center justify-between p-3 rounded-lg border ${
        total === 100 ? 'bg-emerald-50 border-emerald-200' :
        total >= 90 ? 'bg-amber-50 border-amber-200' :
        'bg-red-50 border-red-200'
      }`}>
        <span className="text-sm font-medium text-stone-600">Total</span>
        <span className={`text-lg font-bold ${totalColor}`}>{total}%</span>
      </div>

      {!isValid && total !== 0 && (
        <p className="text-xs text-stone-500 mt-2">
          {total < 100 ? `Add ${100 - total}% more` : `Remove ${total - 100}%`} to reach 100%.
        </p>
      )}

      <WizardNav step={5} total={11} onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}

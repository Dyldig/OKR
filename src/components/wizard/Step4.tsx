import { getTeamMember } from '../../data/team'
import { useSessionStore } from '../../store/sessionStore'
import { THEMES, getFocusOptions } from '../../data/themes'
import { WizardNav } from '../shared/WizardNav'

export function Step4({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const selectedThemes = currentSession.themes ?? []
  const focusAreas: Record<string, string[]> = currentSession.focusAreas ?? {}

  function toggleFocus(themeId: string, focusId: string) {
    const current = focusAreas[themeId] ?? []
    const next = current.includes(focusId)
      ? current.filter(f => f !== focusId)
      : [...current, focusId]
    updateSession({ focusAreas: { ...focusAreas, [themeId]: next } })
  }

  const totalSelected = Object.values(focusAreas).flat().length
  const isValid = totalSelected > 0

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Refined focus areas</h2>
      <p className="text-sm text-stone-500 mb-5">
        Select specific focus areas within each theme. You can choose multiple per theme.
        Options are filtered for {person.name}'s role and division.
      </p>

      {totalSelected > 4 && (
        <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 text-amber-800 text-sm rounded-r-lg">
          <strong>4+ focus areas selected</strong> — this may be too many for one quarter.
          Consider narrowing to the highest-impact areas.
        </div>
      )}

      <div className="space-y-6">
        {selectedThemes.map(themeId => {
          const theme = THEMES.find(t => t.id === themeId)
          if (!theme) return null
          const options = getFocusOptions(themeId, person.area, person.div)
          const selected = focusAreas[themeId] ?? []

          return (
            <div key={themeId}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{theme.icon}</span>
                <h3 className="font-semibold text-[#31261D]">{theme.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                  const isSelected = selected.includes(opt.id)
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleFocus(themeId, opt.id)}
                      className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#878800] text-white border-[#878800]'
                          : 'bg-white text-stone-600 border-stone-300 hover:border-[#878800]'
                      }`}
                    >
                      {opt.n}
                    </button>
                  )
                })}
                {options.length === 0 && (
                  <p className="text-xs text-stone-400 italic">No specific focus areas for this theme and role.</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-stone-400 mt-5">
        {totalSelected} focus area{totalSelected !== 1 ? 's' : ''} selected across {selectedThemes.length} theme{selectedThemes.length !== 1 ? 's' : ''}.
      </p>

      <WizardNav step={4} total={11} onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}

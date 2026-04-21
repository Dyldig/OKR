import { getTeamMember } from '../../data/team'
import { useSessionStore } from '../../store/sessionStore'
import { THEMES } from '../../data/themes'
import { Callout } from '../shared/Card'
import { WizardNav } from '../shared/WizardNav'

const MAX_THEMES = 3

export function Step3({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const selected: string[] = currentSession.themes ?? []
  const hints: string[] = person.hints ?? []
  const hasComplexHistory = person.hist.some(h => h.prog < 45)

  function toggle(id: string) {
    if (selected.includes(id)) {
      updateSession({ themes: selected.filter(t => t !== id) })
    } else if (selected.length < MAX_THEMES) {
      updateSession({ themes: [...selected, id] })
    }
  }

  const showOvercommitWarning = selected.length === 3 && hasComplexHistory

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Broad themes</h2>
      <p className="text-sm text-stone-500 mb-5">
        Choose 1–3 themes for {person.name}'s {currentSession.quarter} OKRs.
        Recommended themes are based on their history and role.
      </p>

      {showOvercommitWarning && (
        <Callout variant="amber" className="mb-4">
          <strong>Watch overcommitment:</strong> {person.name} has had quarters below 45% recently.
          Consider limiting to 2 themes for a stronger, more focused quarter.
        </Callout>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {THEMES.map(theme => {
          const isSelected = selected.includes(theme.id)
          const isRecommended = hints.includes(theme.id)
          const isDisabled = !isSelected && selected.length >= MAX_THEMES

          return (
            <button
              key={theme.id}
              onClick={() => toggle(theme.id)}
              disabled={isDisabled}
              className={`relative p-4 rounded-lg border text-left transition-colors ${
                isSelected
                  ? 'border-[#878800] bg-[#f5f0eb] ring-1 ring-[#878800]'
                  : isDisabled
                  ? 'border-stone-200 bg-stone-50 opacity-40 cursor-not-allowed'
                  : 'border-stone-200 bg-white hover:border-[#878800] cursor-pointer'
              }`}
            >
              {isRecommended && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#878800] text-white text-xs rounded font-medium">
                  Recommended
                </span>
              )}
              <div className="text-2xl mb-2">{theme.icon}</div>
              <div className="font-semibold text-[#31261D] text-sm">{theme.name}</div>
              <div className="text-xs text-stone-500 mt-0.5">{theme.desc}</div>
            </button>
          )
        })}
      </div>

      <p className="text-xs text-stone-400 mb-4">
        {selected.length === 0
          ? 'Select at least 1 theme to continue.'
          : `${selected.length} of ${MAX_THEMES} themes selected.`}
      </p>

      <WizardNav
        step={3} total={11}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={selected.length === 0}
      />
    </div>
  )
}

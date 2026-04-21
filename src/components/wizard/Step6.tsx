import { useSessionStore } from '../../store/sessionStore'
import { THEMES, getFocusOptions } from '../../data/themes'
import { getTeamMember } from '../../data/team'
import { WizardNav } from '../shared/WizardNav'
import type { ObjType, MultiSubType } from '../../store/sessionStore'

const OBJ_TYPES: { id: ObjType; label: string; desc: string }[] = [
  { id: 'build',    label: 'Build / Complete',     desc: 'Creating something new or finishing a defined deliverable this quarter.' },
  { id: 'improve',  label: 'Improve',              desc: 'Moving a metric or outcome meaningfully forward from a known baseline.' },
  { id: 'maintain', label: 'Maintain / Optimise',  desc: 'Sustaining performance at target while removing friction and waste.' },
  { id: 'multi',    label: 'Multi-Quarter',        desc: 'Part of a longer initiative — this quarter delivers one milestone.' },
]

const MULTI_SUBS: { id: MultiSubType; label: string }[] = [
  { id: 'milestone',   label: 'Milestone reached' },
  { id: 'progress',    label: '% Progress toward goal' },
  { id: 'capability',  label: 'Capability built' },
]

export function Step6({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()
  const objTypes: Record<string, ObjType> = currentSession.objTypes ?? {}
  const multiSubs: Record<string, MultiSubType> = currentSession.multiSubTypes ?? {}

  function getFocusLabel(focusId: string): string {
    for (const themeId of Object.keys(currentSession!.focusAreas ?? {})) {
      const opts = getFocusOptions(themeId, person!.area, person!.div)
      const opt = opts.find(o => o.id === focusId)
      if (opt) return opt.n
    }
    return focusId
  }

  function getThemeForFocus(focusId: string): string {
    for (const [themeId, ids] of Object.entries(currentSession!.focusAreas ?? {})) {
      if (ids.includes(focusId)) return themeId
    }
    return ''
  }

  function setType(focusId: string, type: ObjType) {
    updateSession({ objTypes: { ...objTypes, [focusId]: type } })
  }

  function setMultiSub(focusId: string, sub: MultiSubType) {
    updateSession({ multiSubTypes: { ...multiSubs, [focusId]: sub } })
  }

  const isValid = allFocusIds.every(id => objTypes[id])

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Objective type</h2>
      <p className="text-sm text-stone-500 mb-5">
        For each focus area, choose the type of objective. This shapes the objective language and KRs.
      </p>

      <div className="space-y-6">
        {allFocusIds.map(focusId => {
          const themeId = getThemeForFocus(focusId)
          const theme = THEMES.find(t => t.id === themeId)
          const selected = objTypes[focusId]

          return (
            <div key={focusId} className="bg-white border border-stone-200 rounded-lg p-4">
              <div className="text-xs text-stone-400 mb-1">{theme?.icon} {theme?.name}</div>
              <div className="text-sm font-semibold text-[#31261D] mb-3">{getFocusLabel(focusId)}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OBJ_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setType(focusId, type.id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selected === type.id
                        ? 'border-[#878800] bg-[#f5f0eb] ring-1 ring-[#878800]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#31261D]">{type.label}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{type.desc}</div>
                  </button>
                ))}
              </div>

              {selected === 'multi' && (
                <div className="mt-3">
                  <p className="text-xs text-stone-500 mb-2">What does success look like this quarter?</p>
                  <div className="flex flex-wrap gap-2">
                    {MULTI_SUBS.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => setMultiSub(focusId, sub.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          multiSubs[focusId] === sub.id
                            ? 'bg-[#31261D] text-white border-[#31261D]'
                            : 'bg-white text-stone-600 border-stone-300 hover:border-[#31261D]'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <WizardNav step={6} total={11} onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}

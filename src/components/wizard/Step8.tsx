import { useEffect } from 'react'
import { useSessionStore } from '../../store/sessionStore'
import { THEMES, getFocusOptions, getKRSuggestions } from '../../data/themes'
import { getTeamMember } from '../../data/team'
import { Badge } from '../shared/Badge'
import { Callout } from '../shared/Card'
import { WizardNav } from '../shared/WizardNav'
import type { KR } from '../../store/sessionStore'

function makeId() {
  return Math.random().toString(36).slice(2, 9)
}

export function Step8({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null

  // Keep hook before early return (rules of hooks)
  useEffect(() => {
    if (!currentSession) return
    const ids = Object.values(currentSession.focusAreas ?? {}).flat()
    const existingKRs = currentSession.krs ?? {}
    const missing = ids.filter(id => !existingKRs[id] || existingKRs[id].length === 0)
    if (missing.length > 0) {
      const generated: Record<string, KR[]> = {}
      missing.forEach(id => {
        const suggestions = getKRSuggestions(id, 4)
        generated[id] = suggestions.map(text => ({ id: makeId(), text, placeholder: true }))
      })
      updateSession({ krs: { ...existingKRs, ...generated } })
    }
  }, [])

  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()
  const krs: Record<string, KR[]> = currentSession.krs ?? {}
  const objTypes = currentSession.objTypes ?? {}

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

  function updateKR(focusId: string, krId: string, text: string) {
    const list = (krs[focusId] ?? []).map(kr =>
      kr.id === krId ? { ...kr, text, placeholder: text.includes('[') } : kr
    )
    updateSession({ krs: { ...krs, [focusId]: list } })
  }

  function addKR(focusId: string) {
    const list = krs[focusId] ?? []
    if (list.length >= 6) return
    const newKR: KR = { id: makeId(), text: '', placeholder: false }
    updateSession({ krs: { ...krs, [focusId]: [...list, newKR] } })
  }

  function removeKR(focusId: string, krId: string) {
    const list = (krs[focusId] ?? []).filter(kr => kr.id !== krId)
    if (list.length < 2) return
    updateSession({ krs: { ...krs, [focusId]: list } })
  }

  const isValid = allFocusIds.every(id => (krs[id] ?? []).length >= 2)

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Key Results</h2>
      <p className="text-sm text-stone-500 mb-5">
        Edit or replace the suggested KRs. Click any KR to edit inline. Add or remove as needed (min 2, max 6).
        Replace <span className="font-mono bg-stone-100 px-1 rounded">[X]</span> placeholders with real values.
      </p>

      <div className="space-y-6">
        {allFocusIds.map(focusId => {
          const theme = getThemeForFocus(focusId)
          const type = objTypes[focusId]
          const focusKRs = krs[focusId] ?? []

          return (
            <div key={focusId} className="bg-white border border-stone-200 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {theme && <Badge variant="brown">{theme.icon} {theme.name}</Badge>}
                <Badge variant="green">{getFocusLabel(focusId)}</Badge>
              </div>

              {type === 'multi' && (
                <Callout variant="blue" className="mb-3">
                  Multi-quarter objective — KRs should reflect <strong>this quarter's milestones only</strong>, not the full multi-quarter goal.
                </Callout>
              )}

              <div className="space-y-2">
                {focusKRs.map((kr, idx) => (
                  <div key={kr.id} className="flex items-start gap-2">
                    <span className="mt-2.5 w-6 h-6 rounded-full bg-[#878800] text-white text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                      {idx + 1}
                    </span>
                    <textarea
                      value={kr.text}
                      onChange={e => updateKR(focusId, kr.id, e.target.value)}
                      rows={2}
                      className={`flex-1 px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:border-[#878800] ${
                        kr.placeholder ? 'text-stone-400 italic border-stone-200' : 'text-[#31261D] border-stone-300'
                      }`}
                    />
                    <button
                      onClick={() => removeKR(focusId, kr.id)}
                      disabled={focusKRs.length <= 2}
                      className="mt-2 text-stone-400 hover:text-red-400 disabled:opacity-20 text-lg leading-none"
                      title="Remove KR"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {focusKRs.length < 6 && (
                <button
                  onClick={() => addKR(focusId)}
                  className="mt-3 text-sm text-[#878800] hover:text-[#6b6c00] font-medium"
                >
                  + Add key result
                </button>
              )}
            </div>
          )
        })}
      </div>

      <WizardNav step={8} total={11} onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../store/sessionStore'
import { useCoachStore } from '../../store/coachStore'
import { THEMES, getFocusOptions } from '../../data/themes'
import { getTeamMember } from '../../data/team'
import { Badge } from '../shared/Badge'
import { WizardNav } from '../shared/WizardNav'

export function Step10({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, saveSession } = useSessionStore()
  const { setContext } = useCoachStore()
  const navigate = useNavigate()
  const outputRef = useRef<HTMLDivElement>(null)
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()
  const objectives = currentSession.objectives ?? {}
  const krs = currentSession.krs ?? {}
  const objTypes = currentSession.objTypes ?? {}
  const weights = currentSession.weights ?? {}

  const typeLabel: Record<string, string> = {
    build: 'Build', improve: 'Improve', maintain: 'Maintain', multi: 'Multi-Quarter',
  }

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

  function copyAsText() {
    const lines: string[] = [`OKR PLAN — ${person!.name} | ${currentSession!.quarter}\n`]
    allFocusIds.forEach((focusId, i) => {
      const obj = objectives[focusId] ?? ''
      const type = objTypes[focusId] ?? ''
      const weight = weights[focusId] ?? 0
      const focusKRs = krs[focusId] ?? []
      lines.push(`OBJECTIVE ${i + 1} [${typeLabel[type]} | ${getFocusLabel(focusId)} | ${weight}%]`)
      lines.push(obj)
      lines.push('')
      focusKRs.forEach((kr, j) => { lines.push(`  KR${j + 1}: ${kr.text}`) })
      lines.push('')
    })
    if (currentSession!.constraints) {
      lines.push(`CONSTRAINTS / CONTEXT\n${currentSession!.constraints}`)
    }
    navigator.clipboard.writeText(lines.join('\n'))
  }

  function exportPDF() {
    window.print()
  }

  function openCoach() {
    const okrContext = allFocusIds.map(id => {
      const obj = objectives[id] ?? ''
      const focusKRs = krs[id] ?? []
      return `Objective: ${obj}\nKRs:\n${focusKRs.map((kr, i) => `  ${i + 1}. ${kr.text}`).join('\n')}`
    }).join('\n\n')
    saveSession()
    setContext(person!.id, okrContext)
    navigate('/coach')
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-semibold text-[#31261D]">Output</h2>
          <p className="text-sm text-stone-500">Final OKR set for {person!.name} — {currentSession!.quarter}</p>
        </div>
        <div className="flex flex-wrap gap-2 no-print">
          <button onClick={copyAsText} className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50 font-medium transition-colors">
            Copy as text
          </button>
          <button onClick={exportPDF} className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50 font-medium transition-colors">
            Export PDF
          </button>
          <button onClick={openCoach} className="px-4 py-2 text-sm bg-[#878800] text-white rounded-lg hover:bg-[#6b6c00] font-medium transition-colors">
            Open Coach
          </button>
        </div>
      </div>

      <div ref={outputRef} className="space-y-4">
        {allFocusIds.map((focusId, i) => {
          const theme = getThemeForFocus(focusId)
          const obj = objectives[focusId] ?? ''
          const type = objTypes[focusId] ?? ''
          const weight = weights[focusId] ?? 0
          const focusKRs = krs[focusId] ?? []
          const hasRisks = focusKRs.some(kr => kr.placeholder)

          return (
            <div key={focusId} className="rounded-lg border border-stone-200 overflow-hidden print-page">
              {/* Header */}
              <div className="bg-[#31261D] px-4 py-3">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="green">{theme?.icon} {theme?.name ?? ''}</Badge>
                  <Badge variant="amber">{typeLabel[type] ?? type}</Badge>
                  <Badge variant="gray">{getFocusLabel(focusId)}</Badge>
                  <Badge variant="gray">{weight}%</Badge>
                </div>
                <p className="text-white font-semibold">Objective {i + 1}: {obj}</p>
              </div>

              {/* KRs */}
              <div className="bg-white px-4 py-3 space-y-2">
                {focusKRs.map((kr, j) => (
                  <div key={kr.id} className="flex items-start gap-2">
                    <span className="mt-0.5 px-2 py-0.5 bg-[#878800] text-white text-xs rounded font-bold flex-shrink-0">
                      KR{j + 1}
                    </span>
                    <p className="text-sm text-stone-700">{kr.text}</p>
                  </div>
                ))}
              </div>

              {/* Rationale */}
              <div className="bg-emerald-50 border-t border-emerald-100 px-4 py-3">
                <p className="text-xs font-semibold text-emerald-700 mb-1">Rationale</p>
                <p className="text-xs text-emerald-800">
                  This objective addresses <strong>{getFocusLabel(focusId)}</strong> for {person!.name} in {currentSession!.quarter}.
                  {type === 'build' && ' Focused on establishing new capabilities or completing a defined deliverable.'}
                  {type === 'improve' && ' Aimed at measurably lifting performance from a known baseline.'}
                  {type === 'maintain' && ' Sustaining existing performance while optimising for efficiency.'}
                  {type === 'multi' && ' Part of a multi-quarter initiative — KRs reflect this quarter\'s milestone only.'}
                  {currentSession!.constraints && ` Context: ${currentSession!.constraints}`}
                </p>
              </div>

              {/* Risks */}
              {hasRisks && (
                <div className="bg-amber-50 border-t border-amber-100 px-4 py-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Risks</p>
                  <p className="text-xs text-amber-800">
                    One or more KRs still contain placeholder values. Confirm specific targets with {person.name} before loading into Mooncamp.
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <WizardNav step={10} total={11} onBack={onBack} onNext={() => { saveSession(); onNext() }} nextLabel="Save & Finish" />
    </div>
  )
}

import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSessionStore } from '../store/sessionStore'
import { useCoachStore } from '../store/coachStore'
import { THEMES, getFocusOptions } from '../data/themes'
import { getTeamMember } from '../data/team'
import { Avatar } from '../components/shared/Avatar'
import { Badge } from '../components/shared/Badge'

export function SessionView() {
  const { id } = useParams<{ id: string }>()
  const { savedSessions, loadSession, currentSession } = useSessionStore()
  const { setContext } = useCoachStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) loadSession(id)
  }, [id])

  const session = savedSessions.find(s => s.id === id) ?? currentSession
  const person = session ? getTeamMember(session.personId) : null

  if (!session || !person) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Session not found.</p>
          <Link to="/" className="text-[#878800] hover:underline">← Back to dashboard</Link>
        </div>
      </div>
    )
  }

  const allFocusIds = Object.values(session.focusAreas ?? {}).flat()
  const typeLabel: Record<string, string> = {
    build: 'Build', improve: 'Improve', maintain: 'Maintain', multi: 'Multi-Quarter',
  }

  function getFocusLabel(focusId: string): string {
    for (const themeId of Object.keys(session.focusAreas ?? {})) {
      const opts = getFocusOptions(themeId, person.area, person.div)
      const opt = opts.find(o => o.id === focusId)
      if (opt) return opt.n
    }
    return focusId
  }

  function getThemeForFocus(focusId: string) {
    for (const [themeId, ids] of Object.entries(session.focusAreas ?? {})) {
      if (ids.includes(focusId)) return THEMES.find(t => t.id === themeId)
    }
    return null
  }

  function openCoach() {
    const okrContext = allFocusIds.map(id => {
      const obj = session.objectives[id] ?? ''
      const focusKRs = session.krs[id] ?? []
      return `Objective: ${obj}\nKRs:\n${focusKRs.map((kr, i) => `  ${i + 1}. ${kr.text}`).join('\n')}`
    }).join('\n\n')
    setContext(person.id, okrContext)
    navigate('/coach')
  }

  function copyAsText() {
    const lines: string[] = [`OKR PLAN — ${person.name} | ${session.quarter}\n`]
    allFocusIds.forEach((focusId, i) => {
      const obj = session.objectives[focusId] ?? ''
      const type = session.objTypes[focusId] ?? ''
      const weight = session.weights[focusId] ?? 0
      const focusKRs = session.krs[focusId] ?? []
      lines.push(`OBJECTIVE ${i + 1} [${typeLabel[type]} | ${getFocusLabel(focusId)} | ${weight}%]`)
      lines.push(obj)
      lines.push('')
      focusKRs.forEach((kr, j) => lines.push(`  KR${j + 1}: ${kr.text}`))
      lines.push('')
    })
    navigator.clipboard.writeText(lines.join('\n'))
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <header className="bg-[#31261D] text-white no-print">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-stone-400 hover:text-white text-sm transition-colors">← Dashboard</Link>
          <div className="flex items-center gap-2">
            <button onClick={copyAsText} className="px-3 py-1.5 text-xs border border-stone-500 text-stone-300 rounded-lg hover:bg-white/10 transition-colors">Copy text</button>
            <button onClick={() => window.print()} className="px-3 py-1.5 text-xs border border-stone-500 text-stone-300 rounded-lg hover:bg-white/10 transition-colors">Print / PDF</button>
            <button onClick={openCoach} className="px-3 py-1.5 text-xs bg-[#878800] text-white rounded-lg hover:bg-[#6b6c00] transition-colors">Open Coach</button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Person card */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar initials={person.initials} size="xl" level={person.level} />
          <div>
            <h1 className="text-2xl font-bold text-[#31261D]">{person.name}</h1>
            <p className="text-stone-500">{person.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={person.level === 'Executive Team' ? 'brown' : person.level === 'Leadership Team' ? 'green' : 'gray'}>
                {person.level}
              </Badge>
              <Badge variant="outline">{session.quarter}</Badge>
              {session.completedAt && <Badge variant="green">Complete</Badge>}
            </div>
          </div>
        </div>

        {/* OKRs */}
        <div className="space-y-4">
          {allFocusIds.map((focusId, i) => {
            const theme = getThemeForFocus(focusId)
            const obj = session.objectives[focusId] ?? ''
            const type = session.objTypes[focusId] ?? ''
            const weight = session.weights[focusId] ?? 0
            const focusKRs = session.krs[focusId] ?? []

            return (
              <div key={focusId} className="rounded-lg border border-stone-200 overflow-hidden">
                <div className="bg-[#31261D] px-4 py-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {theme && <Badge variant="green">{theme.icon} {theme.name}</Badge>}
                    <Badge variant="amber">{typeLabel[type] ?? type}</Badge>
                    <Badge variant="gray">{getFocusLabel(focusId)}</Badge>
                    <Badge variant="gray">{weight}%</Badge>
                  </div>
                  <p className="text-white font-semibold">Objective {i + 1}: {obj}</p>
                </div>
                <div className="bg-white px-4 py-3 space-y-2">
                  {focusKRs.map((kr, j) => (
                    <div key={kr.id} className="flex items-start gap-2">
                      <span className="mt-0.5 px-2 py-0.5 bg-[#878800] text-white text-xs rounded font-bold flex-shrink-0">KR{j + 1}</span>
                      <p className="text-sm text-stone-700">{kr.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {session.constraints && (
          <div className="mt-6 p-4 bg-white border border-stone-200 rounded-lg">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Constraints / Context</p>
            <p className="text-sm text-stone-700">{session.constraints}</p>
          </div>
        )}
      </main>
    </div>
  )
}

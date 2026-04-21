import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TEAM } from '../data/team'
import { useSessionStore } from '../store/sessionStore'
import { Avatar } from '../components/shared/Avatar'
import { Badge } from '../components/shared/Badge'
import { ProgressBar } from '../components/shared/ProgressBar'

const AREAS = ['All', 'Sales', 'Operations', 'Finance', 'HR', 'Executive']
const LEVELS = ['All', 'Executive Team', 'Leadership Team', 'Individual']

export function TeamPage() {
  const [area, setArea] = useState('All')
  const [level, setLevel] = useState('All')
  const [search, setSearch] = useState('')
  const { clearCurrent } = useSessionStore()
  const navigate = useNavigate()

  const filtered = TEAM.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
    const matchArea = area === 'All' || p.area === area
    const matchLevel = level === 'All' || p.level === level
    return matchSearch && matchArea && matchLevel
  })

  function startSession(personId: string) {
    clearCurrent()
    navigate('/session/new', { state: { personId } })
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <header className="bg-[#31261D] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <div className="w-9 h-9 bg-[#31261D] border border-stone-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>J</span>
              </div>
            </Link>
            <span className="font-semibold">Team Directory</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-stone-400 hover:text-white text-sm transition-colors">Dashboard</Link>
            <button
              onClick={() => { clearCurrent(); navigate('/session/new') }}
              className="px-4 py-2 bg-[#878800] text-white rounded-lg text-sm font-medium hover:bg-[#6b6c00] transition-colors"
            >
              + New Session
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-40 px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-[#878800] bg-white"
          />
          <select value={area} onChange={e => setArea(e.target.value)} className="px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-[#878800]">
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
          <select value={level} onChange={e => setLevel(e.target.value)} className="px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-[#878800]">
            {LEVELS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => {
            const lastQuarter = p.hist[p.hist.length - 1]
            return (
              <div key={p.id} className="bg-white border border-stone-200 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar initials={p.initials} size="lg" level={p.level} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#31261D]">{p.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{p.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <Badge
                        variant={p.level === 'Executive Team' ? 'brown' : p.level === 'Leadership Team' ? 'green' : 'gray'}
                        size="sm"
                      >
                        {p.level}
                      </Badge>
                      {p.div && <Badge variant="gray" size="sm">{p.div}</Badge>}
                    </div>
                  </div>
                </div>

                {lastQuarter && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-stone-400">{lastQuarter.q}</span>
                      <span className="text-xs font-semibold text-stone-600">{lastQuarter.prog}%</span>
                    </div>
                    <ProgressBar value={lastQuarter.prog} size="sm" />
                    <p className="text-xs text-stone-400 mt-1 truncate">{lastQuarter.obj}</p>
                  </div>
                )}

                {p.strategic.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-stone-400 mb-1.5">Strategic priorities</p>
                    <div className="flex flex-wrap gap-1">
                      {p.strategic.slice(0, 2).map((s, i) => (
                        <Badge key={i} variant="outline" size="sm">{s.length > 30 ? s.slice(0, 30) + '…' : s}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => startSession(p.id)}
                  className="w-full py-2 text-sm font-medium border border-[#878800] text-[#878800] rounded-lg hover:bg-[#878800] hover:text-white transition-colors"
                >
                  Plan OKRs →
                </button>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-12">No team members match your filters.</p>
        )}
      </main>
    </div>
  )
}

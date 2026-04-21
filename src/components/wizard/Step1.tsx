import { useState } from 'react'
import { TEAM } from '../../data/team'
import { useSessionStore } from '../../store/sessionStore'
import { Avatar } from '../shared/Avatar'
import { Badge } from '../shared/Badge'
import { WizardNav } from '../shared/WizardNav'

const AREAS = ['All', 'Sales', 'Operations', 'Finance', 'HR', 'Executive']
const LEVELS = ['All', 'Executive Team', 'Leadership Team', 'Individual']

export function Step1({ onNext }: { onNext: () => void }) {
  const { currentSession, startSession, updateSession } = useSessionStore()
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('All')
  const [level, setLevel] = useState('All')

  const filtered = TEAM.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.div.toLowerCase().includes(q)
    const matchArea = area === 'All' || p.area === area
    const matchLevel = level === 'All' || p.level === level
    return matchSearch && matchArea && matchLevel
  })

  const selected = currentSession?.personId

  function select(id: string) {
    if (!currentSession) {
      startSession(id)
    } else {
      updateSession({ personId: id })
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Select team member</h2>
      <p className="text-sm text-stone-500 mb-5">Choose who this OKR session is for.</p>

      {/* Quick-select chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TEAM.map(p => (
          <button
            key={p.id}
            onClick={() => select(p.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              selected === p.id
                ? 'bg-[#31261D] text-white border-[#31261D]'
                : 'bg-white text-stone-600 border-stone-300 hover:border-[#31261D]'
            }`}
          >
            {p.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name, role or division…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-48 px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-[#878800]"
        />
        <select value={area} onChange={e => setArea(e.target.value)} className="px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-[#878800] bg-white">
          {AREAS.map(a => <option key={a}>{a}</option>)}
        </select>
        <select value={level} onChange={e => setLevel(e.target.value)} className="px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-[#878800] bg-white">
          {LEVELS.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
        {filtered.map(p => (
          <button
            key={p.id}
            onClick={() => select(p.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
              selected === p.id
                ? 'border-[#878800] bg-[#f5f0eb] ring-1 ring-[#878800]'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <Avatar initials={p.initials} size="md" level={p.level} />
            <div className="min-w-0">
              <div className="text-sm font-medium text-[#31261D] truncate">{p.name}</div>
              <div className="text-xs text-stone-500 truncate">{p.role}</div>
              <div className="mt-1">
                <Badge variant={p.level === 'Executive Team' ? 'brown' : p.level === 'Leadership Team' ? 'green' : 'gray'} size="sm">
                  {p.level}
                </Badge>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-stone-400 text-center py-8">No team members match your search.</p>
        )}
      </div>

      <WizardNav
        step={1} total={11}
        onBack={() => {}}
        onNext={onNext}
        nextDisabled={!selected}
        backDisabled
      />
    </div>
  )
}

import { useNavigate, Link } from 'react-router-dom'
import { useSessionStore } from '../store/sessionStore'
import { TEAM, getTeamMember } from '../data/team'
import { Avatar } from '../components/shared/Avatar'
import { Badge } from '../components/shared/Badge'

function JeffriesLogo() {
  return (
    <div className="w-10 h-10 bg-[#31261D] rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>J</span>
    </div>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const { savedSessions, loadSession, clearCurrent } = useSessionStore()
  const recent = savedSessions.slice(0, 5)

  function startNew() {
    clearCurrent()
    navigate('/session/new')
  }

  function openSession(id: string) {
    loadSession(id)
    navigate(`/session/${id}`)
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Header */}
      <header className="bg-[#31261D] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <JeffriesLogo />
            <div>
              <div className="font-semibold text-lg">Jeffries OKR Planner</div>
              <div className="text-xs text-stone-400">Organics Recycling & Landscaping</div>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/team" className="text-stone-300 hover:text-white transition-colors">Team</Link>
            <Link to="/coach" className="text-stone-300 hover:text-white transition-colors">Coach</Link>
            <button
              onClick={startNew}
              className="px-4 py-2 bg-[#878800] text-white rounded-lg font-medium hover:bg-[#6b6c00] transition-colors"
            >
              + New Session
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero CTA */}
        <div className="bg-white border border-stone-200 rounded-xl p-8 mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#31261D] mb-2">Plan your OKRs</h1>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            11-step guided planning with coaching support, Jeffries-specific templates, and AI-powered review.
          </p>
          <button
            onClick={startNew}
            className="px-8 py-3 bg-[#31261D] text-white rounded-lg font-semibold text-lg hover:bg-[#4a3d31] transition-colors"
          >
            Start New OKR Session →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team grid */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEAM.map(p => (
                <button
                  key={p.id}
                  onClick={() => { clearCurrent(); navigate('/session/new', { state: { personId: p.id } }) }}
                  className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-lg text-left hover:border-[#878800] transition-colors"
                >
                  <Avatar initials={p.initials} size="md" level={p.level} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#31261D] truncate">{p.name}</div>
                    <div className="text-xs text-stone-500 truncate">{p.role}</div>
                    <div className="mt-1">
                      <Badge
                        variant={p.level === 'Executive Team' ? 'brown' : p.level === 'Leadership Team' ? 'green' : 'gray'}
                        size="sm"
                      >
                        {p.div || p.area}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent sessions */}
          <div>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">Recent sessions</h2>
            {recent.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-lg p-6 text-center">
                <p className="text-stone-400 text-sm">No sessions yet.</p>
                <p className="text-stone-400 text-xs mt-1">Start a session to see it here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map(s => {
                  const p = getTeamMember(s.personId)
                  const focusCount = Object.values(s.focusAreas ?? {}).flat().length
                  return (
                    <button
                      key={s.id}
                      onClick={() => openSession(s.id)}
                      className="w-full flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-lg text-left hover:border-[#878800] transition-colors"
                    >
                      {p && <Avatar initials={p.initials} size="sm" level={p.level} />}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-[#31261D]">{p?.name ?? 'Unknown'}</div>
                        <div className="text-xs text-stone-500">{s.quarter} · {focusCount} objective{focusCount !== 1 ? 's' : ''}</div>
                        <div className="mt-1">
                          <Badge variant={s.completedAt ? 'green' : 'amber'} size="sm">
                            {s.completedAt ? 'Complete' : 'In progress'}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  )
                })}
                <Link to="/sessions" className="block text-center text-xs text-[#878800] hover:underline pt-1">
                  View all sessions →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

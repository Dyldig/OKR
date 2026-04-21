import { getTeamMember } from '../../data/team'
import { useSessionStore } from '../../store/sessionStore'
import { ProgressBar } from '../shared/ProgressBar'
import { Badge } from '../shared/Badge'
import { Callout } from '../shared/Card'
import { WizardNav } from '../shared/WizardNav'

const QUARTERS = ['Q1 FY27', 'Q2 FY27', 'Q3 FY27', 'Q4 FY27', 'Q1 FY28']

function progColor(p: number) {
  if (p >= 70) return 'text-emerald-600'
  if (p >= 45) return 'text-amber-600'
  return 'text-red-500'
}

export function Step2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { currentSession, updateSession } = useSessionStore()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person) return null

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Context — {person.name}</h2>
      <p className="text-sm text-stone-500 mb-5">Review history and set the quarter before choosing themes.</p>

      {/* Quarter selector */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Planning quarter</label>
        <div className="flex flex-wrap gap-2">
          {QUARTERS.map(q => (
            <button
              key={q}
              onClick={() => updateSession({ quarter: q })}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                currentSession?.quarter === q
                  ? 'bg-[#31261D] text-white border-[#31261D]'
                  : 'bg-white text-stone-600 border-stone-300 hover:border-[#31261D]'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* OKR History */}
      {person.hist.length > 0 && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">OKR history</label>
          <div className="space-y-3">
            {person.hist.map((h, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-semibold text-[#878800]">{h.q}</span>
                    <p className="text-sm font-medium text-[#31261D] mt-0.5">{h.obj}</p>
                  </div>
                  <span className={`text-lg font-bold flex-shrink-0 ${progColor(h.prog)}`}>{h.prog}%</span>
                </div>
                <ProgressBar value={h.prog} showLabel={false} size="sm" />
                <p className="text-xs text-stone-500 mt-2">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Patterns */}
      {person.patterns.length > 0 && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Coaching observations</label>
          <div className="space-y-2">
            {person.patterns.map((pat, i) => (
              <Callout key={i} variant={i === 0 ? 'amber' : i === 1 ? 'brown' : 'green'}>
                {pat}
              </Callout>
            ))}
          </div>
        </div>
      )}

      {/* Strategic priorities */}
      {person.strategic.length > 0 && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Strategic priorities</label>
          <div className="flex flex-wrap gap-2">
            {person.strategic.map((s, i) => (
              <Badge key={i} variant="outline">{s}</Badge>
            ))}
          </div>
        </div>
      )}

      <WizardNav step={2} total={11} onBack={onBack} onNext={onNext} />
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../store/sessionStore'
import { getTeamMember } from '../../data/team'
import { WizardNav } from '../shared/WizardNav'

export function Step11({ onBack }: { onBack: () => void }) {
  const { currentSession, updateSession, saveSession } = useSessionStore()
  const navigate = useNavigate()
  const person = currentSession ? getTeamMember(currentSession.personId) : null
  if (!person || !currentSession) return null

  const allFocusIds = Object.values(currentSession.focusAreas ?? {}).flat()

  function finish() {
    saveSession()
    navigate('/')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#31261D] mb-1">Feedback</h2>
      <p className="text-sm text-stone-500 mb-6">
        Help us improve the OKR planning experience. Your feedback is used to refine future sessions.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
            What felt irrelevant or off-target in this session?
          </label>
          <textarea
            value={currentSession.feedback?.irrelevant ?? ''}
            onChange={e => updateSession({ feedback: { ...currentSession.feedback, irrelevant: e.target.value } })}
            rows={3}
            placeholder="e.g. Some focus area options didn't apply to my role, the objective templates were too generic…"
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg resize-none focus:outline-none focus:border-[#878800]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
            What would you improve about this process?
          </label>
          <textarea
            value={currentSession.feedback?.improve ?? ''}
            onChange={e => updateSession({ feedback: { ...currentSession.feedback, improve: e.target.value } })}
            rows={3}
            placeholder="e.g. I'd like more KR templates, better coaching prompts, ability to import from last quarter…"
            className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg resize-none focus:outline-none focus:border-[#878800]"
          />
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-[#f5f0eb] border border-stone-200 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#878800] rounded-full flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <div>
            <div className="font-semibold text-[#31261D]">Session complete</div>
            <div className="text-sm text-stone-500">{person.name} — {currentSession.quarter}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-[#31261D]">{currentSession.themes.length}</div>
            <div className="text-xs text-stone-500">themes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#31261D]">{allFocusIds.length}</div>
            <div className="text-xs text-stone-500">objectives</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#31261D]">
              {allFocusIds.reduce((sum, id) => sum + (currentSession.krs[id]?.length ?? 0), 0)}
            </div>
            <div className="text-xs text-stone-500">key results</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={finish}
          className="px-5 py-2 bg-[#31261D] text-white rounded-lg text-sm font-medium hover:bg-[#4a3d31] transition-colors"
        >
          ✓ Finish & return to dashboard
        </button>
        <button
          onClick={() => navigate('/session/new')}
          className="px-5 py-2 border border-stone-300 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors"
        >
          Start new session
        </button>
        <button
          onClick={() => navigate('/sessions')}
          className="px-5 py-2 border border-stone-300 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors"
        >
          View all sessions →
        </button>
      </div>

      <WizardNav step={11} total={11} onBack={onBack} onNext={finish} nextLabel="Finish" />
    </div>
  )
}

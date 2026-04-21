import { useCoachStore } from '../../store/coachStore'
import { getTeamMember } from '../../data/team'
import { Avatar } from '../shared/Avatar'
import { CoachChat } from './CoachChat'

interface CoachPanelProps {
  onClose?: () => void
}

export function CoachPanel({ onClose }: CoachPanelProps) {
  const { sessionPersonId, clearChat } = useCoachStore()
  const person = sessionPersonId ? getTeamMember(sessionPersonId) : null

  return (
    <div className="flex flex-col h-full bg-stone-50 border-l border-stone-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#31261D] text-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#878800] rounded-full flex items-center justify-center text-sm font-bold">
            🌿
          </div>
          <div>
            <div className="text-sm font-semibold">OKR Coach</div>
            {person && (
              <div className="text-xs text-stone-300">{person.name} — {person.role}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {person && (
            <Avatar initials={person.initials} size="sm" level={person.level} />
          )}
          <button
            onClick={clearChat}
            className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors"
            title="Clear chat"
          >
            Clear
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white text-xl leading-none px-1 hover:bg-white/10 rounded transition-colors"
              title="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-hidden">
        <CoachChat />
      </div>
    </div>
  )
}

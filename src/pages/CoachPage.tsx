import { Link } from 'react-router-dom'
import { CoachPanel } from '../components/coach/CoachPanel'

export function CoachPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] flex flex-col">
      <header className="bg-[#31261D] text-white flex-shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#31261D] border border-stone-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Georgia, serif' }}>J</span>
            </div>
            <span className="text-sm font-medium">OKR Coach</span>
          </div>
          <Link to="/" className="text-stone-400 hover:text-white text-sm transition-colors">← Dashboard</Link>
        </div>
      </header>
      <div className="flex-1 max-w-3xl w-full mx-auto flex flex-col">
        <CoachPanel />
      </div>
    </div>
  )
}

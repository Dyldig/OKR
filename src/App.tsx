import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { NewSession } from './pages/NewSession'
import { SessionView } from './pages/SessionView'
import { CoachPage } from './pages/CoachPage'
import { TeamPage } from './pages/TeamPage'

function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center text-center">
      <div>
        <p className="text-4xl font-bold text-[#31261D] mb-2">404</p>
        <p className="text-stone-500">Page not found.</p>
        <a href="/" className="mt-4 inline-block text-[#878800] hover:underline">← Back to dashboard</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/session/new" element={<NewSession />} />
      <Route path="/session/:id" element={<SessionView />} />
      <Route path="/coach" element={<CoachPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

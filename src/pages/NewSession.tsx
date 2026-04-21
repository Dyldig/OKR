import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSessionStore } from '../store/sessionStore'
import { WizardProgress } from '../components/shared/ProgressBar'
import { Step1 } from '../components/wizard/Step1'
import { Step2 } from '../components/wizard/Step2'
import { Step3 } from '../components/wizard/Step3'
import { Step4 } from '../components/wizard/Step4'
import { Step5 } from '../components/wizard/Step5'
import { Step6 } from '../components/wizard/Step6'
import { Step7 } from '../components/wizard/Step7'
import { Step8 } from '../components/wizard/Step8'
import { Step9 } from '../components/wizard/Step9'
import { Step10 } from '../components/wizard/Step10'
import { Step11 } from '../components/wizard/Step11'
import { Link } from 'react-router-dom'

const TOTAL_STEPS = 11

const STEP_LABELS = [
  'Select person', 'Context', 'Themes', 'Focus areas',
  'Weightings', 'Objective type', 'Objectives', 'Key Results',
  'Review', 'Output', 'Feedback',
]

function JeffriesLogo() {
  return (
    <div className="w-8 h-8 bg-[#31261D] rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-base" style={{ fontFamily: 'Georgia, serif' }}>J</span>
    </div>
  )
}

export function NewSession() {
  const { currentSession, updateSession, startSession } = useSessionStore()
  const location = useLocation()
  const step = currentSession?.currentStep ?? 1

  // Pre-select person if navigated from team grid
  useEffect(() => {
    const personId = location.state?.personId
    if (personId && !currentSession) {
      startSession(personId)
    }
  }, [])

  // Warn on tab close / navigation away while session is in progress
  useEffect(() => {
    const isActive = currentSession != null && !currentSession.completedAt
    if (!isActive) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [currentSession?.completedAt])

  function setStep(s: number) {
    updateSession({ currentStep: s })
  }

  function next() { setStep(Math.min(step + 1, TOTAL_STEPS)) }
  function back() { setStep(Math.max(step - 1, 1)) }

  const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10, Step11]
  const StepComponent = steps[step - 1]

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Header */}
      <header className="bg-[#31261D] text-white no-print">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <JeffriesLogo />
            </Link>
            <div className="ml-1">
              <span className="text-sm font-medium">New OKR Session</span>
              <span className="text-stone-400 text-xs ml-2">Step {step}: {STEP_LABELS[step - 1]}</span>
            </div>
          </div>
          <Link to="/" className="text-stone-400 hover:text-white text-sm transition-colors">
            ✕ Cancel
          </Link>
        </div>
        <WizardProgress current={step} total={TOTAL_STEPS} />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Step indicator dots */}
        <div className="flex items-center gap-1 mb-6 no-print overflow-x-auto">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
            <button
              key={s}
              onClick={() => s < step && setStep(s)}
              disabled={s > step}
              className={`w-6 h-6 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                s === step
                  ? 'bg-[#31261D] text-white'
                  : s < step
                  ? 'bg-[#878800] text-white cursor-pointer hover:bg-[#6b6c00]'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              title={STEP_LABELS[s - 1]}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <StepComponent onBack={back} onNext={next} />
        </div>
      </main>
    </div>
  )
}

interface WizardNavProps {
  step: number
  total: number
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  backDisabled?: boolean
}

export function WizardNav({
  step,
  total,
  onBack,
  onNext,
  nextLabel = 'Continue',
  nextDisabled = false,
  backDisabled = false,
}: WizardNavProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-stone-200 mt-6">
      <button
        onClick={onBack}
        disabled={backDisabled || step === 1}
        className="px-4 py-2 text-sm font-medium text-stone-600 border border-stone-300 rounded-lg hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Back
      </button>
      <span className="text-xs text-stone-400">Step {step} of {total}</span>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="px-5 py-2 text-sm font-medium bg-[#31261D] text-white rounded-lg hover:bg-[#4a3d31] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {step === total ? 'Finish' : nextLabel} {step < total ? '→' : ''}
      </button>
    </div>
  )
}

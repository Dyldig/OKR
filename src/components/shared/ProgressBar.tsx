interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md'
}

function color(pct: number) {
  if (pct >= 70) return 'bg-emerald-500'
  if (pct >= 45) return 'bg-amber-400'
  return 'bg-red-400'
}

export function ProgressBar({ value, max = 100, showLabel = false, size = 'md' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const h = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${h} bg-stone-200 rounded-full overflow-hidden`}>
        <div
          className={`${h} ${color(pct)} rounded-full transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-stone-500 w-8 text-right">{pct}%</span>
      )}
    </div>
  )
}

interface WizardProgressProps {
  current: number
  total: number
}

export function WizardProgress({ current, total }: WizardProgressProps) {
  const pct = ((current - 1) / (total - 1)) * 100
  return (
    <div className="w-full bg-stone-200 h-1">
      <div
        className="h-1 bg-[#878800] transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

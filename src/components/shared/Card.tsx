interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
  hoverable?: boolean
}

export function Card({ children, className = '', onClick, selected, hoverable }: CardProps) {
  const base = 'bg-white border rounded-lg p-4'
  const interactive = onClick || hoverable ? 'cursor-pointer transition-colors' : ''
  const sel = selected
    ? 'border-[#878800] ring-1 ring-[#878800]'
    : 'border-stone-200 hover:border-stone-300'
  return (
    <div className={`${base} ${interactive} ${sel} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

interface CalloutProps {
  children: React.ReactNode
  variant?: 'green' | 'amber' | 'red' | 'brown' | 'blue'
  className?: string
}

const calloutStyles = {
  green:  'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800',
  amber:  'bg-amber-50 border-l-4 border-amber-400 text-amber-800',
  red:    'bg-red-50 border-l-4 border-red-400 text-red-800',
  brown:  'bg-[#f5f0eb] border-l-4 border-[#31261D] text-[#31261D]',
  blue:   'bg-blue-50 border-l-4 border-blue-400 text-blue-800',
}

export function Callout({ children, variant = 'brown', className = '' }: CalloutProps) {
  return (
    <div className={`p-3 rounded-r-lg text-sm ${calloutStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}

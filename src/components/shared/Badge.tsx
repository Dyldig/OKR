interface BadgeProps {
  children: React.ReactNode
  variant?: 'brown' | 'green' | 'amber' | 'red' | 'gray' | 'outline'
  size?: 'sm' | 'md'
}

const variants = {
  brown:   'bg-[#31261D] text-white',
  green:   'bg-[#878800] text-white',
  amber:   'bg-amber-100 text-amber-800 border border-amber-200',
  red:     'bg-red-100 text-red-700 border border-red-200',
  gray:    'bg-stone-100 text-stone-600 border border-stone-200',
  outline: 'border border-[#31261D] text-[#31261D] bg-transparent',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({ children, variant = 'gray', size = 'md' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  )
}

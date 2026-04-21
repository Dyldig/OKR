interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  level?: string
}

const sizes = {
  sm:  'w-8 h-8 text-xs',
  md:  'w-10 h-10 text-sm',
  lg:  'w-12 h-12 text-base',
  xl:  'w-16 h-16 text-xl',
}

const levelColors: Record<string, string> = {
  'Executive Team':  'bg-[#31261D] text-white',
  'Leadership Team': 'bg-[#878800] text-white',
  'Individual':      'bg-[#c5b8ad] text-[#31261D]',
}

export function Avatar({ initials, size = 'md', level = 'Individual' }: AvatarProps) {
  const color = levelColors[level] ?? levelColors.Individual
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  )
}

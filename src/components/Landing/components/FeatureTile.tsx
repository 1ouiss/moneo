import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type FeatureTileProps = {
  title: string
  text: string
  className?: string
  fragmentClassName?: string
  children: ReactNode
}

// Une tuile du tableau : un morceau de l'interface agrandi et rogné, et sa légende.
export const FeatureTile = ({
  title,
  text,
  className,
  fragmentClassName,
  children,
}: FeatureTileProps) => (
  <li
    data-reveal
    className={cn(
      'relative min-h-56 overflow-hidden transition-transform duration-200 hover:-translate-y-1',
      className,
    )}
  >
    <div
      data-ui
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className={cn('absolute', fragmentClassName)}>{children}</div>
    </div>
    <div className="absolute bottom-5 left-5 z-10 max-w-[30ch] bg-inherit pr-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-note">{text}</p>
    </div>
  </li>
)

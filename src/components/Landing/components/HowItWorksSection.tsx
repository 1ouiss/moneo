import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { HOW_IT_WORKS_STEPS } from '../constants/content'
import { ExpenseStepCard } from './ExpenseStepCard'

export const HowItWorksSection = () => (
  <section
    id="comment"
    aria-labelledby="comment-titre"
    className="grid scroll-mt-2 md:grid-cols-2 lg:grid-cols-4"
  >
    {HOW_IT_WORKS_STEPS.map((step, index) => (
      <div
        key={step.clause}
        className={cn(
          'group flex min-h-[64svh] flex-col gap-8 px-5 py-8 lg:min-h-[84svh] lg:px-7',
          step.className,
        )}
      >
        {index === 0 ? (
          <h2 id="comment-titre" className="text-lead font-bold" data-reveal>
            Comment ça marche
          </h2>
        ) : (
          <span aria-hidden="true" className="hidden text-lead lg:block">
            &nbsp;
          </span>
        )}
        <div
          data-reveal
          className="lg:mt-[18svh]"
          style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
        >
          <ExpenseStepCard step={index} />
        </div>
        <p className="mt-auto max-w-[14ch] text-lead" data-reveal>
          {step.clause}
        </p>
      </div>
    ))}
  </section>
)

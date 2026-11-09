import { cn } from '@/lib/utils'
import { FAQ_ITEMS } from '../constants/faq'

export const FaqSection = () => (
  <section id="questions" aria-labelledby="questions-titre" className="scroll-mt-2">
    <div className="flex min-h-[40svh] items-end bg-foreground px-4 py-10 text-background sm:px-8">
      <h2 id="questions-titre" data-reveal className="text-title font-semibold">
        Vos questions
      </h2>
    </div>
    {FAQ_ITEMS.map((item, index) => (
      <div
        key={item.question}
        className={cn(
          'grid gap-4 px-4 py-10 sm:px-8 lg:grid-cols-12 lg:py-14',
          index % 2 === 0 ? 'bg-background' : 'bg-surface',
        )}
      >
        <h3 data-reveal className="text-lead font-bold lg:col-span-5">
          {item.question}
        </h3>
        <p
          data-reveal
          className="max-w-[60ch] text-body [--reveal-delay:80ms] lg:col-span-6 lg:col-start-7"
        >
          {item.answer}
        </p>
      </div>
    ))}
  </section>
)

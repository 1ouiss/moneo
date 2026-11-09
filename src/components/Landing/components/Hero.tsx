import { RewardsCard } from '@/components/RewardsCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { APP_URL, SECTION_LINKS } from '../constants/content'
import { SAMPLE_GROUP } from '../constants/sampleGroup'

export const Hero = () => (
  <section
    aria-labelledby="titre"
    className="grid gap-2.5 p-2.5 lg:min-h-svh lg:grid-cols-12"
  >
    <div className="relative flex min-h-[88svh] flex-col overflow-hidden rounded-xl bg-field-mint p-5 sm:p-7 lg:col-span-10 lg:min-h-0">
      <header className="flex items-center justify-between gap-4">
        <a href="/" className="text-body font-semibold">
          Les comptes entre potes
        </a>
        <Button
          asChild
          className="h-12 rounded-none bg-brand px-6 text-base text-brand-foreground transition-transform hover:bg-brand/90 active:scale-95"
        >
          <a href={APP_URL}>Ouvrir l’appli</a>
        </Button>
      </header>
      <h1
        id="titre"
        className="mt-[8svh] max-w-[16ch] animate-rise text-display font-semibold"
      >
        Partagez les frais entre potes
      </h1>
      <p className="mt-10 max-w-sm animate-rise text-body [animation-delay:140ms] lg:mt-auto">
        Notez qui a payé quoi : l’appli divise à parts égales, au centime près,
        dit qui rembourse qui et couronne celui qui a le plus sorti la carte.
        Gratuit, sans compte.
      </p>
      <div
        data-ui
        aria-hidden="true"
        className="pointer-events-none mt-12 -mb-24 animate-rise [animation-delay:260ms] lg:absolute lg:right-7 lg:bottom-0 lg:mt-0 lg:mb-0 lg:w-[30rem] lg:translate-y-24"
      >
        <div className="animate-drift">
          <RewardsCard group={SAMPLE_GROUP} />
        </div>
      </div>
    </div>
    <nav
      aria-label="Sections de la page"
      className="grid lg:col-span-2 lg:grid-rows-5"
    >
      {SECTION_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            'flex h-13 items-start p-4 text-base transition-[padding] hover:pl-6 focus-visible:pl-6 lg:h-auto lg:p-5',
            link.className,
          )}
        >
          {link.label}
        </a>
      ))}
      <a
        href={APP_URL}
        className="flex h-13 items-start bg-brand p-4 text-base text-brand-foreground transition-[padding] hover:pl-6 focus-visible:pl-6 lg:h-auto lg:p-5"
      >
        Ouvrir l’appli
      </a>
    </nav>
  </section>
)

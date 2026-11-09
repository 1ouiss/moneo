import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { APP_URL } from '../constants/content'

export const CtaSection = () => (
  <section
    aria-labelledby="cta-titre"
    className="grid min-h-[90svh] items-end gap-12 bg-brand px-4 py-16 text-brand-foreground sm:px-8 lg:grid-cols-12 lg:items-center"
  >
    <div className="self-end lg:col-span-5">
      <h2 id="cta-titre" data-reveal className="text-title font-semibold">
        On fait les comptes ?
      </h2>
      <p data-reveal className="mt-6 max-w-sm text-body [--reveal-delay:80ms]">
        Le groupe s’ouvre dans l’appli, prêt à accueillir vos amis et vos
        premières dépenses.
      </p>
    </div>
    <form
      data-ui
      data-reveal
      action={APP_URL}
      method="get"
      className="flex w-full max-w-[27.5rem] flex-col gap-4 rounded-xl bg-card p-6 text-card-foreground shadow-2xl [--reveal-delay:160ms] lg:col-span-5 lg:col-start-7"
    >
      <p className="font-heading text-base font-medium">Nouveau groupe</p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cta-group-name">Nom du groupe</Label>
        <Input
          id="cta-group-name"
          name="nouveau"
          defaultValue="Week-end à Annecy"
          maxLength={60}
          required
        />
      </div>
      <Button type="submit" className="h-12 rounded-none bg-brand text-base text-brand-foreground hover:bg-brand/90 active:scale-95">
        Créer le groupe
      </Button>
    </form>
  </section>
)

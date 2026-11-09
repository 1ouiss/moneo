import { Crown, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { REWARD_TIERS } from '@/constants/rewards'
import { formatEuros } from '@/utils/money'
import { FeatureTile } from './FeatureTile'

export const FeaturesSection = () => (
  <section
    id="fonctionnalites"
    aria-labelledby="fonctionnalites-titre"
    className="scroll-mt-2 bg-background p-2.5"
  >
    <ul className="grid auto-rows-[6.5rem] gap-2 md:grid-cols-12">
      <li className="row-span-2 flex items-start bg-surface p-5 md:col-span-6 lg:p-7">
        <h2
          id="fonctionnalites-titre"
          data-reveal
          className="text-title font-semibold"
        >
          Tout pour être quittes
        </h2>
      </li>
      <FeatureTile
        title="Le Mécène couronné"
        text="Celui qui a le plus payé pour la bande prend la couronne du groupe."
        className="row-span-4 bg-field-mint md:col-span-6"
        fragmentClassName="top-6 left-5 [zoom:1.5] md:top-10 md:left-16 md:[zoom:2.4]"
      >
        <div className="flex items-center gap-3 rounded-xl bg-primary p-4 text-primary-foreground">
          <Crown className="size-8" />
          <div>
            <p className="text-xs opacity-80">Mécène du groupe</p>
            <p className="font-semibold">Chloé</p>
            <p className="text-xs opacity-80">250,00 € dépensés</p>
          </div>
        </div>
      </FeatureTile>
      <FeatureTile
        title="Quatre paliers"
        text="De Petit joueur à Légende, selon ce que chacun a avancé."
        className="row-span-4 bg-field-pink md:col-span-3"
        fragmentClassName="top-6 left-5 [zoom:1.6]"
      >
        <ul className="flex flex-col gap-1.5">
          {REWARD_TIERS.map((tier) => (
            <li key={tier.label}>
              <Badge variant="outline" className="bg-background">
                {tier.label} · {formatEuros(tier.minCents)}
              </Badge>
            </li>
          ))}
        </ul>
      </FeatureTile>
      <FeatureTile
        title="Le minimum de virements"
        text="Qui rembourse qui, sans aller-retour inutile."
        className="row-span-2 bg-field-paper md:col-span-3"
        fragmentClassName="top-5 left-5 [zoom:2]"
      >
        <p className="font-medium whitespace-nowrap">Bob → Chloé 86,66 €</p>
      </FeatureTile>
      <FeatureTile
        title="Des soldes en direct"
        text="Chaque dépense ajoutée met les comptes à jour."
        className="row-span-2 bg-foreground text-background md:col-span-3"
        fragmentClassName="top-3 left-5 [zoom:2.6]"
      >
        <p className="font-semibold tabular-nums">+103,34 €</p>
      </FeatureTile>
      <FeatureTile
        title="Pour qui ? À la carte"
        text="Cochez les amis concernés, dépense par dépense."
        className="row-span-2 bg-field-mint md:col-span-6"
        fragmentClassName="top-4 left-5 [zoom:1.5] md:top-3 md:right-6 md:left-auto md:[zoom:2.2]"
      >
        <div className="flex gap-3 text-sm">
          {['Alice', 'Bob', 'Chloé'].map((name, i) => (
            <span key={name} className="flex items-center gap-1.5">
              <Checkbox checked={i !== 1} tabIndex={-1} />
              {name}
            </span>
          ))}
        </div>
      </FeatureTile>
      <FeatureTile
        title="Sans compte"
        text="Vos groupes restent dans le navigateur de votre appareil."
        className="row-span-2 bg-surface md:col-span-6"
        fragmentClassName="top-4 right-6 [zoom:2]"
      >
        <p className="text-sm font-medium">Aucune inscription</p>
      </FeatureTile>
      <FeatureTile
        title="Un départ propre"
        text="Retirer quelqu’un recalcule tout, après vous avoir montré l’impact."
        className="row-span-2 bg-field-pink md:col-span-6"
        fragmentClassName="top-4 right-6 [zoom:2.2]"
      >
        <Badge variant="secondary" className="gap-1 bg-background">
          Bob
          <X className="size-3" />
        </Badge>
      </FeatureTile>
    </ul>
  </section>
)

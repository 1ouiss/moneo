import { Crown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PODIUM_EMOJIS, REWARD_TIERS } from '@/constants/rewards'
import type { Group } from '@/types/group'
import { formatEuros } from '@/utils/money'
import { computeRankings } from '@/utils/rewards'

type RewardsCardProps = {
  group: Group
}

export const RewardsCard = ({ group }: RewardsCardProps) => {
  const rankings = computeRankings(group)
  const topSpenders = rankings.filter(
    (r) => r.rank === 1 && r.totalPaidCents > 0,
  )

  return (
    <div className="flex flex-col gap-6">
      {topSpenders.length > 0 && (
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex items-center gap-4">
            <Crown className="size-10 shrink-0" />
            <div>
              <p className="text-sm opacity-80">Mécène du groupe</p>
              <p className="text-xl font-semibold">
                {topSpenders.map((r) => r.participant.name).join(' & ')}
              </p>
              <p className="text-sm opacity-80">
                {formatEuros(topSpenders[0].totalPaidCents)} dépensés pour la
                bande
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Classement des dépensiers</CardTitle>
          <CardDescription>
            Paliers :{' '}
            {REWARD_TIERS.map(
              (tier) =>
                `${tier.emoji} ${tier.label} (${formatEuros(tier.minCents)})`,
            ).join(' · ')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col divide-y divide-border">
            {rankings.map((ranking) => (
              <li
                key={ranking.participant.id}
                className="flex items-center gap-3 py-3"
              >
                <span className="w-8 text-center text-xl">
                  {PODIUM_EMOJIS[ranking.rank - 1] ?? `#${ranking.rank}`}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {ranking.participant.name}
                    <Badge variant="outline">
                      {ranking.tier.emoji} {ranking.tier.label}
                    </Badge>
                  </p>
                  {ranking.nextTier && (
                    <p className="text-sm text-muted-foreground">
                      Encore{' '}
                      {formatEuros(
                        ranking.nextTier.minCents - ranking.totalPaidCents,
                      )}{' '}
                      pour {ranking.nextTier.emoji} {ranking.nextTier.label}
                    </p>
                  )}
                </div>
                <span className="font-medium tabular-nums">
                  {formatEuros(ranking.totalPaidCents)}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

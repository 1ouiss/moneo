import { ArrowRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Group } from '@/types/group'
import { computeBalances, computeSettlements } from '@/utils/balances'
import { formatEuros } from '@/utils/money'

type BalancesCardProps = {
  group: Group
}

export const BalancesCard = ({ group }: BalancesCardProps) => {
  const balances = computeBalances(group)
  const settlements = computeSettlements(balances)
  const getName = (participantId: string) =>
    group.participants.find((p) => p.id === participantId)?.name ?? '?'

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Soldes</CardTitle>
          <CardDescription>
            Positif : on te doit de l'argent. Négatif : tu dois de l'argent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y divide-border">
            {group.participants.map((participant) => {
              const cents = balances.get(participant.id) ?? 0
              return (
                <li
                  key={participant.id}
                  className="flex justify-between py-2"
                >
                  <span>{participant.name}</span>
                  <span
                    className={cn(
                      'font-medium tabular-nums',
                      cents < 0 && 'text-destructive',
                      cents === 0 && 'text-muted-foreground',
                    )}
                  >
                    {cents > 0 && '+'}
                    {formatEuros(cents)}
                  </span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Remboursements</CardTitle>
          <CardDescription>
            Le minimum de virements pour que tout le monde soit quitte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {settlements.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Tout le monde est quitte 🎉
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {settlements.map((settlement) => (
                <li
                  key={`${settlement.fromId}-${settlement.toId}`}
                  className="flex items-center gap-2"
                >
                  <span className="font-medium">
                    {getName(settlement.fromId)}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                  <span className="font-medium">
                    {getName(settlement.toId)}
                  </span>
                  <span className="ml-auto tabular-nums">
                    {formatEuros(settlement.amountCents)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

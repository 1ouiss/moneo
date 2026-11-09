import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Group } from '@/types/group'
import { formatEuros } from '@/utils/money'

type ExpenseListProps = {
  group: Group
  onRemove: (expenseId: string) => void
}

export const ExpenseList = ({ group, onRemove }: ExpenseListProps) => {
  const getName = (participantId: string) =>
    group.participants.find((p) => p.id === participantId)?.name ?? '?'
  const totalCents = group.expenses.reduce((sum, e) => sum + e.amountCents, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dépenses · {formatEuros(totalCents)}</CardTitle>
      </CardHeader>
      <CardContent>
        {group.expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune dépense pour l'instant.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {group.expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{expense.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Payé par {getName(expense.paidById)} · partagé entre{' '}
                    {expense.splitBetweenIds.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium tabular-nums">
                    {formatEuros(expense.amountCents)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onRemove(expense.id)}
                    aria-label={`Supprimer ${expense.title}`}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

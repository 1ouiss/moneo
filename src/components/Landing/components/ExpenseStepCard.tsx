import { computeBalances, computeSettlements, splitEqually } from '@/utils/balances'
import { formatEuros } from '@/utils/money'
import { RESTAURANT_ONLY } from '../constants/sampleGroup'

type ExpenseStepCardProps = {
  step: number
}

const expense = RESTAURANT_ONLY.expenses[0]
const getName = (id: string) =>
  RESTAURANT_ONLY.participants.find((p) => p.id === id)?.name ?? '?'

export const ExpenseStepCard = ({ step }: ExpenseStepCardProps) => {
  const shares = splitEqually(expense.amountCents, expense.splitBetweenIds.length)
  const settlements = computeSettlements(computeBalances(RESTAURANT_ONLY))

  return (
    <div
      data-ui
      className="w-[18.75rem] max-w-full rounded-xl bg-card p-4 text-sm text-card-foreground transition-transform duration-150 group-hover:-translate-y-1.5"
    >
      <div className="flex justify-between font-medium">
        <span>{expense.title}</span>
        <span className="tabular-nums">{formatEuros(expense.amountCents)}</span>
      </div>
      {step >= 1 && (
        <p className="mt-1 text-muted-foreground">
          Payé par {getName(expense.paidById)}
        </p>
      )}
      {step >= 2 && (
        <ul className="mt-3 flex flex-col gap-1">
          {expense.splitBetweenIds.map((id, i) => (
            <li key={id} className="flex justify-between">
              <span>{getName(id)}</span>
              <span className="tabular-nums">{formatEuros(shares[i])}</span>
            </li>
          ))}
        </ul>
      )}
      {step >= 3 && (
        <ul className="mt-3 flex flex-col gap-1 bg-field-mint p-2 font-medium">
          {settlements.map((settlement) => (
            <li key={settlement.fromId} className="flex justify-between">
              <span>
                {getName(settlement.fromId)} → {getName(settlement.toId)}
              </span>
              <span className="tabular-nums">
                {formatEuros(settlement.amountCents)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

import type { Group, Settlement } from '@/types/group'

// Répartit les centimes restants sur les premiers pour que la somme tombe juste.
export const splitEqually = (amountCents: number, count: number) => {
  const base = Math.floor(amountCents / count)
  const remainder = amountCents - base * count
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0))
}

// Solde > 0 : on lui doit de l'argent ; solde < 0 : il doit de l'argent.
export const computeBalances = (group: Group) => {
  const balances = new Map(group.participants.map((p) => [p.id, 0]))
  const add = (id: string, cents: number) =>
    balances.set(id, (balances.get(id) ?? 0) + cents)

  for (const expense of group.expenses) {
    add(expense.paidById, expense.amountCents)
    const shares = splitEqually(
      expense.amountCents,
      expense.splitBetweenIds.length,
    )
    expense.splitBetweenIds.forEach((id, i) => add(id, -shares[i]))
  }
  return balances
}

// Algorithme glouton : le plus gros débiteur rembourse le plus gros créancier.
export const computeSettlements = (balances: Map<string, number>) => {
  const toSortedList = (sign: 1 | -1) =>
    [...balances]
      .filter(([, cents]) => cents * sign > 0)
      .map(([id, cents]) => ({ id, cents: cents * sign }))
      .sort((a, b) => b.cents - a.cents)

  const debtors = toSortedList(-1)
  const creditors = toSortedList(1)
  const settlements: Settlement[] = []
  let d = 0
  let c = 0

  while (d < debtors.length && c < creditors.length) {
    const amountCents = Math.min(debtors[d].cents, creditors[c].cents)
    settlements.push({
      fromId: debtors[d].id,
      toId: creditors[c].id,
      amountCents,
    })
    debtors[d].cents -= amountCents
    creditors[c].cents -= amountCents
    if (debtors[d].cents === 0) d++
    if (creditors[c].cents === 0) c++
  }
  return settlements
}

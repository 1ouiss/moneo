import { REWARD_TIERS } from '@/constants/rewards'
import type { Group, SpenderRanking } from '@/types/group'

const getTierIndex = (totalPaidCents: number) =>
  REWARD_TIERS.findIndex((tier) => totalPaidCents >= tier.minCents)

export const computeRankings = (group: Group): SpenderRanking[] => {
  const sorted = group.participants
    .map((participant) => ({
      participant,
      totalPaidCents: group.expenses
        .filter((expense) => expense.paidById === participant.id)
        .reduce((sum, expense) => sum + expense.amountCents, 0),
    }))
    .sort((a, b) => b.totalPaidCents - a.totalPaidCents)

  return sorted.map((entry) => {
    const tierIndex = getTierIndex(entry.totalPaidCents)
    return {
      ...entry,
      // Ex æquo : même rang pour un même total.
      rank:
        sorted.findIndex((e) => e.totalPaidCents === entry.totalPaidCents) + 1,
      tier: REWARD_TIERS[tierIndex],
      nextTier: tierIndex > 0 ? REWARD_TIERS[tierIndex - 1] : undefined,
    }
  })
}

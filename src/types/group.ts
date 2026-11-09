export type Participant = {
  id: string
  name: string
}

export type Expense = {
  id: string
  title: string
  amountCents: number
  paidById: string
  splitBetweenIds: string[]
  createdAt: string
}

export type Group = {
  id: string
  name: string
  participants: Participant[]
  expenses: Expense[]
}

export type Settlement = {
  fromId: string
  toId: string
  amountCents: number
}

export type RewardTier = {
  label: string
  emoji: string
  minCents: number
}

export type SpenderRanking = {
  participant: Participant
  totalPaidCents: number
  rank: number
  tier: RewardTier
  nextTier?: RewardTier
}

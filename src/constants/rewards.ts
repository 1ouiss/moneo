import type { RewardTier } from '@/types/group'

// Du palier le plus haut au plus bas : le premier atteint est retenu.
export const REWARD_TIERS: RewardTier[] = [
  { label: 'Légende', emoji: '💎', minCents: 50000 },
  { label: 'Généreux', emoji: '🔥', minCents: 20000 },
  { label: 'Contributeur', emoji: '⭐', minCents: 5000 },
  { label: 'Petit joueur', emoji: '🐢', minCents: 0 },
]

export const PODIUM_EMOJIS = ['🥇', '🥈', '🥉']

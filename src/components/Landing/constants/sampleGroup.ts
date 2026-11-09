import type { Group } from '@/types/group'

// Groupe d'exemple affiché dans les fragments de l'interface (ids fixes pour l'hydratation).
export const SAMPLE_GROUP: Group = {
  id: 'exemple',
  name: 'Week-end à Annecy',
  participants: [
    { id: 'alice', name: 'Alice' },
    { id: 'bob', name: 'Bob' },
    { id: 'chloe', name: 'Chloé' },
  ],
  expenses: [
    {
      id: 'restaurant',
      title: 'Restaurant',
      amountCents: 25000,
      paidById: 'chloe',
      splitBetweenIds: ['alice', 'bob', 'chloe'],
      createdAt: '2026-11-08T20:30:00.000Z',
    },
    {
      id: 'essence',
      title: 'Essence',
      amountCents: 6000,
      paidById: 'bob',
      splitBetweenIds: ['bob', 'chloe'],
      createdAt: '2026-11-08T09:10:00.000Z',
    },
    {
      id: 'courses',
      title: 'Courses',
      amountCents: 10000,
      paidById: 'alice',
      splitBetweenIds: ['alice', 'bob', 'chloe'],
      createdAt: '2026-11-07T18:00:00.000Z',
    },
  ],
}

export const RESTAURANT_ONLY: Group = {
  ...SAMPLE_GROUP,
  expenses: SAMPLE_GROUP.expenses.filter((e) => e.id === 'restaurant'),
}

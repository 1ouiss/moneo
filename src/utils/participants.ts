import type { Group } from '@/types/group'

// Une dépense disparaît si la personne l'a payée ou en était la seule bénéficiaire ;
// sinon elle est redivisée entre les autres bénéficiaires.
const isDeletedWith = (
  expense: Group['expenses'][number],
  participantId: string,
) =>
  expense.paidById === participantId ||
  expense.splitBetweenIds.every((id) => id === participantId)

export const removeParticipantFromGroup = (
  group: Group,
  participantId: string,
): Group => ({
  ...group,
  participants: group.participants.filter((p) => p.id !== participantId),
  expenses: group.expenses
    .filter((expense) => !isDeletedWith(expense, participantId))
    .map((expense) => ({
      ...expense,
      splitBetweenIds: expense.splitBetweenIds.filter(
        (id) => id !== participantId,
      ),
    })),
})

export const getRemovalImpact = (group: Group, participantId: string) => {
  const deleted = group.expenses.filter((expense) =>
    isDeletedWith(expense, participantId),
  )
  const resplit = group.expenses.filter(
    (expense) =>
      !isDeletedWith(expense, participantId) &&
      expense.splitBetweenIds.includes(participantId),
  )
  return { deleted, resplit }
}

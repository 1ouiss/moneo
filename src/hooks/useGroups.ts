import { useEffect, useState } from 'react'
import type { Expense, Group } from '@/types/group'
import { removeParticipantFromGroup } from '@/utils/participants'

const STORAGE_KEY = 'tricount-groups'

const loadGroups = (): Group[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Group[]) : []
  } catch {
    return []
  }
}

// Nom de groupe envoyé par le formulaire de la landing (/app/?nouveau=…).
const NEW_GROUP_PARAM = 'nouveau'
const MAX_GROUP_NAME_LENGTH = 60

// Le groupe demandé passe en premier : c'est celui que l'app sélectionne.
const getInitialGroups = (): Group[] => {
  const groups = loadGroups()
  const name = new URLSearchParams(window.location.search)
    .get(NEW_GROUP_PARAM)
    ?.trim()
    .slice(0, MAX_GROUP_NAME_LENGTH)
  if (!name) return groups
  return [
    { id: crypto.randomUUID(), name, participants: [], expenses: [] },
    ...groups,
  ]
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>(getInitialGroups)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
  }, [groups])

  // Retire le paramètre pour qu'un rechargement ne recrée pas le groupe.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (!url.searchParams.has(NEW_GROUP_PARAM)) return
    url.searchParams.delete(NEW_GROUP_PARAM)
    window.history.replaceState(null, '', url)
  }, [])

  const updateGroup = (groupId: string, update: (group: Group) => Group) =>
    setGroups((current) =>
      current.map((group) => (group.id === groupId ? update(group) : group)),
    )

  const addGroup = (name: string) => {
    const id = crypto.randomUUID()
    setGroups((current) => [
      ...current,
      { id, name, participants: [], expenses: [] },
    ])
    return id
  }

  const addParticipant = (groupId: string, name: string) =>
    updateGroup(groupId, (group) => ({
      ...group,
      participants: [
        ...group.participants,
        { id: crypto.randomUUID(), name },
      ],
    }))

  const removeParticipant = (groupId: string, participantId: string) =>
    updateGroup(groupId, (group) =>
      removeParticipantFromGroup(group, participantId),
    )

  const addExpense = (
    groupId: string,
    expense: Omit<Expense, 'id' | 'createdAt'>,
  ) =>
    updateGroup(groupId, (group) => ({
      ...group,
      expenses: [
        {
          ...expense,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...group.expenses,
      ],
    }))

  const removeExpense = (groupId: string, expenseId: string) =>
    updateGroup(groupId, (group) => ({
      ...group,
      expenses: group.expenses.filter((expense) => expense.id !== expenseId),
    }))

  return {
    groups,
    addGroup,
    addParticipant,
    removeParticipant,
    addExpense,
    removeExpense,
  }
}

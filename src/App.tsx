import { useState } from 'react'
import { BalancesCard } from '@/components/BalancesCard'
import { ExpenseForm } from '@/components/ExpenseForm'
import { ExpenseList } from '@/components/ExpenseList'
import { GroupSelector } from '@/components/GroupSelector'
import { ParticipantsCard } from '@/components/ParticipantsCard'
import { RewardsCard } from '@/components/RewardsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGroups } from '@/hooks/useGroups'

const App = () => {
  const {
    groups,
    addGroup,
    addParticipant,
    removeParticipant,
    addExpense,
    removeExpense,
  } = useGroups()
  const [selectedGroupId, setSelectedGroupId] = useState<string>()
  const group = groups.find((g) => g.id === selectedGroupId) ?? groups[0]

  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Les comptes entre potes</h1>
        <GroupSelector
          groups={groups}
          selectedGroupId={group?.id}
          onSelect={setSelectedGroupId}
          onCreate={(name) => setSelectedGroupId(addGroup(name))}
        />
      </header>
      {group ? (
        <>
          <ParticipantsCard
            group={group}
            onAdd={(name) => addParticipant(group.id, name)}
            onRemove={(participantId) =>
              removeParticipant(group.id, participantId)
            }
          />
          <Tabs defaultValue="expenses">
            <TabsList className="w-full">
              <TabsTrigger value="expenses">Dépenses</TabsTrigger>
              <TabsTrigger value="balances">Équilibre</TabsTrigger>
              <TabsTrigger value="rewards">Récompenses</TabsTrigger>
            </TabsList>
            <TabsContent value="expenses" className="flex flex-col gap-6">
              <ExpenseForm
                participants={group.participants}
                onSubmit={(expense) => addExpense(group.id, expense)}
              />
              <ExpenseList
                group={group}
                onRemove={(expenseId) => removeExpense(group.id, expenseId)}
              />
            </TabsContent>
            <TabsContent value="balances">
              <BalancesCard group={group} />
            </TabsContent>
            <TabsContent value="rewards">
              <RewardsCard group={group} />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <p className="py-16 text-center text-muted-foreground">
          Crée un premier groupe (week-end, coloc, voyage…) pour commencer.
        </p>
      )}
    </main>
  )
}

export default App

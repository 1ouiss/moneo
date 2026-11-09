import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Expense, Participant } from '@/types/group'
import { formatEuros, parseEurosToCents } from '@/utils/money'

type ExpenseFormProps = {
  participants: Participant[]
  onSubmit: (expense: Omit<Expense, 'id' | 'createdAt'>) => void
}

export const ExpenseForm = ({ participants, onSubmit }: ExpenseFormProps) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [paidById, setPaidById] = useState('')
  // On stocke les exclus : un participant ajouté plus tard est inclus par défaut.
  const [excludedIds, setExcludedIds] = useState<string[]>([])

  const amountCents = parseEurosToCents(amount)
  const splitBetweenIds = participants
    .map((p) => p.id)
    .filter((id) => !excludedIds.includes(id))
  const isValid =
    title.trim() !== '' &&
    amountCents > 0 &&
    participants.some((p) => p.id === paidById) &&
    splitBetweenIds.length > 0

  const toggleParticipant = (participantId: string, checked: boolean) =>
    setExcludedIds((current) =>
      checked
        ? current.filter((id) => id !== participantId)
        : [...current, participantId],
    )

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isValid) return
    onSubmit({ title: title.trim(), amountCents, paidById, splitBetweenIds })
    setTitle('')
    setAmount('')
    setExcludedIds([])
  }

  if (participants.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Ajoute des participants pour saisir une dépense.
      </p>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelle dépense</CardTitle>
        <CardDescription>
          Partagée à parts égales entre les personnes cochées.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="expense-title">Intitulé</Label>
              <Input
                id="expense-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Courses, essence…"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="expense-amount">Montant (€)</Label>
              <Input
                id="expense-amount"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="expense-payer">Payé par</Label>
            <Select value={paidById} onValueChange={setPaidById}>
              <SelectTrigger id="expense-payer" className="w-full">
                <SelectValue placeholder="Qui a payé ?" />
              </SelectTrigger>
              <SelectContent>
                {participants.map((participant) => (
                  <SelectItem key={participant.id} value={participant.id}>
                    {participant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Pour qui ?</legend>
            <div className="flex flex-wrap gap-4">
              {participants.map((participant) => (
                <Label
                  key={participant.id}
                  className="flex items-center gap-2 font-normal"
                >
                  <Checkbox
                    checked={splitBetweenIds.includes(participant.id)}
                    onCheckedChange={(checked) =>
                      toggleParticipant(participant.id, checked === true)
                    }
                  />
                  {participant.name}
                </Label>
              ))}
            </div>
            {amountCents > 0 && splitBetweenIds.length > 0 && (
              <p className="text-sm text-muted-foreground">
                ≈ {formatEuros(amountCents / splitBetweenIds.length)} par
                personne
              </p>
            )}
          </fieldset>
          <Button type="submit" disabled={!isValid} className="self-end">
            Ajouter la dépense
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

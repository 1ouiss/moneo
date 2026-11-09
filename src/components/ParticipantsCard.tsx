import { useState, type FormEvent } from 'react'
import { UserPlus, X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { Group, Participant } from '@/types/group'
import { getRemovalImpact } from '@/utils/participants'

type ParticipantsCardProps = {
  group: Group
  onAdd: (name: string) => void
  onRemove: (participantId: string) => void
}

export const ParticipantsCard = ({
  group,
  onAdd,
  onRemove,
}: ParticipantsCardProps) => {
  const [name, setName] = useState('')
  const [pendingRemoval, setPendingRemoval] = useState<Participant>()
  const impact = pendingRemoval
    ? getRemovalImpact(group, pendingRemoval.id)
    : undefined

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim())
    setName('')
  }

  const handleRemoveClick = (participant: Participant) => {
    const { deleted, resplit } = getRemovalImpact(group, participant.id)
    if (deleted.length === 0 && resplit.length === 0) {
      onRemove(participant.id)
      return
    }
    setPendingRemoval(participant)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {group.participants.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {group.participants.map((participant) => (
              <li key={participant.id}>
                <Badge variant="secondary" className="gap-1 pr-1">
                  {participant.name}
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleRemoveClick(participant)}
                    aria-label={`Retirer ${participant.name}`}
                  >
                    <X />
                  </Button>
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Prénom"
            aria-label="Prénom du participant"
          />
          <Button type="submit" disabled={!name.trim()}>
            <UserPlus />
            Ajouter
          </Button>
        </form>
      </CardContent>
      <AlertDialog
        open={pendingRemoval !== undefined}
        onOpenChange={(open) => !open && setPendingRemoval(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retirer {pendingRemoval?.name} ?</AlertDialogTitle>
            <AlertDialogDescription>
              Les soldes de tout le groupe seront recalculés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {impact && (
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
              {impact.deleted.length > 0 && (
                <li>
                  Dépenses supprimées :{' '}
                  {impact.deleted.map((e) => e.title).join(', ')}
                </li>
              )}
              {impact.resplit.length > 0 && (
                <li>
                  Dépenses redivisées entre les autres :{' '}
                  {impact.resplit.map((e) => e.title).join(', ')}
                </li>
              )}
            </ul>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => pendingRemoval && onRemove(pendingRemoval.id)}
            >
              Retirer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

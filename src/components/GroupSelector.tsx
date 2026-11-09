import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Group } from '@/types/group'

type GroupSelectorProps = {
  groups: Group[]
  selectedGroupId?: string
  onSelect: (groupId: string) => void
  onCreate: (name: string) => void
}

export const GroupSelector = ({
  groups,
  selectedGroupId,
  onSelect,
  onCreate,
}: GroupSelectorProps) => {
  const [name, setName] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    onCreate(name.trim())
    setName('')
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {groups.length > 0 && (
        <Select value={selectedGroupId} onValueChange={onSelect}>
          <SelectTrigger className="w-48" aria-label="Groupe">
            <SelectValue placeholder="Choisir un groupe" />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nouveau groupe"
          aria-label="Nom du nouveau groupe"
          className="w-40"
        />
        <Button type="submit" variant="outline" disabled={!name.trim()}>
          <Plus />
          Créer
        </Button>
      </form>
    </div>
  )
}

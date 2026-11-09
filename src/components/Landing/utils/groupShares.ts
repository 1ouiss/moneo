// Regroupe les parts identiques qui se suivent : [34, 33, 33] → [{34 × 1}, {33 × 2}].
export const groupShares = (shares: number[]) =>
  shares.reduce<{ cents: number; people: number }[]>((groups, cents) => {
    const last = groups.at(-1)
    if (last?.cents === cents) {
      last.people++
    } else {
      groups.push({ cents, people: 1 })
    }
    return groups
  }, [])

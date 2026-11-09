import { parseEurosToCents } from '@/utils/money'

const SPLIT_PATTERN =
  /(\d+(?:[.,]\d{1,2})?)\s*(?:€|euros?)?\s*(?:entre|pour|à|\/)\s*(\d+)/i

const MAX_PEOPLE = 50

// Lit une phrase comme « 87,50 € entre 6 ».
export const parseSplitQuery = (query: string) => {
  const match = query.match(SPLIT_PATTERN)
  if (!match) return undefined
  const amountCents = parseEurosToCents(match[1])
  const count = Number(match[2])
  if (amountCents <= 0 || count < 1 || count > MAX_PEOPLE) return undefined
  return { amountCents, count }
}

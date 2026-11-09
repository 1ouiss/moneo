const euroFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

export const formatEuros = (cents: number) => euroFormatter.format(cents / 100)

export const parseEurosToCents = (value: string) =>
  Math.round(Number(value.replace(',', '.')) * 100)

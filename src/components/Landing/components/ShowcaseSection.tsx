import { useState } from 'react'
import { splitEqually } from '@/utils/balances'
import { formatEuros } from '@/utils/money'
import { SPLIT_EXAMPLES } from '../constants/content'
import { groupShares } from '../utils/groupShares'
import { parseSplitQuery } from '../utils/parseSplitQuery'

export const ShowcaseSection = () => {
  const [query, setQuery] = useState(SPLIT_EXAMPLES[0])
  const split = parseSplitQuery(query)
  const shares = split ? groupShares(splitEqually(split.amountCents, split.count)) : []

  return (
    <section
      id="essayer"
      aria-labelledby="essayer-titre"
      className="flex min-h-[88svh] scroll-mt-2 flex-col bg-field-paper px-4 py-24 sm:px-8 lg:py-36"
    >
      <h2 id="essayer-titre" data-reveal className="text-lead font-semibold">
        Faites le calcul, au centime près
      </h2>
      <label htmlFor="split-query" className="sr-only">
        Un montant et un nombre de personnes, par exemple 100 € entre 3
      </label>
      <input
        id="split-query"
        data-ui
        data-reveal
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        spellCheck={false}
        autoComplete="off"
        className="mt-6 w-full bg-transparent text-display font-semibold caret-brand outline-none [--reveal-delay:80ms] focus-visible:underline focus-visible:decoration-brand focus-visible:decoration-4 focus-visible:underline-offset-8"
      />
      <div
        data-ui
        data-reveal
        aria-live="polite"
        className="mt-10 max-w-[35rem] [--reveal-delay:160ms]"
      >
        {split ? (
          <dl className="flex flex-col divide-y divide-border text-body">
            {shares.map((share) => (
              <div key={share.cents} className="flex justify-between py-3">
                <dt>
                  {share.people > 1
                    ? `${share.people} personnes paient`
                    : '1 personne paie'}
                </dt>
                <dd className="font-semibold tabular-nums">
                  {formatEuros(share.cents)}
                </dd>
              </div>
            ))}
            <div className="flex justify-between py-3">
              <dt>Total remboursé</dt>
              <dd className="font-semibold tabular-nums">
                {formatEuros(split.amountCents)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-body">
            Écrivez un montant et un nombre de personnes, par exemple « 60 €
            entre 4 ».
          </p>
        )}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-12">
        {SPLIT_EXAMPLES.filter((example) => example !== query).map(
          (example) => (
            <button
              key={example}
              type="button"
              onClick={() => setQuery(example)}
              className="h-11 bg-surface px-4 text-base transition-colors hover:bg-field-mint focus-visible:bg-field-mint"
            >
              {example}
            </button>
          ),
        )}
      </div>
    </section>
  )
}

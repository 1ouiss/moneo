import { FAQ_ITEMS } from '../constants/faq'

const STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Les comptes entre potes',
    description:
      'Application pour partager les dépenses entre amis à parts égales, au centime près, avec un classement des plus gros dépensiers.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  },
]

// Contenu statique du projet (aucune donnée utilisateur) : sans risque d'injection.
export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
  />
)

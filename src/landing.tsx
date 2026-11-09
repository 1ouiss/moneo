import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Landing } from '@/components/Landing'
import './index.css'

// Les entrées au scroll ne masquent le contenu que si ce script tourne.
document.documentElement.classList.add('js')

const root = document.getElementById('root')!
const page = (
  <StrictMode>
    <Landing />
  </StrictMode>
)

// En build, la page est pré-rendue : on l'hydrate. En dev, on la rend.
if (root.hasChildNodes()) {
  hydrateRoot(root, page)
} else {
  createRoot(root).render(page)
}

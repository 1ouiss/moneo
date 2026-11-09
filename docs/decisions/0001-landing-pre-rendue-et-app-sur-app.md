# 0001 — Landing pré-rendue sur `/`, application sur `/app/`

- Statut : proposé
- Date : 2026-11-09

## Contexte

Le projet est une application React (Vite) rendue côté client. Une landing page doit présenter l'application avant d'y accéder et être bien référencée. Un contenu rendu uniquement en JavaScript est indexé moins sûrement et plus tard par les moteurs de recherche, et les aperçus de partage (Open Graph) ne lisent pas le JavaScript.

## Décision

- Vite construit deux pages : `index.html` (landing, sur `/`) et `app/index.html` (application, sur `/app/`).
- Au build, la landing est rendue en HTML statique avec `react-dom/server` (`src/entry-server.tsx`, puis `scripts/prerender.ts`), puis hydratée côté client pour ses parties interactives.
- `scripts/prerender.ts` écrit aussi `robots.txt` et `sitemap.xml` à partir de `VITE_SITE_URL`, et fait échouer le build si cette variable manque.
- L'application porte `noindex` : seule la landing est faite pour être référencée.

## Alternatives écartées

- **Landing rendue côté client avec un routeur** : plus simple, mais le contenu n'est pas dans le HTML servi.
- **Migration vers un framework avec rendu serveur (Next.js, Astro…)** : réglerait le rendu, mais impose de réécrire la structure du projet pour une seule page statique.

## Conséquences

- Aucune nouvelle dépendance.
- Le contenu de la landing doit rester déterministe (pas de date ni d'aléatoire au rendu), sinon l'hydratation échoue.
- `VITE_SITE_URL` doit être défini au build (`.env.local` ou variables de l'hébergeur).

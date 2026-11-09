import { APP_URL, SECTION_LINKS } from '../constants/content'

export const SiteFooter = () => (
  <footer className="grid gap-2 bg-background p-2.5 md:grid-cols-12">
    <div className="flex min-h-56 flex-col justify-between gap-6 bg-surface p-5 md:col-span-4">
      <p className="text-lead">
        Des dépenses partagées au centime près, et une couronne pour le plus
        généreux.
      </p>
      <p className="text-note">© 2026 Les comptes entre potes</p>
    </div>
    <nav aria-label="Pied de page" className="min-h-56 bg-field-pink p-5 md:col-span-3">
      <ul className="flex flex-col gap-2 text-base">
        {SECTION_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <p className="min-h-56 bg-field-mint p-5 text-lead md:col-span-5">
      Gratuit, sans compte et sans publicité.
    </p>
    <p
      aria-hidden="true"
      className="flex min-h-80 items-center justify-center bg-foreground p-5 text-center text-title font-semibold text-background md:col-span-8"
    >
      Les comptes entre potes
    </p>
    <a
      href={APP_URL}
      className="group flex min-h-80 flex-col justify-between bg-brand p-5 text-brand-foreground md:col-span-4"
    >
      <span className="text-lead">Ouvrir l’appli</span>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="size-14 self-end transition-transform group-hover:translate-x-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path d="M6 24h34M28 12l12 12-12 12" />
      </svg>
    </a>
  </footer>
)

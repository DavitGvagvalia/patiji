import { Link } from 'react-router-dom'

interface CustomWebsiteCardProps {
  to: string
  labels: {
    eyebrow: string
    title: string
    description: string
    priceLabel: string
    action: string
    features: string[]
  }
}

export function CustomWebsiteCard({ to, labels }: CustomWebsiteCardProps) {
  return (
    <article className="grid gap-5 rounded-lg border border-brand-gold/50 bg-brand-navy p-5 text-brand-white shadow-sm">
      <div className="min-h-48 rounded-lg border border-brand-gold/30 bg-white/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">{labels.eyebrow}</p>
        <div className="mt-10 h-px bg-brand-gold/40" />
        <p className="mt-8 font-serif text-3xl leading-tight text-white">Dapatije</p>
      </div>

      <div>
        <div className="grid gap-3 sm:flex sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{labels.title}</h2>
            <p className="mt-2 text-sm leading-7 text-white/75">{labels.description}</p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-gold">{labels.priceLabel}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {labels.features.map((feature) => (
            <span key={feature} className="rounded-lg border border-white/20 px-2.5 py-1 text-xs text-white/75">
              {feature}
            </span>
          ))}
        </div>

        <Link
          to={to}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-brand-navy transition hover:bg-brand-soft focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-navy"
        >
          {labels.action}
        </Link>
      </div>
    </article>
  )
}

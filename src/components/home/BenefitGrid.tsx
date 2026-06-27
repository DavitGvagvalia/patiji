interface Benefit {
  title: string
  text: string
}

interface BenefitGridProps {
  benefits: Benefit[]
}

export function BenefitGrid({ benefits }: BenefitGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {benefits.map((benefit) => (
        <article key={benefit.title} className="rounded-lg border border-brand-soft bg-white p-6">
          <h3 className="text-lg font-semibold text-brand-navy">{benefit.title}</h3>
          <p className="mt-3 text-sm leading-7 text-brand-black/70">{benefit.text}</p>
        </article>
      ))}
    </div>
  )
}

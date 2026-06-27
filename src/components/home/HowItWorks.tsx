interface HowItWorksProps {
  steps: string[]
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step} className="rounded-lg border border-brand-soft bg-white p-5">
          <span className="text-sm font-semibold text-brand-gold">{String(index + 1).padStart(2, '0')}</span>
          <p className="mt-4 text-sm leading-7 text-brand-black/75">{step}</p>
        </li>
      ))}
    </ol>
  )
}

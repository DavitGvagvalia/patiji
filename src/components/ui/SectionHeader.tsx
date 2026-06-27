interface SectionHeaderProps {
  eyebrow?: string
  title: string
  text?: string
}

export function SectionHeader({ eyebrow, title, text }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-8 text-brand-black/70">{text}</p> : null}
    </div>
  )
}

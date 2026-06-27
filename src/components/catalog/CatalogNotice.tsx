interface CatalogNoticeProps {
  message: string
  tone?: 'neutral' | 'warning'
}

export function CatalogNotice({ message, tone = 'neutral' }: CatalogNoticeProps) {
  const className =
    tone === 'warning'
      ? 'border-brand-gold/40 bg-brand-gold/10 text-brand-navy'
      : 'border-brand-soft bg-white text-brand-black/70'

  return (
    <p className={`rounded-lg border p-4 text-sm leading-7 ${className}`}>
      {message}
    </p>
  )
}

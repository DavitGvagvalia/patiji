interface ProfileNoticeProps {
  title?: string
  message: string
  tone?: 'neutral' | 'error'
}

export function ProfileNotice({ title, message, tone = 'neutral' }: ProfileNoticeProps) {
  const className =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-800'
      : 'border-brand-soft bg-white text-brand-black/70'

  return (
    <section className={`rounded-lg border p-6 ${className}`}>
      {title ? <h2 className="text-xl font-semibold text-brand-navy">{title}</h2> : null}
      <p className={title ? 'mt-3 text-sm leading-7' : 'text-sm leading-7'}>{message}</p>
    </section>
  )
}

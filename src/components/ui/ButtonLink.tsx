import { Link } from 'react-router-dom'

interface ButtonLinkProps {
  to: string
  children: string
  variant?: 'primary' | 'secondary'
}

export function ButtonLink({ to, children, variant = 'primary' }: ButtonLinkProps) {
  const baseClass =
    'inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2'
  const variantClass =
    variant === 'primary'
      ? 'bg-brand-navy text-brand-white hover:bg-brand-black'
      : 'border border-brand-soft bg-brand-white text-brand-navy hover:border-brand-gold'

  return (
    <Link to={to} className={`${baseClass} ${variantClass}`}>
      {children}
    </Link>
  )
}

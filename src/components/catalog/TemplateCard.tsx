import { TemplatePreview } from '../ui/TemplatePreview'
import type { WeddingTemplate } from '../../types/catalog'

interface TemplateCardProps {
  template: WeddingTemplate
  previewLabel: string
  selectLabel: string
  checkoutLoadingLabel: string
  isCheckoutLoading?: boolean
  isCheckoutDisabled?: boolean
  onSelect: (template: WeddingTemplate) => void
}

export function TemplateCard({
  template,
  previewLabel,
  selectLabel,
  checkoutLoadingLabel,
  isCheckoutLoading = false,
  isCheckoutDisabled = false,
  onSelect,
}: TemplateCardProps) {
  return (
    <article className="grid gap-5 rounded-lg border border-brand-soft bg-white p-4 shadow-sm">
      <TemplatePreview template={template} />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {template.isPopular ? (
            <span className="rounded-lg bg-brand-gold/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
              Popular
            </span>
          ) : null}
          {template.isNew ? (
            <span className="rounded-lg bg-brand-navy px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              New
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">{template.name}</h2>
            <p className="mt-2 text-sm leading-7 text-brand-black/70">{template.description}</p>
          </div>
          <p className="text-lg font-semibold text-brand-black">
            ${template.price}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span key={tag} className="rounded-lg border border-brand-soft px-2.5 py-1 text-xs text-brand-black/70">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="min-h-11 rounded-lg border border-brand-soft px-4 text-sm font-semibold text-brand-navy transition hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            {previewLabel}
          </button>
          <button
            type="button"
            disabled={isCheckoutDisabled}
            onClick={() => onSelect(template)}
            className="min-h-11 rounded-lg bg-brand-navy px-4 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCheckoutLoading ? checkoutLoadingLabel : selectLabel}
          </button>
        </div>
      </div>
    </article>
  )
}

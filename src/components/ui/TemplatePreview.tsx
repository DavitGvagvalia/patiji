import type { WeddingTemplate } from '../../types/catalog'

interface TemplatePreviewProps {
  template: WeddingTemplate
}

const paletteClasses: Record<WeddingTemplate['palette'], string> = {
  ivory: 'bg-[#f8f4ec]',
  navy: 'bg-brand-navy text-brand-white',
  gold: 'bg-[#f9e6bd]',
  sage: 'bg-[#eef3e8]',
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  return (
    <div className={`aspect-[4/5] rounded-lg border border-brand-soft p-3 sm:p-5 ${paletteClasses[template.palette]}`}>
      <div className="flex h-full flex-col justify-between rounded-lg border border-current/20 bg-white/65 p-4 text-brand-navy shadow-sm sm:p-5">
        <div>
          <p className="font-script text-4xl leading-none text-brand-gold">dapatije</p>
          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] text-current/60 sm:mt-8 sm:text-xs sm:tracking-[0.3em]">Wedding invitation</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{template.name}</h3>
        </div>
        <div className="space-y-3 text-sm text-current/70">
          <div className="h-px bg-current/20" />
          <p>{template.layout.replace('-', ' ')}</p>
          <p>{template.languageSupport.join(' / ')}</p>
        </div>
      </div>
    </div>
  )
}

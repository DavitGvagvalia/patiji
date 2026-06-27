import type { TemplatePalette, TemplateStyle } from '../../types/catalog'

interface CatalogFiltersProps {
  styles: TemplateStyle[]
  palettes: TemplatePalette[]
  activeStyle: TemplateStyle | 'all'
  activePalette: TemplatePalette | 'all'
  onStyleChange: (style: TemplateStyle | 'all') => void
  onPaletteChange: (palette: TemplatePalette | 'all') => void
  labels: {
    filterLabel: string
    styleLabel: string
    paletteLabel: string
    allStyles: string
    allPalettes: string
  }
}

function labelFromValue(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function CatalogFilters({
  styles,
  palettes,
  activeStyle,
  activePalette,
  onStyleChange,
  onPaletteChange,
  labels,
}: CatalogFiltersProps) {
  return (
    <section aria-label={labels.filterLabel} className="rounded-lg border border-brand-soft bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.styleLabel}
          <select
            value={activeStyle}
            onChange={(event) => onStyleChange(event.target.value as TemplateStyle | 'all')}
            className="min-h-11 rounded-lg border border-brand-soft bg-white px-3 text-sm font-normal text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="all">{labels.allStyles}</option>
            {styles.map((style) => (
              <option key={style} value={style}>
                {labelFromValue(style)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.paletteLabel}
          <select
            value={activePalette}
            onChange={(event) => onPaletteChange(event.target.value as TemplatePalette | 'all')}
            className="min-h-11 rounded-lg border border-brand-soft bg-white px-3 text-sm font-normal text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="all">{labels.allPalettes}</option>
            {palettes.map((palette) => (
              <option key={palette} value={palette}>
                {labelFromValue(palette)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

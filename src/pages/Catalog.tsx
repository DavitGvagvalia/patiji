import { useMemo, useState } from 'react'
import { CatalogFilters } from '../components/catalog/CatalogFilters'
import { TemplateCard } from '../components/catalog/TemplateCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { usePageSeo } from '../lib/seo'
import type { TemplatePalette, TemplateStyle, WeddingTemplate } from '../types/catalog'
import type { Locale, SiteContent } from '../types/i18n'

interface CatalogProps {
  content: SiteContent
  locale: Locale
  templates: WeddingTemplate[]
}

const Catalog = ({ content, locale, templates }: CatalogProps) => {
  const [activeStyle, setActiveStyle] = useState<TemplateStyle | 'all'>('all')
  const [activePalette, setActivePalette] = useState<TemplatePalette | 'all'>('all')

  usePageSeo(content.metadata.catalog, locale)

  const styles = useMemo(() => [...new Set(templates.map((template) => template.style))], [templates])
  const palettes = useMemo(() => [...new Set(templates.map((template) => template.palette))], [templates])
  const filteredTemplates = templates.filter((template) => {
    const matchesStyle = activeStyle === 'all' || template.style === activeStyle
    const matchesPalette = activePalette === 'all' || template.palette === activePalette

    return matchesStyle && matchesPalette
  })

  return (
    <section className="bg-brand-soft/25">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={content.catalog.eyebrow} title={content.catalog.headline} text={content.catalog.intro} />

        <div className="mt-8">
          <CatalogFilters
            styles={styles}
            palettes={palettes}
            activeStyle={activeStyle}
            activePalette={activePalette}
            onStyleChange={setActiveStyle}
            onPaletteChange={setActivePalette}
            labels={{
              filterLabel: content.catalog.filterLabel,
              styleLabel: content.catalog.styleLabel,
              paletteLabel: content.catalog.paletteLabel,
              allStyles: content.catalog.allStyles,
              allPalettes: content.catalog.allPalettes,
            }}
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              previewLabel={content.catalog.previewAction}
              selectLabel={content.catalog.selectAction}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 ? (
          <p className="mt-8 rounded-lg border border-dashed border-brand-soft bg-white p-6 text-sm text-brand-black/70">
            {content.catalog.noResults}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default Catalog

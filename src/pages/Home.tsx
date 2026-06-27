import { BenefitGrid } from '../components/home/BenefitGrid'
import { HowItWorks } from '../components/home/HowItWorks'
import { ButtonLink } from '../components/ui/ButtonLink'
import { SectionHeader } from '../components/ui/SectionHeader'
import { TemplatePreview } from '../components/ui/TemplatePreview'
import { usePageSeo } from '../lib/seo'
import { getLocalizedRoute } from '../routes/routes'
import type { WeddingTemplate } from '../types/catalog'
import type { Locale, SiteContent } from '../types/i18n'

interface HomeProps {
  content: SiteContent
  locale: Locale
  templates: WeddingTemplate[]
}

const Home = ({ content, locale, templates }: HomeProps) => {
  const featuredTemplate = templates[0]

  usePageSeo(content.metadata.home, locale)

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
              {content.home.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
              {content.home.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-black/72">{content.home.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={getLocalizedRoute(locale, 'catalog')}>{content.home.primaryCta}</ButtonLink>
              <ButtonLink to={getLocalizedRoute(locale, 'profile')} variant="secondary">
                {content.home.secondaryCta}
              </ButtonLink>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-black/55">
              {content.home.previewLabel}
            </p>
            <TemplatePreview template={featuredTemplate} />
          </div>
        </div>
      </section>

      <section className="border-y border-brand-soft bg-brand-soft/25">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader title={content.home.valueTitle} text={content.home.valueCopy} />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader title={content.home.benefitsTitle} />
          <div className="mt-8">
            <BenefitGrid benefits={content.home.benefits} />
          </div>
        </div>
      </section>

      <section className="bg-brand-soft/25">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader title={content.home.stepsTitle} />
          <div className="mt-8">
            <HowItWorks steps={content.home.steps} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

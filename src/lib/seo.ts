import { useEffect } from 'react'
import { defaultLocale, supportedLocales } from '../i18n/locales'
import type { Locale, PageMetadata } from '../types/i18n'

const canonicalOrigin = 'https://patiji.ge'

function localizedPath(locale: Locale, path: string) {
  const normalizedPath = path === '/' ? '' : path

  return locale === defaultLocale ? `${normalizedPath || '/'}` : `/${locale}${normalizedPath}`
}

function ensureMeta(selector: string, createElement: () => HTMLMetaElement) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector)

  if (existing) {
    return existing
  }

  const element = createElement()
  document.head.append(element)

  return element
}

function ensureLink(selector: string, createElement: () => HTMLLinkElement) {
  const existing = document.head.querySelector<HTMLLinkElement>(selector)

  if (existing) {
    return existing
  }

  const element = createElement()
  document.head.append(element)

  return element
}

export function usePageSeo(metadata: PageMetadata, locale: Locale) {
  useEffect(() => {
    const path = localizedPath(locale, metadata.path)
    const canonicalUrl = `${canonicalOrigin}${path}`

    document.documentElement.lang = locale
    document.title = metadata.title

    const description = ensureMeta('meta[name="description"]', () => {
      const element = document.createElement('meta')
      element.name = 'description'
      return element
    })
    description.content = metadata.description

    const ogTitle = ensureMeta('meta[property="og:title"]', () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:title')
      return element
    })
    ogTitle.content = metadata.title

    const ogDescription = ensureMeta('meta[property="og:description"]', () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:description')
      return element
    })
    ogDescription.content = metadata.description

    const ogUrl = ensureMeta('meta[property="og:url"]', () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:url')
      return element
    })
    ogUrl.content = canonicalUrl

    const ogType = ensureMeta('meta[property="og:type"]', () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:type')
      return element
    })
    ogType.content = 'website'

    const canonical = ensureLink('link[rel="canonical"]', () => {
      const element = document.createElement('link')
      element.rel = 'canonical'
      return element
    })
    canonical.href = canonicalUrl

    supportedLocales.forEach((supportedLocale) => {
      const hrefLang = ensureLink(`link[rel="alternate"][hreflang="${supportedLocale}"]`, () => {
        const element = document.createElement('link')
        element.rel = 'alternate'
        element.hreflang = supportedLocale
        return element
      })
      hrefLang.href = `${canonicalOrigin}${localizedPath(supportedLocale, metadata.path)}`
    })

    const defaultHrefLang = ensureLink('link[rel="alternate"][hreflang="x-default"]', () => {
      const element = document.createElement('link')
      element.rel = 'alternate'
      element.hreflang = 'x-default'
      return element
    })
    defaultHrefLang.href = `${canonicalOrigin}${localizedPath(defaultLocale, metadata.path)}`
  }, [locale, metadata.description, metadata.path, metadata.title])
}

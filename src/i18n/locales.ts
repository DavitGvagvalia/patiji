import type { Locale } from '../types/i18n'

export const defaultLocale: Locale = 'en'

export const supportedLocales: Locale[] = ['en', 'ka', 'ru']

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ka: 'KA',
  ru: 'RU',
}

export function isLocale(value: string | undefined): value is Locale {
  return supportedLocales.includes(value as Locale)
}

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0]

  return isLocale(segment) ? segment : defaultLocale
}

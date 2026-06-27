import type { siteContent } from '../content/site'

export type Locale = 'en' | 'ka' | 'ru'

export type SiteContent = typeof siteContent

export type PageKey = 'home' | 'catalog' | 'profile'

export interface PageMetadata {
  title: string
  description: string
  path: string
}

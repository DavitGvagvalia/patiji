export type TemplateStyle = 'classic' | 'editorial' | 'garden' | 'minimal'

export type TemplatePalette = 'ivory' | 'navy' | 'gold' | 'sage'

export interface WeddingTemplate {
  id: string
  name: string
  slug: string
  price: number
  currency: 'USD'
  style: TemplateStyle
  palette: TemplatePalette
  layout: 'one-page' | 'story-led' | 'gallery-led'
  languageSupport: string[]
  isPopular?: boolean
  isNew?: boolean
  description: string
  tags: string[]
}

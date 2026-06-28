import type { CustomInquiryContactMethod } from './firestore'

export interface CustomInquiryFormData {
  customerName: string
  customerEmail: string
  preferredContactMethod: CustomInquiryContactMethod
  coupleNames: string
  weddingDate: string
  location: string
  guestCountRange: string
  requestedFeatures: string[]
  stylePreference: string
  palettePreference: string
  languageSupport: string[]
  budgetRange: string
  desiredLaunchDate: string
  notes: string
}

import type { Timestamp } from 'firebase/firestore'
import type { TemplatePalette, TemplateStyle } from './catalog'

export type TimestampLike = Timestamp

export interface FirestoreUser {
  displayName: string
  email: string
  createdAt: TimestampLike
  updatedAt: TimestampLike
}

export interface FirestoreProduct {
  name: string
  slug: string
  price: number
  currency: 'USD'
  style: TemplateStyle
  palette: TemplatePalette
  layout: 'one-page' | 'story-led' | 'gallery-led'
  languageSupport: string[]
  description: string
  tags: string[]
  isActive: boolean
  isPopular?: boolean
  isNew?: boolean
  createdAt: TimestampLike
  updatedAt: TimestampLike
}

export interface FirestorePurchase {
  userId: string
  productId: string
  invitationId?: string
  amount: number
  currency: 'USD'
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentProvider: 'pending' | 'stripe'
  providerSessionId?: string
  createdAt: TimestampLike
  updatedAt: TimestampLike
}

export interface FirestoreInvitation {
  ownerId: string
  productId: string
  slug: string
  status: 'draft' | 'active' | 'archived'
  coupleNames: string
  weddingDate?: string
  createdAt: TimestampLike
  updatedAt: TimestampLike
}

export interface FirestoreGuestAnswer {
  guestName: string
  attending: boolean
  partySize: number
  message?: string
  submittedAt: TimestampLike
}

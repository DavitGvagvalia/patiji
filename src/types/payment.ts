import type { Locale } from './i18n'

export interface CheckoutSessionRequest {
  productId: string
  locale: Locale
}

export interface CheckoutSessionResponse {
  checkoutUrl: string
}

export type CheckoutStatus =
  | 'idle'
  | 'loading'
  | 'redirecting'
  | 'not-configured'
  | 'error'

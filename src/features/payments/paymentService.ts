import { getCheckoutEnv } from '../../config/env'
import type { CheckoutSessionRequest, CheckoutSessionResponse } from '../../types/payment'

export class CheckoutNotConfiguredError extends Error {
  constructor() {
    super('Checkout endpoint is not configured.')
    this.name = 'CheckoutNotConfiguredError'
  }
}

function isCheckoutSessionResponse(value: unknown): value is CheckoutSessionResponse {
  if (!value || typeof value !== 'object') {
    return false
  }

  return 'checkoutUrl' in value && typeof value.checkoutUrl === 'string' && value.checkoutUrl.startsWith('https://')
}

export async function createCheckoutSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const { checkoutSessionEndpoint } = getCheckoutEnv()

  if (!checkoutSessionEndpoint) {
    throw new CheckoutNotConfiguredError()
  }

  const response = await fetch(checkoutSessionEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Checkout session request failed with status ${response.status}.`)
  }

  const data: unknown = await response.json()

  if (!isCheckoutSessionResponse(data)) {
    throw new Error('Checkout session response did not include a valid HTTPS checkoutUrl.')
  }

  return data
}

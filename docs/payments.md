# Payment Flow Foundation

Patiji uses one-time purchases. The frontend can request a checkout session, but it must not grant ownership or write trusted purchase records.

## Client contract

The catalog purchase CTA calls the optional endpoint configured by:

```txt
VITE_CHECKOUT_SESSION_ENDPOINT=
```

Request body:

```ts
{
  productId: string
  locale: 'en' | 'ka' | 'ru'
}
```

Expected response:

```ts
{
  checkoutUrl: string
}
```

`checkoutUrl` must be HTTPS. The frontend redirects the browser to this URL.

## Trusted server responsibility

The checkout endpoint should be implemented as trusted server code, such as a Firebase HTTPS Cloud Function.

Required responsibilities:

- Validate that `productId` exists and points to an active product.
- Create a payment provider checkout session.
- Include enough metadata to connect the completed payment to the product and user.
- Verify payment completion through the provider's signed webhook.
- Only after webhook verification, write `purchases/{purchaseId}`.
- Create or activate `invitations/{invitationId}` for the customer after verified payment.
- Never trust a client redirect or client-provided payment status as proof of purchase.

## Current repository state

- Client checkout requests are implemented in `src/features/payments/paymentService.ts`.
- Firestore rules block normal clients from writing `purchases`.
- Firestore rules block normal clients from creating `invitations`.
- The endpoint is not implemented in this repository yet.

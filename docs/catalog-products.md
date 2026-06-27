# Catalog Product Documents

Catalog products live in Firestore under `products/{productId}`.

Only documents where `isActive` is `true` are queried by the public catalog and readable under the current rules.

## Required fields

```ts
{
  name: string
  slug: string
  price: number
  currency: 'USD'
  style: 'classic' | 'editorial' | 'garden' | 'minimal'
  palette: 'ivory' | 'navy' | 'gold' | 'sage'
  layout: 'one-page' | 'story-led' | 'gallery-led'
  languageSupport: string[]
  description: string
  tags: string[]
  isActive: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## Optional fields

```ts
{
  isPopular?: boolean
  isNew?: boolean
}
```

Product writes are blocked for normal clients in `firestore.rules`. Seed or update product documents through trusted tooling such as the Firebase Console, emulator seed scripts, or a future admin-only workflow.

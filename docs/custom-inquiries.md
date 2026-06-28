# Custom Website Inquiry Documents

Custom website inquiries live in Firestore under:

```txt
customInquiries/{inquiryId}
```

Signed-in customers can create inquiries for their own Firebase Auth user ID. Normal clients cannot update or delete inquiries. Owner reads are allowed for future customer-facing surfaces, but the first UI version only shows a post-submit confirmation screen.

## Required fields

```ts
{
  userId: string
  customerName: string
  customerEmail: string
  preferredContactMethod: 'email' | 'phone' | 'whatsapp'
  coupleNames: string
  requestedFeatures: string[]
  languageSupport: string[]
  budgetRange: string
  status: 'submitted'
  source: 'catalog-custom-website'
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## Optional fields

```ts
{
  weddingDate?: string
  location?: string
  guestCountRange?: string
  stylePreference?: string
  palettePreference?: string
  desiredLaunchDate?: string
  notes?: string
}
```

Review submitted inquiries through trusted access such as Firebase Console until an admin workflow exists. Do not treat a custom inquiry as a purchase or invitation ownership record.

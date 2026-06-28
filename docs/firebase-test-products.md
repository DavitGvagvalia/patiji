# Firebase Test Products

This guide covers creating real catalog product documents in a Firebase project for manual testing.

Use a dedicated Firebase test or staging project for this. Do not use production customer data, payment-provider secrets, or real purchase records for catalog testing.

## Confirmed project behavior

The app reads catalog products from Firestore at:

```txt
products/{productId}
```

Confirmed from this repository:

- `src/features/catalog/catalogService.ts` queries `products` where `isActive == true`.
- `firestore.rules` allows public reads only for active products and blocks all normal client writes to products.
- `docs/catalog-products.md` defines the catalog product document shape.
- `seed/example-firestore-data.json` contains example products that match the current app shape.

Because product writes are blocked by security rules, create or update product test documents with trusted access only, such as Firebase Console, an emulator seed script, or a future admin-only workflow.

## Prerequisites

1. Create or choose a Firebase test project.
2. Enable Cloud Firestore in that project.
3. Register a Firebase Web App and copy its config values into `.env.local`:

```txt
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

4. Deploy or test `firestore.rules` before using the project for shared QA.

The Firebase web config values are identifiers, not server secrets. Access control still depends on `firestore.rules`.

## Create a test product in Firebase Console

In Firebase Console, open Firestore Database and create this document:

```txt
Collection ID: products
Document ID: velvet-garden-test
```

Fields:

```txt
name: string = Velvet Garden Test
slug: string = velvet-garden-test
price: number = 149
currency: string = USD
style: string = garden
palette: string = sage
layout: string = story-led
languageSupport: array = ["English", "Georgian", "Russian"]
description: string = A test catalog product for Firebase QA.
tags: array = ["Garden", "Romantic", "Test"]
isActive: boolean = true
isPopular: boolean = true
isNew: boolean = true
createdAt: timestamp = current time
updatedAt: timestamp = current time
```

The app currently supports these enum values:

```txt
style: classic, editorial, garden, minimal
palette: ivory, navy, gold, sage
layout: one-page, story-led, gallery-led
currency: USD
```

Set `isActive` to `false` when a product should be hidden from the public catalog.

## Validate in the app

Run local validation against the Firebase test project:

```sh
npm run typecheck
npm run build
npm run dev
```

Then open the catalog page in the browser and confirm:

- the active test product appears;
- changing `isActive` to `false` removes it after refresh;
- the browser console does not show Firestore permission errors;
- no `purchases`, `invitations`, or `publicInvitations` documents were created during catalog browsing.

If products do not load, verify:

- `.env.local` points to the intended Firebase test project;
- Firestore is enabled for the same project ID;
- the document is under `products`, not a nested path;
- `isActive` is exactly boolean `true`;
- `price` is a number, not a string;
- `languageSupport` and `tags` are arrays.

## Validation path for rules

Before relying on real Firebase QA, run the local rules suite:

```sh
npm run test:rules
```

The current tests verify that active products are readable, inactive products are denied, and normal clients cannot write products.

Use Firebase's official Firestore documentation for authoritative Console, SDK, and emulator behavior:

- https://firebase.google.com/docs/firestore/manage-data/add-data
- https://firebase.google.com/docs/emulator-suite/connect_firestore

## Do not create these manually for product catalog QA

Avoid creating these in a real shared Firebase project unless you are testing the full purchase and invitation lifecycle through a trusted backend flow:

- `purchases/{purchaseId}`
- `invitations/{invitationId}`
- `publicInvitations/{slug}`
- `invitations/{invitationId}/guestAnswers/{answerId}`

Those records represent user-owned or guest-facing state. In this repository, normal clients are intentionally blocked from creating purchases and invitations.

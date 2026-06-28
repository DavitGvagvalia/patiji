# Firebase Setup

This project uses Firebase client SDK configuration through Vite environment variables.

## Required environment variables

Create a local `.env.local` file from `.env.example` and fill values from the Firebase Console web app configuration:

```txt
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

These values identify the Firebase web app. They are not treated as server secrets, but Firestore access must be protected by `firestore.rules`.

## Current architecture

- `src/firebase/client.ts` initializes the Firebase app, Auth, and Firestore once.
- `src/firebase/collections.ts` centralizes typed collection/document references.
- `src/types/firestore.ts` defines the Firestore document shapes used by the app boundary.
- `src/features/auth/authService.ts` isolates auth operations from UI components.
- `src/features/profile/profileService.ts` isolates profile and guest answer reads from UI components.
- `src/features/catalog/catalogService.ts` isolates public catalog product reads from UI components.
- `firestore.rules` documents the intended production security model.

Catalog product document shape is documented in `docs/catalog-products.md`.

Payment flow expectations are documented in `docs/payments.md`.

Public invitation document shape is documented in `docs/public-invitations.md`.

Firestore rules validation is documented in `docs/testing.md`.

Production deployment readiness is documented in `docs/production-readiness.md`.

## Validation path

1. Add real Firebase values to `.env.local`.
2. Run `npm run typecheck`.
3. Run `npm run build`.
4. Deploy or test `firestore.rules` with Firebase tooling before production.

No production Firebase project ID, endpoint, payment provider secret, or email provider secret is committed in this repository.

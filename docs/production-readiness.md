# Production Readiness

## Verified locally

Run the local verification suite before deployment:

```sh
npm run verify
```

Run Firestore security rules tests separately after confirming JDK 21+ is active:

```sh
java -version
npm run test:rules
```

## Required production configuration

Set these values in the deployment environment:

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Optional until checkout is implemented:

```txt
VITE_CHECKOUT_SESSION_ENDPOINT
```

## Firebase Console checks

- Confirm Firebase project is `patiji-4c954` or intentionally update `.env.local`.
- Enable Email/Password Authentication if the current profile auth form is used.
- Deploy and test `firestore.rules`.
- Seed active `products/{productId}` documents.
- Seed `publicInvitations/{slug}` only after verified purchase/invitation creation.
- Confirm Hosting custom domain is `patiji.ge`.

## SEO and static assets

- `public/favicon.svg` exists and is referenced from `index.html`.
- `public/robots.txt` points to `https://patiji.ge/sitemap.xml`.
- `public/sitemap.xml` includes the current public brand/catalog/profile routes and language alternates.
- Public invitation URLs are not listed in the static sitemap because they are customer-created records. Add dynamic sitemap generation later if invitation pages should be indexed.

## Bundle decision

The Firebase SDK currently creates a large lazy chunk in production builds. This is accepted for now because Firebase code is loaded only by catalog/profile/invitation data paths, not by the static HTML shell. Do not hide the warning with a larger threshold unless bundle budgets are explicitly changed.

## Deployment

Build and deploy with:

```sh
npm run verify
firebase deploy --only hosting,firestore:rules
```

Before deployment, confirm `npm run test:rules` passes in an environment with JDK 21+.

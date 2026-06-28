# AGENTS.md

## Project Overview

Project and brand name: **Dapatije**

Dapatije is an international business website for selling premium wedding invitation website templates. The product is a brand site with a product catalog: customers browse invitation website templates, buy one template with a one-time payment, and use their profile page to view and manage wedding guest RSVP answers.

This is not a generic website builder. It should feel like a luxury wedding brand with a clean, elegant, emotional, and trustworthy experience.

## Product Direction

Build a beautiful, fast, SEO-friendly, scalable, and secure website for selling wedding invitation website templates.

Priority order:

1. Beautiful design
2. SEO
3. Fast loading
4. Scalability
5. Security

Every technical, UI, and content decision should support these priorities in this order.

## Audience And Tone

Primary audience:

- Brides
- Couples planning weddings
- Families helping organize weddings
- International customers, generally age 20-40

The tone should feel elegant, polished, romantic, premium, and trustworthy. Avoid childish, overly cute, cheap, messy, or generic SaaS-style design choices.

## Core Product Flow

The most important user action is:

**A user buys a wedding invitation website template and later sees guest answers in their profile page.**

Main flow:

1. Visitor lands on the website.
2. Visitor understands the brand and product quickly.
3. Visitor browses the catalog.
4. Visitor filters and previews templates.
5. Visitor buys one invitation website template with a one-time payment.
6. Visitor creates or logs into an account.
7. Visitor accesses their profile.
8. Visitor views guest answers/RSVP responses connected to their invitation website.

## Required Experience

Minimum public and customer-facing surfaces:

- Home page: introduce Dapatije as a luxury wedding invitation website template brand.
- Catalog page: browse and filter wedding invitation website templates.
- Profile page: allow logged-in customers to view purchased invitation information and guest answers.
- Public invitation pages: show guest-facing wedding invitation content and collect RSVP answers.

The website must support multilingual content from the start. Initial languages are English, Georgian, and Russian. Avoid hardcoded user-facing text in components when the text belongs in the translation/content layer.

## Current Architecture

Confirmed from the repository:

- The frontend uses React, Vite, TypeScript, Tailwind CSS, and React Router.
- Firebase client SDK configuration is loaded through Vite environment variables.
- `src/firebase/client.ts` initializes Firebase app, Auth, and Firestore.
- `src/firebase/collections.ts` centralizes typed Firestore references.
- Firestore document shapes are defined at the app boundary in `src/types/firestore.ts`.
- Auth, catalog, profile, public invitation, RSVP, and payment logic are isolated in feature service modules under `src/features`.
- Firestore security rules are defined in `firestore.rules`.

## Firebase And Data Model Guidance

Use Firebase Authentication for customer accounts unless a different Firebase-compatible auth decision is made later.

Firestore responsibilities documented in this repository:

- `products/{productId}` stores catalog products. Public reads are allowed only for active products, and normal client writes are blocked.
- `publicInvitations/{slug}` stores guest-facing invitation data. Only active public invitations are readable by guests.
- `invitations/{invitationId}` stores owner invitation records. Normal clients cannot create invitations.
- `invitations/{invitationId}/guestAnswers/{answerId}` stores RSVP answers. Public writes are allowed only for active invitations with valid payloads; reads are owner-only.
- `purchases/{purchaseId}` stores trusted purchase records. Normal clients cannot write purchases.

Treat `seed/example-firestore-data.json` as reference shape only. It is not proof of production state and is not an executable import script.

## Payments

Dapatije uses one-time purchases, not subscriptions.

The frontend may request a checkout session through `VITE_CHECKOUT_SESSION_ENDPOINT`, but it must not grant ownership or write trusted purchase records. Purchase trust must stay on a backend or webhook-verified flow, such as a Firebase HTTPS Cloud Function.

Required server-side payment responsibilities:

- Validate that the requested product exists and is active.
- Create a payment provider checkout session.
- Include enough metadata to connect completed payment to the product and user.
- Verify payment completion through the provider's signed webhook.
- Only after webhook verification, write `purchases/{purchaseId}`.
- Create or activate `invitations/{invitationId}` for the customer after verified payment.
- Never trust a client redirect or client-provided payment status as proof of purchase.

## Product Scope Boundaries

- No admin panel is required at the start.
- Do not build admin features unless explicitly requested.
- Product/template data may initially be managed through trusted tooling such as Firebase Console, emulator seed scripts, or a future admin-only workflow.
- File/image uploads are not required at the start.
- Do not add upload functionality unless explicitly requested.
- Do not add unnecessary public forms unless they directly support the product flow.
- Email notifications are required eventually, but email logic should stay separated from UI components.

## Design Direction

Overall style:

- Wedding-style
- Luxury
- Elegant
- Romantic
- Clean
- Modern
- Premium

The design should feel closer to Squarespace and Apple than to a cheap template marketplace, overloaded wedding blog, childish invitation platform, or generic SaaS dashboard.

Catalog filtering is required and should be fast, clean, and easy to use on mobile and desktop. Filters may include style, color palette, layout type, price, language support, popular templates, and new templates.

## Production And Branding Notes

Use **Dapatije** as the active project and brand name in new agent-facing guidance.

Existing repository files may still contain previous `Patiji`, `patiji.ge`, Firebase project IDs, package names, SEO URLs, sitemap URLs, or app copy. Do not rename those source files, package metadata, Firebase project IDs, domains, sitemap URLs, or existing app copy unless that rename is explicitly requested.

Before a real Dapatije production deployment, intentionally update and verify any previous domain, Firebase project, SEO, sitemap, manifest, and app metadata values.

## Validation Commands

Use these commands when validating changes:

```sh
npm run typecheck
npm run typecheck:tests
npm run lint
npm run build
npm run verify
```

Run Firestore security rules tests separately after confirming JDK 21 or newer is active:

```sh
java -version
npm run test:rules
```

`npm run verify` runs typecheck, test typecheck, lint, and build. `npm run test:rules` starts the Firestore emulator through Firebase CLI and runs `tests/firestore.rules.test.ts`.

## Evidence And Accuracy Rules

Do not invent production details, secrets, endpoints, schemas, versions, Firebase project state, payment provider behavior, or test results. If a claim cannot be proven from repository files, official documentation, or reproducible commands, state that explicitly.

Prefer the current officially recommended, secure approach. If multiple valid approaches exist, choose the safest option and justify it briefly.

When proposing or implementing changes, include a concrete validation path: what to check, where to check it, and which command or manual step reproduces the result.

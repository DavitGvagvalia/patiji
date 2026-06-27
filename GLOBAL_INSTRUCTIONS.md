# GLOBAL_INSTRUCTIONS.md

## Project Overview

Project name: **patiji.ge**

Patiji.ge is an international business website for selling premium wedding invitation website templates. The website is a brand site with a product catalog. Customers browse invitation website templates, buy one template with a one-time payment, and then use their profile page to view and manage answers received from wedding guests.

The product is not a generic website builder. It should feel like a luxury wedding brand with a clean, elegant, emotional, and trustworthy experience.

## Main Goals

Build a beautiful, fast, SEO-friendly, scalable, and secure website for selling wedding invitation website templates.

Priority order:

1. Beautiful design
2. SEO
3. Fast loading
4. Scalability
5. Security

Every technical, UI, and content decision should support these priorities in this order.

## Target Audience

Primary audience:

- Brides
- Couples planning weddings
- Families helping organize weddings
- Age range: 20–40
- International audience

The tone should feel elegant, polished, romantic, premium, and trustworthy. Avoid childish, overly cute, cheap, or messy design choices.

## Languages

The website must support multilingual content from the start.

Initial languages:

- English
- Georgian
- Russian

Use an internationalization-friendly structure. Avoid hardcoded UI text inside components. Store labels, page text, buttons, metadata, and product content in a way that can be translated easily.

## Website Type

This is a business website with:

- Brand landing page
- Product catalog
- User profile area
- One-time purchase flow
- Guest answer/RSVP result management for customers

This is not a subscription SaaS at the start.

## Required Pages

Minimum required pages:

### Home

Purpose: introduce Patiji as a luxury wedding invitation website template brand.

Should include:

- Hero section
- Clear value proposition
- Product/template preview section
- Benefits section
- How it works section
- CTA to browse catalog
- SEO-friendly text content

### Catalog

Purpose: allow users to browse wedding invitation website templates.

Should include:

- Product/template cards
- Filtering
- Template preview
- Clear pricing or purchase CTA
- Elegant visual presentation

### Profile

Purpose: allow logged-in customers to view their purchased invitation website/template and guest answers.

Should include:

- Purchased invitation/template information
- Guest answer list
- RSVP/guest response data
- Basic account information

## Main User Flow

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

## Forms

The main Patiji brand/catalog website does not need general public forms at the start.

However, purchased invitation websites may collect guest answers/RSVP responses. These responses must be saved and shown to the buyer in their profile page.

Do not add unnecessary forms unless they directly support the product flow.

## Authentication

The website needs user accounts/login.

Use Firebase Authentication unless a different Firebase-compatible auth decision is made later.

Authentication should be used for:

- Customer profile access
- Purchased product access
- Viewing guest answers
- Protecting user-specific Firestore data

## Admin Panel

No admin panel is required at the start.

Do not build admin features unless explicitly requested later.

Product/template data may initially be managed manually through code, Firestore, or Firebase Console depending on the implementation stage.

## Payments

The website uses one-time payments.

Do not implement subscriptions unless requested later.

Payment flow should be designed so that after a successful purchase, the user receives access to their purchased invitation website/template in their profile.

If payment integration requires a backend or cloud function later, keep that integration isolated and documented.

## Email Notifications

Email notifications are required.

Possible email use cases:

- Purchase confirmation
- Account-related messages
- Guest RSVP/answer notification
- Invitation website activation/update confirmation

Keep email logic separated from UI components.

## Uploads

File/image uploads are not required at the start.

Do not add upload functionality unless explicitly requested later.

## Search and Filtering

Catalog filtering is required.

Filters may include, depending on available product data:

- Style
- Color palette
- Layout type
- Price
- Language support
- Popular/new templates

Filtering should be fast, clean, and easy to use on mobile and desktop.

## Design Direction

Overall style:

- Wedding-style
- Luxury
- Elegant
- Romantic
- Clean
- Modern
- Premium

The design should feel closer to **Squarespace** and **Apple** than to overly playful invitation builders.

Avoid making the website look like:

- sayi.do
- Cheap template marketplace
- Overloaded wedding blog
- Childish or cartoonish invitation platform
- Generic SaaS dashboard

## Brand Colors

Use the following starting palette:

```css
#000000
#14213d
#fca311
#e5e5e5
#ffffff
```

Suggested roles:

- `#000000` — primary text, luxury contrast
- `#14213d` — deep navy brand color
- `#fca311` — gold/accent CTA color
- `#e5e5e5` — soft neutral background/borders
- `#ffffff` — main clean background

Use the gold accent carefully. It should feel premium, not loud.

## Fonts

Initial font imports:

```css
@import url('https://fonts.googleapis.com/css2?family=League+Script&family=Petit+Formal+Script&display=swap');
```

Use script fonts mainly for accents, headings, names, or decorative wedding-style moments.

Do not use script fonts for long paragraphs, navigation, buttons, forms, or important UI text because readability is more important.

Pair script fonts with a clean readable sans-serif or serif font for body content.

## Responsive Design

The website must be mobile-first.

However, desktop UI must also be polished and premium.

Rules:

- Design mobile layouts first.
- Do not treat desktop as an afterthought.
- Use responsive spacing, typography, and grids.
- Catalog cards must look good on both mobile and desktop.
- Profile pages must remain clean and usable on small screens.

## Tech Stack

Use:

- React
- TypeScript
- Tailwind CSS
- Tailwind `@theme`
- Firebase
- Firestore
- Firebase Hosting

No traditional backend API is planned at the start.

Use Firebase services directly where appropriate, but always keep security rules and data access patterns in mind.

## TypeScript Rules

Use TypeScript throughout the project.

Rules:

- Avoid `any` unless there is a strong reason.
- Create clear interfaces/types for products, users, purchases, guest answers, and Firestore documents.
- Keep shared types in a dedicated location.
- Prefer explicit props interfaces for components.
- Make invalid states difficult to represent.

## Styling Rules

Use Tailwind CSS with `@theme`.

Rules:

- Use theme tokens for colors, spacing, radius, shadows, and typography when possible.
- Avoid random one-off colors unless necessary.
- Keep styling consistent across pages.
- Prefer reusable UI components for buttons, cards, sections, badges, and layout wrappers.
- Avoid huge unreadable className strings. Extract reusable components when needed.

## Suggested Tailwind Theme Tokens

Use these as a starting point and adjust during design refinement:

```css
@theme {
  --color-brand-black: #000000;
  --color-brand-navy: #14213d;
  --color-brand-gold: #fca311;
  --color-brand-soft: #e5e5e5;
  --color-brand-white: #ffffff;

  --font-script-league: "League Script", cursive;
  --font-script-petit: "Petit Formal Script", cursive;
}
```

## Code Style

Code should be:

- Clean
- Professional
- Reusable
- Easy to maintain
- Component-driven
- Type-safe
- Scalable

Comments are allowed only when necessary. Do not over-explain obvious code.

Good comments explain **why**, not **what**.

## File and Component Structure

Split the project into small files with one clear responsibility.

Prefer small reusable components over large page files.

Suggested structure:

```txt
src/
  app/
  assets/
  components/
    ui/
    layout/
    catalog/
    profile/
    home/
  config/
  constants/
  features/
    auth/
    catalog/
    profile/
    payments/
    rsvp/
  firebase/
  hooks/
  i18n/
  lib/
  pages/
  routes/
  styles/
  types/
  utils/
```

Use the exact structure only if it fits the framework setup. Keep the principle: small files, clear names, one responsibility.

## Naming Rules

Use clear, descriptive names.

Examples:

- `TemplateCard`
- `CatalogFilters`
- `GuestAnswersList`
- `ProfileLayout`
- `PurchaseSummary`
- `WeddingTemplate`
- `GuestAnswer`

Avoid vague names like:

- `Box`
- `Thing`
- `Data`
- `Component1`
- `NewPage`

## React Rules

Use functional React components.

Rules:

- Keep components focused.
- Keep business logic outside visual UI components when possible.
- Use custom hooks for reusable logic.
- Avoid deeply nested JSX.
- Avoid prop drilling when state becomes shared across many components.
- Keep loading, empty, and error states clear.

## Firebase Rules

Use Firebase for:

- Authentication
- Firestore database
- Hosting
- Possible email/payment-related integrations later if needed

Keep Firebase initialization in one dedicated file or folder.

Never expose secrets that should not be public. Firebase client config can be public, but access must be protected with Firebase Security Rules.

## Firestore Data Model

Start with a scalable and simple Firestore model.

Possible collections:

```txt
users/{userId}
products/{productId}
purchases/{purchaseId}
invitations/{invitationId}
invitations/{invitationId}/guestAnswers/{answerId}
```

Possible document responsibilities:

### users

Stores public-safe customer profile/account data.

### products

Stores invitation website template/catalog data.

### purchases

Stores successful one-time purchase records.

### invitations

Stores customer-owned invitation website instances.

### guestAnswers

Stores RSVP/guest responses connected to a specific invitation.

Always design documents around ownership and security.

## Security Rules Principles

Firestore security rules are required before production.

Security principles:

- Users can only read and write their own private data.
- Guest answers should only be readable by the invitation owner.
- Public product/template data can be readable by everyone.
- Purchase data must not be editable by normal users after payment confirmation.
- Do not trust client-only payment confirmation for ownership.
- Validate required fields in security rules where possible.

## SEO Requirements

SEO is one of the top priorities.

Rules:

- Every public page must have a unique title and meta description.
- Use semantic HTML.
- Use proper heading hierarchy.
- Include keyword-friendly copy naturally.
- Optimize product/template pages for search intent.
- Add Open Graph metadata for social sharing.
- Use clean URLs.
- Add structured data where useful.
- Avoid hiding important content only inside client-side interactions.

Important SEO keyword themes:

- Wedding invitation website templates
- Digital wedding invitations
- Wedding website templates
- Online wedding invitation
- RSVP wedding website
- Luxury wedding invitation website

## Performance Requirements

The website must load fast.

Rules:

- Optimize images.
- Lazy-load non-critical media.
- Keep bundle size under control.
- Avoid unnecessary libraries.
- Use code splitting when useful.
- Avoid heavy animations that hurt performance.
- Keep Firebase reads efficient.
- Avoid repeated unnecessary Firestore queries.

## Accessibility Requirements

The website should be accessible and usable.

Rules:

- Use semantic HTML elements.
- Buttons must be buttons, links must be links.
- Maintain good color contrast.
- Do not rely only on color to communicate meaning.
- Provide visible focus states.
- Use readable font sizes.
- Use labels for inputs where inputs exist.
- Ensure keyboard navigation works.

## Content Tone

The copy should sound:

- Elegant
- Clear
- Warm
- Premium
- Trustworthy
- Romantic but not cheesy

Avoid:

- Overly casual startup slang
- Too much technical language
- Cheap sales language
- Excessive emojis
- Aggressive urgency

## Catalog Product Card Requirements

Each product/template card should clearly show:

- Template name
- Preview image or visual mockup
- Short style description
- Price or purchase CTA
- Main tags/style categories
- Preview button
- Buy/select button

Cards should feel visual and premium.

## Profile Page Requirements

Profile page should prioritize clarity.

It should show:

- User information
- Purchased template/invitation website
- Guest answers/RSVP responses
- Empty states when there are no answers yet
- Loading and error states

Do not make the profile page feel like a complex admin dashboard. Keep it elegant and simple.

## Error, Loading, and Empty States

Every async feature should handle:

- Loading state
- Error state
- Empty state
- Success state where relevant

Messages should be clear and human-friendly.

## Libraries

No specific libraries are forbidden at the start.

However:

- Do not add libraries without a clear reason.
- Prefer lightweight solutions.
- Avoid packages that significantly increase bundle size for small features.
- Keep dependencies maintainable.

## Deployment

Deploy with Firebase Hosting.

Before production deployment:

- Confirm environment variables are configured.
- Confirm Firebase project is correct.
- Confirm Firestore rules are production-ready.
- Confirm SEO metadata exists.
- Confirm mobile and desktop layouts are tested.
- Confirm performance is acceptable.

## Things Not To Build Unless Requested

Do not build these unless explicitly requested later:

- Admin panel
- Subscription system
- File/image uploads
- Complex website builder/editor
- Blog
- Public contact forms
- Multi-role permission system
- Traditional backend API

## Final Quality Standard

Every page and component should feel like it belongs to a premium international wedding product.

Before considering a feature complete, check:

- Is it beautiful?
- Is it clear?
- Is it fast?
- Is it mobile-friendly?
- Is it SEO-friendly if public?
- Is it secure if user data is involved?
- Is the code clean and reusable?

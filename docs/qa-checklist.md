# QA Checklist

## Viewports

Check these routes at mobile width, tablet width, and desktop width:

- `/`
- `/catalog`
- `/profile`
- `/i/nino-daniel`
- `/ka/catalog`
- `/ru/catalog`

## Visual checks

- Navigation wraps cleanly without overlapping language controls.
- Home hero, catalog cards, and profile panels do not overflow on mobile.
- Invitation hero names remain readable on narrow screens.
- RSVP form inputs and buttons remain tappable.
- Empty/error/fallback notices are visible and not hidden behind sticky header.

## Functional checks

- Catalog filters can be applied and reset.
- Catalog fallback notice appears when Firestore catalog data is unavailable.
- Checkout not-configured state appears when no checkout endpoint is set.
- Profile signed-out form is usable with Email/Password Auth enabled.
- No-invitation profile state links back to catalog.
- Public invitation unavailable state links back to Patiji.
- RSVP submit succeeds only for active invitations when Firestore rules are deployed.

## Firebase checks

- `npm run verify` passes.
- `npm run test:rules` passes in an environment with JDK 21+.
- Firebase Console has Email/Password Auth enabled if using the current auth form.
- Firestore documents match `docs/catalog-products.md` and `docs/public-invitations.md`.

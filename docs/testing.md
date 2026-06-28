# Testing

Real Firebase catalog-product QA is documented in `docs/firebase-test-products.md`.

## Firestore rules

Run Firestore security rules tests with:

```sh
npm run test:rules
```

This script starts the Firestore emulator through Firebase CLI and runs `tests/firestore.rules.test.ts`.

Firebase CLI `15.x` requires JDK 21 or newer for the emulator runtime. Verify with:

```sh
java -version
```

The tests seed data through `withSecurityRulesDisabled` and then verify client behavior through security rules:

- public active products are readable;
- inactive products are denied;
- public active invitations are readable;
- archived public invitations are denied;
- owner-only profile, purchase, custom inquiry, invitation, and guest answer reads are enforced;
- signed-in customers can create valid custom website inquiries only for themselves;
- normal clients cannot create purchases or invitations;
- normal clients cannot update or delete custom website inquiries;
- public RSVP writes are accepted only for active invitations with valid payloads.

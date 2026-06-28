# Testing

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
- owner-only profile, purchase, invitation, and guest answer reads are enforced;
- normal clients cannot create purchases or invitations;
- public RSVP writes are accepted only for active invitations with valid payloads.

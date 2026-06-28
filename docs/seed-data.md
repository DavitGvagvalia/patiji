# Seed Data

Reference seed data lives in `seed/example-firestore-data.json`.

This file is intentionally not an executable import script. It documents the minimum Firestore documents needed to exercise the product flow without requiring admin credentials in the repository.

## What it covers

- active catalog products;
- a customer profile document;
- a verified purchase document;
- a private invitation document;
- a public invitation document for guest-facing RSVP pages.

## How to use it

For local emulator work, mirror the documents in the Firebase Emulator UI or a local trusted seed script.

For production, create these documents only through trusted flows:

- `products` can be managed manually through Firebase Console until an admin workflow exists;
- `purchases`, `invitations`, and `publicInvitations` should be created only after verified payment completion;
- guest RSVP responses should be created by the public invitation page and validated by Firestore rules.

Replace every `SERVER_TIMESTAMP` marker with a Firestore server timestamp when writing real documents.

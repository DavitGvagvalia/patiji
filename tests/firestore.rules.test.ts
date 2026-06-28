import { readFileSync } from 'node:fs'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest'

const projectId = 'demo-patiji'
const ownerId = 'owner-user'
const otherUserId = 'other-user'
let testEnv: RulesTestEnvironment

function now() {
  return firebase.firestore.Timestamp.fromDate(new Date('2026-06-28T00:00:00.000Z'))
}

function validCustomInquiry(userId = ownerId) {
  return {
    userId,
    customerName: 'Nino',
    customerEmail: 'owner@example.com',
    preferredContactMethod: 'email',
    coupleNames: 'Nino & Daniel',
    weddingDate: '2026-09-12',
    location: 'Tbilisi, Georgia',
    guestCountRange: '100-200',
    requestedFeatures: ['rsvp', 'schedule', 'venue-map'],
    stylePreference: 'Elegant garden',
    palettePreference: 'Sage and ivory',
    languageSupport: ['English', 'Georgian'],
    budgetRange: '$1,000-$2,500',
    desiredLaunchDate: '2026-08-01',
    notes: 'We want a refined custom wedding website.',
    status: 'submitted',
    source: 'catalog-custom-website',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
}

async function seedFirestore() {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore()
    const timestamp = now()

    await Promise.all([
      db.doc('users/owner-user').set({
        displayName: 'Nino & Daniel',
        email: 'owner@example.com',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('products/active-template').set({
        name: 'Velvet Garden',
        slug: 'velvet-garden',
        price: 149,
        currency: 'USD',
        style: 'garden',
        palette: 'sage',
        layout: 'story-led',
        languageSupport: ['English', 'Georgian', 'Russian'],
        description: 'A romantic garden-led template.',
        tags: ['Garden'],
        isActive: true,
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('products/inactive-template').set({
        name: 'Hidden Template',
        slug: 'hidden-template',
        price: 149,
        currency: 'USD',
        style: 'classic',
        palette: 'navy',
        layout: 'one-page',
        languageSupport: ['English'],
        description: 'Inactive template.',
        tags: ['Hidden'],
        isActive: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('purchases/paid-purchase').set({
        userId: ownerId,
        productId: 'active-template',
        invitationId: 'owner-invitation',
        amount: 149,
        currency: 'USD',
        status: 'paid',
        paymentProvider: 'stripe',
        providerSessionId: 'session_123',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('customInquiries/existing-inquiry').set({
        userId: ownerId,
        customerName: 'Nino',
        customerEmail: 'owner@example.com',
        preferredContactMethod: 'email',
        coupleNames: 'Nino & Daniel',
        requestedFeatures: ['rsvp'],
        languageSupport: ['English'],
        budgetRange: '$1,000-$2,500',
        status: 'submitted',
        source: 'catalog-custom-website',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('invitations/owner-invitation').set({
        ownerId,
        productId: 'active-template',
        slug: 'nino-daniel',
        status: 'active',
        coupleNames: 'Nino & Daniel',
        weddingDate: '2026-09-12',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('invitations/archived-invitation').set({
        ownerId,
        productId: 'active-template',
        slug: 'archived',
        status: 'archived',
        coupleNames: 'Archived Couple',
        weddingDate: '2026-09-12',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('invitations/owner-invitation/guestAnswers/existing-answer').set({
        guestName: 'Guest One',
        attending: true,
        partySize: 2,
        submittedAt: timestamp,
      }),
      db.doc('publicInvitations/nino-daniel').set({
        invitationId: 'owner-invitation',
        slug: 'nino-daniel',
        status: 'active',
        coupleNames: 'Nino & Daniel',
        headline: 'Together with their families, they invite you to celebrate.',
        message: 'Join us for a day shaped around vows, dinner, music, and the people closest to us.',
        weddingDate: '2026-09-12',
        venueName: 'Tbilisi Garden Hall',
        venueAddress: 'Tbilisi, Georgia',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
      db.doc('publicInvitations/archived').set({
        invitationId: 'archived-invitation',
        slug: 'archived',
        status: 'archived',
        coupleNames: 'Archived Couple',
        headline: 'Archived invitation.',
        message: 'This should not be public.',
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
    ])
  })
}

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  })
})

beforeEach(async () => {
  await testEnv.clearFirestore()
  await seedFirestore()
})

afterAll(async () => {
  await testEnv.cleanup()
})

describe('product catalog rules', () => {
  test('anyone can read active products', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertSucceeds(db.doc('products/active-template').get())
  })

  test('inactive products are not public', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertFails(db.doc('products/inactive-template').get())
  })

  test('normal clients cannot write products', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertFails(db.doc('products/new-template').set({ isActive: true }))
  })
})

describe('public invitation rules', () => {
  test('anyone can read active public invitation documents', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertSucceeds(db.doc('publicInvitations/nino-daniel').get())
  })

  test('archived public invitation documents are not readable', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertFails(db.doc('publicInvitations/archived').get())
  })

  test('normal clients cannot write public invitation documents', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertFails(db.doc('publicInvitations/new').set({ status: 'active' }))
  })
})

describe('owner-private data rules', () => {
  test('owners can read their profile, purchases, custom inquiries, invitations, and guest answers', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertSucceeds(db.doc('users/owner-user').get())
    await assertSucceeds(db.doc('purchases/paid-purchase').get())
    await assertSucceeds(db.doc('customInquiries/existing-inquiry').get())
    await assertSucceeds(db.doc('invitations/owner-invitation').get())
    await assertSucceeds(db.doc('invitations/owner-invitation/guestAnswers/existing-answer').get())
  })

  test('other users cannot read owner-private documents', async () => {
    const db = testEnv.authenticatedContext(otherUserId).firestore()

    await assertFails(db.doc('users/owner-user').get())
    await assertFails(db.doc('purchases/paid-purchase').get())
    await assertFails(db.doc('customInquiries/existing-inquiry').get())
    await assertFails(db.doc('invitations/owner-invitation').get())
    await assertFails(db.doc('invitations/owner-invitation/guestAnswers/existing-answer').get())
  })

  test('normal clients cannot create purchases or invitations', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertFails(db.doc('purchases/client-purchase').set({ userId: ownerId }))
    await assertFails(db.doc('invitations/client-invitation').set({ ownerId }))
  })
})

describe('custom inquiry rules', () => {
  test('signed-in users can create valid custom inquiries for themselves', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertSucceeds(db.doc('customInquiries/new-inquiry').set(validCustomInquiry()))
  })

  test('unauthenticated users cannot create custom inquiries', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertFails(db.doc('customInquiries/public-inquiry').set(validCustomInquiry()))
  })

  test('users cannot create custom inquiries for another user id', async () => {
    const db = testEnv.authenticatedContext(otherUserId).firestore()

    await assertFails(db.doc('customInquiries/other-owner-inquiry').set(validCustomInquiry(ownerId)))
  })

  test('invalid custom inquiry payloads are rejected', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertFails(
      db.doc('customInquiries/invalid-inquiry').set({
        ...validCustomInquiry(),
        requestedFeatures: ['admin-panel'],
      }),
    )
  })

  test('normal clients cannot update or delete custom inquiries', async () => {
    const db = testEnv.authenticatedContext(ownerId).firestore()

    await assertFails(db.doc('customInquiries/existing-inquiry').update({ notes: 'Updated notes.' }))
    await assertFails(db.doc('customInquiries/existing-inquiry').delete())
  })
})

describe('guest answer rules', () => {
  test('guests can submit valid RSVP answers to active invitations', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertSucceeds(
      db.doc('invitations/owner-invitation/guestAnswers/new-answer').set({
        guestName: 'Guest Two',
        attending: true,
        partySize: 2,
        message: 'Congratulations.',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    )
  })

  test('invalid guest answer payloads are rejected', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertFails(
      db.doc('invitations/owner-invitation/guestAnswers/invalid-answer').set({
        guestName: '',
        attending: true,
        partySize: 30,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    )
  })

  test('guests cannot submit RSVP answers to archived invitations', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    await assertFails(
      db.doc('invitations/archived-invitation/guestAnswers/new-answer').set({
        guestName: 'Guest Three',
        attending: true,
        partySize: 1,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    )
  })
})

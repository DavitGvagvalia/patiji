import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { getFirebaseClient } from '../../firebase/client'
import { guestAnswersCollection, publicInvitationDocument } from '../../firebase/collections'
import type { PublicInvitation, RsvpSubmission } from '../../types/rsvp'

export async function getPublicInvitation(slug: string): Promise<PublicInvitation | null> {
  const { db } = getFirebaseClient()
  const snapshot = await getDoc(publicInvitationDocument(db, slug))

  if (!snapshot.exists()) {
    return null
  }

  const invitation = snapshot.data()

  if (invitation.status !== 'active') {
    return null
  }

  return {
    invitationId: invitation.invitationId,
    slug: invitation.slug,
    coupleNames: invitation.coupleNames,
    headline: invitation.headline,
    message: invitation.message,
    weddingDate: invitation.weddingDate,
    venueName: invitation.venueName,
    venueAddress: invitation.venueAddress,
  }
}

export async function submitGuestAnswer(invitationId: string, submission: RsvpSubmission) {
  const { db } = getFirebaseClient()
  const guestAnswer = {
    guestName: submission.guestName,
    attending: submission.attending,
    partySize: submission.partySize,
    submittedAt: serverTimestamp(),
    ...(submission.message ? { message: submission.message } : {}),
  }

  await addDoc(guestAnswersCollection(db, invitationId), guestAnswer)
}

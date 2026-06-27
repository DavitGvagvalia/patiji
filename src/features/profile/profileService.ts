import { getDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { getFirebaseClient } from '../../firebase/client'
import {
  guestAnswersCollection,
  invitationDocument,
  invitationsCollection,
  userDocument,
} from '../../firebase/collections'
import type { FirestoreGuestAnswer, FirestoreInvitation, FirestoreUser } from '../../types/firestore'

export interface OwnedInvitation extends FirestoreInvitation {
  id: string
}

export async function getUserProfile(userId: string): Promise<FirestoreUser | null> {
  const { db } = getFirebaseClient()
  const snapshot = await getDoc(userDocument(db, userId))

  return snapshot.exists() ? snapshot.data() : null
}

export async function getInvitationForOwner(invitationId: string, ownerId: string): Promise<FirestoreInvitation | null> {
  const { db } = getFirebaseClient()
  const snapshot = await getDoc(invitationDocument(db, invitationId))

  if (!snapshot.exists()) {
    return null
  }

  const invitation = snapshot.data()

  return invitation.ownerId === ownerId ? invitation : null
}

export async function getFirstInvitationForOwner(ownerId: string): Promise<OwnedInvitation | null> {
  const { db } = getFirebaseClient()
  const invitationsQuery = query(invitationsCollection(db), where('ownerId', '==', ownerId), limit(1))
  const snapshot = await getDocs(invitationsQuery)
  const invitation = snapshot.docs[0]

  return invitation ? { id: invitation.id, ...invitation.data() } : null
}

export async function listGuestAnswers(invitationId: string, ownerId: string): Promise<FirestoreGuestAnswer[]> {
  const invitation = await getInvitationForOwner(invitationId, ownerId)

  if (!invitation) {
    return []
  }

  const { db } = getFirebaseClient()
  const snapshot = await getDocs(guestAnswersCollection(db, invitationId))

  return snapshot.docs.map((answer) => answer.data())
}

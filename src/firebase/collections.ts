import {
  collection,
  doc,
  type CollectionReference,
  type DocumentReference,
  type Firestore,
} from 'firebase/firestore'
import type {
  FirestoreGuestAnswer,
  FirestoreInvitation,
  FirestoreProduct,
  FirestorePurchase,
  FirestoreUser,
} from '../types/firestore'

export function usersCollection(db: Firestore): CollectionReference<FirestoreUser> {
  return collection(db, 'users') as CollectionReference<FirestoreUser>
}

export function userDocument(db: Firestore, userId: string): DocumentReference<FirestoreUser> {
  return doc(db, 'users', userId) as DocumentReference<FirestoreUser>
}

export function productsCollection(db: Firestore): CollectionReference<FirestoreProduct> {
  return collection(db, 'products') as CollectionReference<FirestoreProduct>
}

export function purchasesCollection(db: Firestore): CollectionReference<FirestorePurchase> {
  return collection(db, 'purchases') as CollectionReference<FirestorePurchase>
}

export function invitationsCollection(db: Firestore): CollectionReference<FirestoreInvitation> {
  return collection(db, 'invitations') as CollectionReference<FirestoreInvitation>
}

export function invitationDocument(db: Firestore, invitationId: string): DocumentReference<FirestoreInvitation> {
  return doc(db, 'invitations', invitationId) as DocumentReference<FirestoreInvitation>
}

export function guestAnswersCollection(
  db: Firestore,
  invitationId: string,
): CollectionReference<FirestoreGuestAnswer> {
  return collection(db, 'invitations', invitationId, 'guestAnswers') as CollectionReference<FirestoreGuestAnswer>
}

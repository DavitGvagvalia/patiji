import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { serverTimestamp, setDoc } from 'firebase/firestore'
import { getFirebaseClient } from '../../firebase/client'
import { userDocument } from '../../firebase/collections'

export function subscribeToAuthState(onChange: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseClient().auth, onChange)
}

export async function signInWithEmail(email: string, password: string) {
  const { auth } = getFirebaseClient()

  return signInWithEmailAndPassword(auth, email, password)
}

export async function createAccountWithEmail(email: string, password: string, displayName: string) {
  const { auth, db } = getFirebaseClient()
  const credential = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(credential.user, { displayName })
  await setDoc(userDocument(db, credential.user.uid), {
    displayName,
    email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return credential
}

export function signOutCurrentUser() {
  return signOut(getFirebaseClient().auth)
}

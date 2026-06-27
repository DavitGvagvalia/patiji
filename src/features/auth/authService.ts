import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
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

export async function signInWithGoogle() {
  const { auth, db } = getFirebaseClient()
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const credential = await signInWithPopup(auth, provider)
  const userRef = userDocument(db, credential.user.uid)
  const userSnapshot = await getDoc(userRef)
  const displayName = credential.user.displayName ?? credential.user.email ?? 'Customer'
  const email = credential.user.email ?? ''

  await setDoc(
    userRef,
    userSnapshot.exists()
      ? {
          displayName,
          updatedAt: serverTimestamp(),
        }
      : {
          displayName,
          email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
    { merge: true },
  )

  return credential
}

export function signOutCurrentUser() {
  return signOut(getFirebaseClient().auth)
}

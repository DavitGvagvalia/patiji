import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getFirebaseEnv } from '../config/env'

interface FirebaseClient {
  app: FirebaseApp
  auth: Auth
  db: Firestore
}

let firebaseClient: FirebaseClient | null = null

export function getFirebaseClient(): FirebaseClient {
  if (firebaseClient) {
    return firebaseClient
  }

  const firebaseConfig = getFirebaseEnv()
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

  firebaseClient = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  }

  return firebaseClient
}

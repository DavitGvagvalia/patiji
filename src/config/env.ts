interface FirebaseEnv {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

interface CheckoutEnv {
  checkoutSessionEndpoint: string | null
}

const firebaseEnvKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const

type FirebaseEnvKey = (typeof firebaseEnvKeys)[number]

function readRequiredEnv(key: FirebaseEnvKey) {
  const value = import.meta.env[key]

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export function getFirebaseEnv(): FirebaseEnv {
  return {
    apiKey: readRequiredEnv('VITE_FIREBASE_API_KEY'),
    authDomain: readRequiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: readRequiredEnv('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: readRequiredEnv('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readRequiredEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: readRequiredEnv('VITE_FIREBASE_APP_ID'),
  }
}

export function getCheckoutEnv(): CheckoutEnv {
  const checkoutSessionEndpoint = import.meta.env.VITE_CHECKOUT_SESSION_ENDPOINT

  return {
    checkoutSessionEndpoint:
      typeof checkoutSessionEndpoint === 'string' && checkoutSessionEndpoint.trim() !== ''
        ? checkoutSessionEndpoint
        : null,
  }
}

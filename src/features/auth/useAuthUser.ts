import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuthUser(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let isMounted = true

    try {
      void import('./authService')
        .then(({ subscribeToAuthState }) => {
          if (!isMounted) {
            return
          }

          unsubscribe = subscribeToAuthState((user) => {
            setState({ user, loading: false, error: null })
          })
        })
        .catch((error) => {
          if (!isMounted) {
            return
          }

          const message = error instanceof Error ? error.message : 'Unable to initialize Firebase Authentication.'
          setState({ user: null, loading: false, error: message })
        })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to initialize Firebase Authentication.'
      setState({ user: null, loading: false, error: message })
    }

    return () => {
      isMounted = false
      unsubscribe?.()
    }
  }, [])

  return state
}

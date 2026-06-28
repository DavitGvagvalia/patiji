import { useEffect, useState } from 'react'
import type { PublicInvitation } from '../../types/rsvp'

interface PublicInvitationState {
  invitation: PublicInvitation | null
  loading: boolean
  error: string | null
}

export function usePublicInvitation(slug: string | undefined): PublicInvitationState {
  const [state, setState] = useState<PublicInvitationState>({
    invitation: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!slug) {
      setState({ invitation: null, loading: false, error: 'Invitation link is missing.' })
      return undefined
    }

    let isMounted = true
    const invitationSlug = slug

    async function loadInvitation() {
      setState({ invitation: null, loading: true, error: null })

      try {
        const { getPublicInvitation } = await import('./invitationService')
        const invitation = await getPublicInvitation(invitationSlug)

        if (!isMounted) {
          return
        }

        setState({
          invitation,
          loading: false,
          error: invitation ? null : 'This invitation is not available.',
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setState({
          invitation: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load invitation.',
        })
      }
    }

    void loadInvitation()

    return () => {
      isMounted = false
    }
  }, [slug])

  return state
}

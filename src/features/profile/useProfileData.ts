import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import type { CustomerProfile, GuestAnswer, PurchasedInvitation } from '../../types/profile'

interface ProfileDataState {
  customer: CustomerProfile | null
  invitation: PurchasedInvitation | null
  answers: GuestAnswer[]
  loading: boolean
  error: string | null
}

function formatGuestAnswerDate(value: unknown) {
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toISOString()
  }

  return ''
}

export function useProfileData(user: User | null): ProfileDataState {
  const [state, setState] = useState<ProfileDataState>({
    customer: null,
    invitation: null,
    answers: [],
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!user) {
      setState({ customer: null, invitation: null, answers: [], loading: false, error: null })
      return undefined
    }

    let isMounted = true
    const currentUser = user

    async function loadProfileData() {
      setState((current) => ({ ...current, loading: true, error: null }))

      try {
        const { getFirstInvitationForOwner, getUserProfile, listGuestAnswers } = await import('./profileService')
        const [profile, ownerInvitation] = await Promise.all([
          getUserProfile(currentUser.uid),
          getFirstInvitationForOwner(currentUser.uid),
        ])
        const answers = ownerInvitation ? await listGuestAnswers(ownerInvitation.id, currentUser.uid) : []

        if (!isMounted) {
          return
        }

        setState({
          customer: {
            displayName: profile?.displayName ?? currentUser.displayName ?? currentUser.email ?? 'Customer',
            email: profile?.email ?? currentUser.email ?? '',
            invitationUrl: ownerInvitation ? `patiji.ge/i/${ownerInvitation.slug}` : '',
          },
          invitation: ownerInvitation
            ? {
                templateName: ownerInvitation.productId,
                status: ownerInvitation.status,
                weddingDate: ownerInvitation.weddingDate ?? '',
                guestCount: answers.length,
              }
            : null,
          answers: answers.map((answer, index) => ({
            id: `${ownerInvitation?.id ?? 'answer'}-${index}`,
            guestName: answer.guestName,
            attending: answer.attending,
            partySize: answer.partySize,
            submittedAt: formatGuestAnswerDate(answer.submittedAt),
          })),
          loading: false,
          error: null,
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setState({
          customer: null,
          invitation: null,
          answers: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load profile data.',
        })
      }
    }

    void loadProfileData()

    return () => {
      isMounted = false
    }
  }, [user])

  return state
}

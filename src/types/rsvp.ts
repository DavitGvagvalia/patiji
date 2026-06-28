export interface PublicInvitation {
  invitationId: string
  slug: string
  coupleNames: string
  headline: string
  message: string
  weddingDate?: string
  venueName?: string
  venueAddress?: string
}

export interface RsvpSubmission {
  guestName: string
  attending: boolean
  partySize: number
  message?: string
}

export type RsvpSubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

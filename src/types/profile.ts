export interface CustomerProfile {
  displayName: string
  email: string
  invitationUrl: string
}

export interface PurchasedInvitation {
  templateName: string
  status: 'draft' | 'active' | 'archived'
  weddingDate: string
  guestCount: number
}

export interface GuestAnswer {
  id: string
  guestName: string
  attending: boolean
  partySize: number
  submittedAt: string
}

# Public Invitation Documents

Public invitation pages read from `publicInvitations/{slug}`.

This collection exists so public guests do not need read access to private owner invitation documents under `invitations/{invitationId}`.

## Required fields

```ts
{
  invitationId: string
  slug: string
  status: 'active' | 'archived'
  coupleNames: string
  headline: string
  message: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## Optional fields

```ts
{
  weddingDate?: string
  venueName?: string
  venueAddress?: string
}
```

Only active public invitations are readable by guests. Guest RSVP submissions are written to `invitations/{invitationId}/guestAnswers/{answerId}` and are readable only by the invitation owner.

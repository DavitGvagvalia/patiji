import type { CustomerProfile, PurchasedInvitation } from '../../types/profile'

interface ProfileSummaryProps {
  customer: CustomerProfile
  invitation: PurchasedInvitation
  labels: {
    accountTitle: string
    purchaseTitle: string
    nameLabel: string
    emailLabel: string
    invitationUrlLabel: string
    templateLabel: string
    statusLabel: string
    weddingDateLabel: string
  }
}

export function ProfileSummary({ customer, invitation, labels }: ProfileSummaryProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-lg border border-brand-soft bg-white p-6">
        <h2 className="text-xl font-semibold text-brand-navy">{labels.accountTitle}</h2>
        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-brand-black">{labels.nameLabel}</dt>
            <dd className="mt-1 text-brand-black/70">{customer.displayName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-black">{labels.emailLabel}</dt>
            <dd className="mt-1 text-brand-black/70">{customer.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-black">{labels.invitationUrlLabel}</dt>
            <dd className="mt-1 text-brand-black/70">{customer.invitationUrl}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-brand-soft bg-white p-6">
        <h2 className="text-xl font-semibold text-brand-navy">{labels.purchaseTitle}</h2>
        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-brand-black">{labels.templateLabel}</dt>
            <dd className="mt-1 text-brand-black/70">{invitation.templateName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-black">{labels.statusLabel}</dt>
            <dd className="mt-1 text-brand-black/70">{invitation.status}</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-black">{labels.weddingDateLabel}</dt>
            <dd className="mt-1 text-brand-black/70">{invitation.weddingDate}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

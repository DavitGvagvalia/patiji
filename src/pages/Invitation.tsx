import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { RsvpForm } from '../components/invitation/RsvpForm'
import { dictionaries } from '../i18n/dictionaries'
import { defaultLocale, getLocaleFromPath } from '../i18n/locales'
import { usePublicInvitation } from '../features/rsvp/usePublicInvitation'

function formatNames(coupleNames: string) {
  return coupleNames.replace(/\s*&\s*/u, '\n&\n')
}

export default function Invitation() {
  const { slug } = useParams()
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname) || defaultLocale
  const content = dictionaries[locale]
  const invitationState = usePublicInvitation(slug)

  useEffect(() => {
    if (invitationState.invitation) {
      document.title = `${invitationState.invitation.coupleNames} | Patiji Wedding Invitation`
    }
  }, [invitationState.invitation])

  if (invitationState.loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-brand-soft/30 px-4 text-sm text-brand-black/70">
        {content.invitation.loadingMessage}
      </main>
    )
  }

  if (!invitationState.invitation) {
    return (
      <main className="grid min-h-screen place-items-center bg-brand-soft/30 px-4">
        <section className="max-w-xl rounded-lg border border-brand-soft bg-white p-6 text-center sm:p-8">
          <h1 className="text-2xl font-semibold text-brand-navy sm:text-3xl">{content.invitation.unavailableTitle}</h1>
          <p className="mt-4 text-sm leading-7 text-brand-black/70">
            {invitationState.error ?? content.invitation.unavailableText}
          </p>
          <Link
            to={locale === defaultLocale ? '/' : `/${locale}`}
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand-navy px-5 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          >
            {content.invitation.returnHomeAction}
          </Link>
        </section>
      </main>
    )
  }

  const invitation = invitationState.invitation

  return (
    <main className="min-h-screen bg-[linear-gradient(rgba(255,255,255,0.72),rgba(229,229,229,0.86)),radial-gradient(circle_at_20%_10%,rgba(252,163,17,0.22),transparent_32%),linear-gradient(135deg,#ffffff,#e5e5e5)] text-brand-black">
      <section className="mx-auto grid min-h-[88vh] w-full max-w-6xl items-center px-4 py-10 sm:min-h-screen sm:px-6 sm:py-16 lg:px-8" aria-labelledby="invitation-title">
        <div className="relative max-w-3xl overflow-hidden rounded-lg border border-brand-soft bg-white/78 p-6 shadow-lg backdrop-blur sm:p-14">
          <div className="absolute inset-3 border border-brand-gold/25 sm:inset-5" aria-hidden="true" />
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-4 text-brand-gold">
              <span className="h-px w-14 bg-brand-gold/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">{content.invitation.eyebrow}</p>
            </div>
            <p className="font-serif text-2xl leading-tight text-brand-gold sm:text-3xl">
              {content.invitation.defaultHeadline}
            </p>
            <h1 id="invitation-title" className="mt-7 whitespace-pre-line break-words text-5xl font-semibold leading-[0.92] tracking-tight text-brand-navy sm:text-8xl">
              {formatNames(invitation.coupleNames)}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-brand-black/72 sm:text-lg">{invitation.message}</p>
            <dl className="mt-8 grid gap-4 text-sm text-brand-black/70 sm:grid-cols-2">
              {invitation.weddingDate ? (
                <div>
                  <dt className="font-semibold text-brand-navy">{content.invitation.dateLabel}</dt>
                  <dd className="mt-1">{invitation.weddingDate}</dd>
                </div>
              ) : null}
              {invitation.venueName ? (
                <div>
                  <dt className="font-semibold text-brand-navy">{content.invitation.venueLabel}</dt>
                  <dd className="mt-1">{invitation.venueName}</dd>
                  {invitation.venueAddress ? <dd className="mt-1">{invitation.venueAddress}</dd> : null}
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </section>

      <RsvpForm
        invitation={invitation}
        labels={{
          eyebrow: content.invitation.rsvpEyebrow,
          title: content.invitation.rsvpTitle,
          guestNameLabel: content.invitation.guestNameLabel,
          attendingLabel: content.invitation.attendingLabel,
          attendingYes: content.invitation.attendingYes,
          attendingNo: content.invitation.attendingNo,
          partySizeLabel: content.invitation.partySizeLabel,
          messageLabel: content.invitation.messageLabel,
          submitAction: content.invitation.submitAction,
          submittingAction: content.invitation.submittingAction,
          successMessage: content.invitation.successMessage,
          errorMessage: content.invitation.errorMessage,
        }}
      />
    </main>
  )
}

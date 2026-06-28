import { useState } from 'react'
import type { FormEvent } from 'react'
import type { PublicInvitation, RsvpSubmitStatus } from '../../types/rsvp'

interface RsvpFormProps {
  invitation: PublicInvitation
  labels: {
    eyebrow: string
    title: string
    guestNameLabel: string
    attendingLabel: string
    attendingYes: string
    attendingNo: string
    partySizeLabel: string
    messageLabel: string
    submitAction: string
    submittingAction: string
    successMessage: string
    errorMessage: string
  }
}

export function RsvpForm({ invitation, labels }: RsvpFormProps) {
  const [guestName, setGuestName] = useState('')
  const [attending, setAttending] = useState(true)
  const [partySize, setPartySize] = useState(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<RsvpSubmitStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const { submitGuestAnswer } = await import('../../features/rsvp/invitationService')
      await submitGuestAnswer(invitation.invitationId, {
        guestName,
        attending,
        partySize,
        message: message.trim() || undefined,
      })

      setGuestName('')
      setAttending(true)
      setPartySize(1)
      setMessage('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl place-items-center px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="rsvp-title">
      <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-lg bg-white/92 p-6 shadow-lg backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">{labels.eyebrow}</p>
        <h2 id="rsvp-title" className="mt-3 text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">
          {labels.title}
        </h2>

        <label className="mt-8 grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.guestNameLabel}
          <input
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            required
            autoComplete="name"
            className="min-h-12 rounded-lg border border-brand-soft bg-white px-3.5 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <fieldset className="mt-5 grid gap-3">
          <legend className="text-sm font-semibold text-brand-navy">{labels.attendingLabel}</legend>
          <label className="flex items-center gap-3 rounded-lg border border-brand-soft bg-white px-3.5 py-3 text-sm text-brand-black/75">
            <input type="radio" name="attending" checked={attending} onChange={() => setAttending(true)} />
            {labels.attendingYes}
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-brand-soft bg-white px-3.5 py-3 text-sm text-brand-black/75">
            <input type="radio" name="attending" checked={!attending} onChange={() => setAttending(false)} />
            {labels.attendingNo}
          </label>
        </fieldset>

        <label className="mt-5 grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.partySizeLabel}
          <input
            type="number"
            min="1"
            max="20"
            step="1"
            inputMode="numeric"
            value={partySize}
            onChange={(event) => setPartySize(Math.min(20, Math.max(1, Number(event.target.value))))}
            required
            className="min-h-12 rounded-lg border border-brand-soft bg-white px-3.5 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <label className="mt-5 grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.messageLabel}
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={500}
            rows={4}
            className="rounded-lg border border-brand-soft bg-white px-3.5 py-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        {status === 'success' ? <p className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-800">{labels.successMessage}</p> : null}
        {status === 'error' ? <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">{labels.errorMessage}</p> : null}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-6 min-h-12 w-full rounded-lg bg-brand-navy px-5 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? labels.submittingAction : labels.submitAction}
        </button>
      </form>
    </section>
  )
}

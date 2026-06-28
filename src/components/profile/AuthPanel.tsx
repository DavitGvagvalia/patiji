import { useState } from 'react'
import type { FormEvent } from 'react'

interface AuthPanelProps {
  labels: {
    title: string
    text: string
    emailLabel: string
    passwordLabel: string
    displayNameLabel: string
    signInAction: string
    googleSignInAction: string
    createAccountAction: string
    switchToCreate: string
    switchToSignIn: string
  }
}

export function AuthPanel({ labels }: AuthPanelProps) {
  const [mode, setMode] = useState<'sign-in' | 'create'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'create') {
        const { createAccountWithEmail } = await import('../../features/auth/authService')
        await createAccountWithEmail(email, password, displayName)
      } else {
        const { signInWithEmail } = await import('../../features/auth/authService')
        await signInWithEmail(email, password)
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)

    try {
      const { signInWithGoogle } = await import('../../features/auth/authService')
      await signInWithGoogle()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Google authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-lg border border-brand-soft bg-white p-5 sm:p-6">
      <h2 className="text-xl font-semibold leading-tight tracking-tight text-brand-navy sm:text-2xl">{labels.title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-black/70">{labels.text}</p>

      <div className="mt-6 max-w-xl">
        <button
          type="button"
          onClick={() => void handleGoogleSignIn()}
          disabled={loading}
          className="flex min-h-11 w-full items-center justify-center gap-3 rounded-lg border border-brand-soft bg-white px-4 text-center text-sm font-semibold text-brand-navy transition hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span aria-hidden="true" className="text-base font-bold text-brand-gold">G</span>
          {labels.googleSignInAction}
        </button>
      </div>

      <form className="mt-5 grid max-w-xl gap-4 border-t border-brand-soft pt-5" onSubmit={handleSubmit}>
        {mode === 'create' ? (
          <label className="grid gap-2 text-sm font-semibold text-brand-navy">
            {labels.displayNameLabel}
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
              className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </label>
        ) : null}

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.emailLabel}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {labels.passwordLabel}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'create' ? 'new-password' : 'current-password'}
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="min-h-11 rounded-lg bg-brand-navy px-5 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mode === 'create' ? labels.createAccountAction : labels.signInAction}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'create' ? 'sign-in' : 'create')
              setError(null)
            }}
            className="min-h-11 rounded-lg border border-brand-soft px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            {mode === 'create' ? labels.switchToSignIn : labels.switchToCreate}
          </button>
        </div>
      </form>
    </section>
  )
}

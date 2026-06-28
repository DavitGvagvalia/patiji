import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { User } from 'firebase/auth'
import { AuthPanel } from '../components/profile/AuthPanel'
import { ProfileNotice } from '../components/profile/ProfileNotice'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useAuthUser } from '../features/auth/useAuthUser'
import { usePageSeo } from '../lib/seo'
import { getLocalizedRoute } from '../routes/routes'
import type { CustomInquiryFormData } from '../types/customInquiry'
import type { CustomInquiryContactMethod } from '../types/firestore'
import type { Locale, SiteContent } from '../types/i18n'

interface CustomWebsiteProps {
  content: SiteContent
  locale: Locale
}

const initialFormData: CustomInquiryFormData = {
  customerName: '',
  customerEmail: '',
  preferredContactMethod: 'email',
  coupleNames: '',
  weddingDate: '',
  location: '',
  guestCountRange: '',
  requestedFeatures: [],
  stylePreference: '',
  palettePreference: '',
  languageSupport: [],
  budgetRange: '',
  desiredLaunchDate: '',
  notes: '',
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return (
    <span>
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </span>
  )
}

function getOptionLabel(options: string[], value: string, emptyValue: string) {
  return options.find((option) => option === value) ?? emptyValue
}

function getContactMethodLabel(
  options: SiteContent['customWebsite']['contactMethods'],
  value: CustomInquiryContactMethod,
) {
  return options.find((option) => option.value === value)?.label ?? value
}

function getLanguageLabels(options: SiteContent['customWebsite']['languageOptions'], values: string[]) {
  return values.map((value) => options.find((option) => option.value === value)?.label ?? value)
}

function labelText(value: string | undefined) {
  return value ?? ''
}

const CustomWebsite = ({ content, locale }: CustomWebsiteProps) => {
  const authState = useAuthUser()
  const labels = content.customWebsite
  const [formData, setFormData] = useState<CustomInquiryFormData>(initialFormData)
  const [activeStep, setActiveStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const reviewStep = labels.steps.length

  usePageSeo(content.metadata.customWebsite, locale)

  useEffect(() => {
    if (!authState.user) {
      return
    }

    setFormData((current) => ({
      ...current,
      customerName: current.customerName || authState.user?.displayName || '',
      customerEmail: current.customerEmail || authState.user?.email || '',
    }))
  }, [authState.user])

  const activeStepLabels = labels.steps[activeStep]
  const progressLabel = `${labels.stepLabel} ${Math.min(activeStep + 1, reviewStep + 1)} / ${reviewStep + 1}`
  const selectedFeatureLabels = useMemo(
    () =>
      formData.requestedFeatures
        .map((value) => labels.featureOptions.find((option) => option.value === value)?.label)
        .filter((value): value is string => Boolean(value)),
    [formData.requestedFeatures, labels.featureOptions],
  )

  function updateField<Field extends keyof CustomInquiryFormData>(
    field: Field,
    value: CustomInquiryFormData[Field],
  ) {
    setFormData((current) => ({ ...current, [field]: value }))
    setError(null)
  }

  function canContinueFromStep(step: number) {
    if (step === 0) {
      return formData.customerName.trim() !== '' && formData.customerEmail.trim() !== ''
    }

    if (step === 1) {
      return formData.coupleNames.trim() !== ''
    }

    if (step === 2) {
      return formData.requestedFeatures.length > 0
    }

    if (step === 3) {
      return formData.languageSupport.length > 0
    }

    if (step === 4) {
      return formData.budgetRange !== ''
    }

    return true
  }

  function handleNext() {
    if (!canContinueFromStep(activeStep)) {
      setError(labels.submitErrorMessage)
      return
    }

    setError(null)
    setActiveStep((current) => Math.min(current + 1, reviewStep))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!authState.user || !canContinueFromStep(4)) {
      setError(labels.submitErrorMessage)
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const { createCustomInquiry } = await import('../features/customInquiry/customInquiryService')
      await createCustomInquiry(authState.user, formData)
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : labels.submitErrorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  function renderAuthPanel() {
    return (
      <AuthPanel
        labels={{
          title: labels.signedOutTitle,
          text: labels.signedOutText,
          emailLabel: content.profile.emailLabel,
          passwordLabel: content.profile.passwordLabel,
          displayNameLabel: content.profile.displayNameLabel,
          signInAction: content.profile.signInAction,
          googleSignInAction: content.profile.googleSignInAction,
          createAccountAction: content.profile.createAccountAction,
          switchToCreate: content.profile.switchToCreate,
          switchToSignIn: content.profile.switchToSignIn,
        }}
      />
    )
  }

  function renderContactStep() {
    const fields = labels.steps[0].fields

    return (
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          <FieldLabel required>{fields.customerName}</FieldLabel>
          <input
            value={formData.customerName}
            onChange={(event) => updateField('customerName', event.target.value)}
            required
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          <FieldLabel required>{fields.customerEmail}</FieldLabel>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(event) => updateField('customerEmail', event.target.value)}
            required
            autoComplete="email"
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-brand-navy">{fields.preferredContactMethod}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {labels.contactMethods.map((method) => (
              <label
                key={method.value}
                className="flex min-h-11 items-center gap-2 rounded-lg border border-brand-soft px-3 text-sm text-brand-black/75"
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={method.value}
                  checked={formData.preferredContactMethod === method.value}
                  onChange={() => updateField('preferredContactMethod', method.value as CustomInquiryContactMethod)}
                  className="accent-brand-gold"
                />
                {method.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }

  function renderWeddingStep() {
    const fields = labels.steps[1].fields

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-navy sm:col-span-2">
          <FieldLabel required>{fields.coupleNames}</FieldLabel>
          <input
            value={formData.coupleNames}
            onChange={(event) => updateField('coupleNames', event.target.value)}
            required
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {fields.weddingDate}
          <input
            type="date"
            value={formData.weddingDate}
            onChange={(event) => updateField('weddingDate', event.target.value)}
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {fields.location}
          <input
            value={formData.location}
            onChange={(event) => updateField('location', event.target.value)}
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy sm:col-span-2">
          {fields.guestCountRange}
          <select
            value={formData.guestCountRange}
            onChange={(event) => updateField('guestCountRange', event.target.value)}
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="">{labels.emptyValue}</option>
            {labels.guestCountRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
      </div>
    )
  }

  function renderNeedsStep() {
    const fields = labels.steps[2].fields

    return (
      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold text-brand-navy">
          <FieldLabel required>{fields.requestedFeatures}</FieldLabel>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {labels.featureOptions.map((feature) => (
            <label
              key={feature.value}
              className="flex min-h-11 items-center gap-2 rounded-lg border border-brand-soft px-3 text-sm text-brand-black/75"
            >
              <input
                type="checkbox"
                checked={formData.requestedFeatures.includes(feature.value)}
                onChange={() => updateField('requestedFeatures', toggleValue(formData.requestedFeatures, feature.value))}
                className="accent-brand-gold"
              />
              {feature.label}
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  function renderDesignStep() {
    const fields = labels.steps[3].fields

    return (
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-brand-navy">
            {fields.stylePreference}
            <input
              value={formData.stylePreference}
              onChange={(event) => updateField('stylePreference', event.target.value)}
              className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-brand-navy">
            {fields.palettePreference}
            <input
              value={formData.palettePreference}
              onChange={(event) => updateField('palettePreference', event.target.value)}
              className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </label>
        </div>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-brand-navy">
            <FieldLabel required>{fields.languageSupport}</FieldLabel>
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {labels.languageOptions.map((language) => (
              <label
                key={language.value}
                className="flex min-h-11 items-center gap-2 rounded-lg border border-brand-soft px-3 text-sm text-brand-black/75"
              >
                <input
                  type="checkbox"
                  checked={formData.languageSupport.includes(language.value)}
                  onChange={() => updateField('languageSupport', toggleValue(formData.languageSupport, language.value))}
                  className="accent-brand-gold"
                />
                {language.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {fields.notes}
          <textarea
            value={formData.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            rows={5}
            className="rounded-lg border border-brand-soft px-3 py-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>
      </div>
    )
  }

  function renderBudgetStep() {
    const fields = labels.steps[4].fields

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          <FieldLabel required>{fields.budgetRange}</FieldLabel>
          <select
            value={formData.budgetRange}
            onChange={(event) => updateField('budgetRange', event.target.value)}
            required
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="">{labels.emptyValue}</option>
            {labels.budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-brand-navy">
          {fields.desiredLaunchDate}
          <input
            type="date"
            value={formData.desiredLaunchDate}
            onChange={(event) => updateField('desiredLaunchDate', event.target.value)}
            className="min-h-11 rounded-lg border border-brand-soft px-3 text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </label>
      </div>
    )
  }

  function renderReviewItem(label: string, value: string | string[]) {
    const displayValue = Array.isArray(value) ? value.join(', ') : value

    return (
      <div className="rounded-lg border border-brand-soft p-4">
        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-black/50">{label}</dt>
        <dd className="mt-2 text-sm leading-6 text-brand-black/75">{displayValue || labels.emptyValue}</dd>
      </div>
    )
  }

  function renderReviewStep() {
    return (
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-brand-navy">{labels.reviewTitle}</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {renderReviewItem(labelText(labels.steps[0].fields.customerName), formData.customerName)}
          {renderReviewItem(labelText(labels.steps[0].fields.customerEmail), formData.customerEmail)}
          {renderReviewItem(
            labelText(labels.steps[0].fields.preferredContactMethod),
            getContactMethodLabel(labels.contactMethods, formData.preferredContactMethod),
          )}
          {renderReviewItem(labelText(labels.steps[1].fields.coupleNames), formData.coupleNames)}
          {renderReviewItem(labelText(labels.steps[1].fields.weddingDate), formData.weddingDate)}
          {renderReviewItem(labelText(labels.steps[1].fields.location), formData.location)}
          {renderReviewItem(
            labelText(labels.steps[1].fields.guestCountRange),
            getOptionLabel(labels.guestCountRanges, formData.guestCountRange, labels.emptyValue),
          )}
          {renderReviewItem(labelText(labels.steps[2].fields.requestedFeatures), selectedFeatureLabels)}
          {renderReviewItem(labelText(labels.steps[3].fields.stylePreference), formData.stylePreference)}
          {renderReviewItem(labelText(labels.steps[3].fields.palettePreference), formData.palettePreference)}
          {renderReviewItem(
            labelText(labels.steps[3].fields.languageSupport),
            getLanguageLabels(labels.languageOptions, formData.languageSupport),
          )}
          {renderReviewItem(
            labelText(labels.steps[4].fields.budgetRange),
            getOptionLabel(labels.budgetRanges, formData.budgetRange, labels.emptyValue),
          )}
          {renderReviewItem(labelText(labels.steps[4].fields.desiredLaunchDate), formData.desiredLaunchDate)}
          {renderReviewItem(labelText(labels.steps[3].fields.notes), formData.notes)}
        </dl>
      </div>
    )
  }

  function renderStepContent() {
    if (activeStep === 0) {
      return renderContactStep()
    }

    if (activeStep === 1) {
      return renderWeddingStep()
    }

    if (activeStep === 2) {
      return renderNeedsStep()
    }

    if (activeStep === 3) {
      return renderDesignStep()
    }

    if (activeStep === 4) {
      return renderBudgetStep()
    }

    return renderReviewStep()
  }

  function renderWizard(user: User) {
    if (submitted) {
      return (
        <section className="rounded-lg border border-brand-soft bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">{labels.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-navy">{labels.successTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-black/70">{labels.successText}</p>
          <Link
            to={getLocalizedRoute(locale, 'catalog')}
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          >
            {labels.returnCatalogAction}
          </Link>
        </section>
      )
    }

    return (
      <form className="rounded-lg border border-brand-soft bg-white p-5 sm:p-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 border-b border-brand-soft pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">{progressLabel}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-navy">
              {activeStepLabels?.title ?? labels.reviewTitle}
            </h2>
            {activeStepLabels ? (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-black/70">{activeStepLabels.description}</p>
            ) : null}
            <p className="mt-2 text-xs font-semibold text-brand-black/50">{labels.requiredNote}</p>
          </div>

          <p className="rounded-lg border border-brand-soft px-3 py-2 text-sm text-brand-black/60">
            {user.email ?? formData.customerEmail}
          </p>
        </div>

        <div className="mt-6">{renderStepContent()}</div>

        {error ? (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => {
              setActiveStep((current) => Math.max(current - 1, 0))
              setError(null)
            }}
            disabled={activeStep === 0 || submitting}
            className="min-h-11 rounded-lg border border-brand-soft px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {labels.previousAction}
          </button>

          {activeStep < reviewStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="min-h-11 rounded-lg bg-brand-navy px-5 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            >
              {labels.nextAction}
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="min-h-11 rounded-lg bg-brand-navy px-5 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? labels.submittingAction : labels.submitAction}
            </button>
          )}
        </div>
      </form>
    )
  }

  function renderContent() {
    if (authState.loading) {
      return <ProfileNotice message={labels.loadingMessage} />
    }

    if (authState.error) {
      return <ProfileNotice title={labels.errorTitle} message={authState.error} tone="error" />
    }

    if (!authState.user) {
      return renderAuthPanel()
    }

    return renderWizard(authState.user)
  }

  return (
    <section className="bg-brand-soft/25">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionHeader eyebrow={labels.eyebrow} title={labels.headline} text={labels.intro} />
        <div className="mt-8">{renderContent()}</div>
      </div>
    </section>
  )
}

export default CustomWebsite

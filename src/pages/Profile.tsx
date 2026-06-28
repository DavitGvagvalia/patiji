import { Link } from 'react-router-dom'
import { AuthPanel } from '../components/profile/AuthPanel'
import { GuestAnswersList } from '../components/profile/GuestAnswersList'
import { ProfileNotice } from '../components/profile/ProfileNotice'
import { ProfileSummary } from '../components/profile/ProfileSummary'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useAuthUser } from '../features/auth/useAuthUser'
import { useProfileData } from '../features/profile/useProfileData'
import { usePageSeo } from '../lib/seo'
import { getLocalizedRoute } from '../routes/routes'
import type { Locale, SiteContent } from '../types/i18n'

interface ProfileProps {
  content: SiteContent
  locale: Locale
}

const Profile = ({ content, locale }: ProfileProps) => {
  const authState = useAuthUser()
  const profileState = useProfileData(authState.user)

  usePageSeo(content.metadata.profile, locale)

  function renderProfileContent() {
    if (authState.loading) {
      return <ProfileNotice message={content.profile.loadingMessage} />
    }

    if (authState.error) {
      return <ProfileNotice title={content.profile.errorTitle} message={authState.error} tone="error" />
    }

    if (!authState.user) {
      return (
        <AuthPanel
          labels={{
            title: content.profile.signedOutTitle,
            text: content.profile.signedOutText,
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

    if (profileState.loading) {
      return <ProfileNotice message={content.profile.loadingMessage} />
    }

    if (profileState.error) {
      return <ProfileNotice title={content.profile.errorTitle} message={profileState.error} tone="error" />
    }

    if (!profileState.customer || !profileState.invitation) {
      return (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => void import('../features/auth/authService').then(({ signOutCurrentUser }) => signOutCurrentUser())}
              className="min-h-11 rounded-lg border border-brand-soft bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              {content.profile.signOutAction}
            </button>
          </div>
          <ProfileNotice title={content.profile.noInvitationTitle} message={content.profile.noInvitationText} />
          <div className="flex">
            <Link
              to={getLocalizedRoute(locale, 'catalog')}
              className="min-h-11 rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            >
              {content.profile.browseCatalogAction}
            </Link>
          </div>
        </>
      )
    }

    return (
      <>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => void import('../features/auth/authService').then(({ signOutCurrentUser }) => signOutCurrentUser())}
            className="min-h-11 rounded-lg border border-brand-soft bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            {content.profile.signOutAction}
          </button>
        </div>
        <ProfileSummary
          customer={profileState.customer}
          invitation={profileState.invitation}
          labels={{
            accountTitle: content.profile.accountTitle,
            purchaseTitle: content.profile.purchaseTitle,
            nameLabel: content.profile.nameLabel,
            emailLabel: content.profile.emailLabel,
            invitationUrlLabel: content.profile.invitationUrlLabel,
            templateLabel: content.profile.templateLabel,
            statusLabel: content.profile.statusLabel,
            weddingDateLabel: content.profile.weddingDateLabel,
          }}
        />
        <GuestAnswersList
          answers={profileState.answers}
          title={content.profile.answersTitle}
          emptyMessage={content.profile.emptyAnswers}
        />
      </>
    )
  }

  return (
    <section className="bg-brand-soft/25">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={content.profile.eyebrow} title={content.profile.headline} text={content.profile.intro} />
        <div className="mt-8 grid gap-6">
          {renderProfileContent()}
        </div>
      </div>
    </section>
  )
}

export default Profile

import type { WeddingTemplate } from '../types/catalog'
import type { CustomerProfile, GuestAnswer, PurchasedInvitation } from '../types/profile'

export const siteContent = {
  brandName: 'Patiji',
  nav: {
    home: 'Home',
    catalog: 'Catalog',
    profile: 'Profile',
  },
  footer:
    'Luxury wedding invitation website templates created for couples who value beauty, clarity, and ease.',
  metadata: {
    home: {
      title: 'Patiji | Luxury Wedding Invitation Website Templates',
      description:
        'Patiji.ge offers premium wedding invitation website templates for couples who want an elegant, romantic, and modern digital invitation experience.',
      path: '/',
    },
    catalog: {
      title: 'Wedding Website Template Catalog | Patiji',
      description:
        'Browse luxury wedding website templates by style, color palette, layout, price, and language support.',
      path: '/catalog',
    },
    profile: {
      title: 'Customer Profile and RSVP Answers | Patiji',
      description:
        'View your purchased wedding invitation website template and guest RSVP answers in a clean customer profile.',
      path: '/profile',
    },
  },
  home: {
    eyebrow: 'Digital wedding invitations',
    headline: 'Luxury wedding invitation websites for celebrations with presence.',
    intro:
      'Patiji helps couples launch elegant wedding invitation websites with RSVP collection, refined layouts, and a premium guest experience.',
    primaryCta: 'Browse templates',
    secondaryCta: 'View profile preview',
    previewLabel: 'Featured template',
    valueTitle: 'Designed for a wedding experience, not a generic page builder.',
    valueCopy:
      'Every template is built around the flow couples need: a beautiful invitation, clear event details, effortless RSVP responses, and a profile area where guest answers stay organized.',
    benefitsTitle: 'A polished foundation for modern invitations',
    benefits: [
      {
        title: 'Elegant first impression',
        text: 'Premium typography, disciplined spacing, and wedding-focused layouts help the invitation feel intentional from the first view.',
      },
      {
        title: 'RSVP-ready structure',
        text: 'The product direction keeps guest answers connected to the purchased invitation, ready for Firebase-backed storage in a later phase.',
      },
      {
        title: 'International from the start',
        text: 'Page labels and catalog content are centralized so English, Georgian, and Russian content can be added without rewriting components.',
      },
    ],
    stepsTitle: 'How it works',
    steps: [
      'Choose a wedding invitation website template.',
      'Purchase once and connect it to your account.',
      'Share the invitation link with guests.',
      'Review RSVP answers from your profile page.',
    ],
  },
  catalog: {
    eyebrow: 'Template catalog',
    headline: 'Find the invitation style that matches the celebration.',
    intro:
      'Browse wedding website templates by style, color palette, layout, and language support. Payment and live previews will be connected in later phases.',
    filterLabel: 'Catalog filters',
    styleLabel: 'Style',
    paletteLabel: 'Color palette',
    allStyles: 'All styles',
    allPalettes: 'All palettes',
    previewAction: 'Preview',
    selectAction: 'Select',
    checkoutLoadingAction: 'Preparing checkout...',
    checkoutRedirectingMessage: 'Redirecting to secure checkout...',
    checkoutNotConfiguredMessage:
      'Checkout is not configured yet. Payment must be connected through a trusted server endpoint before purchases can be completed.',
    checkoutErrorMessage:
      'Checkout could not be started. Please try again later.',
    loadingMessage: 'Loading templates...',
    fallbackMessage:
      'Showing curated templates while live catalog data is unavailable.',
    noResults: 'No templates match these filters yet.',
  },
  profile: {
    eyebrow: 'Customer profile',
    headline: 'Your invitation and guest answers in one quiet workspace.',
    intro:
      'This phase shows the intended profile structure. Authentication, Firestore reads, and protected customer data will be added after Firebase is configured.',
    loadingMessage: 'Loading your profile...',
    signedOutTitle: 'Sign in to view your invitation profile',
    signedOutText:
      'Use the account connected to your purchased wedding invitation website to view guest answers and invitation details.',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    displayNameLabel: 'Display name',
    signInAction: 'Sign in',
    googleSignInAction: 'Continue with Google',
    createAccountAction: 'Create account',
    switchToCreate: 'Create a new account',
    switchToSignIn: 'Use an existing account',
    signOutAction: 'Sign out',
    errorTitle: 'Something went wrong',
    noInvitationTitle: 'No purchased invitation yet',
    noInvitationText:
      'After a successful one-time purchase, your invitation website and guest RSVP answers will appear here.',
    accountTitle: 'Account',
    purchaseTitle: 'Purchased invitation',
    answersTitle: 'Guest answers',
    nameLabel: 'Name',
    invitationUrlLabel: 'Invitation URL',
    templateLabel: 'Template',
    statusLabel: 'Status',
    weddingDateLabel: 'Wedding date',
    emptyAnswers: 'No responses yet. When guests submit RSVP answers, they will appear here.',
  },
  invitation: {
    loadingMessage: 'Loading invitation...',
    unavailableTitle: 'Invitation unavailable',
    unavailableText: 'This invitation may be inactive, private, or no longer available.',
    eyebrow: 'Wedding invitation',
    defaultHeadline: 'Together with their families, they invite you to celebrate.',
    rsvpEyebrow: 'RSVP',
    rsvpTitle: 'Guest details',
    guestNameLabel: 'Full name',
    attendingLabel: 'Will you attend?',
    attendingYes: 'Yes, I will attend',
    attendingNo: 'No, I cannot attend',
    partySizeLabel: 'Number of guests',
    messageLabel: 'Message',
    submitAction: 'Send RSVP',
    submittingAction: 'Sending...',
    successMessage: 'Thank you. Your RSVP has been sent.',
    errorMessage: 'Your RSVP could not be sent. Please try again.',
    venueLabel: 'Venue',
    dateLabel: 'Date',
  },
}

export const weddingTemplates: WeddingTemplate[] = [
  {
    id: 'velvet-garden',
    name: 'Velvet Garden',
    slug: 'velvet-garden',
    price: 149,
    currency: 'USD',
    style: 'garden',
    palette: 'sage',
    layout: 'story-led',
    languageSupport: ['English', 'Georgian', 'Russian'],
    isPopular: true,
    description:
      'A romantic garden-led template with graceful sections for ceremony details, story, schedule, and RSVP.',
    tags: ['Garden', 'Romantic', 'Story'],
  },
  {
    id: 'black-tie',
    name: 'Black Tie',
    slug: 'black-tie',
    price: 179,
    currency: 'USD',
    style: 'classic',
    palette: 'navy',
    layout: 'one-page',
    languageSupport: ['English', 'Georgian'],
    description:
      'A refined one-page invitation for formal weddings, with strong contrast and clear guest information.',
    tags: ['Classic', 'Formal', 'One-page'],
  },
  {
    id: 'atelier-minimal',
    name: 'Atelier Minimal',
    slug: 'atelier-minimal',
    price: 129,
    currency: 'USD',
    style: 'minimal',
    palette: 'ivory',
    layout: 'gallery-led',
    languageSupport: ['English', 'Russian'],
    isNew: true,
    description:
      'A calm editorial template with spacious image moments, concise details, and a simple RSVP path.',
    tags: ['Minimal', 'Editorial', 'Gallery'],
  },
]

export const sampleCustomer: CustomerProfile = {
  displayName: 'Nino & Daniel',
  email: 'customer@example.com',
  invitationUrl: 'patiji.ge/i/nino-daniel',
}

export const sampleInvitation: PurchasedInvitation = {
  templateName: 'Velvet Garden',
  status: 'active',
  weddingDate: '2026-09-12',
  guestCount: 0,
}

export const sampleGuestAnswers: GuestAnswer[] = []

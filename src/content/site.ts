import type { WeddingTemplate } from '../types/catalog'
import type { CustomerProfile, GuestAnswer, PurchasedInvitation } from '../types/profile'

export const siteContent = {
  brandName: 'dapatije',
  nav: {
    home: 'Home',
    catalog: 'Catalog',
    profile: 'Profile',
  },
  footer:
    'Luxury wedding invitation website templates created for couples who value beauty, clarity, and ease.',
  metadata: {
    home: {
      title: 'dapatije | Luxury Wedding Invitation Website Templates',
      description:
        'dapatije.ge offers premium wedding invitation website templates for couples who want an elegant, romantic, and modern digital invitation experience.',
      path: '/',
    },
    catalog: {
      title: 'Wedding Website Template Catalog | dapatije',
      description:
        'Browse luxury wedding website templates by style, color palette, layout, price, and language support.',
      path: '/catalog',
    },
    customWebsite: {
      title: 'Custom Wedding Website Inquiry | dapatije',
      description:
        'Tell dapatije what you need from a custom wedding invitation website and submit a private project inquiry.',
      path: '/custom-website',
    },
    profile: {
      title: 'Customer Profile and RSVP Answers | dapatije',
      description:
        'View your purchased wedding invitation website template and guest RSVP answers in a clean customer profile.',
      path: '/profile',
    },
  },
  home: {
    eyebrow: 'Digital wedding invitations',
    headline: 'Luxury wedding invitation websites for celebrations with presence.',
    intro:
      'dapatije helps couples launch elegant wedding invitation websites with RSVP collection, refined layouts, and a premium guest experience.',
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
    noResultsSuggestion: 'Clear filters to see all available invitation templates.',
    resetFiltersAction: 'Reset filters',
    customWebsite: {
      eyebrow: 'Custom website',
      title: 'A wedding website designed around your celebration.',
      description:
        'Share your vision, guest needs, languages, budget, and timeline. We will review the details and respond within 24 hours.',
      priceLabel: 'Custom quote',
      action: 'Start questionnaire',
      features: ['Tailored design direction', 'RSVP and guest details', 'Multilingual experience'],
    },
  },
  customWebsite: {
    eyebrow: 'Custom website inquiry',
    headline: 'Tell us what your wedding website should become.',
    intro:
      'This guided questionnaire helps us understand your celebration, design preferences, must-have sections, budget, and launch timeline.',
    signedOutTitle: 'Sign in to request a custom website',
    signedOutText:
      'Create or use the account that should own this custom wedding website inquiry. After sign-in, the questionnaire will stay on this page.',
    loadingMessage: 'Loading your account...',
    errorTitle: 'Something went wrong',
    stepLabel: 'Step',
    previousAction: 'Back',
    nextAction: 'Continue',
    submitAction: 'Submit inquiry',
    submittingAction: 'Submitting...',
    requiredNote: 'Required fields are marked with an asterisk.',
    successTitle: 'Your custom website inquiry has been sent.',
    successText:
      'Thank you. We will review the details and respond within 24 hours using your preferred contact method.',
    returnCatalogAction: 'Return to catalog',
    submitErrorMessage: 'The inquiry could not be submitted. Please check the details and try again.',
    reviewTitle: 'Review your inquiry',
    emptyValue: 'Not specified',
    optionalDetailsNote: 'If you do not know these details yet, leave them blank and we can confirm them later.',
    launchDateOptionalNote: 'The delivery timing can be confirmed later if you are not ready to choose a date.',
    defaultLanguageNote: 'English is included by default. Add Georgian or Russian only if you want extra language versions.',
    contactMethods: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'whatsapp', label: 'WhatsApp' },
    ],
    guestCountRanges: ['Under 50', '50-100', '100-200', '200+'],
    budgetRanges: ['$500-$1,000', '$1,000-$2,500', '$2,500-$5,000', '$5,000+'],
    featureOptions: [
      { value: 'rsvp', label: 'RSVP collection' },
      { value: 'schedule', label: 'Wedding schedule' },
      { value: 'venue-map', label: 'Venue and map' },
      { value: 'gallery', label: 'Photo gallery' },
      { value: 'multilingual', label: 'Multilingual content' },
      { value: 'story', label: 'Couple story' },
      { value: 'registry', label: 'Registry or gift details' },
    ],
    styleOptions: [
      { value: 'classic', label: 'Classic' },
      { value: 'editorial', label: 'Editorial' },
      { value: 'garden', label: 'Garden' },
      { value: 'minimal', label: 'Minimal' },
    ],
    paletteOptions: [
      { value: 'ivory', label: 'Ivory' },
      { value: 'navy', label: 'Navy' },
      { value: 'gold', label: 'Gold' },
      { value: 'sage', label: 'Sage' },
    ],
    languageOptions: [
      { value: 'English', label: 'English' },
      { value: 'Georgian', label: 'Georgian' },
      { value: 'Russian', label: 'Russian' },
    ],
    steps: [
      {
        title: 'Contact',
        description: 'Confirm who we should contact about the custom website.',
        fields: {
          partnerOneName: 'First partner name',
          partnerTwoName: 'Second partner name',
          customerName: 'Your name',
          customerEmail: 'Email',
          preferredContactMethod: 'Preferred contact method',
        },
      },
      {
        title: 'Wedding basics',
        description: 'Share any celebration details you already know.',
        fields: {
          coupleNames: 'Couple names',
          weddingDate: 'Wedding date',
          location: 'City and country',
          guestCountRange: 'Approximate guest count',
        },
      },
      {
        title: 'Website needs',
        description: 'Choose the sections and functions your guests will need.',
        fields: {
          requestedFeatures: 'Requested features',
        },
      },
      {
        title: 'Design direction',
        description: 'Describe the visual mood and language needs.',
        fields: {
          stylePreference: 'Style preference',
          palettePreference: 'Color palette',
          languageSupport: 'Website languages',
          notes: 'Inspiration or notes',
        },
      },
      {
        title: 'Budget and timeline',
        description: 'Help us understand the project size and delivery expectation.',
        fields: {
          budgetRange: 'Budget range',
          desiredLaunchDate: 'Desired launch date',
        },
      },
    ],
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
    browseCatalogAction: 'Browse templates',
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
    returnHomeAction: 'Return to dapatije',
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
  invitationUrl: 'dapatije.ge/i/nino-daniel',
}

export const sampleInvitation: PurchasedInvitation = {
  templateName: 'Velvet Garden',
  status: 'active',
  weddingDate: '2026-09-12',
  guestCount: 0,
}

export const sampleGuestAnswers: GuestAnswer[] = []

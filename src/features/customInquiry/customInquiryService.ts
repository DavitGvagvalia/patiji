import type { User } from 'firebase/auth'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { getFirebaseClient } from '../../firebase/client'
import { customInquiriesCollection } from '../../firebase/collections'
import type { CustomInquiryFormData } from '../../types/customInquiry'

function optionalText(value: string) {
  const trimmed = value.trim()

  return trimmed === '' ? undefined : trimmed
}

export async function createCustomInquiry(user: User, formData: CustomInquiryFormData) {
  const { db } = getFirebaseClient()
  const coupleNames = `${formData.partnerOneName.trim()} & ${formData.partnerTwoName.trim()}`
  const weddingDate = optionalText(formData.weddingDate)
  const location = optionalText(formData.location)
  const guestCountRange = optionalText(formData.guestCountRange)
  const stylePreference = optionalText(formData.stylePreference)
  const palettePreference = optionalText(formData.palettePreference)
  const desiredLaunchDate = optionalText(formData.desiredLaunchDate)
  const notes = optionalText(formData.notes)

  return addDoc(customInquiriesCollection(db), {
    userId: user.uid,
    customerName: formData.customerName.trim(),
    customerEmail: formData.customerEmail.trim(),
    preferredContactMethod: formData.preferredContactMethod,
    coupleNames,
    ...(weddingDate ? { weddingDate } : {}),
    ...(location ? { location } : {}),
    ...(guestCountRange ? { guestCountRange } : {}),
    requestedFeatures: formData.requestedFeatures,
    ...(stylePreference ? { stylePreference } : {}),
    ...(palettePreference ? { palettePreference } : {}),
    languageSupport: formData.languageSupport,
    budgetRange: formData.budgetRange,
    ...(desiredLaunchDate ? { desiredLaunchDate } : {}),
    ...(notes ? { notes } : {}),
    status: 'submitted',
    source: 'catalog-custom-website',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

import { getDocs, query, where } from 'firebase/firestore'
import { getFirebaseClient } from '../../firebase/client'
import { productsCollection } from '../../firebase/collections'
import type { WeddingTemplate } from '../../types/catalog'
import type { FirestoreProduct } from '../../types/firestore'

function mapProductToTemplate(id: string, product: FirestoreProduct): WeddingTemplate {
  return {
    id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    currency: product.currency,
    style: product.style,
    palette: product.palette,
    layout: product.layout,
    languageSupport: product.languageSupport,
    description: product.description,
    tags: product.tags,
    isPopular: product.isPopular,
    isNew: product.isNew,
  }
}

export async function listActiveProducts(): Promise<WeddingTemplate[]> {
  const { db } = getFirebaseClient()
  const activeProductsQuery = query(productsCollection(db), where('isActive', '==', true))
  const snapshot = await getDocs(activeProductsQuery)

  return snapshot.docs.map((product) => mapProductToTemplate(product.id, product.data()))
}

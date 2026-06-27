import { useEffect, useState } from 'react'
import type { WeddingTemplate } from '../../types/catalog'

interface CatalogTemplatesState {
  templates: WeddingTemplate[]
  loading: boolean
  usingFallback: boolean
  error: string | null
}

export function useCatalogTemplates(fallbackTemplates: WeddingTemplate[]): CatalogTemplatesState {
  const [state, setState] = useState<CatalogTemplatesState>({
    templates: fallbackTemplates,
    loading: true,
    usingFallback: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadTemplates() {
      setState((current) => ({ ...current, loading: true, error: null }))

      try {
        const { listActiveProducts } = await import('./catalogService')
        const liveTemplates = await listActiveProducts()

        if (!isMounted) {
          return
        }

        setState({
          templates: liveTemplates.length > 0 ? liveTemplates : fallbackTemplates,
          loading: false,
          usingFallback: liveTemplates.length === 0,
          error: null,
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setState({
          templates: fallbackTemplates,
          loading: false,
          usingFallback: true,
          error: error instanceof Error ? error.message : 'Unable to load live catalog data.',
        })
      }
    }

    void loadTemplates()

    return () => {
      isMounted = false
    }
  }, [fallbackTemplates])

  return state
}

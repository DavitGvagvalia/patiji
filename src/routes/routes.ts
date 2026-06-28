export const routes = {
  home: '/',
  catalog: '/catalog',
  customWebsite: '/custom-website',
  profile: '/profile',
} as const

export type RouteKey = keyof typeof routes

export function getLocalizedRoute(locale: string, routeKey: RouteKey) {
  const path = routes[routeKey]

  return locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`
}

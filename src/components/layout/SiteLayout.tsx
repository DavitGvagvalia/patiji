import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { weddingTemplates } from '../../content/site'
import { dictionaries } from '../../i18n/dictionaries'
import { defaultLocale, getLocaleFromPath, isLocale, localeLabels, supportedLocales } from '../../i18n/locales'
import { getLocalizedRoute, routes, type RouteKey } from '../../routes/routes'
import type { Locale, PageKey } from '../../types/i18n'

const Home = lazy(() => import('../../pages/Home'))
const Catalog = lazy(() => import('../../pages/Catalog'))
const Profile = lazy(() => import('../../pages/Profile'))

function getCurrentRouteKey(pathname: string): RouteKey {
  const segments = pathname.split('/').filter(Boolean)
  const pathSegments = isLocale(segments[0]) ? segments.slice(1) : segments
  const firstSegment = pathSegments[0]

  if (firstSegment === 'catalog') {
    return 'catalog'
  }

  if (firstSegment === 'profile') {
    return 'profile'
  }

  return 'home'
}

function renderPage(locale: Locale, pageKey: PageKey) {
  const content = dictionaries[locale]

  if (pageKey === 'catalog') {
    return <Catalog content={content} locale={locale} templates={weddingTemplates} />
  }

  if (pageKey === 'profile') {
    return <Profile content={content} locale={locale} />
  }

  return <Home content={content} locale={locale} templates={weddingTemplates} />
}

function LocalizedPage({ pageKey }: { pageKey: PageKey }) {
  const { locale } = useParams()

  if (!isLocale(locale)) {
    return <Navigate to={routes[pageKey]} replace />
  }

  return renderPage(locale, pageKey)
}

function SiteChrome() {
  const location = useLocation()
  const activeLocale = getLocaleFromPath(location.pathname)
  const content = dictionaries[activeLocale]
  const activeRouteKey = getCurrentRouteKey(location.pathname)
  const navItems = [
    { label: content.nav.home, path: getLocalizedRoute(activeLocale, 'home') },
    { label: content.nav.catalog, path: getLocalizedRoute(activeLocale, 'catalog') },
    { label: content.nav.profile, path: getLocalizedRoute(activeLocale, 'profile') },
  ]

  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <header className="sticky top-0 z-20 border-b border-brand-soft bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to={getLocalizedRoute(activeLocale, 'home')} className="text-xl font-semibold tracking-tight text-brand-navy">
            {content.brandName}
          </Link>
          <div className="flex items-center gap-3">
            <nav aria-label="Primary navigation" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-black/65 sm:gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
                      isActive ? 'bg-brand-navy text-brand-white' : 'hover:bg-brand-soft/70 hover:text-brand-navy'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <nav aria-label="Language switcher" className="flex items-center gap-1 border-l border-brand-soft pl-3 text-xs font-semibold">
              {supportedLocales.map((locale) => (
                <Link
                  key={locale}
                  to={getLocalizedRoute(locale, activeRouteKey)}
                  lang={locale}
                  className={`rounded-lg px-2.5 py-2 transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${
                    locale === activeLocale ? 'bg-brand-gold/20 text-brand-navy' : 'text-brand-black/60 hover:bg-brand-soft/70'
                  }`}
                >
                  {localeLabels[locale]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm text-brand-black/70 sm:px-6 lg:px-8">{content.profile.loadingMessage}</div>}>
          <Routes>
            <Route path={routes.home} element={renderPage(defaultLocale, 'home')} />
            <Route path={routes.catalog} element={renderPage(defaultLocale, 'catalog')} />
            <Route path={routes.profile} element={renderPage(defaultLocale, 'profile')} />
            <Route path="/:locale" element={<LocalizedPage pageKey="home" />} />
            <Route path="/:locale/catalog" element={<LocalizedPage pageKey="catalog" />} />
            <Route path="/:locale/profile" element={<LocalizedPage pageKey="profile" />} />
            <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="border-t border-brand-soft bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-brand-black/60 sm:px-6 lg:px-8">
          <p className="font-semibold text-brand-navy">{content.brandName}</p>
          <p>{content.footer}</p>
        </div>
      </footer>
    </div>
  )
}

export function SiteLayout() {
  return (
    <BrowserRouter>
      <SiteChrome />
    </BrowserRouter>
  )
}

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

// Lazy load App component for better initial load time
const App = lazy(() => import('./App.jsx'))

// Lazy load analytics components with error fallback
const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react')
    .then(module => ({ default: module.SpeedInsights }))
    .catch(error => {
      console.warn('Speed Insights failed to load:', error)
      return { default: () => null }
    })
)

const Analytics = lazy(() =>
  import('@vercel/analytics/react')
    .then(module => ({ default: module.Analytics }))
    .catch(error => {
      console.warn('Analytics failed to load:', error)
      return { default: () => null }
    })
)

// Debug log in development
if (import.meta.env.DEV) {
  console.log('🔧 GitHub API debugging enabled. Check console for detailed feedback submission logs.')
}

// Analytics filter
const beforeSend = (event) => {
  if (event.url.includes('/algorithms/test')) return null
  const url = new URL(event.url)
  if (url.searchParams.has('token')) {
    url.searchParams.set('token', '[REDACTED]')
  }
  return { ...event, url: url.toString() }
}

const shouldRenderAnalytics = !document.documentElement.hasAttribute('data-prerender')
const LoadingFallback = () => <div className="min-h-screen bg-slate-950"></div>

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/algorithms/config/:algorithmName" element={<App />} />
              <Route path="/algorithms/details/:algorithmName" element={<App />} />
              <Route path="/algorithms/metrics/:algorithmName" element={<App />} />
              <Route path="/algorithms/:algorithmName" element={<App />} />
              <Route path="/contributions/overview" element={<App />} />
              <Route path="/contributions/guide" element={<App />} />
              <Route path="/contributions/ssoc" element={<App />} />
              <Route path="/contributions" element={<App />} />
              <Route path="*" element={<App />} />
            </Routes>
          </Suspense>
          {shouldRenderAnalytics && (
            <Suspense fallback={null}>
              <SpeedInsights debug={import.meta.env.DEV} />
              <Analytics beforeSend={beforeSend} />
            </Suspense>
          )}
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
}

// Use requestIdleCallback if supported
if ('requestIdleCallback' in window) {
  requestIdleCallback(renderApp, { timeout: 100 })
} else {
  renderApp()
}

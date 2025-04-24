import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Lazy load analytics components
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(module => ({ default: module.SpeedInsights })))
const Analytics = lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })))

// Custom event handler for analytics
const beforeSend = (event) => {
  // Ignore events from algorithm testing pages
  if (event.url.includes('/algorithms/test')) {
    return null;
  }
  
  // Redact sensitive data from URLs
  const url = new URL(event.url);
  if (url.searchParams.has('token')) {
    url.searchParams.set('token', '[REDACTED]');
  }
  
  return {
    ...event,
    url: url.toString()
  };
};

// Render analytics if not a prerender
const shouldRenderAnalytics = !document.documentElement.hasAttribute('data-prerender');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
      {shouldRenderAnalytics && (
        <Suspense fallback={null}>
          <SpeedInsights />
          <Analytics beforeSend={beforeSend} />
        </Suspense>
      )}
    </HelmetProvider>
  </React.StrictMode>
)

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

// Check if we're in development mode
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

// Render only in production and if not a prerender
const shouldRenderAnalytics = !isDevelopment && !document.documentElement.hasAttribute('data-prerender');

// Silent mode for development
if (isDevelopment) {
  // Override console methods to reduce noise in development
  const originalConsoleError = console.error;
  const originalConsoleLog = console.log;
  
  // Only show errors related to React/Application issues, not debugging statements
  console.error = function(...args) {
    if (args[0] && typeof args[0] === 'string' && 
        (args[0].includes('[SORTVISION') || 
         args[0].includes('DebugLogger'))) {
      // Silent mode for debug messages
      return;
    }
    originalConsoleError.apply(console, args);
  };
  
  console.log = function(...args) {
    if (args[0] && typeof args[0] === 'string' && 
        (args[0].includes('[SORTVISION') || 
         args[0].includes('DebugLogger'))) {
      // Silent mode for debug messages
      return;
    }
    originalConsoleLog.apply(console, args);
  };
}

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

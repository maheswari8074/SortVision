import React, { lazy, Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Debug logging for Vercel
console.error("MAIN.JSX LOADED - " + new Date().toISOString());
console.error("URL: " + window.location.href);
console.error("Search params: " + window.location.search);

// Create a debug component that will log and show information
const DebugLogger = () => {
  useEffect(() => {
    console.error("DebugLogger component mounted - " + new Date().toISOString());
    
    // Try to log to an error endpoint to generate visible logs in Vercel
    fetch('/api/error-log?time=' + Date.now())
      .catch(() => console.error("Error log request sent"));
      
    return () => {
      console.error("DebugLogger component unmounted");
    };
  }, []);
  
  return null; // No visible UI, just for logging
};

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <DebugLogger />
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

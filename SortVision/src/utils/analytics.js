import ReactGA from 'react-ga4';

// Initialize Google Analytics 4 with your measurement ID
// Replace 'G-XXXXXXXXX' with your actual Google Analytics measurement ID
export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
  
  // Also send via gtag if available
  if (window.gtag) {
    window.gtag('config', 'G-SZPR3VLNV0', {
      page_path: path
    });
  }
};

// Track events (e.g. button clicks, algorithm selections, etc.)
export const trackEvent = (category, action, label = null, value = null) => {
  // Send via ReactGA4
  ReactGA.event({
    category,
    action,
    label,
    value
  });
  
  // Also send via gtag if available
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track algorithm selection
export const trackAlgorithmSelection = (algorithmName) => {
  trackEvent('Algorithm', 'Select', algorithmName);
};

// Track array size changes
export const trackArraySizeChange = (size) => {
  trackEvent('Settings', 'ArraySize', size.toString());
};

// Track animation speed changes
export const trackSpeedChange = (speed) => {
  trackEvent('Settings', 'Speed', speed.toString());
};

// Track algorithm visualization start
export const trackVisualizationStart = (algorithmName, arraySize) => {
  trackEvent('Visualization', 'Start', algorithmName, arraySize);
};

// Track sort completion
export const trackSortCompletion = (algorithmName, arraySize, duration) => {
  trackEvent('Visualization', 'Complete', algorithmName, Math.round(duration));
}; 
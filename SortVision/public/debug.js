/**
 * Debug script to monitor and log network errors
 */
(function() {
  // Function to log network errors
  function logNetworkErrors() {
    const originalFetch = window.fetch;
    
    // Override fetch to monitor for failures
    window.fetch = function(...args) {
      return originalFetch.apply(this, args)
        .then(response => {
          if (!response.ok) {
            console.error(`Network error: ${response.status} ${response.statusText} for ${args[0]}`);
          }
          return response;
        })
        .catch(error => {
          console.error(`Fetch error for ${args[0]}:`, error);
          throw error;
        });
    };
    
    // Monitor resource loading errors
    window.addEventListener('error', function(e) {
      if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'IMG') {
        console.error(`Resource loading error: ${e.target.src || e.target.href}`);
      }
    }, true);
  }
  
  // Run when page loads
  window.addEventListener('load', logNetworkErrors);
})(); 
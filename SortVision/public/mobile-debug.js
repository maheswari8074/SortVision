/**
 * Mobile Detection Debug Helper
 * 
 * This script provides development tools for testing mobile detection functionality
 * without requiring an actual mobile device. It enables simulation of mobile user agents
 * and provides UI controls for testing mobile-specific features.
 * 
 * Features:
 * - Adds a debug control panel when ?debug=mobile is in the URL
 * - Provides a toggle to simulate a mobile device user agent
 * - Displays a notification when mobile simulation is active
 * - Allows clearing localStorage to reset mobile detection preferences
 * - Shows current viewport width for responsive testing
 * 
 * Usage:
 * This script is automatically loaded in development environments.
 * Add ?debug=mobile to your URL to see the debug controls.
 * Click "Simulate Mobile" to test mobile detection functionality.
 */

(function() {
  function addDebugControls() {
    if (window.location.search.includes('debug=mobile')) {
      const debugPanel = document.createElement('div');
      debugPanel.style.position = 'fixed';
      debugPanel.style.bottom = '10px';
      debugPanel.style.right = '10px';
      debugPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      debugPanel.style.padding = '10px';
      debugPanel.style.borderRadius = '5px';
      debugPanel.style.zIndex = '9999';
      debugPanel.style.fontSize = '12px';
      debugPanel.style.color = 'white';
      debugPanel.style.fontFamily = 'monospace';
      
      debugPanel.innerHTML = `
        <div style="margin-bottom:5px;font-weight:bold;">Mobile Debug</div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <button id="debug-toggle-mobile">Simulate Mobile</button>
          <button id="debug-reset-storage">Clear Local Storage</button>
          <div style="margin-top:5px;font-size:10px;">
            Current width: <span id="debug-width">${window.innerWidth}px</span>
          </div>
        </div>
      `;
      
      document.body.appendChild(debugPanel);
      
      window.addEventListener('resize', () => {
        document.getElementById('debug-width').textContent = `${window.innerWidth}px`;
      });
      
      document.getElementById('debug-toggle-mobile').addEventListener('click', () => {
        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.has('mobile-sim')) {
          currentUrl.searchParams.delete('mobile-sim');
        } else {
          currentUrl.searchParams.set('mobile-sim', 'true');
        }
        window.location.href = currentUrl.toString();
      });
      
      document.getElementById('debug-reset-storage').addEventListener('click', () => {
        localStorage.removeItem('continue-on-mobile');
        alert('Local storage cleared. Reload the page to see the mobile overlay again.');
      });
    }
    
    if (window.location.search.includes('mobile-sim=true')) {
      const simNotice = document.createElement('div');
      simNotice.style.position = 'fixed';
      simNotice.style.top = '0';
      simNotice.style.left = '0';
      simNotice.style.right = '0';
      simNotice.style.padding = '2px';
      simNotice.style.backgroundColor = 'orange';
      simNotice.style.color = 'black';
      simNotice.style.fontSize = '10px';
      simNotice.style.textAlign = 'center';
      simNotice.style.zIndex = '9999';
      simNotice.innerHTML = 'Mobile Device Simulation Active';
      document.body.appendChild(simNotice);
      
      window.isMobileSimulation = true;
      
      Object.defineProperty(Navigator.prototype, 'userAgent', {
        get: function() {
          return 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
        }
      });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDebugControls);
  } else {
    addDebugControls();
  }
})(); 
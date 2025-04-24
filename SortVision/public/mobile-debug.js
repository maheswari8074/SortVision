/**
 * SortVision Mobile Debug Utilities
 * 
 * This script helps debug mobile-specific issues:
 * - Detects touch events
 * - Monitors viewport sizes
 * - Displays device orientation
 * - Tracks interaction issues
 * 
 * It only runs in development or when ?debug=mobile is in URL
 */

(function() {
  // Only run in development or when debug param is set
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';
  const debugRequested = window.location.search.includes('debug=mobile');
  
  if (!isDev && !debugRequested) {
    return; // Exit early in production without debug flag
  }
  
  console.log('📱 Mobile Debug Utilities Loaded');
  
  // Create debug panel
  let panel;
  
  function createDebugPanel() {
    panel = document.createElement('div');
    panel.id = 'mobile-debug-panel';
    panel.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      font-family: monospace;
      font-size: 12px;
      padding: 8px;
      border-bottom-right-radius: 5px;
      z-index: 10001;
      max-width: 100%;
      max-height: 50%;
      overflow: auto;
      user-select: none;
      opacity: 0.8;
      transition: opacity 0.3s;
    `;
    
    panel.innerHTML = `
      <div>📱 <span id="md-device">--</span></div>
      <div>🔍 <span id="md-viewport">--</span></div>
      <div>📏 <span id="md-height">--</span></div>
      <div>🧭 <span id="md-orientation">--</span></div>
      <div>👆 <span id="md-touch">--</span></div>
      <div><button id="md-toggle-button">Hide</button></div>
    `;
    
    // Add to body when DOM is ready
    if (document.body) {
      document.body.appendChild(panel);
      attachPanelListeners();
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(panel);
        attachPanelListeners();
      });
    }
  }
  
  function attachPanelListeners() {
    const toggleBtn = document.getElementById('md-toggle-button');
    
    if (toggleBtn) {
      let minimized = false;
      toggleBtn.addEventListener('click', () => {
        if (minimized) {
          // Expand
          panel.querySelectorAll('div:not(:last-child)').forEach(el => {
            el.style.display = 'block';
          });
          toggleBtn.textContent = 'Hide';
          minimized = false;
        } else {
          // Minimize
          panel.querySelectorAll('div:not(:last-child)').forEach(el => {
            el.style.display = 'none';
          });
          toggleBtn.textContent = 'Show';
          minimized = true;
        }
      });
    }
    
    // Hover effects
    panel.addEventListener('mouseenter', () => {
      panel.style.opacity = '1';
    });
    
    panel.addEventListener('mouseleave', () => {
      panel.style.opacity = '0.8';
    });
  }
  
  // Update device info display
  function updateDeviceInfo() {
    if (!panel) return;
    
    // Device type
    const deviceEl = document.getElementById('md-device');
    if (deviceEl) {
      const ua = navigator.userAgent;
      let deviceType = 'Unknown';
      
      if (/iPhone/.test(ua)) deviceType = 'iPhone';
      else if (/iPad/.test(ua)) deviceType = 'iPad';
      else if (/Android/.test(ua)) {
        deviceType = /Mobile/.test(ua) ? 'Android Phone' : 'Android Tablet';
      }
      else if (/Windows/.test(ua)) deviceType = 'Windows';
      else if (/Macintosh/.test(ua)) deviceType = 'Mac';
      
      deviceEl.textContent = deviceType;
    }
    
    // Viewport dimensions
    const viewportEl = document.getElementById('md-viewport');
    if (viewportEl) {
      const vw = Math.round(window.innerWidth);
      const vh = Math.round(window.innerHeight);
      const vwCss = Math.round(document.documentElement.clientWidth);
      const vhCss = Math.round(document.documentElement.clientHeight);
      
      viewportEl.textContent = `${vw}x${vh} (CSS: ${vwCss}x${vhCss})`;
    }
    
    // CSS height variable
    const heightEl = document.getElementById('md-height');
    if (heightEl) {
      const computedStyle = getComputedStyle(document.documentElement);
      const appHeight = computedStyle.getPropertyValue('--app-height');
      heightEl.textContent = `--app-height: ${appHeight}`;
    }
    
    // Orientation
    const orientationEl = document.getElementById('md-orientation');
    if (orientationEl) {
      let orientation = 'Unknown';
      
      if (window.matchMedia("(orientation: portrait)").matches) {
        orientation = 'Portrait';
      } else if (window.matchMedia("(orientation: landscape)").matches) {
        orientation = 'Landscape';
      }
      
      orientationEl.textContent = orientation;
      
      // Check for orientation classes
      const hasPortraitClass = document.body.classList.contains('portrait');
      const hasLandscapeClass = document.body.classList.contains('landscape');
      
      if ((orientation === 'Portrait' && !hasPortraitClass) || 
          (orientation === 'Landscape' && !hasLandscapeClass)) {
        orientationEl.textContent += ' ⚠️ Class mismatch';
      }
    }
    
    // Touch capability
    const touchEl = document.getElementById('md-touch');
    if (touchEl) {
      const hasTouch = 'ontouchstart' in window;
      const hasTouchClass = document.body.classList.contains('touch-device');
      
      touchEl.textContent = hasTouch ? 'Enabled' : 'Disabled';
      
      if (hasTouch !== hasTouchClass) {
        touchEl.textContent += ' ⚠️ Class mismatch';
      }
    }
  }
  
  // Monitor touch events
  function monitorTouchEvents() {
    const touchTypes = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    
    // Last touch position for tracking
    let lastTouchY = 0;
    
    touchTypes.forEach(type => {
      document.addEventListener(type, e => {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return;
        
        // Track touch position
        if (type === 'touchstart' || type === 'touchmove') {
          lastTouchY = touch.clientY;
        }
        
        // Log specific issues
        if (type === 'touchmove') {
          // Detect potential scroll issues
          const distanceY = Math.abs(touch.clientY - lastTouchY);
          if (distanceY > 30 && e.cancelable && !e.defaultPrevented) {
            console.warn('⚠️ Potential scroll blocking detected', {
              element: e.target,
              cancelable: e.cancelable,
              prevented: e.defaultPrevented
            });
          }
        }
        
        // Update touch info in panel
        const touchEl = document.getElementById('md-touch');
        if (touchEl) {
          const x = Math.round(touch.clientX);
          const y = Math.round(touch.clientY);
          touchEl.textContent = `${type} at ${x},${y}`;
        }
      }, { passive: true });
    });
    
    // Reset touch info when no touches
    document.addEventListener('touchend', () => {
      setTimeout(() => {
        const touchEl = document.getElementById('md-touch');
        if (touchEl && touchEl.textContent.includes('touchend')) {
          touchEl.textContent = 'Waiting for touch...';
        }
      }, 2000);
    }, { passive: true });
  }
  
  // Monitor scroll events
  function monitorScrollEvents() {
    let lastScrollY = window.scrollY;
    let scrollTimer;
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      
      // Check for scroll inconsistencies
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // iOS Safari often reports incorrect scroll position during momentum scroll
      if (Math.abs(delta) > 50) {
        console.info('📜 Large scroll delta detected:', delta);
      }
      
      lastScrollY = currentScrollY;
      
      // Update app height on scroll stop
      scrollTimer = setTimeout(() => {
        const computedStyle = getComputedStyle(document.documentElement);
        const appHeight = computedStyle.getPropertyValue('--app-height');
        const heightEl = document.getElementById('md-height');
        if (heightEl) {
          heightEl.textContent = `--app-height: ${appHeight} (after scroll)`;
        }
      }, 200);
    }, { passive: true });
  }
  
  // Monitor resize and orientation changes
  function monitorViewportChanges() {
    ['resize', 'orientationchange'].forEach(eventType => {
      window.addEventListener(eventType, () => {
        console.info(`📱 ${eventType} event triggered`);
        
        // Update after a short delay to allow iOS to settle
        setTimeout(updateDeviceInfo, 100);
        // Check again after iOS momentum scrolling typically finishes
        setTimeout(updateDeviceInfo, 500);
      }, { passive: true });
    });
  }
  
  // Initialize
  createDebugPanel();
  updateDeviceInfo();
  monitorTouchEvents();
  monitorScrollEvents();
  monitorViewportChanges();
  
  // Update periodically to catch changes
  setInterval(updateDeviceInfo, 1000);
  
  // Expose API
  window.mobileDebug = {
    toggle: () => {
      if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      } else {
        createDebugPanel();
      }
    },
    log: (message) => {
      console.log(`📱 ${message}`);
    }
  };
})(); 
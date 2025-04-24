/**
 * SortVision Debug Utilities - Combined Mobile & Performance Monitoring
 * 
 * This script provides comprehensive debugging tools:
 * - Mobile-specific debugging (touch events, viewport, orientation)
 * - Performance monitoring (FPS, memory usage, resource timing)
 * - Device information display
 * 
 * It only runs in development or when ?CR7=GOAT is in URL
 */

(function() {
  // Only run in development or when debug param is set
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname.startsWith('192.168.') ||
                window.location.hostname.startsWith('10.') ||
                window.location.hostname.startsWith('172.') ||
                window.location.hostname.includes('.local');
  const debugRequested = window.location.search.toLowerCase().includes('cr7=goat');
  
  // Check if we should block based on production domains
  console.error("[DEBUG] Checking domain: " + window.location.hostname); // This will show in Vercel logs
  
  if (!isDev && !debugRequested && 
      (window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('netlify.app') ||
      window.location.hostname.includes('github.io') ||
      window.location.hostname.includes('sortvision.com'))) {
    console.error("[DEBUG] DevTools disabled on production site: " + window.location.hostname);
    console.log('%c 🚫 DevTools disabled on production sites', 'color: #ff5f56; font-weight: bold;');
    return; // Exit immediately on production domains without debug param
  }
  
  if (!isDev && !debugRequested) {
    console.error("[DEBUG] Exiting early: not dev and no debug param");
    return; // Exit early in non-dev without debug flag
  }
  
  // Make the console message more prominent with multiple methods
  console.log('%c SortVision DevTools Activated! 🔧', 'background: #0F172A; color: #64ffda; padding: 6px; border-radius: 4px; font-weight: bold; font-size: 14px;');
  console.debug('DevTools initialization started - debug param: ' + debugRequested + ', isDev: ' + isDev);
  
  // Create debug panel
  let panel;
  
  // Create device detection constants at the top of the file
  const IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const IS_IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const IS_ANDROID = /Android/i.test(navigator.userAgent);
  
  // Performance data container (from debug.js)
  const PERF_DATA = {
    fps: [],
    memory: [],
    resources: {},
    webVitals: {},
    events: []
  };
  
  // FPS measurement variables (from debug.js)
  let MEASURING = false;
  let LAST_FRAME_TIME = 0;
  let FRAME_COUNT = 0;
  
  function createDebugPanel() {
    panel = document.createElement('div');
    panel.id = 'mobile-debug-panel';
    
    // Add CSS for terminal style
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      /* Base animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes blinkCursor {
        50% { border-right-color: transparent; }
      }

      @keyframes moveRight {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }

      /* Debug Panel - Terminal Style */
      #mobile-debug-panel {
        background-color: rgba(15, 23, 42, 0.98);
        border: 1px solid #1e293b;
        color: #64ffda;
        font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
        font-size: 0.85em;
        padding: 2.5em 0.6em 0.6em;
        width: 18em;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 10001;
        backdrop-filter: blur(12px);
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        max-height: 90dvh; /* Use dvh units for dynamic viewport height */
        display: flex;
        flex-direction: column;
      }

      /* Animated background elements */
      #mobile-debug-bg {
        position: absolute;
        inset: 0;
        opacity: 0.1;
        overflow: hidden;
        pointer-events: none;
      }
      
      /* Animated grid pattern */
      #mobile-debug-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(#444 1px, transparent 1px);
        background-size: 8px 8px;
        opacity: 0.3;
      }
      
      /* Animated code lines */
      .debug-code-line {
        position: absolute;
        left: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.3), transparent);
        animation: moveRight linear infinite;
      }
      
      /* Floating particles */
      .debug-particle {
        position: absolute;
        border-radius: 50%;
        animation: pulse infinite;
      }
      
      /* Terminal Header */
      #mobile-debug-header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1.6em;
        background-color: #1e293b;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 0 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #334155;
      }
      
      #mobile-debug-title {
        color: #ddd;
        font-size: 0.8em;
        line-height: 1.6em;
        font-weight: 500;
        display: flex;
        align-items: center;
      }

      #mobile-debug-title::before {
        content: '';
        display: inline-block;
        width: 0.6em;
        height: 0.6em;
        background-color: #64ffda;
        border-radius: 50%;
        margin-right: 0.5em;
        animation: pulse 2s infinite;
      }
      
      #mobile-debug-controls {
        display: flex;
        gap: 0.4em;
        padding: 0.4em;
      }
      
      .terminal-control {
        width: 0.75em;
        height: 0.75em;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .terminal-control:hover {
        transform: scale(1.1);
      }
      
      .terminal-control.close {
        background-color: #ff5f56;
      }
      
      .terminal-control.minimize {
        background-color: #ffbd2e;
      }
      
      .terminal-control.maximize {
        background-color: #27c93f;
      }
      
      /* Debug Rows */
      .debug-row {
        position: relative;
        padding: 0.35em 0.5em;
        margin-bottom: 0.4em;
        display: flex;
        align-items: center;
        font-size: 0.9em;
        animation: fadeIn 0.3s ease-out;
        background-color: rgba(30, 41, 59, 0.5);
        border-radius: 4px;
        overflow: hidden;
        transition: all 0.2s ease;
        border-left: 2px solid rgba(100, 255, 218, 0.3);
      }
      
      .debug-row:hover {
        background-color: rgba(30, 41, 59, 0.8);
        border-left-color: rgba(100, 255, 218, 0.7);
        transform: translateX(2px);
      }

      /* Shimmer effect on row hover */
      .debug-row::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.1), transparent);
        transform: translateX(-100%);
        transition: transform 0.5s ease;
      }

      .debug-row:hover::after {
        transform: translateX(100%);
      }
      
      /* Text Content */
      .debug-row .prompt {
        color: #27c93f;
        opacity: 0.9;
        width: 1.2em;
        margin-right: 0.8em;
        font-weight: bold;
      }
      
      .debug-row .value {
        color: #64ffda;
        font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
      }
      
      .debug-row .highlight {
        color: #27c93f;
      }

      .debug-row .faded {
        opacity: 0.7;
      }
      
      /* Warning Icon */
      .warning-icon {
        color: #ffbd2e;
        margin-left: 0.4em;
        animation: blinkCursor 1s step-end infinite;
      }
      
      /* Toggle Button Container */
      #md-toggle-button-container {
        margin-top: 0;
        text-align: center;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        padding: 10px 0 5px;
        border-top: 1px solid rgba(100, 255, 218, 0.2);
      }

      /* Button shimmer effect */
      #md-toggle-button-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.1), transparent);
        transform: translateX(-100%);
        transition: transform 1s ease;
      }

      #md-toggle-button-container:hover::before {
        transform: translateX(100%);
      }

      /* Toggle Button */
      #md-toggle-button {
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid #475569;
        color: #64ffda;
        padding: 0.5em 1em;
        border-radius: 4px;
        font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
        font-size: 0.9em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 100%;
        letter-spacing: 0.1em;
        position: relative;
        z-index: 1;
      }

      /* Button hover effect */
      #md-toggle-button:hover {
        background: rgba(51, 65, 85, 0.9);
        border-color: #64ffda;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
      }

      /* Button active effect */
      #md-toggle-button:active {
        transform: translateY(1px);
        box-shadow: 0 2px 6px rgba(100, 255, 218, 0.1);
      }

      /* Button focus effect */
      #md-toggle-button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.4);
      }

      /* Delayed animations for rows */
      .debug-row:nth-child(1) { animation-delay: 0.05s; }
      .debug-row:nth-child(2) { animation-delay: 0.1s; }
      .debug-row:nth-child(3) { animation-delay: 0.15s; }
      .debug-row:nth-child(4) { animation-delay: 0.2s; }
      .debug-row:nth-child(5) { animation-delay: 0.25s; }
      .debug-row:nth-child(6) { animation-delay: 0.3s; }
      .debug-row:nth-child(7) { animation-delay: 0.35s; }
      .debug-row:nth-child(8) { animation-delay: 0.4s; }
      .debug-row:nth-child(9) { animation-delay: 0.45s; }
      .debug-row:nth-child(10) { animation-delay: 0.5s; }
      .debug-row:nth-child(11) { animation-delay: 0.55s; }
      .debug-row:nth-child(12) { animation-delay: 0.6s; }
      .debug-row:nth-child(13) { animation-delay: 0.65s; }
      .debug-row:nth-child(14) { animation-delay: 0.7s; }
      .debug-row:nth-child(15) { animation-delay: 0.75s; }

      /* Add a scrollable container for debug rows */
      #mobile-debug-content {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #64ffda #1e293b;
        flex: 1;
        padding-right: 0.4em; /* Add padding for scrollbar */
        margin-bottom: 0.8em;
      }

      /* Scrollbar styling for webkit browsers */
      #mobile-debug-content::-webkit-scrollbar {
        width: 6px;
      }

      #mobile-debug-content::-webkit-scrollbar-track {
        background: #1e293b;
        border-radius: 4px;
      }

      #mobile-debug-content::-webkit-scrollbar-thumb {
        background-color: rgba(100, 255, 218, 0.5);
        border-radius: 4px;
      }

      #mobile-debug-content::-webkit-scrollbar-thumb:hover {
        background-color: rgba(100, 255, 218, 0.8);
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Create the HTML structure
    panel.innerHTML = `
      <div id="mobile-debug-header">
        <div id="mobile-debug-title">SortVision Dev Tools</div>
        <div id="mobile-debug-controls">
          <div class="terminal-control minimize"></div>
          <div class="terminal-control maximize"></div>
          <div class="terminal-control close"></div>
        </div>
      </div>
      
      <!-- Animated background elements -->
      <div id="mobile-debug-bg">
        <!-- Animated code lines -->
        <div class="debug-code-line" style="top: 15%; width: 30%; animation-duration: 15s;"></div>
        <div class="debug-code-line" style="top: 45%; width: 20%; animation-duration: 12s;"></div>
        <div class="debug-code-line" style="top: 75%; width: 40%; animation-duration: 18s;"></div>
        
        <!-- Floating particles -->
        <div class="debug-particle" style="top: 10%; left: 20%; width: 6px; height: 6px; background-color: rgba(100, 255, 218, 0.5); animation-duration: 3s;"></div>
        <div class="debug-particle" style="top: 30%; left: 70%; width: 4px; height: 4px; background-color: rgba(45, 212, 191, 0.5); animation-duration: 2.3s;"></div>
        <div class="debug-particle" style="top: 70%; left: 30%; width: 5px; height: 5px; background-color: rgba(139, 92, 246, 0.5); animation-duration: 4s;"></div>
        <div class="debug-particle" style="top: 60%; left: 80%; width: 3px; height: 3px; background-color: rgba(248, 113, 113, 0.5); animation-duration: 3.5s;"></div>
      </div>
      
      <!-- Scrollable content container -->
      <div id="mobile-debug-content">
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-device" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-browser" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-gpu" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-viewport" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-height" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-orientation" class="value">--</span>
          <span class="warning-icon" style="display: none">!</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-touch" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-scroll" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-ios-safe-area" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-pixel-ratio" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-network" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-perf" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-battery" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-features" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-inputs" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-haptics" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-sensors" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-storage" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-time" class="value">--</span>
        </div>
        
        <div class="debug-row">
          <span class="prompt">$</span>
          <span id="md-pwa" class="value">--</span>
        </div>
      </div>
      
      <div id="md-toggle-button-container">
        <button id="md-toggle-button">close()</button>
      </div>
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
      toggleBtn.addEventListener('click', () => {
        panel.style.display = 'none';
      });
    }
    
    // Add click handlers for terminal controls
    const closeBtn = document.querySelector('.terminal-control.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.style.display = 'none';
      });
    }
    
    const minimizeBtn = document.querySelector('.terminal-control.minimize');
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        const rows = panel.querySelectorAll('.debug-row');
        rows.forEach(row => {
          row.style.display = row.style.display === 'none' ? 'flex' : 'none';
        });
      });
    }
    
    const maximizeBtn = document.querySelector('.terminal-control.maximize');
    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', () => {
        if (panel.style.width === '24em') {
          panel.style.width = '18em';
        } else {
          panel.style.width = '24em';
        }
      });
    }
  }
  
  // Update device info display
  function updateDeviceInfo() {
    if (!panel) return;
    
    // Device type with more details
    const deviceEl = document.getElementById('md-device');
    if (deviceEl) {
      const ua = navigator.userAgent;
      let deviceType = 'Unknown';
      let deviceDetails = '';
      
      if (/iPhone/.test(ua)) {
        deviceType = 'iPhone';
        const match = ua.match(/iPhone OS (\d+)_(\d+)/);
        if (match) {
          deviceDetails = ` ${match[1]}.${match[2]}`;
        }
      }
      else if (/iPad/.test(ua)) {
        deviceType = 'iPad';
        const match = ua.match(/OS (\d+)_(\d+)/);
        if (match) {
          deviceDetails = ` ${match[1]}.${match[2]}`;
        }
      }
      else if (/Android/.test(ua)) {
        deviceType = /Mobile/.test(ua) ? 'Android Phone' : 'Android Tablet';
        const match = ua.match(/Android (\d+)\.(\d+)/);
        if (match) {
          deviceDetails = ` ${match[1]}.${match[2]}`;
        }
      }
      else if (/Windows/.test(ua)) {
        deviceType = 'Windows';
        if (/Windows NT 10/.test(ua)) deviceDetails = ' 10';
        else if (/Windows NT 6.3/.test(ua)) deviceDetails = ' 8.1';
        else if (/Windows NT 6.2/.test(ua)) deviceDetails = ' 8';
        else if (/Windows NT 6.1/.test(ua)) deviceDetails = ' 7';
      }
      else if (/Macintosh/.test(ua)) {
        deviceType = 'Mac';
        const match = ua.match(/Mac OS X (\d+)[_.](\d+)/);
        if (match) {
          deviceDetails = ` ${match[1]}.${match[2]}`;
        }
      }
      
      deviceEl.innerHTML = `<span>${deviceType}</span><span class="faded">${deviceDetails}</span>`;
    }
    
    // Browser details
    const browserEl = document.getElementById('md-browser');
    if (browserEl) {
      const ua = navigator.userAgent;
      let browser = 'Unknown';
      let version = '';
      
      if (/Firefox\//.test(ua)) {
        browser = 'Firefox';
        const match = ua.match(/Firefox\/(\d+\.\d+)/);
        if (match) version = match[1];
      }
      else if (/MSIE|Trident\//.test(ua)) {
        browser = 'IE';
        const match = ua.match(/MSIE (\d+\.\d+)/);
        if (match) version = match[1];
        else {
          const tridentMatch = ua.match(/Trident\/.*rv:(\d+\.\d+)/);
          if (tridentMatch) version = tridentMatch[1];
        }
      }
      else if (/Edge\//.test(ua)) {
        browser = 'Edge';
        const match = ua.match(/Edge\/(\d+\.\d+)/);
        if (match) version = match[1];
      }
      else if (/Edg\//.test(ua)) {
        browser = 'Edge Chromium';
        const match = ua.match(/Edg\/(\d+\.\d+)/);
        if (match) version = match[1];
      }
      else if (/Chrome\//.test(ua)) {
        browser = 'Chrome';
        const match = ua.match(/Chrome\/(\d+\.\d+)/);
        if (match) version = match[1];
      }
      else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
        browser = 'Safari';
        const match = ua.match(/Version\/(\d+\.\d+)/);
        if (match) version = match[1];
      }
      
      // Add engine info
      let engine = '';
      if (/WebKit\//.test(ua)) engine = ' (WebKit)';
      else if (/Gecko\//.test(ua)) engine = ' (Gecko)';
      else if (/Trident\//.test(ua)) engine = ' (Trident)';
      
      browserEl.innerHTML = `<span>${browser}</span> <span class="faded">${version}${engine}</span>`;
    }
    
    // GPU Information
    const gpuEl = document.getElementById('md-gpu');
    if (gpuEl) {
      let gpuInfo = 'GPU: Unknown';
      
      // Try to get GPU info from WebGL
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            // Use uppercase naming for unused variables to satisfy linter
            const VENDOR = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            
            // Clean up GPU name (remove excessive text)
            let gpuName = renderer
              .replace(/(ANGLE |Direct3D11 |OpenGL |Metal |NVIDIA |AMD |Intel |\(R\)|\(TM\))/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            
            // Add badge for known GPU vendors
            let vendorBadge = '';
            if (/NVIDIA/i.test(renderer)) {
              vendorBadge = '<span style="color: #76B900;">NVIDIA</span> ';
            } else if (/AMD|Radeon/i.test(renderer)) {
              vendorBadge = '<span style="color: #ED1C24;">AMD</span> ';
            } else if (/Intel/i.test(renderer)) {
              vendorBadge = '<span style="color: #0071C5;">Intel</span> ';
            } else if (/Apple/i.test(renderer)) {
              vendorBadge = '<span style="color: #A2AAAD;">Apple</span> ';
            }
            
            gpuInfo = `<span>GPU: ${vendorBadge}${gpuName}</span>`;
            
            // Add WebGL version info
            const glVersion = gl.getParameter(gl.VERSION);
            // Use uppercase naming for unused variables to satisfy linter
            const GLSL_VERSION = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
            const glVersionShort = glVersion.split(' ')[0];
            gpuInfo += `<span class="faded"> | WebGL ${glVersionShort}</span>`;
          }
        }
      } catch (/* eslint-disable-line no-unused-vars */ error) {
        void error; // Using void to suppress unused variable warning
        gpuInfo = 'GPU: Info restricted';
      }
      
      gpuEl.innerHTML = gpuInfo;
    }
    
    // Enhanced viewport dimensions
    const viewportEl = document.getElementById('md-viewport');
    if (viewportEl) {
      const vw = Math.round(window.innerWidth);
      const vh = Math.round(window.innerHeight);
      const vwCss = Math.round(document.documentElement.clientWidth);
      const vhCss = Math.round(document.documentElement.clientHeight);
      const layout = vw > vh ? 'landscape' : 'portrait';
      
      viewportEl.innerHTML = `<span>${vw}x${vh}</span> <span class="faded">(CSS: ${vwCss}x${vhCss}) [${layout}]</span>`;
    }
    
    // Format height info with highlighting
    const heightEl = document.getElementById('md-height');
    if (heightEl) {
      const computedStyle = getComputedStyle(document.documentElement);
      const appHeight = computedStyle.getPropertyValue('--app-height').trim() || 'not set';
      const bodyHeight = Math.round(document.body.offsetHeight);
      const docHeight = Math.round(document.documentElement.scrollHeight);
      
      heightEl.innerHTML = `<span>--app-height: ${appHeight}</span> <span class="faded">| body: ${bodyHeight}px | doc: ${docHeight}px</span>`;
    }
    
    // Format orientation info with warning
    const orientationEl = document.getElementById('md-orientation');
    if (orientationEl) {
      let orientationInfo = 'Unknown';
      let warning = false;
      
      if (window.screen && window.screen.orientation) {
        const orientation = window.screen.orientation.type;
        orientationInfo = orientation;
        
        // Check if orientation is locked
        if (window.screen.orientation.locked) {
          orientationInfo += ' (locked)';
        }
        
        // Show warning for problematic orientations on mobile
        if (IS_MOBILE && orientation.includes('portrait') && window.innerWidth < 480) {
          warning = true;
        }
      } else {
        // Fallback to aspect ratio detection
        const aspect = window.innerWidth / window.innerHeight;
        orientationInfo = aspect > 1 ? 'landscape' : 'portrait';
        
        // Show warning for narrow portrait
        if (aspect < 0.6) {
          warning = true;
        }
      }
      
      orientationEl.innerHTML = `<span>${orientationInfo}</span>`;
      
      // Update warning icon
      const warningIcon = orientationEl.querySelector('.warning-icon');
      if (warningIcon) {
        warningIcon.style.display = warning ? 'inline' : 'none';
      }
    }
    
    // Format touch capability info
    const touchEl = document.getElementById('md-touch');
    if (touchEl) {
      const hasTouchScreen = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          window.matchMedia('(pointer: coarse)').matches;
                          
      let pointerInfo = '';
      
      if (window.matchMedia) {
        // Using pointer media queries for more accurate detection
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const noPointer = window.matchMedia('(pointer: none)').matches;
        
        const pointerTypes = [];
        if (finePointer) pointerTypes.push('fine (mouse/stylus)');
        if (coarsePointer) pointerTypes.push('coarse (touch)');
        if (noPointer) pointerTypes.push('none');
        
        if (pointerTypes.length > 0) {
          pointerInfo = ` | pointer: ${pointerTypes.join(', ')}`;
        }
      }
      
      touchEl.innerHTML = `<span>Touch: ${hasTouchScreen ? 'Yes' : 'No'}</span><span class="faded">${pointerInfo}</span>`;
    }
    
    // Format pixel ratio info
    const pixelRatioEl = document.getElementById('md-pixel-ratio');
    if (pixelRatioEl) {
      const ratio = window.devicePixelRatio || 1;
      let screenInfo = '';
      
      if (window.screen) {
        const screenW = window.screen.width;
        const screenH = window.screen.height;
        // Removed unused pixelDepth variable
        screenInfo = ` | screen: ${screenW}x${screenH}`;
      }
      
      pixelRatioEl.innerHTML = `<span>Pixel Ratio: ${ratio.toFixed(2)}</span><span class="faded">${screenInfo}</span>`;
    }
    
    // Scroll position info
    const scrollEl = document.getElementById('md-scroll');
    if (scrollEl) {
      const scrollX = Math.round(window.scrollX);
      const scrollY = Math.round(window.scrollY);
      
      // Get max scroll values
      const maxScrollY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      
      // Calculate scroll percentage
      const scrollPercent = maxScrollY > 0 
        ? Math.round((scrollY / maxScrollY) * 100) 
        : 0;
        
      scrollEl.innerHTML = `<span>Scroll: (${scrollX}, ${scrollY})</span><span class="faded"> | ${scrollPercent}% of page</span>`;
    }
    
    // iOS safe area insets
    const iOSSafeAreaEl = document.getElementById('md-ios-safe-area');
    if (iOSSafeAreaEl) {
      // Get CSS variables if defined
      const style = getComputedStyle(document.documentElement);
      const safeTop = style.getPropertyValue('--sat') || 'n/a';
      const safeRight = style.getPropertyValue('--sar') || 'n/a';
      const safeBottom = style.getPropertyValue('--sab') || 'n/a';
      const safeLeft = style.getPropertyValue('--sal') || 'n/a';
      
      // Format using logical properties
      const insets = [
        `top: ${safeTop}`,
        `right: ${safeRight}`,
        `bottom: ${safeBottom}`,
        `left: ${safeLeft}`
      ].filter(s => !s.includes('n/a')).join(', ');
      
      iOSSafeAreaEl.innerHTML = insets 
        ? `<span>Safe areas:</span><span class="faded"> ${insets}</span>`
        : `<span>Safe areas: none</span>`;
    }
    
    // Network info
    const networkEl = document.getElementById('md-network');
    if (networkEl) {
      const updateNetworkInfo = () => {
        let connectionInfo = '<span>Network:</span><span class="faded"> API not available</span>';
        
        if ('connection' in navigator) {
          const connection = navigator.connection;
          if (connection) {
            // Get connection type with better description
            const getConnectionType = (type, effectiveType) => {
              if (type) {
                switch (type) {
                  case 'cellular': return 'Cellular';
                  case 'wifi': return 'WiFi';
                  case 'ethernet': return 'Ethernet';
                  case 'bluetooth': return 'Bluetooth';
                  case 'wimax': return 'WiMAX';
                  case 'none': return 'Offline';
                  default: return type;
                }
              } else if (effectiveType) {
                // If type not available, use effective type with descriptive labels
                switch (effectiveType) {
                  case 'slow-2g': return '2G (slow)';
                  case '2g': return '2G';
                  case '3g': return '3G';
                  case '4g': return '4G';
                  default: return effectiveType;
                }
              }
              return 'unknown';
            };
            
            const type = getConnectionType(connection.type, connection.effectiveType);
            
            // Format bandwidth info (if available)
            let bandwidthInfo = '';
            if (connection.downlink) {
              // Color-code based on speed
              let speedColor = '#64ffda'; // Default color
              if (connection.downlink < 1) {
                speedColor = '#ef4444'; // Red for very slow
              } else if (connection.downlink < 5) {
                speedColor = '#f97316'; // Orange for slow
              } else if (connection.downlink > 20) {
                speedColor = '#4ade80'; // Green for fast
              }
              
              bandwidthInfo += ` | <span style="color: ${speedColor}">${connection.downlink} Mbps</span>`;
            }
            
            // Add RTT information if available
            if (connection.rtt) {
              // Color-code based on latency
              let rttColor = '#64ffda'; // Default color
              if (connection.rtt > 200) {
                rttColor = '#ef4444'; // Red for high latency
              } else if (connection.rtt > 100) {
                rttColor = '#f97316'; // Orange for medium latency
              } else if (connection.rtt < 50) {
                rttColor = '#4ade80'; // Green for low latency
              }
              
              bandwidthInfo += ` | RTT: <span style="color: ${rttColor}">${connection.rtt}ms</span>`;
            }
            
            // Add save-data information
            if ('saveData' in connection) {
              bandwidthInfo += ` | Data saver: ${connection.saveData ? 'ON' : 'OFF'}`;
            }
            
            connectionInfo = `<span>Network: ${type}</span><span class="faded">${bandwidthInfo}</span>`;
            
            // Add event listener for network changes
            if (!connection._hasListener) {
              connection.addEventListener('change', () => {
                console.log('%c 🌐 Network connection changed', 'color: #64ffda; font-weight: bold;');
                updateDeviceInfo();
              });
              connection._hasListener = true;
            }
          }
        }
        
        networkEl.innerHTML = connectionInfo;
      };
      
      updateNetworkInfo();
      
      // Update network info periodically (connections can change)
      setInterval(updateNetworkInfo, 5000);
    }
    
    // Performance metrics
    const perfEl = document.getElementById('md-perf');
    if (perfEl) {
      // Add FPS counter variables
      let fpsValue = 0;
      let lastFrameTime = 0;
      let frameCount = 0;
      let lastFpsUpdate = 0;
      
      // FPS counter function
      const countFPS = (timestamp) => {
        if (!lastFrameTime) {
          lastFrameTime = timestamp;
          lastFpsUpdate = timestamp;
          frameCount = 0;
        }
        
        // Increment frame count
        frameCount++;
        
        // Calculate FPS every second
        if (timestamp - lastFpsUpdate >= 1000) {
          fpsValue = Math.round((frameCount * 1000) / (timestamp - lastFpsUpdate));
          frameCount = 0;
          lastFpsUpdate = timestamp;
        }
        
        lastFrameTime = timestamp;
        requestAnimationFrame(countFPS);
      };
      
      // Start counting FPS
      requestAnimationFrame(countFPS);
      
      const updatePerformanceInfo = () => {
        let perfInfo = '<span>Performance:</span><span class="faded"> API not available</span>';
        
        if (window.performance) {
          let memoryInfo = '';
          let timingInfo = '';
          let fpsInfo = '';
          
          // FPS information with color coding
          let fpsColor = '#64ffda';
          if (fpsValue < 30) {
            fpsColor = '#ef4444'; // Red for low FPS
          } else if (fpsValue < 50) {
            fpsColor = '#f97316'; // Orange for medium FPS
          } else if (fpsValue >= 58) {
            fpsColor = '#4ade80'; // Green for high FPS
          }
          
          fpsInfo = `<span style="color: ${fpsColor}">${fpsValue} FPS</span>`;
          
          // Memory information (Chrome only)
          if (window.performance.memory) {
            const used = Math.round(window.performance.memory.usedJSHeapSize / 1048576);
            const total = Math.round(window.performance.memory.jsHeapSizeLimit / 1048576);
            const percentUsed = Math.round((used / total) * 100);
            
            // Color based on memory usage
            let memColor = '#64ffda';
            if (percentUsed > 80) {
              memColor = '#ef4444'; // Red for high usage
            } else if (percentUsed > 60) {
              memColor = '#f97316'; // Orange for medium-high usage
            }
            
            memoryInfo = ` | Mem: <span style="color: ${memColor}">${used}MB</span> / ${total}MB`;
          }
          
          // Navigation timing information
          if (window.performance.timing) {
            const navStart = window.performance.timing.navigationStart;
            const loadTime = window.performance.timing.loadEventEnd - navStart;
            const domReady = window.performance.timing.domContentLoadedEventEnd - navStart;
            
            timingInfo = ` | Load: ${loadTime}ms | DOM: ${domReady}ms`;
          } else if (window.performance.getEntriesByType) {
            // Modern Performance API
            const navEntries = window.performance.getEntriesByType('navigation');
            if (navEntries && navEntries.length > 0) {
              const nav = navEntries[0];
              timingInfo = ` | Load: ${Math.round(nav.loadEventEnd)}ms | DOM: ${Math.round(nav.domContentLoadedEventEnd)}ms`;
            }
            
            // First Paint and First Contentful Paint
            const paintEntries = window.performance.getEntriesByType('paint');
            if (paintEntries && paintEntries.length > 0) {
              for (const entry of paintEntries) {
                if (entry.name === 'first-contentful-paint') {
                  timingInfo += ` | FCP: ${Math.round(entry.startTime)}ms`;
                  break;
                }
              }
            }
          }
          
          perfInfo = `<span>Performance:</span><span class="faded"> ${fpsInfo}${memoryInfo}${timingInfo}</span>`;
        }
        
        perfEl.innerHTML = perfInfo;
      };
      
      updatePerformanceInfo();
      
      // Update performance info every 3 seconds
      setInterval(updatePerformanceInfo, 3000);
    }
    
    // Battery info
    const batteryEl = document.getElementById('md-battery');
    if (batteryEl) {
      // Use an async function to handle battery info
      const updateBatteryInfo = async () => {
        let batteryInfo = '<span>Battery:</span><span class="faded"> API not available</span>';
        
        try {
          // Check if Battery API is available
          if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            
            if (battery) {
              const level = Math.round(battery.level * 100);
              const charging = battery.charging;
              const chargingTime = battery.chargingTime;
              const dischargingTime = battery.dischargingTime;
              
              // Create battery level indicator with color based on level
              let levelColor = '#4ade80'; // Green for good battery
              if (level <= 20) {
                levelColor = '#ef4444'; // Red for low battery
              } else if (level <= 40) {
                levelColor = '#f97316'; // Orange for medium-low battery
              } else if (level <= 60) {
                levelColor = '#facc15'; // Yellow for medium battery
              }
              
              // Format the battery information
              const levelIndicator = `<span style="color: ${levelColor}; font-weight: bold;">${level}%</span>`;
              
              // Format charging status with icon
              const chargingStatus = charging 
                ? '<span style="color: #4ade80;">⚡ charging</span>' 
                : '<span>discharging</span>';
              
              // Format time remaining
              let timeInfo = '';
              if (charging && chargingTime !== Infinity) {
                const timeToFull = Math.round(chargingTime / 60);
                const hours = Math.floor(timeToFull / 60);
                const minutes = timeToFull % 60;
                timeInfo = ` (${hours > 0 ? `${hours}h ` : ''}${minutes}m to full)`;
              } else if (!charging && dischargingTime !== Infinity) {
                const timeLeft = Math.round(dischargingTime / 60);
                const hours = Math.floor(timeLeft / 60);
                const minutes = timeLeft % 60;
                timeInfo = ` (${hours > 0 ? `${hours}h ` : ''}${minutes}m left)`;
              }
              
              batteryInfo = `<span>Battery: ${levelIndicator}</span><span class="faded"> | ${chargingStatus}${timeInfo}</span>`;
              
              // Add event listeners for battery changes if not already added
              if (!battery._hasListeners) {
                battery.addEventListener('levelchange', () => {
                  // Removed battery level logging
                  updateDeviceInfo();
                });
                battery.addEventListener('chargingchange', () => {
                  // Removed charging state logging
                  updateDeviceInfo();
                });
                battery.addEventListener('chargingtimechange', () => updateDeviceInfo());
                battery.addEventListener('dischargingtimechange', () => updateDeviceInfo());
                battery._hasListeners = true;
              }
            }
          }
        } catch (/* eslint-disable-line no-unused-vars */ error) {
          void error; // Using void to suppress unused variable warning
        }
        
        batteryEl.innerHTML = batteryInfo;
      };
      
      updateBatteryInfo();
    }
    
    // Feature detection info
    const featuresEl = document.getElementById('md-features');
    if (featuresEl) {
      const checkFeatures = () => {
        // Check for advanced browser features and APIs
        const features = [
          {
            name: 'WebGL',
            supported: (function() {
              try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && 
                  (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
              } catch (/* eslint-disable-line no-unused-vars */ error) {
                void error; // Suppress unused variable warning
                return false;
              }
            })(),
            critical: true
          },
          {
            name: 'WebGL2',
            supported: (function() {
              try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
              } catch (/* eslint-disable-line no-unused-vars */ error) {
                void error; // Suppress unused variable warning
                return false;
              }
            })(),
            critical: false
          },
          {
            name: 'WebP',
            supported: (function() {
              const elem = document.createElement('canvas');
              if (elem.getContext && elem.getContext('2d')) {
                return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
              }
              return false;
            })(),
            critical: false
          },
          {
            name: 'SharedArrayBuffer',
            supported: typeof SharedArrayBuffer !== 'undefined',
            critical: false
          },
          {
            name: 'WebWorkers',
            supported: typeof Worker !== 'undefined',
            critical: true
          },
          {
            name: 'Intl',
            supported: typeof Intl !== 'undefined',
            critical: false
          },
          {
            name: 'IntersectionObserver',
            supported: typeof IntersectionObserver !== 'undefined',
            critical: true
          },
          {
            name: 'ResizeObserver',
            supported: typeof ResizeObserver !== 'undefined',
            critical: false
          },
          {
            name: 'WebAnimations',
            supported: typeof Element.prototype.animate !== 'undefined',
            critical: false
          },
          {
            name: 'ES6',
            supported: (function() {
              try {
                // Check for basic ES6 features
                eval('() => {}; const a = [1, 2, 3].find(x => x > 1);');
                return true;
              } catch (/* eslint-disable-line no-unused-vars */ error) {
                void error; // Suppress unused variable warning
                return false;
              }
            })(),
            critical: true
          }
        ];
        
        // Count supported features
        const supported = features.filter(f => f.supported);
        const critical = features.filter(f => f.critical && !f.supported);
        
        // Format the output
        let featureOutput = '';
        if (supported.length > 0) {
          featureOutput += supported.map(f => f.name).join(', ');
        }
        
        // Add warning for missing critical features
        let warningOutput = '';
        if (critical.length > 0) {
          warningOutput = ` | <span style="color: #ef4444;">Missing: ${critical.map(f => f.name).join(', ')}</span>`;
        }
        
        return `<span>Features (${supported.length}/${features.length}):</span><span class="faded"> ${featureOutput}${warningOutput}</span>`;
      };
      
      featuresEl.innerHTML = checkFeatures();
    }
    
    // Input devices
    const inputsEl = document.getElementById('md-inputs');
    if (inputsEl) {
      // Using a function to avoid unused variable warnings
      const getInputInfo = () => {
        const inputs = [];
        
        // Check various input methods
        if (window.matchMedia('(pointer: fine)').matches) {
          inputs.push('mouse/touchpad');
        }
        
        if (window.matchMedia('(pointer: coarse)').matches) {
          inputs.push('touch');
        }
        
        if (navigator.maxTouchPoints > 0) {
          inputs.push(`${navigator.maxTouchPoints} touch points`);
        }
        
        // Check if virtual keyboard is likely
        const isVirtualKeyboard = 'ontouchstart' in window && 
                                !window.matchMedia('(pointer: fine)').matches;
        
        if (isVirtualKeyboard) {
          inputs.push('virtual keyboard');
        }
        
        return inputs.join(', ') || 'standard';
      };
      
      inputsEl.innerHTML = `<span>Inputs:</span><span class="faded"> ${getInputInfo()}</span>`;
    }
    
    // Haptics Information
    const hapticsEl = document.getElementById('md-haptics');
    if (hapticsEl) {
      const checkHaptics = () => {
        let hapticInfo = 'Haptics: not supported';
        
        // Check if vibration API is supported
        if ('vibrate' in navigator) {
          hapticInfo = '<span>Haptics:</span><span class="faded"> supported (Vibration API)</span>';
          
          // Add test button
          hapticInfo += ' <button id="test-haptic" style="background: rgba(30, 41, 59, 0.8); border: 1px solid #475569; color: #64ffda; padding: 0.2em 0.5em; border-radius: 3px; font-size: 0.8em; margin-left: 0.5em;">Test</button>';
        }
        
        return hapticInfo;
      };
      
      hapticsEl.innerHTML = checkHaptics();
      
      // Add event listener for the test button after a short delay
      setTimeout(() => {
        const testBtn = document.getElementById('test-haptic');
        if (testBtn) {
          testBtn.addEventListener('click', () => {
            navigator.vibrate(200);
            testBtn.textContent = 'Vibrating...';
            setTimeout(() => { testBtn.textContent = 'Test'; }, 300);
          });
        }
      }, 500);
    }
    
    // Sensors Information
    const sensorsEl = document.getElementById('md-sensors');
    if (sensorsEl) {
      let sensorValues = {
        motion: false,
        orientation: false,
        gyroscope: false,
        accelerometer: false,
        ambientLight: false,
        proximity: false
      };
      
      // Check for motion and orientation support
      sensorValues.motion = 'DeviceMotionEvent' in window;
      sensorValues.orientation = 'DeviceOrientationEvent' in window;
      
      // Check for specific sensors via the Sensor API
      if ('Gyroscope' in window) {
        sensorValues.gyroscope = true;
      }
      
      if ('Accelerometer' in window) {
        sensorValues.accelerometer = true;
      }
      
      if ('AmbientLightSensor' in window) {
        sensorValues.ambientLight = true;
      }
      
      if ('ProximitySensor' in window) {
        sensorValues.proximity = true;
      }
      
      // Count active sensors
      const activeSensors = Object.values(sensorValues).filter(v => v).length;
      
      // Format sensor information
      let sensorList = [];
      if (sensorValues.motion) sensorList.push('motion');
      if (sensorValues.orientation) sensorList.push('orientation');
      if (sensorValues.gyroscope) sensorList.push('gyroscope');
      if (sensorValues.accelerometer) sensorList.push('accelerometer');
      if (sensorValues.ambientLight) sensorList.push('ambient light');
      if (sensorValues.proximity) sensorList.push('proximity');
      
      let sensorInfo = `<span>Sensors (${activeSensors}):</span>`;
      if (sensorList.length > 0) {
        sensorInfo += `<span class="faded"> ${sensorList.join(', ')}</span>`;
      } else {
        sensorInfo += '<span class="faded"> none detected</span>';
      }
      
      sensorsEl.innerHTML = sensorInfo;
      
      // Add event listener for device motion/orientation if supported
      if (sensorValues.motion || sensorValues.orientation) {
        // Will only add listener once to avoid overwhelming the device
        let hasMotionListener = false;
        let hasOrientationListener = false;
        
        if (sensorValues.motion && !hasMotionListener) {
          window.addEventListener('devicemotion', (e) => {
            if (!e.acceleration) return;
            
            // Update sensor display with actual values
            const accel = Math.round(Math.sqrt(
              e.acceleration.x * e.acceleration.x + 
              e.acceleration.y * e.acceleration.y + 
              e.acceleration.z * e.acceleration.z
            ));
            
            sensorsEl.innerHTML = `<span>Sensors (${activeSensors}):</span><span class="faded"> ${sensorList.join(', ')} | accel: ${accel}</span>`;
          }, { passive: true });
          hasMotionListener = true;
        }
        
        if (sensorValues.orientation && !hasOrientationListener) {
          window.addEventListener('deviceorientation', (e) => {
            if (e.alpha === null) return;
            
            // Update sensor display with actual values
            sensorsEl.innerHTML = `<span>Sensors (${activeSensors}):</span><span class="faded"> ${sensorList.join(', ')} | α: ${Math.round(e.alpha)}° β: ${Math.round(e.beta)}° γ: ${Math.round(e.gamma)}°</span>`;
          }, { passive: true });
          hasOrientationListener = true;
        }
      }
    }
    
    // Time Information
    const timeEl = document.getElementById('md-time');
    if (timeEl) {
      const updateTimeInfo = () => {
        const now = new Date();
        
        // Format time with seconds
        const timeString = now.toLocaleTimeString();
        
        // Format offset from UTC
        const offsetMinutes = now.getTimezoneOffset();
        const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
        const offsetMins = Math.abs(offsetMinutes % 60);
        const offsetSign = offsetMinutes <= 0 ? '+' : '-';
        const offsetFormatted = `UTC${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`;
        
        // Calculate page load time
        const pageLoadTime = Math.round((now.getTime() - window.performance.timing.navigationStart) / 1000);
        const hours = Math.floor(pageLoadTime / 3600);
        const minutes = Math.floor((pageLoadTime % 3600) / 60);
        const seconds = pageLoadTime % 60;
        let uptimeFormatted = '';
        
        if (hours > 0) {
          uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
          uptimeFormatted = `${minutes}m ${seconds}s`;
        } else {
          uptimeFormatted = `${seconds}s`;
        }
        
        timeEl.innerHTML = `<span>Time: ${timeString}</span><span class="faded"> | ${offsetFormatted} | Uptime: ${uptimeFormatted}</span>`;
      };
      
      updateTimeInfo();
      // Update time every second
      setInterval(updateTimeInfo, 1000);
    }
    
    // Storage info
    const storageEl = document.getElementById('md-storage');
    if (storageEl) {
      // Storage check function using void operator to indicate deliberate unused catch parameter
      const checkStorage = () => {
        const types = [];
        
        // Check localStorage
        if (window.localStorage) {
          try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            types.push('localStorage');
          } catch (/* eslint-disable-line no-unused-vars */ error) {
            void error; // Using void to suppress unused variable warning
            types.push('localStorage (blocked)');
          }
        }
        
        // Check sessionStorage
        if (window.sessionStorage) {
          try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            types.push('sessionStorage');
          } catch (/* eslint-disable-line no-unused-vars */ error) {
            void error; // Using void to suppress unused variable warning
            types.push('sessionStorage (blocked)');
          }
        }
        
        // Check indexedDB
        if (window.indexedDB) {
          types.push('indexedDB');
        }
        
        // Check Storage API
        if (navigator.storage && navigator.storage.estimate) {
          navigator.storage.estimate().then(estimate => {
            const used = Math.round(estimate.usage / 1024 / 1024);
            const total = Math.round(estimate.quota / 1024 / 1024);
            
            const storageDetails = `${used}MB / ${total}MB`;
            storageEl.innerHTML = `<span>Storage:</span><span class="faded"> ${types.join(', ')} | ${storageDetails}</span>`;
          }).catch(() => {
            storageEl.innerHTML = `<span>Storage:</span><span class="faded"> ${types.join(', ')}</span>`;
          });
          
          return `${types.join(', ')} (calculating...)`;
        }
        
        return types.join(', ') || 'unavailable';
      };
      
      storageEl.innerHTML = `<span>Storage:</span><span class="faded"> ${checkStorage()}</span>`;
    }
    
    // PWA/Installation info
    const pwaEl = document.getElementById('md-pwa');
    if (pwaEl) {
      // Using a function to avoid unused variable warnings
      const getPwaInfo = () => {
        let info = 'PWA: n/a';
        
        // Check if app is installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            (window.navigator.standalone === true)) {
          info = 'PWA: installed';
        } else if ('serviceWorker' in navigator) {
          info = 'PWA: installable';
        }
        
        return info;
      };
      
      pwaEl.innerHTML = `<span>${getPwaInfo()}</span>`;
      
      // Add listener for display mode changes
      window.matchMedia('(display-mode: standalone)').addEventListener('change', () => {
        updateDeviceInfo();
      });
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
          // Detect potential scroll blocking detected
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
    if (!panel) return;
    
    const scrollEl = document.getElementById('md-scroll');
    if (!scrollEl) return;
    
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    // Use uppercase since it's a constant that doesn't change
    const MAX_SCROLL_X = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
    const MAX_SCROLL_Y = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    
    window.addEventListener('scroll', () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      
      if (scrollX !== lastScrollX || scrollY !== lastScrollY) {
        lastScrollX = scrollX;
        lastScrollY = scrollY;
        
        // Calculate scroll percentages
        const xPercent = MAX_SCROLL_X > 0 ? Math.round((scrollX / MAX_SCROLL_X) * 100) : 0;
        const yPercent = MAX_SCROLL_Y > 0 ? Math.round((scrollY / MAX_SCROLL_Y) * 100) : 0;
        
        scrollEl.innerHTML = `Scroll: x:${scrollX}px (${xPercent}%), y:${scrollY}px (${yPercent}%)`;
      }
    });
  }
  
  // Monitor resize and orientation changes
  function monitorViewportChanges() {
    ['resize', 'orientationchange'].forEach(eventType => {
      window.addEventListener(eventType, () => {
        console.log('%c 📐 ' + eventType.toUpperCase() + ' event detected', 'color: #64ffda; font-weight: bold;');
        
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
      console.log('%c 🛠️ DevTools: ' + message, 'color: #64ffda; background: #1e293b; padding: 3px 6px; border-radius: 3px;');
    }
  };
})(); 
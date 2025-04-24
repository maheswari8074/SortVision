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
        margin-top: 0.8em;
        text-align: center;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
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
      
      #md-toggle-button:hover {
        background: rgba(51, 65, 85, 0.9);
        border-color: #64ffda;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
      }
      
      #md-toggle-button:active {
        transform: translateY(1px);
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
    `;
    document.head.appendChild(styleSheet);
    
    // Create the HTML structure
    panel.innerHTML = `
      <div id="mobile-debug-header">
        <div id="mobile-debug-title">SortVision Debug</div>
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
        <span id="md-storage" class="value">--</span>
      </div>
      
      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-pwa" class="value">--</span>
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
        if (isMobile && orientation.includes('portrait') && window.innerWidth < 480) {
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
      const maxScrollX = Math.max(
        0,
        document.documentElement.scrollWidth - window.innerWidth
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
      let connectionInfo = 'Network: unknown';
      let details = '';
      
      // Use Network Information API if available
      if (navigator.connection) {
        const connection = navigator.connection;
        const type = connection.effectiveType || connection.type || 'unknown';
        connectionInfo = `Network: ${type}`;
        
        // Add more details if available
        if (connection.downlink) {
          details += ` | ${connection.downlink} Mbps`;
        }
        if (connection.rtt) {
          details += ` | RTT: ${connection.rtt}ms`;
        }
      } else {
        // Fallback
        connectionInfo = 'Network: (API unavailable)';
      }
      
      networkEl.innerHTML = `<span>${connectionInfo}</span><span class="faded">${details}</span>`;
    }
    
    // Performance metrics
    const perfEl = document.getElementById('md-perf');
    if (perfEl) {
      // Using a function to avoid unused variable warnings
      const getPerformanceMetrics = () => {
        let fpInfo = 'FP: n/a';
        let fpcpInfo = 'FPCP: n/a';
        
        // Check for Performance API support
        if (window.performance && window.performance.getEntriesByType) {
          const paintMetrics = window.performance.getEntriesByType('paint');
          
          if (paintMetrics && paintMetrics.length) {
            for (const entry of paintMetrics) {
              if (entry.name === 'first-paint') {
                fpInfo = `FP: ${Math.round(entry.startTime)}ms`;
              } else if (entry.name === 'first-contentful-paint') {
                fpcpInfo = `FPCP: ${Math.round(entry.startTime)}ms`;
              }
            }
          }
        }
        
        return { fpInfo, fpcpInfo };
      };
      
      const { fpInfo, fpcpInfo } = getPerformanceMetrics();
      perfEl.innerHTML = `<span>Performance</span><span class="faded"> | ${fpInfo} | ${fpcpInfo}</span>`;
    }
    
    // Battery info
    const batteryEl = document.getElementById('md-battery');
    if (batteryEl) {
      // Use an async function to handle battery info
      const updateBatteryInfo = async () => {
        let batteryInfo = 'Battery: n/a';
        
        try {
          // Check if Battery API is available
          if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            
            if (battery) {
              const level = Math.round(battery.level * 100);
              const charging = battery.charging ? 'charging' : 'discharging';
              batteryInfo = `Battery: ${level}% (${charging})`;
              
              // Add event listeners for battery changes if not already added
              if (!battery._hasListeners) {
                battery.addEventListener('levelchange', () => updateDeviceInfo());
                battery.addEventListener('chargingchange', () => updateDeviceInfo());
                battery._hasListeners = true;
              }
            }
          }
        } catch (error) {
          // Handle errors silently
          console.log('Battery API error:', error.message);
        }
        
        batteryEl.innerHTML = `<span>${batteryInfo}</span>`;
      };
      
      updateBatteryInfo();
    }
    
    // Feature detection info
    const featuresEl = document.getElementById('md-features');
    if (featuresEl) {
      const features = [
        {name: 'IntersectionObserver', supported: 'IntersectionObserver' in window},
        {name: 'ResizeObserver', supported: 'ResizeObserver' in window},
        {name: 'WebGL', supported: !!document.createElement('canvas').getContext('webgl')},
        {name: 'WebP', supported: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0}
      ];
      
      const supportedList = features
        .filter(f => f.supported)
        .map(f => f.name)
        .join(', ');
        
      const unsupportedList = features
        .filter(f => !f.supported)
        .map(f => f.name)
        .join(', ');
      
      featuresEl.innerHTML = `<span>Features:</span><span class="faded"> ${supportedList || 'none'}</span>`;
      
      if (unsupportedList) {
        // Handle missing features
        console.log('Unsupported features:', unsupportedList);
      }
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
    
    // Storage info
    const storageEl = document.getElementById('md-storage');
    if (storageEl) {
      // Define checkStorage function to avoid unused variables
      const checkStorage = () => {
        const types = [];
        
        if (window.localStorage) {
          try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            types.push('localStorage');
          } catch (error) {
            types.push('localStorage (blocked)');
          }
        }
        
        if (window.sessionStorage) {
          try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            types.push('sessionStorage');
          } catch (error) {
            types.push('sessionStorage (blocked)');
          }
        }
        
        if (window.indexedDB) {
          types.push('indexedDB');
        }
        
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
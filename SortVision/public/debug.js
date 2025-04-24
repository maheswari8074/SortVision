/**
 * SortVision Performance Monitoring & Debug Utilities
 * 
 * This script provides performance monitoring tools for SortVision
 * - Resource timing analysis
 * - Memory usage tracking
 * - FPS monitoring during animations
 * - Core Web Vitals monitoring
 * 
 * It only runs when:
 * 1. In development environment, or
 * 2. When ?debug=true is in URL
 */

(function() {
  // Only run in development or when debug param is set
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';
  const debugRequested = window.location.search.includes('debug=true');
  
  if (!isDev && !debugRequested) {
    return; // Exit early in production without debug flag
  }
  
  // Performance data container
  const perfData = {
    fps: [],
    memory: [],
    resources: {},
    webVitals: {},
    events: []
  };
  
  // Create debug panel if explicitly requested
  if (debugRequested) {
    createDebugPanel();
  }
  
  // Monitor resource timing
  function captureResourceTiming() {
    // Get resource timing entries
    const resources = performance.getEntriesByType('resource');
    
    // Group by resource type
    resources.forEach(resource => {
      const type = resource.initiatorType || 'other';
      
      if (!perfData.resources[type]) {
        perfData.resources[type] = [];
      }
      
      perfData.resources[type].push({
        name: resource.name,
        duration: Math.round(resource.duration),
        size: resource.transferSize || 0,
        startTime: Math.round(resource.startTime)
      });
    });
    
    // Log slow resources (>500ms)
    const slowResources = resources.filter(r => r.duration > 500);
    if (slowResources.length > 0) {
      console.warn('⚠️ Slow resources detected:', 
        slowResources.map(r => ({ 
          url: r.name.split('/').pop(), 
          time: Math.round(r.duration) + 'ms' 
        }))
      );
    }
    
    // Clear buffer to prevent memory leaks
    performance.clearResourceTimings();
  }
  
  // Monitor FPS during animations
  let lastFrameTime = 0;
  let frameCount = 0;
  let measuring = false;
  
  function measureFPS() {
    if (!measuring) return;
    
    const now = performance.now();
    const elapsed = now - lastFrameTime;
    
    if (elapsed >= 1000) { // Calculate FPS every second
      const fps = Math.round((frameCount * 1000) / elapsed);
      perfData.fps.push(fps);
      
      // Log low FPS
      if (fps < 30) {
        console.warn(`⚠️ Low FPS detected: ${fps}`);
        // Capture what was happening
        perfData.events.push({
          time: new Date().toISOString(),
          type: 'low_fps',
          value: fps,
          memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : 'unavailable'
        });
      }
      
      // Reset counters
      lastFrameTime = now;
      frameCount = 0;
      
      // Update debug panel if it exists
      const fpsElement = document.getElementById('debug-fps');
      if (fpsElement) {
        fpsElement.textContent = `FPS: ${fps}`;
        fpsElement.style.color = fps < 30 ? 'red' : (fps < 50 ? 'orange' : 'green');
      }
    }
    
    frameCount++;
    requestAnimationFrame(measureFPS);
  }
  
  // Start/stop FPS measurement
  function startFPSMeasurement() {
    if (measuring) return;
    measuring = true;
    lastFrameTime = performance.now();
    frameCount = 0;
    requestAnimationFrame(measureFPS);
    
    // Log event
    perfData.events.push({
      time: new Date().toISOString(),
      type: 'fps_measurement_start'
    });
  }
  
  function stopFPSMeasurement() {
    measuring = false;
    
    // Log event
    perfData.events.push({
      time: new Date().toISOString(),
      type: 'fps_measurement_stop',
      avgFps: perfData.fps.length ? 
        Math.round(perfData.fps.reduce((a, b) => a + b, 0) / perfData.fps.length) : 0
    });
  }
  
  // Monitor Core Web Vitals
  function captureWebVitals() {
    try {
      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          perfData.webVitals.FID = entry.processingStart - entry.startTime;
        }
      }).observe({type: 'first-input', buffered: true});
      
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        perfData.webVitals.LCP = lastEntry.startTime;
      }).observe({type: 'largest-contentful-paint', buffered: true});
      
      // Cumulative Layout Shift
      let cumulativeLayoutShift = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            cumulativeLayoutShift += entry.value;
            perfData.webVitals.CLS = cumulativeLayoutShift;
          }
        }
      }).observe({type: 'layout-shift', buffered: true});
    } catch {
      console.warn('Web Vitals monitoring not supported in this browser');
    }
  }
  
  // Create debug panel
  function createDebugPanel() {
    // Create panel element
    const panel = document.createElement('div');
    panel.id = 'debug-panel';
    panel.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border-top-left-radius: 5px;
      z-index: 10000;
      max-height: 200px;
      overflow: auto;
      user-select: none;
      opacity: 0.7;
      transition: opacity 0.3s;
    `;
    
    panel.innerHTML = `
      <div id="debug-fps">FPS: --</div>
      <div id="debug-memory">Mem: --</div>
      <div id="debug-vitals">LCP: --, CLS: --, FID: --</div>
      <div>
        <button id="debug-toggle-fps">Start FPS</button>
        <button id="debug-hide">Hide</button>
      </div>
    `;
    
    // Add event listeners
    panel.addEventListener('mouseenter', () => {
      panel.style.opacity = '1';
    });
    
    panel.addEventListener('mouseleave', () => {
      panel.style.opacity = '0.7';
    });
    
    // Add to body when DOM is ready
    if (document.body) {
      document.body.appendChild(panel);
      attachDebugPanelListeners();
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(panel);
        attachDebugPanelListeners();
      });
    }
  }
  
  // Attach listeners to debug panel buttons
  function attachDebugPanelListeners() {
    const toggleFpsBtn = document.getElementById('debug-toggle-fps');
    const hideBtn = document.getElementById('debug-hide');
    
    if (toggleFpsBtn) {
      toggleFpsBtn.addEventListener('click', () => {
        if (measuring) {
          stopFPSMeasurement();
          toggleFpsBtn.textContent = 'Start FPS';
        } else {
          startFPSMeasurement();
          toggleFpsBtn.textContent = 'Stop FPS';
        }
      });
    }
    
    if (hideBtn) {
      hideBtn.addEventListener('click', () => {
        const panel = document.getElementById('debug-panel');
        if (panel) {
          panel.style.display = 'none';
        }
      });
    }
  }
  
  // Monitor memory usage if available
  function monitorMemory() {
    if (performance.memory) {
      const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
      const total = Math.round(performance.memory.totalJSHeapSize / 1048576);
      const limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
      
      perfData.memory.push({
        timestamp: new Date().toISOString(),
        used,
        total,
        percent: Math.round((used / limit) * 100)
      });
      
      // Log high memory usage
      if (used > total * 0.9) {
        console.warn(`⚠️ High memory usage: ${used}MB / ${total}MB`);
      }
      
      // Update debug panel if it exists
      const memElement = document.getElementById('debug-memory');
      if (memElement) {
        memElement.textContent = `Mem: ${used}MB / ${total}MB`;
        memElement.style.color = used > total * 0.9 ? 'red' : 'white';
      }
    }
  }
  
  // Update web vitals in debug panel
  function updateWebVitalsDisplay() {
    const vitalsElement = document.getElementById('debug-vitals');
    if (vitalsElement && perfData.webVitals) {
      const lcp = perfData.webVitals.LCP ? `${Math.round(perfData.webVitals.LCP)}ms` : '--';
      const cls = perfData.webVitals.CLS ? perfData.webVitals.CLS.toFixed(3) : '--';
      const fid = perfData.webVitals.FID ? `${Math.round(perfData.webVitals.FID)}ms` : '--';
      
      vitalsElement.textContent = `LCP: ${lcp}, CLS: ${cls}, FID: ${fid}`;
    }
  }
  
  // Auto-start monitoring when animations are running
  function watchForAnimations() {
    // Watch for algorithm start buttons
    document.addEventListener('click', function(event) {
      const button = event.target.closest('button');
      if (button && (
          button.textContent.includes('Sort') || 
          button.textContent.includes('Visualize') ||
          button.closest('.algorithm-controls')
      )) {
        startFPSMeasurement();
      }
    });
    
    // Watch for sorted array or algorithm completion
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.classList?.contains('sorted') || 
            mutation.target.classList?.contains('completed')) {
          stopFPSMeasurement();
        }
      });
    });
    
    // Start observing when DOM is loaded
    window.addEventListener('DOMContentLoaded', () => {
      // Observe array container and algorithm status elements
      const containers = document.querySelectorAll(
        '.array-container, .visualization-container, .algorithm-status'
      );
      
      containers.forEach(container => {
        observer.observe(container, { 
          attributes: true, 
          attributeFilter: ['class'] 
        });
      });
    });
  }
  
  // Initialize all monitoring
  captureWebVitals();
  watchForAnimations();
  
  // Periodic memory and resource checks
  setInterval(() => {
    captureResourceTiming();
    monitorMemory();
    updateWebVitalsDisplay();
  }, 5000);
  
  // Mark the end of the debug script load
  console.log('Debug utilities loaded 🐞');
  
  // Expose debugging utilities to console
  window.debugUtils = {
    startFPSMeasurement,
    stopFPSMeasurement,
    getData: () => perfData,
    togglePanel: () => {
      const panel = document.getElementById('debug-panel');
      if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      } else {
        createDebugPanel();
      }
    }
  };
})(); 
/**
 * SortVision Mobile Fixes
 * 
 * This script addresses common mobile browser issues:
 * 1. iOS safari viewport height issues
 * 2. Prevents unintended zooming on inputs
 * 3. Fixes scroll bouncing issues
 * 4. Optimizes touch interactions for visualization
 */

(function() {
  // Fix for iOS viewport height issues
  function setAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
  
  // Apply on initial load
  setAppHeight();
  
  // Apply on resize and orientation change
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', () => {
    // Small delay to ensure dimensions are correct after rotation
    setTimeout(setAppHeight, 50);
  });
  
  // Fix for iOS input zoom
  const viewportMeta = document.querySelector('meta[name=viewport]');
  if (viewportMeta) {
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    
    // Restore normal scaling after 1 second
    setTimeout(() => {
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover';
    }, 1000);
  }
  
  // Fix for scroll bounce effect on iOS
  document.addEventListener('touchmove', function(event) {
    // Only prevent default if not in an input/select/textarea and at the edge of the page
    if (
      !event.target.closest('input, select, textarea') && 
      (document.documentElement.scrollTop === 0 && event.touches[0].screenY > 50) || 
      (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight && event.touches[0].screenY < 0)
    ) {
      event.preventDefault();
    }
  }, { passive: false });
  
  // Optimize visualization interactions on mobile
  window.addEventListener('DOMContentLoaded', () => {
    // Find all visualizations
    const visualizations = document.querySelectorAll('.visualization-container, .array-container, .array-bar');
    
    // Optimize touch interaction
    visualizations.forEach(vis => {
      // Add touch-optimized class
      vis.classList.add('touch-optimized');
      
      // Optimize interactions
      vis.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
          e.preventDefault(); // Prevent pinch zoom
        }
      }, { passive: false });
      
      // Prevent unintended scrolling during visualization interaction
      vis.addEventListener('touchmove', (e) => {
        // Only prevent if it's a horizontal swipe in visualization area
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        
        // If horizontal movement is greater than vertical, prevent default
        if (Math.abs(startX - e.touches[0].clientX) > Math.abs(startY - e.touches[0].clientY)) {
          e.preventDefault();
        }
      }, { passive: false });
    });
  });
  
  // iOS specific adjustments
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    document.documentElement.classList.add('ios');
    
    // Fix for iOS focus issues
    document.addEventListener('touchend', (e) => {
      // Fix iOS focus issues with buttons
      if (e.target.tagName === 'BUTTON' || e.target.role === 'button') {
        e.preventDefault();
        e.target.click();
      }
    }, false);
    
    // Fix for iOS scroll restoration
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        // Page was loaded from cache (user navigated back)
        setTimeout(setAppHeight, 50);
      }
    });
  }
  
  // Add passive listeners for common events to improve scrolling performance
  window.addEventListener('scroll', () => {}, { passive: true });
  window.addEventListener('touchstart', () => {}, { passive: true });
  window.addEventListener('touchend', () => {}, { passive: true });
  
  // Debug info in dev mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Mobile fixes applied');
    console.log('Is iOS:', isIOS);
    console.log('--app-height:', document.documentElement.style.getPropertyValue('--app-height'));
    console.log('Window inner height:', window.innerHeight);
    console.log('Document height:', document.documentElement.scrollHeight);
  }
})(); 
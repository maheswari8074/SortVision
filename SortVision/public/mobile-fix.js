// Mobile scrolling fix script

// Fix for iOS momentum scrolling
document.addEventListener('DOMContentLoaded', function() {
  // Fix for iOS scrolling issues
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Fix for iOS Safari 100vh issue
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', appHeight);
    appHeight();
    
    // Fix for iOS Safari scrolling
    const scrollableElements = document.querySelectorAll('.visualization-container, body, #root');
    scrollableElements.forEach(element => {
      if (element) {
        element.style.webkitOverflowScrolling = 'touch';
        element.style.overflowY = 'auto';
      }
    });
    
    // Prevent document body from scrolling when touching inside visualization
    document.addEventListener('touchmove', function(e) {
      // Only prevent default if inside visualization container and trying to zoom
      if (e.target.closest('.visualization-container') && e.scale !== 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Allow scrolling in the rest of the document
    document.addEventListener('touchstart', function(e) {
      if (!e.target.closest('.visualization-container')) {
        e.stopPropagation();
      }
    }, { passive: true });
  }
}); 
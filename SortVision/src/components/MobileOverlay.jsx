/**
 * MobileOverlay.jsx
 * 
 * A React component that displays a stylized overlay when users access SortVision 
 * on mobile devices, suggesting desktop usage for optimal experience.
 * 
 * Features:
 * - Detects mobile devices via user agent and viewport width
 * - Animated entrance and exit sequences
 * - Interactive buttons to continue on mobile or request desktop site
 * - Remembers user preference via localStorage
 * - Responsive styling with Tailwind CSS
 * - Decorative background elements matching SortVision's aesthetic
 * 
 * Usage:
 * Import and include this component at the root level of your application.
 * The overlay will automatically display for mobile devices if the user
 * hasn't previously chosen to continue on mobile.
 * 
 */

import React, { useEffect, useState } from 'react';
import { Laptop, ArrowRight, LayoutTemplate, AlertTriangle, Terminal, Code, Smartphone } from 'lucide-react';

const MobileOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    const hasUserContinued = localStorage.getItem('continue-on-mobile');
    const hasRequestedDesktop = localStorage.getItem('request-desktop-site') === 'true';
    
    const isMobileDevice = () => {
      return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
             (window.innerWidth <= 768);
    };
    
    // If user has requested desktop mode before, apply those settings
    if (hasRequestedDesktop) {
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute('content', 'width=1280, initial-scale=1.0');
      document.documentElement.classList.add('desktop-view-requested');
      return; // Don't show overlay
    }
    
    // Otherwise, show overlay for mobile devices if they haven't continued
    if (isMobileDevice() && hasUserContinued !== 'true') {
      setShowOverlay(true);
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => setAnimationStage(1), 100);
      setTimeout(() => setAnimationStage(2), 600);
      setTimeout(() => setAnimationStage(3), 1100);
    }
    
    // Listen for orientation changes to update layout if needed
    window.addEventListener('orientationchange', () => {
      if (hasRequestedDesktop) {
        // Ensure desktop view is maintained after orientation change
        setTimeout(() => {
          const viewport = document.querySelector('meta[name=viewport]');
          viewport.setAttribute('content', 'width=1280, initial-scale=1.0');
        }, 100);
      }
    });
    
    return () => {
      window.removeEventListener('orientationchange', () => {});
    };
  }, []);
  
  const handleContinue = () => {
    setAnimationStage(4);
    setTimeout(() => {
      setShowOverlay(false);
      document.body.style.overflow = 'auto';
    }, 500);
    localStorage.setItem('continue-on-mobile', 'true');
  };
  
  const handleRequestDesktop = () => {
    setAnimationStage(4);
    setTimeout(() => {
      // Try to request fullscreen for better experience
      if (typeof(document.documentElement.requestFullscreen) !== 'undefined') {
        document.documentElement.requestFullscreen().catch(err => {
          console.log("Error attempting to enable full-screen mode:", err);
        });
      }

      // Set desktop-like viewport (more effective than just width)
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute('content', 'width=1280, initial-scale=1.0');
      
      // Inject a script that attempts to switch to desktop mode
      const script = document.createElement('script');
      script.textContent = `
        // Try to trick browser into desktop mode by pretending to be a desktop browser
        try {
          // Set desktop user agent hint via navigator.userAgentData if available
          if (navigator.userAgentData && navigator.userAgentData.brands) {
            Object.defineProperty(navigator, 'userAgentData', {
              value: {
                ...navigator.userAgentData,
                mobile: false,
                platform: 'Windows'
              },
              configurable: true
            });
          }
          
          // Create a hidden link that would open in desktop mode
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = '?desktop=1';
          link.setAttribute('rel', 'nofollow');
          link.setAttribute('data-view', 'desktop');
          link.setAttribute('data-request-desktop', 'true');
          document.body.appendChild(link);
          
          // Trigger click on the link
          link.click();
          
          // Remove link after click
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
          
          // Also set a cookie and localStorage flag that our code can check
          document.cookie = "view=desktop; path=/; max-age=86400";
          localStorage.setItem('request-desktop-site', 'true');
        } catch (e) {
          console.error("Failed to set desktop mode:", e);
        }
      `;
      document.head.appendChild(script);
      
      // Add a class to the HTML element to apply desktop-specific styles
      document.documentElement.classList.add('desktop-view-requested');
      
      // Hide the overlay
      setShowOverlay(false);
      document.body.style.overflow = 'auto';
    }, 500);
    localStorage.setItem('continue-on-mobile', 'true');
  };
  
  if (!showOverlay) return null;
  
  return (
    <div 
      className={`fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-5 text-center
                 ${animationStage === 4 ? 'animate-fade-out animate-duration-[500ms]' : 'animate-fade-in animate-duration-[800ms]'}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code 
          className="absolute text-slate-800/30 top-[15%] left-[10%] h-24 w-24 animate-spin animate-infinite animate-duration-[15000ms]" 
          aria-hidden="true" 
        />
        <Terminal 
          className="absolute text-slate-800/20 bottom-[20%] right-[15%] h-20 w-20 animate-spin animate-reverse animate-infinite animate-duration-[20000ms]" 
          aria-hidden="true" 
        />
        <Smartphone 
          className="absolute text-slate-800/20 top-[60%] left-[15%] h-16 w-16 animate-pulse animate-infinite animate-duration-[4000ms]" 
          aria-hidden="true" 
        />
        <div className="absolute top-[5%] left-[5%] text-slate-800/10 font-mono text-xs">
          {`function isMobile() {`}<br />
          {`  return screen.width < 768;`}<br />
          {`}`}
        </div>
        <div className="absolute bottom-[8%] right-[5%] text-slate-800/10 font-mono text-xs">
          {`const experience = {`}<br />
          {`  mobile: "limited",`}<br />
          {`  desktop: "optimal"`}<br />
          {`};`}
        </div>
      </div>
      
      <div className={`mb-6 text-emerald-400 transition-all duration-500 
                      ${animationStage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative">
          <Laptop className="h-16 w-16 animate-pulse animate-infinite animate-duration-[3000ms]" aria-hidden="true" />
          <div className="absolute -top-1 -right-1">
            <AlertTriangle className="h-6 w-6 text-amber-400 animate-ping animate-infinite animate-duration-[2000ms] animate-delay-500" aria-hidden="true" />
          </div>
        </div>
      </div>
      
      <h1 className={`text-2xl sm:text-3xl font-mono font-bold mb-4 text-white transition-all duration-500 
                     ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <span className="text-emerald-400">Desktop</span>
        <span className="text-purple-400">.Experience</span>
        <span className="text-slate-400">
          <span className="inline-block animate-bounce animate-infinite animate-duration-[1500ms]">(</span>
          <span className="inline-block animate-bounce animate-infinite animate-duration-[1500ms] animate-delay-100">)</span>
        </span>
      </h1>
      
      <p className={`text-base leading-relaxed mb-6 text-slate-300 max-w-md font-mono transition-all duration-500
                    ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <span className="text-amber-400 animate-pulse animate-infinite animate-duration-[2000ms]">//</span> SortVision provides optimal visualization on larger screens.
        <br/>
        <span className="animate-fade-right animate-once animate-duration-[1500ms] animate-delay-[1000ms] inline-block">
          The algorithm animations require more space for best experience.
        </span>
      </p>
      
      <div className={`flex flex-col gap-3 w-full max-w-xs transition-all duration-500
                      ${animationStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <button 
          onClick={handleContinue}
          className="py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-mono font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-md hover:shadow-emerald-500/25"
        >
          Continue Anyway
          <ArrowRight className="h-4 w-4 animate-bounce-x animate-infinite animate-duration-[1500ms]" aria-hidden="true" />
        </button>
        
        <button 
          onClick={handleRequestDesktop}
          className="py-3 px-4 bg-transparent text-slate-400 border border-slate-700 rounded-lg font-mono font-semibold text-sm transition-all hover:border-slate-600 hover:text-slate-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 hover:bg-slate-800/30"
        >
          <LayoutTemplate className="h-4 w-4 animate-pulse animate-infinite animate-duration-[2000ms]" aria-hidden="true" />
          Switch to Desktop Mode
        </button>
      </div>
      
      <div className={`mt-8 text-slate-500 text-xs font-mono transition-all duration-500
                      ${animationStage >= 3 ? 'translate-y-0 opacity-100 animate-fade-up animate-delay-[1200ms]' : 'translate-y-10 opacity-0'}`}>
        <span className="text-slate-600">/* You can revisit this choice later */</span>
      </div>
    </div>
  );
};

export default MobileOverlay; 
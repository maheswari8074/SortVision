import React, { useState } from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTutorial } from "./TutorialContext";

const StartTutorialButton = () => {
  const { startTutorial } = useTutorial();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 group">
      <div className="relative">
        {/* Outer Glow Rings */}
        <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping [animation-duration:2s] scale-110" />
        <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping [animation-duration:3s] scale-125" />

        {/* Main Button */}
        <Button
          onClick={startTutorial}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 border-2 border-emerald-300/60 hover:border-emerald-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95"
          aria-label="Start Tutorial"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300/40 via-transparent to-purple-300/30 animate-pulse" />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />

          {/* Sparkles */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: "1.5s" }} />
          </div>

          {/* Icon */}
          <Compass className={`h-8 w-8 relative z-10 text-slate-900 transition-all duration-500 ${isHovered ? "scale-125 rotate-12 drop-shadow-2xl" : "scale-100 rotate-0"}`} />
        </Button>

        {/* Tooltip */}
        <div className={`absolute bottom-full left-0 mb-3 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
          <div className="bg-slate-900/95 backdrop-blur-sm text-emerald-400 text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-emerald-500/30 font-mono relative">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">//</span>
              <span>Start Tutorial</span>
              <span className="text-emerald-300">🧭</span>
            </div>
            <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95" />
            <div className="absolute inset-0 rounded-xl bg-emerald-400/10 animate-pulse" />
          </div>
        </div>

        {/* Floating particles (same effect) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-ping opacity-60"
              style={{
                top: `${20 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                left: `${20 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartTutorialButton;

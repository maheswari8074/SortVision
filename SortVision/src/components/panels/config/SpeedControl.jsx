import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Timer, Turtle, BookOpen, Presentation, Zap } from "lucide-react";

/**
 * Speed Control Component
 *
 * A sophisticated slider component for controlling animation speed with:
 * - Visual feedback and animations
 * - Precise control over delay timing
 * - Speed presets for different learning styles
 * - Quick adjustment buttons
 * - Status indicators
 * - Accessibility features
 *
 * Features:
 * - Range: 1ms to 1000ms
 * - Visual speed representation
 * - Animated background effects
 * - Speed presets (Study/Learn/Demo/Compare)
 * - 2x and ½x quick adjustment buttons
 */

const SpeedControl = ({ speed, setSpeed, isSorting, audio }) => {
  const [activePreset, setActivePreset] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define speed presets with their configurations
  const presets = [
    {
      id: "study",
      name: "Study",
      icon: Turtle,
      speed: 800, // Very slow for step-by-step analysis
      description: "Very slow for step-by-step analysis",
      color: "from-emerald-500/30 to-emerald-600/30",
      borderColor: "border-emerald-500/50",
      textColor: "text-emerald-400",
    },
    {
      id: "learn",
      name: "Learn",
      icon: BookOpen,
      speed: 400, // Moderate pace for understanding
      description: "Moderate pace for understanding",
      color: "from-blue-500/30 to-blue-600/30",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-400",
    },
    {
      id: "demo",
      name: "Demo",
      icon: Presentation,
      speed: 150, // Fast for presentations
      description: "Fast for presentations",
      color: "from-purple-500/30 to-purple-600/30",
      borderColor: "border-purple-500/50",
      textColor: "text-purple-400",
    },
    {
      id: "compare",
      name: "Compare",
      icon: Zap,
      speed: 50, // Very fast for quick comparisons
      description: "Very fast for quick comparisons",
      color: "from-orange-500/30 to-orange-600/30",
      borderColor: "border-orange-500/50",
      textColor: "text-orange-400",
    },
  ];

  // Update active preset when speed changes externally
  useEffect(() => {
    const matchingPreset = presets.find(
      (preset) => Math.abs(preset.speed - speed) < 25
    );
    setActivePreset(matchingPreset?.id || null);
  }, [speed]);

  const handlePresetClick = async (preset) => {
    if (isTransitioning || activePreset === preset.id || isSorting) return;

    setIsTransitioning(true);
    setActivePreset(preset.id);
    audio?.playAccessSound(); // Play sound effect when changing preset

    // Smooth transition animation
    const startSpeed = speed;
    const endSpeed = preset.speed;
    const duration = 400; // ms
    const steps = 20;
    const stepDuration = duration / steps;
    const speedStep = (endSpeed - startSpeed) / steps;

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const newSpeed = Math.round(startSpeed + speedStep * i);
        setSpeed(newSpeed);

        if (i === steps) {
          setIsTransitioning(false);
        }
      }, i * stepDuration);
    }
  };

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/speed overflow-hidden h-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-emerald-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: "2.3s" }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/speed:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/speed:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <label
          className="font-mono text-sm text-slate-400 mb-2 block flex items-center relative z-10 group-hover/speed:text-emerald-400 transition-colors duration-300"
          id="speed-control-label"
        >
          <Timer
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <span className="transition-colors duration-300">
            // animation delay:{" "}
            <span className="text-emerald-400 ml-1">{speed}ms</span>
          </span>
        </label>

        {/* Speed Presets Section */}
        <div className="mb-6 relative z-10">
          <div className="font-mono text-xs text-slate-400 mb-3 flex items-center">
            <span className="text-emerald-400">//</span>
            <span className="ml-1">speed presets</span>
            {isTransitioning && (
              <span className="ml-2 text-blue-400 animate-pulse">
                adjusting...
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => {
              const Icon = preset.icon;
              const isActive = activePreset === preset.id;

              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset)}
                  disabled={isTransitioning || isSorting}
                  className={`
                    relative p-2.5 rounded-md border transition-all duration-300 text-xs font-mono
                    overflow-hidden group/preset
                    ${
                      isActive
                        ? `bg-gradient-to-r ${preset.color} ${preset.borderColor} ${preset.textColor} shadow-lg`
                        : "bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-300 hover:bg-slate-800"
                    }
                    ${
                      isTransitioning || isSorting
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:shadow-md"
                    }
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  `}
                  aria-label={`${preset.name}: ${preset.description}`}
                  title={preset.description}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full border border-slate-900 animate-pulse"></div>
                  )}

                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover/preset:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${preset.color}`}
                  ></div>

                  <div className="flex items-center space-x-2 relative z-10">
                    <Icon size={14} className="flex-shrink-0" />
                    <div className="flex flex-col items-start min-w-0">
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-xs opacity-75">
                        {preset.speed}ms
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover/preset:w-full transition-all duration-300 ${
                      isActive ? "bg-emerald-400/50" : "bg-slate-500/50"
                    }`}
                  ></div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-6 mb-8">
          <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
            <span className="text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
              Fast
            </span>
            <span className="text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
              Medium
            </span>
            <span className="text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
              Slow
            </span>
          </div>
          <div className="relative">
            {/* Track background with enhanced glow */}
            <div className="absolute inset-0 bg-emerald-400/5 rounded-full group-hover/speed:bg-emerald-400/10 transition-all duration-300"></div>
            {/* Active track with optimized performance */}
            <div
              className="absolute h-full bg-emerald-400/20 rounded-full overflow-hidden origin-left"
              style={{
                transform: `scaleX(${(speed - 1) / (1000 - 1)})`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="absolute inset-0 w-0 group-hover/speed:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"></div>
            </div>
            <Slider
              value={[speed]}
              min={1}
              max={1000}
              step={1}
              onValueChange={(value) => setSpeed(value[0])}
              disabled={isSorting}
              className="relative z-10"
              name="animation speed"
              aria-label="Animation Speed Slider"
              aria-labelledby="speed-control-label"
            />
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-emerald-400/10 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
            <span className="group-hover/speed:text-emerald-300 text-emerald-300 transition-colors duration-300">
              1ms
            </span>
            <span className="group-hover/speed:text-emerald-300 text-emerald-300 transition-colors duration-300">
              500ms
            </span>
            <span className="group-hover/speed:text-emerald-300 text-emerald-300 transition-colors duration-300">
              1000ms
            </span>
          </div>
        </div>

        {/* Speed Control Status Bar */}
        <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm mr-1 animate-pulse ${
                speed < 100
                  ? "bg-emerald-400/30"
                  : speed < 500
                  ? "bg-yellow-400/30"
                  : "bg-red-400/30"
              }`}
            ></div>
            <span
              className={
                speed < 100
                  ? "text-emerald-400"
                  : speed < 500
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              Delay: {speed}ms
            </span>
          </div>

          {/* Speed adjustment buttons */}
          <div className="flex space-x-1">
            <button
              onClick={() => {
                if (!isSorting && speed < 1000) {
                  const newSpeed = Math.min(1000, speed * 2);
                  setSpeed(newSpeed);
                  audio.playAccessSound(); // Play sound effect
                }
              }}
              disabled={isSorting || speed >= 1000}
              className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
              aria-label="Double animation delay"
            >
              <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-mono text-[10px]">
                2x
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
            </button>
            <button
              onClick={() => {
                if (!isSorting && speed > 1) {
                  const newSpeed = Math.max(1, speed / 2);
                  setSpeed(newSpeed);
                  audio.playAccessSound(); // Play sound effect
                }
              }}
              disabled={isSorting || speed <= 1}
              className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
              aria-label="Halve animation delay"
            >
              <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-mono text-[10px]">
                ½x
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
            </button>
          </div>

          <div className="text-[10px] text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
            {speed < 100
              ? "Visualize patterns"
              : speed < 500
              ? "Follow the steps"
              : "Detailed analysis"}
          </div>
        </div>

        {/* Visual speed representation with optimized performance */}
        <div className="mt-4 h-8 bg-slate-800/80 rounded-lg border border-slate-700 overflow-hidden relative group/bar">
          <div
            className="h-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 relative overflow-hidden origin-left"
            style={{
              transform: `scaleX(${(speed - 1) / (1000 - 1)})`,
              transition: "transform 0.05s ease-out",
            }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 w-0 group-hover/speed:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-emerald-400/30"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-emerald-400/70 font-mono group-hover/speed:text-emerald-400 transition-colors duration-300">
            {speed}ms delay
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;

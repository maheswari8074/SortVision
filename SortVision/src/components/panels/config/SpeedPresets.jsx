import React, { useState, useEffect } from "react";
import { Turtle, BookOpen, Presentation, Zap } from "lucide-react";

const SpeedPresets = ({ currentSpeed, onSpeedChange, className = "" }) => {
  const [activePreset, setActivePreset] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define speed presets with their configurations
  const presets = [
    {
      id: "study",
      name: "Study",
      icon: Turtle,
      speed: 100, // Very slow for step-by-step analysis
      description: "Very slow for step-by-step analysis",
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      id: "learn",
      name: "Learn",
      icon: BookOpen,
      speed: 250, // Moderate pace for understanding
      description: "Moderate pace for understanding",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "demo",
      name: "Demo",
      icon: Presentation,
      speed: 500, // Fast for presentations
      description: "Fast for presentations",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: "compare",
      name: "Compare",
      icon: Zap,
      speed: 800, // Very fast for quick comparisons
      description: "Very fast for quick comparisons",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  // Update active preset when speed changes externally
  useEffect(() => {
    const matchingPreset = presets.find(
      (preset) => Math.abs(preset.speed - currentSpeed) < 25
    );
    setActivePreset(matchingPreset?.id || null);
  }, [currentSpeed]);

  const handlePresetClick = async (preset) => {
    if (isTransitioning || activePreset === preset.id) return;

    setIsTransitioning(true);
    setActivePreset(preset.id);

    // Smooth transition animation
    const startSpeed = currentSpeed;
    const endSpeed = preset.speed;
    const duration = 300; // ms
    const steps = 15;
    const stepDuration = duration / steps;
    const speedStep = (endSpeed - startSpeed) / steps;

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const newSpeed = Math.round(startSpeed + speedStep * i);
        onSpeedChange(newSpeed);

        if (i === steps) {
          setIsTransitioning(false);
        }
      }, i * stepDuration);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Title */}
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Speed Presets
        </h4>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {presets.map((preset) => {
          const Icon = preset.icon;
          const isActive = activePreset === preset.id;

          return (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              disabled={isTransitioning}
              className={`
                relative p-2 rounded-md border transition-all duration-200 text-xs
                ${
                  isActive
                    ? `${preset.color} border-transparent text-white shadow-md`
                    : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                }
                ${
                  isTransitioning
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-sm"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              `}
              aria-label={`${preset.name}: ${preset.description}`}
              title={preset.description}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white"></div>
              )}

              <div className="flex items-center space-x-1.5">
                <Icon size={14} className="flex-shrink-0" />
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-medium truncate">{preset.name}</span>
                  <span className="text-xs opacity-75">{preset.speed}ms</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Status */}
      {isTransitioning && (
        <div className="text-xs text-blue-500 dark:text-blue-400 text-center animate-pulse">
          Adjusting speed...
        </div>
      )}
    </div>
  );
};

export default SpeedPresets;

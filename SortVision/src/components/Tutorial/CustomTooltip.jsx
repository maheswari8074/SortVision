import React from "react";

const CustomTooltip = ({
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  skipProps,
}) => {
  return (
    <div
      {...tooltipProps}
      className="bg-slate-900 border border-emerald-500/30 text-slate-200 rounded-lg shadow-lg p-4 w-[300px] max-w-full"
    >
      {/* Step Content */}
      <div className="mb-4 text-sm leading-relaxed font-mono text-emerald-200">
        {step.content}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center text-sm">
        <button
          {...backProps}
          className="text-slate-400 hover:text-emerald-400 transition-colors"
        >
          Back
        </button>

        <div className="flex space-x-2">
          <button
            {...skipProps}
            className="text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Skip
          </button>
          <button
            {...primaryProps}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-3 py-1 rounded font-mono transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;

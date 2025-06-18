import React, { createContext, useState, useContext, useCallback } from "react";
import Joyride from "react-joyride";
import { steps } from "./tutorialSteps";
import CustomTooltip from "./CustomTooltip";

const TutorialContext = createContext({
  startTutorial: () => {},
  restartTutorial: () => {},
  run: false,
});

export const useTutorial = () => useContext(TutorialContext);
export const TutorialProvider = ({ children }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const startTutorial = useCallback(() => {
    setStepIndex(0);
    setRun(true);
  }, []);

  const restartTutorial = useCallback(() => {
    setStepIndex(0);
    setRun(false);
    // Wait a tick before starting again to force Joyride reset
    setTimeout(() => setRun(true), 100);
  }, []);

  const handleJoyrideCallback = (data) => {
    const { action, index, type, status } = data;

    if (["finished", "skipped"].includes(status)) {
      setRun(false);
      setStepIndex(0);
    }

    if (type === "step:after") {
      if (action === "next") {
        setStepIndex((prev) => prev + 1);
      } else if (action === "prev") {
        setStepIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    if (type === "target:notFound") {
      setStepIndex((prev) => prev + 1);
    }
  };

  return (
    <TutorialContext.Provider value={{ startTutorial, restartTutorial, run }}>
      <Joyride
        steps={steps}
        continuous
        scrollToFirstStep={true}
        scrollToSteps={true}
        disableScrolling={false}
        showProgress
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        tooltipComponent={CustomTooltip}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: "#0f172a",
            backgroundColor: "#0f172a",
            textColor: "#e2e8f0",
            primaryColor: "#10b981",
          },
        }}
      />
      {children}
    </TutorialContext.Provider>
  );
};

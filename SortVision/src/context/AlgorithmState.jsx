// AlgorithmState.jsx
import React, { createContext, useContext, useState } from "react";

const AlgorithmStateContext = createContext();

export const AlgorithmStateProvider = ({ children }) => {
    const [algorithmName, setAlgorithmName] = useState(null);
    const [step, setStep] = useState(null);
    const [array, setArray] = useState([]);
    const [history, setHistory] = useState([]);

    // ✅ Never return null — provide fallback values instead
    const getContextObject = () => {
        let normalizedStep;

        if (typeof step !== 'object' || step === null) {
            // e.g., "Merging arrays" or step = 4
            normalizedStep = {
                compare: null,
                swap: null,
                description: typeof step === 'string' || typeof step === 'number' ? step : null,
            };
        } else {
            // step is already an object, e.g., { compare, swap }
            normalizedStep = {
                compare: step.compare ?? null,
                swap: step.swap ?? null,
                description: step.description ?? null,
            };
        }

        return {
            algorithm: algorithmName ?? "Unknown",
            step: normalizedStep,
            array: Array.isArray(array) ? array : [],
        };
    };


    const addToHistory = (entry) => {
        setHistory((prev) => [...prev, entry]);
    };

    return (
        <AlgorithmStateContext.Provider
            value={{
                algorithmName,
                setAlgorithmName,
                step,
                setStep,
                array,
                setArray,
                history,
                addToHistory,
                getContextObject,
            }}
        >
            {children}
        </AlgorithmStateContext.Provider>
    );
};

export const useAlgorithmState = () => {
    const context = useContext(AlgorithmStateContext);
    if (!context) {
        throw new Error("useAlgorithmState must be used within AlgorithmStateProvider");
    }
    return context;
};

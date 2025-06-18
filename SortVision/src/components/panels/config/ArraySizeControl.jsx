import React, { useState, useEffect, useCallback } from 'react';
import {
    Upload,
    Clipboard,
    Type,
    Wand2,
    TriangleAlert,
    X,
    CheckCircle,
    Info,
    Database, // Keep Database icon for consistency if needed, though for main container it's more about the visual effect
} from 'lucide-react';
// Assuming '@/components/ui/slider' points to your Slider component
import { Slider } from "@/components/ui/slider"; 

// --- Constants ---
const MIN_VALUE = -999;
const MAX_VALUE = 999;
const MIN_ARRAY_SIZE = 2; // Adjusted to 2 for more meaningful sorting demonstrations
const MAX_ARRAY_SIZE = 200; // Max size to prevent performance issues and UI clutter

// --- Array Input Manager Class ---
/**
 * Manages parsing and basic validation of input strings into arrays of numbers.
 */
class ArrayInputManager {
    /**
     * Parses an input string (comma/space separated) into numbers and identifies invalid parts.
     * @param {string} inputString - The raw string input from text area or file.
     * @returns {{numbers: number[], invalidInputStrings: string[]}} An object containing parsed numbers and any invalid string parts.
     */
    static parseAndValidateInput(inputString) {
        const parts = inputString
            .split(/[,\s]+/) // Split by comma or any whitespace
            .map((s) => s.trim())
            .filter(Boolean); // Remove empty strings (e.g., from multiple spaces or trailing commas)

        const numbers = [];
        const invalidInputStrings = new Set(); // Use a Set to store unique invalid parts

        for (const part of parts) {
            // Check if it's strictly an integer (positive or negative, no decimals, no non-numeric chars)
            if (/^-?\d+$/.test(part)) {
                numbers.push(parseInt(part, 10));
            } else {
                invalidInputStrings.add(part);
            }
        }
        return { numbers, invalidInputStrings: Array.from(invalidInputStrings) };
    }
}

// --- Pattern Generator Class ---
/**
 * Generates arrays with various predefined patterns for sorting algorithm testing.
 */
class PatternGenerator {
    /**
     * Generates a nearly sorted array with a specified perturbation.
     * @param {number} size - The desired size of the array.
     * @param {number} perturbation - A factor (0-1) indicating how much the array should be perturbed (random swaps).
     * @returns {number[]} The generated nearly sorted array.
     */
    static generateNearlySorted(size, perturbation = 0.05) {
        const array = Array.from({ length: size }, (_, i) => i + 1); // Start with a sorted array
        // Number of swaps is proportional to size * perturbation * size (makes larger arrays more shuffled relatively)
        const numSwaps = Math.floor(size * perturbation * size); 

        for (let i = 0; i < numSwaps; i++) {
            const idx1 = Math.floor(Math.random() * size);
            let idx2 = Math.floor(Math.random() * size);
            while (idx2 === idx1) { // Ensure idx2 is different from idx1 for a meaningful swap
                idx2 = Math.floor(Math.random() * size);
            }
            [array[idx1], array[idx2]] = [array[idx2], array[idx1]]; // Swap elements
        }
        // Clamp values to the allowed global range
        return array.map(num => Math.max(MIN_VALUE, Math.min(MAX_VALUE, num)));
    }

    /**
     * Generates an array sorted in reverse order.
     * @param {number} size - The desired size of the array.
     * @returns {number[]} The generated reverse sorted array.
     */
    static generateReverseSorted(size) {
        return Array.from({ length: size }, (_, i) => size - i)
            .map(num => Math.max(MIN_VALUE, Math.min(MAX_VALUE, num))); // Clamp values
    }

    /**
     * Generates an array with a few unique values, repeated many times.
     * @param {number} size - The desired size of the array.
     * @param {number} uniqueCount - The number of unique values to use.
     * @returns {number[]} The generated array with few unique values.
     */
    static generateFewUnique(size, uniqueCount = 5) {
        // Generate `uniqueCount` random unique values within the allowed range
        const uniqueValues = Array.from({ length: uniqueCount }, () =>
            Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
        );
        // Fill the array by randomly picking from the unique values
        return Array.from({ length: size }, () => {
            const randomIndex = Math.floor(Math.random() * uniqueCount);
            return uniqueValues[randomIndex];
        });
    }

    /**
     * Generates an array with many duplicate values based on a duplicate factor.
     * @param {number} size - The desired size of the array.
     * @param {number} duplicateFactor - A factor (0-1) where 1 means extremely high duplicates.
     * @returns {number[]} The generated array with many duplicates.
     */
    static generateManyDuplicates(size, duplicateFactor = 0.5) {
        // Calculate the number of unique values to generate based on the duplicate factor
        const uniqueValuesToGenerate = Math.max(
            1, // Ensure at least one unique value
            Math.floor(size * (1 - duplicateFactor))
        );
        // Reuse generateFewUnique with the calculated unique count
        return PatternGenerator.generateFewUnique(size, uniqueValuesToGenerate);
    }

    /**
     * Generates an array with extremely high duplicates (e.g., 99% of values are the same).
     * @param {number} size - The desired size of the array.
     * @param {number} duplicateFactor - A high factor (e.g., 0.99) for very high duplication.
     * @returns {number[]} The generated array with extremely high duplicates.
     */
    static generateHighDuplicates(size, duplicateFactor = 0.99) {
        const uniqueValuesToGenerate = Math.max(
            1,
            Math.floor(size * (1 - duplicateFactor))
        );
        return PatternGenerator.generateFewUnique(size, uniqueValuesToGenerate);
    }

    /**
     * Generates an array with values following a bell curve (normal) distribution.
     * Uses the Box-Muller transform for generating Gaussian-distributed numbers.
     * @param {number} size - The desired size of the array.
     * @param {number} mean - The mean of the distribution.
     * @param {number} stdDev - The standard deviation of the distribution.
     * @returns {number[]} The generated array with bell curve distribution.
     */
    static generateBellCurve(size, mean = (MAX_VALUE + MIN_VALUE) / 2, stdDev = (MAX_VALUE - MIN_VALUE) / 6) {
        return Array.from({ length: size }, () => {
            let u = 0,
                v = 0;
            while (u === 0) u = Math.random(); // Converting [0,1) to (0,1) to avoid log(0)
            while (v === 0) v = Math.random();
            // Box-Muller transform
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            const rawValue = Math.floor(z * stdDev + mean);
            // Clamp values to the allowed global range
            return Math.max(MIN_VALUE, Math.min(MAX_VALUE, rawValue));
        });
    }

    /**
     * Generates an array with a stepped pattern (blocks of constant values).
     * @param {number} size - The desired size of the array.
     * @param {number} stepCount - The number of distinct "steps" or blocks of values.
     * @returns {number[]} The generated stepped array.
     */
    static generateStepped(size, stepCount = 5) {
        if (stepCount <= 0 || stepCount > size) {
            stepCount = Math.max(1, Math.min(size, 5)); // Default to 5 or size if invalid
        }
        const stepSize = Math.floor(size / stepCount);
        const array = [];
        for (let i = 0; i < stepCount; i++) {
            // Generate a random value for the current step
            const value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
            // Fill the block with this value
            for (let j = 0; j < stepSize && array.length < size; j++) {
                array.push(value);
            }
        }
        // Fill remaining elements if size is not perfectly divisible by stepCount
        while (array.length < size) {
            // Use the last added value, or a random one if array is still empty (shouldn't happen with size >= 2)
            array.push(array[array.length - 1] || Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE);
        }
        return array;
    }
}

// --- React Component ---
/**
 * ArrayInput Component: Provides multiple ways for users to input or generate arrays
 * for sorting visualization, including text input, file upload, clipboard paste,
 * and various pattern generations.
 *
 * @param {object} props - The component props.
 * @param {function(number[]): void} props.setOriginalArray - Callback to update the array in the parent component.
 * @param {boolean} props.isSorting - Indicates if a sorting animation is currently in progress (disables inputs).
 */
const ArrayInput = ({ setOriginalArray = () => {}, isSorting }) => { // Added default empty function for setOriginalArray
    const [inputMethod, setInputMethod] = useState('text');
    const [inputValue, setInputValue] = useState('');
    const [patternType, setPatternType] = useState('nearlySorted');
    const [patternParam1, setPatternParam1] = useState(50); // Default size for patterns
    const [patternParam2, setPatternParam2] = useState(undefined); // Perturbation/Duplicate Factor etc.
    const [patternParam3, setPatternParam3] = useState(undefined); // For bellCurve's Std Dev
    const [inputErrors, setInputErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    /**
     * Clears all current error and success messages.
     */
    const clearMessages = () => {
        setInputErrors([]);
        setSuccessMessage('');
    };

    /**
     * Centralized function to set the array and perform validation checks.
     * This ensures all input methods (manual, file, pattern) use the same validation logic.
     *
     * @param {number[]} arr - The array to validate and set.
     * @param {'input' | 'pattern'} source - The source of the array (for tailored success messages).
     */
    const setAndValidateArray = useCallback(
        (arr, source = 'input') => {
            clearMessages(); // Always clear previous messages

            if (!Array.isArray(arr)) {
                setInputErrors(['Invalid array format provided.']);
                setOriginalArray([]);
                return;
            }

            // 1. Check Array Size (only apply minimum size validation if array is not empty from input)
            if (arr.length === 0 && source === 'input') {
                // If text input is empty, just clear the array, don't show an error.
                setOriginalArray([]);
                return;
            }
            if (arr.length < MIN_ARRAY_SIZE) {
                setInputErrors([
                    `Array must contain at least ${MIN_ARRAY_SIZE} numbers.`,
                ]);
                setOriginalArray([]);
                return;
            }
            if (arr.length > MAX_ARRAY_SIZE) {
                setInputErrors([
                    `Array size exceeds maximum limit of ${MAX_ARRAY_SIZE}.`,
                ]);
                setOriginalArray([]);
                return;
            }

            // 2. Check Number Range & Type (ensure all are integers and within MIN/MAX bounds)
            const outOfRange = arr.filter(
                (num) => num < MIN_VALUE || num > MAX_VALUE
            );
            const nonIntegers = arr.filter((num) => !Number.isInteger(num));

            const errors = [];
            if (nonIntegers.length > 0) {
                errors.push('All values must be integers.');
            }
            if (outOfRange.length > 0) {
                errors.push(
                    `Numbers must be between ${MIN_VALUE} and ${MAX_VALUE}.`
                );
            }

            if (errors.length > 0) {
                setInputErrors(errors);
                setOriginalArray([]); // Clear array if there are validation errors
                return;
            }

            // If all checks pass, set the array and display a success message
            setOriginalArray(arr);
            if (source === 'input') {
                setSuccessMessage('Array successfully updated!');
            } else if (source === 'pattern') {
                setSuccessMessage(
                    `Generated ${arr.length} numbers successfully!`
                );
            }
        },
        [setOriginalArray] // Dependency: setOriginalArray must be stable for useCallback
    );

    // Effect to reset pattern parameters and set default values when the patternType changes
    useEffect(() => {
        setPatternParam1(50); // Default size for all patterns
        setPatternParam2(undefined); // Reset specific param
        setPatternParam3(undefined); // Reset third param

        // Set default values specific to the newly selected pattern type
        if (patternType === 'bellCurve') {
            setPatternParam2(Math.floor((MAX_VALUE + MIN_VALUE) / 2)); // Default mean for bell curve
            setPatternParam3(Math.floor((MAX_VALUE - MIN_VALUE) / 6)); // Default stdDev for bell curve
        } else if (patternType === 'manyDuplicates' || patternType === 'highDuplicates' || patternType === 'nearlySorted') {
            setPatternParam2(0.5); // Default factor for duplicates/perturbation
        } else if (patternType === 'fewUnique' || patternType === 'stepped') {
            setPatternParam2(5); // Default count for unique values/steps
        }
    }, [patternType]);

    /**
     * Handler for changes to the pattern array size slider.
     * @param {number} size - The new size value.
     */
    const handlePatternSizeChange = useCallback((size) => {
        setPatternParam1(size);
    }, []);

    // --- Handlers for Input Methods ---

    /**
     * Handles text input changes. Parses and validates the string.
     * @param {object} e - The event object from the textarea.
     */
    const handleTextInput = (e) => {
        const text = e.target.value;
        setInputValue(text);
        clearMessages(); // Clear messages immediately on input change

        if (text.trim() === '') {
            setOriginalArray([]); // If input is empty, clear array but don't show an error
            return;
        }

        const { numbers, invalidInputStrings } =
            ArrayInputManager.parseAndValidateInput(text);

        if (invalidInputStrings.length > 0) {
            setInputErrors([
                `Invalid characters detected: ${invalidInputStrings.join(', ')}. Please enter numbers only.`,
            ]);
            setOriginalArray([]);
            return;
        }
        setAndValidateArray(numbers, 'input');
    };

    /**
     * Handles file uploads. Reads and parses content from .txt, .csv, or .json files.
     * @param {object} e - The event object from the file input.
     */
    const handleFileUpload = async (e) => {
        clearMessages();
        const file = e.target.files[0];
        if (!file) return;

        e.target.value = ''; // Reset file input value to allow re-uploading the same file

        if (file.size > 1024 * 1024) { // 1MB limit check
            setInputErrors(['File size exceeds 1MB limit.']);
            setOriginalArray([]);
            return;
        }

        try {
            const text = await file.text();
            let numbers = [];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (fileExtension === 'json') {
                const data = JSON.parse(text);
                // Ensure JSON is a simple array of numbers
                if (Array.isArray(data) && data.every(num => typeof num === 'number' && Number.isInteger(num))) {
                    numbers = data;
                } else {
                    setInputErrors(['JSON file must contain a single array of integers (e.g., [1, 2, 3]).']);
                    setOriginalArray([]);
                    return;
                }
            } else if (fileExtension === 'csv' || fileExtension === 'txt') {
                const { numbers: parsedNumbers, invalidInputStrings } =
                    ArrayInputManager.parseAndValidateInput(text);
                if (invalidInputStrings.length > 0) {
                    setInputErrors([
                        `File contains invalid data: ${invalidInputStrings.join(', ')}. Expected numbers.`,
                    ]);
                    setOriginalArray([]);
                    return;
                }
                numbers = parsedNumbers;
            } else {
                setInputErrors(['Unsupported file type. Please upload .txt, .csv, or .json.']);
                setOriginalArray([]);
                return;
            }
            setAndValidateArray(numbers, 'input');
        } catch (error) {
            setInputErrors([`Error processing file: ${error.message}. Ensure it's valid JSON/CSV/TXT.`]);
            setOriginalArray([]);
        }
    };

    /**
     * Handles pasting content from the clipboard.
     */
    const handlePasteFromClipboard = async () => {
        clearMessages();
        try {
            const text = await navigator.clipboard.readText();
            setInputValue(text); // Display pasted text in the textarea for user feedback
            const { numbers, invalidInputStrings } =
                ArrayInputManager.parseAndValidateInput(text);

            if (invalidInputStrings.length > 0) {
                setInputErrors([
                    `Pasted content contains invalid characters: ${invalidInputStrings.join(', ')}. Please paste numbers only.`,
                ]);
                setOriginalArray([]);
                return;
            }
            setAndValidateArray(numbers, 'input');
        } catch (err) {
            setInputErrors([
                'Failed to read from clipboard. Please ensure clipboard permissions are granted or paste manually into the text input.',
            ]);
            setOriginalArray([]);
        }
    };

    // --- Handlers for Pattern Generation ---
    /**
     * Generates an array based on the selected pattern type and parameters.
     */
    const handleGeneratePattern = () => {
        clearMessages();
        const size = parseInt(patternParam1); // Size is always the first parameter for patterns

        // Validate pattern size input
        if (isNaN(size) || size < MIN_ARRAY_SIZE || size > MAX_ARRAY_SIZE) {
            setInputErrors([
                `Pattern size must be a number between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`,
            ]);
            setOriginalArray([]);
            return;
        }

        let generatedArray = [];
        try {
            switch (patternType) {
                case 'nearlySorted':
                    const perturbation = parseFloat(patternParam2);
                    if (isNaN(perturbation) || perturbation < 0 || perturbation > 1) {
                        setInputErrors(['Perturbation must be between 0 and 1 (e.g., 0.05).']);
                        setOriginalArray([]);
                        return;
                    }
                    generatedArray = PatternGenerator.generateNearlySorted(
                        size,
                        perturbation
                    );
                    break;
                case 'reverseSorted':
                    generatedArray = PatternGenerator.generateReverseSorted(size);
                    break;
                case 'fewUnique':
                    const uniqueCount = parseInt(patternParam2);
                    if (isNaN(uniqueCount) || uniqueCount < 1 || uniqueCount > size) {
                        setInputErrors([`Unique count must be between 1 and ${size}.`]);
                        setOriginalArray([]);
                        return;
                    }
                    generatedArray = PatternGenerator.generateFewUnique(size, uniqueCount);
                    break;
                case 'manyDuplicates':
                    const duplicateFactor = parseFloat(patternParam2);
                    if (isNaN(duplicateFactor) || duplicateFactor < 0 || duplicateFactor > 1) {
                        setInputErrors(['Duplicate factor must be between 0 and 1 (e.g., 0.5).']);
                        setOriginalArray([]);
                        return;
                    }
                    generatedArray = PatternGenerator.generateManyDuplicates(
                        size,
                        duplicateFactor
                    );
                    break;
                case 'highDuplicates':
                    const hdFactor = parseFloat(patternParam2);
                    if (isNaN(hdFactor) || hdFactor < 0 || hdFactor > 1) {
                        setInputErrors(['Duplicate factor must be between 0 and 1 (e.g., 0.99).']);
                        setOriginalArray([]);
                        return;
                    }
                    generatedArray = PatternGenerator.generateHighDuplicates(
                        size,
                        hdFactor
                    );
                    break;
                case 'bellCurve':
                    const mean = parseInt(patternParam2);
                    const stdDev = parseInt(patternParam3);
                    if (isNaN(mean) || isNaN(stdDev) || stdDev <= 0) {
                        setInputErrors(['Mean and Standard Deviation must be valid numbers (Std Dev > 0).']);
                        setOriginalArray([]);
                        return;
                    }
                    generatedArray = PatternGenerator.generateBellCurve(
                        size,
                        mean,
                        stdDev
                    );
                    break;
                case 'stepped':
                    const stepCount = parseInt(patternParam2);
                    if (isNaN(stepCount) || stepCount < 1 || stepCount > size) {
                        setInputErrors([`Step count must be between 1 and ${size}.`]);
                        setOriginalArray([]);
                        return;
                    }
                    generatedArray = PatternGenerator.generateStepped(size, stepCount);
                    break;
                default:
                    setInputErrors(['Unknown pattern type selected.']);
                    setOriginalArray([]);
                    return;
            }
            setAndValidateArray(generatedArray, 'pattern'); // Use the centralized validation
        } catch (error) {
            setInputErrors([`Error generating pattern: ${error.message}`]);
            setOriginalArray([]);
        }
    };

    /**
     * Renders input fields for pattern-specific parameters based on the selected pattern type.
     * @returns {JSX.Element} The JSX for pattern parameter inputs.
     */
    const renderPatternParameters = () => {
        // Configuration for each pattern's specific parameters
        const paramConfigs = {
            nearlySorted: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
                param2Label: 'Perturbation (0-1)',
                param2Placeholder: 'e.g., 0.05',
                param2Type: 'number',
                param2Step: '0.01',
            },
            reverseSorted: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
            },
            fewUnique: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
                param2Label: 'Unique Count',
                param2Placeholder: 'e.g., 5',
                param2Type: 'number',
            },
            manyDuplicates: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
                param2Label: 'Duplicate Factor (0-1)',
                param2Placeholder: 'e.g., 0.5',
                param2Type: 'number',
                param2Step: '0.01',
            },
            highDuplicates: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
                param2Label: 'High Duplicate Factor (0-1)',
                param2Placeholder: 'e.g., 0.99',
                param2Type: 'number',
                param2Step: '0.01',
            },
            bellCurve: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
                param2Label: `Mean (${MIN_VALUE}-${MAX_VALUE})`,
                param2Placeholder: `e.g., ${Math.floor((MAX_VALUE + MIN_VALUE) / 2)}`,
                param2Type: 'number',
                param3Label: 'Std Deviation (>=1)',
                param3Placeholder: 'e.g., 20',
                param3Type: 'number',
            },
            stepped: {
                param1Label: 'Size',
                param1Placeholder: 'e.g., 50',
                param2Label: 'Step Count',
                param2Placeholder: 'e.g., 5',
                param2Type: 'number',
            },
        };

        const config = paramConfigs[patternType] || {};

        const inputClassNames = `
            flex-1 p-2 rounded-md
            bg-slate-900 text-slate-200 border border-slate-700
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors duration-200
            placeholder-slate-500
        `;

        return (
            <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
                {/* Always render size input for patterns, as it's common */}
                <input
                    type="number"
                    placeholder={config.param1Placeholder || 'Size'}
                    value={patternParam1 || ''}
                    onChange={(e) => setPatternParam1(parseInt(e.target.value) || undefined)}
                    min={MIN_ARRAY_SIZE}
                    max={MAX_ARRAY_SIZE}
                    className={inputClassNames}
                    aria-label={`${config.param1Label || 'Size'}`}
                    disabled={isSorting}
                />
                {/* Render additional parameters only if defined for the selected pattern */}
                {config.param2Label && (
                    <input
                        type={config.param2Type || 'text'}
                        step={config.param2Step || '1'}
                        placeholder={config.param2Placeholder || ''}
                        value={patternParam2 !== undefined ? patternParam2 : ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            setPatternParam2(config.param2Type === 'number' ? (val === '' ? undefined : parseFloat(val)) : val);
                        }}
                        className={inputClassNames}
                        aria-label={`${config.param2Label}`}
                        disabled={isSorting}
                    />
                )}
                {config.param3Label && ( // For bellCurve's stdDev
                    <input
                        type={config.param3Type || 'text'}
                        step={config.param3Step || '1'}
                        placeholder={config.param3Placeholder || ''}
                        value={patternParam3 !== undefined ? patternParam3 : ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            setPatternParam3(config.param3Type === 'number' ? (val === '' ? undefined : parseFloat(val)) : val);
                        }}
                        className={inputClassNames}
                        aria-label={`${config.param3Label}`}
                        disabled={isSorting}
                    />
                )}
            </div>
        );
    };

    // Common CSS classes for buttons and inputs to maintain consistent styling
    const baseButtonClasses = `
        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
        transition-colors duration-200
        relative overflow-hidden group/button
    `;
    const selectedButtonClasses = `bg-blue-600 text-white shadow-md`;
    const unselectedButtonClasses = `
        bg-slate-800 text-slate-300 border border-slate-700
        hover:bg-slate-700 hover:border-blue-500
    `;

    const commonInputClassNames = `
        w-full p-3 rounded-md
        bg-slate-900 text-slate-200 border border-slate-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        resize-y
        placeholder-slate-500
    `;

    return (
        // The main wrapper div for the entire component. It's now relatively positioned
        // to contain its absolute children which create the animated background.
        <div className="
              relative
            w-full
          max-w-md mx-auto mb-4
           min-h-[250px]
    
          
            group/main /* Using group/main to allow hover effects to cascade */
        ">
            {/* Outer animated glow effect, slightly blurring the edges. This one is directly on the outside. */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover/main:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {/* This is the main visual container, now styled exactly like the inner part of ArraySizeControl */}
            <div className="
                relative h-full w-full p-4 rounded-xl
                bg-slate-900 border border-slate-800
                transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50
                group/array /* Using group/array for internal hover effects, consistent with ArraySizeControl */
                overflow-hidden /* Important to clip animations that extend beyond bounds */
                flex flex-col /* Ensures content inside is laid out vertically */
            ">
                {/* Animated background elements (grid, floating particles, code lines) */}
                <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full">
                        {/* Animated grid pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
                        
                        {/* Floating particles */}
                        <div className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
                        <div className="absolute h-1.5 w-1.5 rounded-full bg-blue-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
                        
                        {/* Animated code lines */}
                        <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
                        <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
                        <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
                    </div>
                </div>
                
                {/* Animated corner accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-md group-hover/array:scale-150 transition-transform duration-700 pointer-events-none"></div>
                
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/array:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

                {/* All content of ArrayInput goes here, ensure they are relatively positioned or have higher z-index if needed */}
                <h3 className="text-xl font-semibold text-slate-100 mb-4 text-center relative z-10">
                    Array Inputs
                </h3>

                {/* Input Method Buttons */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center relative z-10">
                    <button
                        onClick={() => { setInputMethod('text'); clearMessages(); setInputValue(''); }}
                        className={`${baseButtonClasses} ${inputMethod === 'text' ? selectedButtonClasses : unselectedButtonClasses}`}
                        aria-pressed={inputMethod === 'text'}
                        disabled={isSorting}
                    >
                        <Type size={16} /> Text
                    </button>
                    <button
                        onClick={() => { setInputMethod('file'); clearMessages(); }}
                        className={`${baseButtonClasses} ${inputMethod === 'file' ? selectedButtonClasses : unselectedButtonClasses}`}
                        aria-pressed={inputMethod === 'file'}
                        disabled={isSorting}
                    >
                        <Upload size={16} /> File
                    </button>
                    <button
                        onClick={() => { setInputMethod('clipboard'); clearMessages(); }}
                        className={`${baseButtonClasses} ${inputMethod === 'clipboard' ? selectedButtonClasses : unselectedButtonClasses}`}
                        aria-pressed={inputMethod === 'clipboard'}
                        disabled={isSorting}
                    >
                        <Clipboard size={16} /> Paste
                    </button>
                    <button
                        onClick={() => { setInputMethod('pattern'); clearMessages(); }}
                        className={`${baseButtonClasses} ${inputMethod === 'pattern' ? selectedButtonClasses : unselectedButtonClasses}`}
                        aria-pressed={inputMethod === 'pattern'}
                        disabled={isSorting}
                    >
                        <Wand2 size={16} /> Pattern
                    </button>
                </div>

                {/* Input Area based on selected method */}
                <div className="flex-grow flex flex-col items-center justify-center p-2 relative z-10">
                    {inputMethod === 'text' && (
                        <textarea
                            value={inputValue}
                            onChange={handleTextInput}
                            placeholder={`Enter numbers separated by commas or spaces (e.g., 5, 2, 8). Max ${MAX_ARRAY_SIZE} numbers, values between ${MIN_VALUE} and ${MAX_VALUE}.`}
                            className={`${commonInputClassNames} h-32`}
                            aria-label="Manual array input"
                            disabled={isSorting}
                        />
                    )}

                    {inputMethod === 'file' && (
                        <div className="
                            w-full h-32 flex items-center justify-center
                            border-2 border-dashed border-slate-700 rounded-md p-4 text-center
                            text-slate-400 relative
                            hover:border-blue-500 transition-colors duration-200
                            bg-slate-900/50
                        ">
                            <input
                                type="file"
                                accept=".txt,.csv,.json"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                aria-label="Upload array from file"
                                disabled={isSorting}
                            />
                            <div className="flex flex-col items-center">
                                <Upload size={24} className="mb-2 text-blue-400" />
                                Drag & drop or <span className="text-blue-500 font-medium">click to upload</span>
                                <span className="text-xs mt-1">(<span className="text-blue-300">.txt, .csv, .json</span> up to 1MB)</span>
                            </div>
                        </div>
                    )}

                    {inputMethod === 'clipboard' && (
                        <div className="w-full flex flex-col items-center justify-center">
                            <textarea
                                value={inputValue}
                                readOnly
                                placeholder="Pasted content will appear here..."
                                className={`${commonInputClassNames} h-32 mb-3`}
                                aria-label="Pasted array content"
                            />
                            <button
                                onClick={handlePasteFromClipboard}
                                className="
                                    flex items-center gap-2 px-5 py-2 rounded-lg
                                    bg-blue-600 text-white font-medium
                                    hover:bg-blue-700 transition-colors duration-200 shadow-md
                                "
                                disabled={isSorting}
                            >
                                <Clipboard size={20} /> Paste from Clipboard
                            </button>
                        </div>
                    )}

                    {inputMethod === 'pattern' && (
                        <div className="w-full flex flex-col items-center">
                            {/* Array Size Slider for Patterns - this already had the full styling */}
                            <div className="mb-4 relative group w-full">
                                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/array overflow-hidden h-full">
                                    <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none"></div>
                                    <div className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
                                    <div className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
                                    <div className="absolute h-1.5 w-1.5 rounded-full bg-blue-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
                                    <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
                                    <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
                                    <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
                                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-md group-hover/array:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/array:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
                                    <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center relative z-10 group-hover/array:text-blue-400 transition-colors duration-300" id="pattern-size-label">
                                        <Database className="mr-2 h-4 w-4 text-blue-400 animate-pulse" style={{ animationDuration: '4s' }} />
                                        <span className="transition-colors duration-300">// pattern array size: <span className="text-blue-400 ml-1">{patternParam1}</span></span>
                                    </label>
                                    <div className="relative mt-6 mb-8">
                                        <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
                                            <span className="text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">Small</span>
                                            <span className="text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">Medium</span>
                                            <span className="text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">Large</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-blue-400/5 rounded-full group-hover/array:bg-blue-400/10 transition-all duration-300"></div>
                                            <div className="absolute h-full bg-blue-400/20 rounded-full overflow-hidden origin-left"
                                                style={{
                                                    transform: `scaleX(${((patternParam1 - MIN_ARRAY_SIZE) / (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE))})`,
                                                    transition: 'transform 0.1s ease-out'
                                                }}
                                            >
                                                <div className="absolute inset-0 w-0 group-hover/array:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
                                            </div>
                                            <Slider
                                                value={[patternParam1]}
                                                min={MIN_ARRAY_SIZE}
                                                max={MAX_ARRAY_SIZE}
                                                step={1}
                                                onValueChange={(value) => handlePatternSizeChange(value[0])}
                                                disabled={isSorting}
                                                className="relative z-10"
                                                name="pattern array size"
                                                aria-label="Pattern Array Size Slider"
                                                aria-labelledby="pattern-size-label"
                                            />
                                            <div className="absolute inset-0 bg-blue-400/10 rounded-full animate-pulse"></div>
                                        </div>
                                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
                                            <span className="group-hover/array:text-blue-300 text-blue-300 transition-colors duration-300">{MIN_ARRAY_SIZE}</span>
                                            <span className="group-hover/array:text-blue-300 text-blue-300 transition-colors duration-300">{Math.floor((MIN_ARRAY_SIZE + MAX_ARRAY_SIZE) / 2)}</span>
                                            <span className="group-hover/array:text-blue-300 text-blue-300 transition-colors duration-300">{MAX_ARRAY_SIZE}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-blue-400/30 rounded-sm mr-1 animate-pulse"></div>
                                            <span className="text-blue-400">Elements: {patternParam1}</span>
                                        </div>
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => !isSorting && patternParam1 > MIN_ARRAY_SIZE && setPatternParam1(Math.max(MIN_ARRAY_SIZE, patternParam1 - 10))}
                                                disabled={isSorting || patternParam1 <= MIN_ARRAY_SIZE}
                                                className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
                                                aria-label="Decrease pattern array size by 10"
                                            >
                                                <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                                <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-[10px]">-10</div>
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (!isSorting && patternParam1 < MAX_ARRAY_SIZE) {
                                                        const newSize = Math.min(MAX_ARRAY_SIZE, patternParam1 + 10);
                                                        setPatternParam1(newSize);
                                                    }
                                                }}
                                                disabled={isSorting || patternParam1 >= MAX_ARRAY_SIZE}
                                                className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
                                                aria-label="Increase pattern array size by 10"
                                            >
                                                <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                                <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-[10px]">+10</div>
                                                <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">
                                            {patternParam1 < 50 ? "Good for learning" : patternParam1 < 100 ? "Balanced" : "Performance test"}
                                        </div>
                                    </div>
                                    <div className="mt-4 h-8 bg-slate-800/80 rounded-lg border border-slate-700 overflow-hidden relative group/bar">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500/20 to-blue-400/20 relative overflow-hidden origin-left"
                                            style={{
                                                transform: `scaleX(${((patternParam1 - MIN_ARRAY_SIZE) / (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE))})`,
                                                transition: 'transform 0.05s ease-out'
                                            }}
                                        >
                                            <div className="absolute inset-0 w-0 group-hover/array:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"></div>
                                            <div className="absolute inset-y-0 right-0 w-1 bg-blue-400/30"></div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-blue-400/70 font-mono group-hover/array:text-blue-400 transition-colors duration-300">
                                            {patternParam1} elements
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="pattern-select" className="sr-only">Select Pattern Type</label>
                            <select
                                id="pattern-select"
                                value={patternType}
                                onChange={(e) => setPatternType(e.target.value)}
                                className={commonInputClassNames + " mb-2 h-auto"}
                                disabled={isSorting}
                            >
                                <option value="nearlySorted">Nearly Sorted</option>
                                <option value="reverseSorted">Reverse Sorted</option>
                                <option value="fewUnique">Few Unique Values</option>
                                <option value="manyDuplicates">Many Duplicates</option>
                                <option value="highDuplicates">Extremely High Duplicates</option>
                                <option value="bellCurve">Bell Curve Distribution</option>
                                <option value="stepped">Stepped Pattern</option>
                            </select>
                            {renderPatternParameters()}
                            <button
                                onClick={handleGeneratePattern}
                                className="
                                    flex items-center gap-2 px-5 py-2 rounded-lg
                                    bg-blue-600 text-white font-medium
                                    hover:bg-blue-700 transition-colors duration-200 shadow-md mt-4
                                "
                                disabled={isSorting}
                            >
                                <Wand2 size={20} /> Generate Pattern
                            </button>
                        </div>
                    )}
                </div>

                {/* Messages */}
                <div className="mt-4 min-h-[50px] flex flex-col justify-end relative z-10">
                    {inputErrors.length > 0 && (
                        <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-2">
                            <strong className="font-bold flex items-center">
                                <TriangleAlert size={18} className="mr-2 text-red-400" /> Error:
                            </strong>
                            <ul className="mt-1 list-disc list-inside">
                                {inputErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={clearMessages}>
                                <X size={18} className="text-red-400 hover:text-red-300" />
                            </span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-900/30 border border-green-700 text-green-300 px-4 py-3 rounded-lg relative">
                            <strong className="font-bold flex items-center">
                                <CheckCircle size={18} className="mr-2 text-green-400" /> Success:
                            </strong>
                            <p className="mt-1">{successMessage}</p>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={clearMessages}>
                                <X size={18} className="text-green-400 hover:text-green-300" />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArrayInput;


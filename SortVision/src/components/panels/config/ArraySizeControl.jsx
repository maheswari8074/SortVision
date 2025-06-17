
import React, { useState, useEffect, useCallback } from 'react';
import {
    Upload,
    Clipboard,
    Type,
    Wand2,
    TriangleAlert,
    X,
    CheckCircle,
    Info, // Added for input examples
} from 'lucide-react';

// --- Constants ---
const MIN_VALUE = -999;
const MAX_VALUE = 999;
const MIN_ARRAY_SIZE = 2; // Minimum size for a meaningful array
const MAX_ARRAY_SIZE = 200; // Max size to prevent performance issues and UI clutter

// --- Array Input Manager Class ---
class ArrayInputManager {
    static parseAndValidateInput(inputString) {
        const parts = inputString
            .split(/[,\s]+/) // Split by comma or any whitespace
            .map((s) => s.trim())
            .filter(Boolean); // Remove empty strings

        const numbers = [];
        const invalidInputStrings = new Set(); // To store unique invalid parts

        for (const part of parts) {
            if (/^-?\d+$/.test(part)) {
                // Check if it's strictly an integer (positive or negative)
                numbers.push(parseInt(part, 10));
            } else {
                invalidInputStrings.add(part);
            }
        }
        return { numbers, invalidInputStrings: Array.from(invalidInputStrings) };
    }
}

// --- Pattern Generator Class ---
class PatternGenerator {
    static generateNearlySorted(size, perturbation = 0.05) {
        const array = Array.from({ length: size }, (_, i) => i + 1); // Sorted array
        const numSwaps = Math.floor(size * perturbation * size); // Swaps proportional to size * perturbation

        for (let i = 0; i < numSwaps; i++) {
            const idx1 = Math.floor(Math.random() * size);
            let idx2 = Math.floor(Math.random() * size);
            // Ensure idx2 is different from idx1 to make a meaningful swap
            while (idx2 === idx1) {
                idx2 = Math.floor(Math.random() * size);
            }
            [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
        // Clamp values to the allowed range
        return array.map(num => Math.max(MIN_VALUE, Math.min(MAX_VALUE, num)));
    }

    static generateReverseSorted(size) {
        return Array.from({ length: size }, (_, i) => size - i)
            .map(num => Math.max(MIN_VALUE, Math.min(MAX_VALUE, num)));
    }

    static generateFewUnique(size, uniqueCount = 5) {
        const uniqueValues = Array.from({ length: uniqueCount }, (_, i) =>
            Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
        );
        return Array.from({ length: size }, () => {
            const randomIndex = Math.floor(Math.random() * uniqueCount);
            return uniqueValues[randomIndex];
        });
    }

    static generateManyDuplicates(size, duplicateFactor = 0.5) {
        // duplicateFactor: 0.0 (all unique) to 1.0 (all same value)
        // A lower factor means more unique values, higher means more duplicates
        const uniqueValuesToGenerate = Math.max(
            1,
            Math.floor(size * (1 - duplicateFactor))
        );
        return PatternGenerator.generateFewUnique(size, uniqueValuesToGenerate);
    }

    // New: Extremely high duplicates (e.g., 99% duplicates)
    static generateHighDuplicates(size, duplicateFactor = 0.99) {
        const uniqueValuesToGenerate = Math.max(
            1,
            Math.floor(size * (1 - duplicateFactor))
        );
        return PatternGenerator.generateFewUnique(size, uniqueValuesToGenerate);
    }

    static generateBellCurve(size, mean = (MAX_VALUE + MIN_VALUE) / 2, stdDev = (MAX_VALUE - MIN_VALUE) / 6) {
        // Box-Muller transform to generate normally distributed numbers
        return Array.from({ length: size }, () => {
            let u = 0,
                v = 0;
            while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
            while (v === 0) v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            const rawValue = Math.floor(z * stdDev + mean);
            // Clamp values to the allowed range
            return Math.max(MIN_VALUE, Math.min(MAX_VALUE, rawValue));
        });
    }

    static generateStepped(size, stepCount = 5) {
        if (stepCount <= 0 || stepCount > size) {
            stepCount = Math.max(1, Math.min(size, 5)); // Default to 5 or size if invalid
        }
        const stepSize = Math.floor(size / stepCount);
        const array = [];
        for (let i = 0; i < stepCount; i++) {
            const value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
            for (let j = 0; j < stepSize && array.length < size; j++) {
                array.push(value);
            }
        }
        // Fill remaining if size is not perfectly divisible
        while (array.length < size) {
            array.push(array[array.length - 1] || Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE);
        }
        return array;
    }
}

// --- React Component ---
const ArrayInput = ({ setOriginalArray }) => {
    const [inputMethod, setInputMethod] = useState('text');
    const [inputValue, setInputValue] = useState('');
    const [patternType, setPatternType] = useState('nearlySorted');
    const [patternParam1, setPatternParam1] = useState(undefined); // Size
    const [patternParam2, setPatternParam2] = useState(undefined); // Perturbation/Duplicate Factor etc.
    const [inputErrors, setInputErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const clearMessages = () => {
        setInputErrors([]);
        setSuccessMessage('');
    };

    // Centralized function to set and validate array, used by all input methods
    const setAndValidateArray = useCallback(
        (arr, source = 'input') => {
            clearMessages();

            if (!Array.isArray(arr)) {
                setInputErrors(['Invalid array format provided.']);
                setOriginalArray([]);
                return;
            }

            // 1. Check Array Size
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

            // 2. Check Number Range & Type
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
                setOriginalArray([]);
                return;
            }

            // If all checks pass
            setOriginalArray(arr);
            if (source === 'input') {
                setSuccessMessage('Array successfully updated!');
            } else if (source === 'pattern') {
                setSuccessMessage(
                    `Generated ${arr.length} numbers successfully!`
                );
            }
        },
        [setOriginalArray]
    );

    // Effect to reset pattern parameters when patternType changes
    useEffect(() => {
        setPatternParam1(undefined); // Reset size to undefined
        setPatternParam2(undefined); // Reset specific param to undefined

        // Set default values based on new pattern type if needed
        if (patternType === 'bellCurve') {
            setPatternParam1(50); // Default size for patterns, just an example
            setPatternParam2((MAX_VALUE + MIN_VALUE) / 2); // Default mean
            // For bellCurve, assuming a third param could be stdDev, but based on current generator, it's fixed or calculated
            // For simplicity, we'll use param2 for mean and let stdDev be calculated or default in generator.
        } else if (patternType === 'manyDuplicates') {
            setPatternParam1(50);
            setPatternParam2(0.5); // Default duplicate factor
        } else if (patternType === 'highDuplicates') {
            setPatternParam1(50);
            setPatternParam2(0.99); // Default high duplicate factor
        } else if (patternType === 'nearlySorted') {
            setPatternParam1(50);
            setPatternParam2(0.05); // Default perturbation
        } else if (patternType === 'fewUnique') {
            setPatternParam1(50);
            setPatternParam2(5); // Default unique count
        } else if (patternType === 'stepped') {
            setPatternParam1(50);
            setPatternParam2(5); // Default step count
        } else if (patternType === 'reverseSorted') {
            setPatternParam1(50); // Just a size
        }
    }, [patternType]);

    // --- Handlers for Input Methods ---

    const handleTextInput = (e) => {
        const text = e.target.value;
        setInputValue(text);
        clearMessages(); // Clear messages immediately on input change
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

    const handleFileUpload = async (e) => {
        clearMessages();
        const file = e.target.files[0];
        if (!file) return;

        // Reset the input value to allow re-uploading the same file
        e.target.value = '';

        if (file.size > 1024 * 1024) {
            // 1MB limit
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
                if (Array.isArray(data) && data.every(num => typeof num === 'number' && Number.isInteger(num))) {
                    numbers = data;
                } else {
                    setInputErrors(['JSON file must contain a single array of integers.']);
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

    const handlePasteFromClipboard = async () => {
        clearMessages();
        try {
            const text = await navigator.clipboard.readText();
            setInputValue(text); // Set textarea value for visual feedback
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
    const handleGeneratePattern = () => {
        clearMessages();
        const size = parseInt(patternParam1); // Size is always param1 for patterns
        if (isNaN(size) || size < MIN_ARRAY_SIZE || size > MAX_ARRAY_SIZE) {
            setInputErrors([
                `Size must be a number between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`,
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
                    const hdFactor = parseFloat(patternParam2); // Allows custom high duplicate factor
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
                    const stdDev = parseInt(patternParam3); // This would be for a third param if needed
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
            setAndValidateArray(generatedArray, 'pattern');
        } catch (error) {
            setInputErrors([`Error generating pattern: ${error.message}`]);
            setOriginalArray([]);
        }
    };

    const renderPatternParameters = () => {
        // Defines the specific parameters for each pattern type
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
                param2Placeholder: `e.g., ${(MAX_VALUE + MIN_VALUE) / 2}`,
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

        return (
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                    type="number"
                    placeholder={config.param1Placeholder || 'Size'}
                    value={patternParam1 || ''}
                    onChange={(e) => setPatternParam1(e.target.value)}
                    min={MIN_ARRAY_SIZE}
                    max={MAX_ARRAY_SIZE}
                    className="flex-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={`${config.param1Label || 'Size'}`}
                />
                {config.param2Label && (
                    <input
                        type={config.param2Type || 'text'}
                        step={config.param2Step || '1'}
                        placeholder={config.param2Placeholder || ''}
                        value={patternParam2 || ''}
                        onChange={(e) => setPatternParam2(e.target.value)}
                        className="flex-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label={`${config.param2Label}`}
                    />
                )}
                {config.param3Label && ( // For bellCurve's stdDev
                    <input
                        type={config.param3Type || 'text'}
                        step={config.param3Step || '1'}
                        placeholder={config.param3Placeholder || ''}
                        value={patternParam3 || ''} // Assuming patternParam3 state for stdDev
                        onChange={(e) => setPatternParam3(e.target.value)}
                        className="flex-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label={`${config.param3Label}`}
                    />
                )}
            </div>
        );
    };

    // A separate state for patternParam3 for Bell Curve's Std Dev
    const [patternParam3, setPatternParam3] = useState(undefined);


    return (
        <div className="
            relative
            w-full
            max-w-md mx-auto mb-4 p-4
            rounded-xl
            bg-white/10 dark:bg-gray-800/10
            bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10
            border border-gray-200 dark:border-gray-700
            shadow-lg
            min-h-[250px]
            flex flex-col
        ">
            {/* Heading - as it was */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                Array Input & Patterns
            </h3>

            {/* Input Method Buttons */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <button
                    onClick={() => { setInputMethod('text'); clearMessages(); setInputValue(''); }}
                    className={`
                        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                        transition-colors duration-200
                        ${inputMethod === 'text'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-500/20 hover:text-blue-700 dark:hover:bg-blue-500/30 dark:hover:text-blue-300'
                        }
                    `}
                    aria-pressed={inputMethod === 'text'}
                >
                    <Type size={16} /> Text
                </button>
                <button
                    onClick={() => { setInputMethod('file'); clearMessages(); }}
                    className={`
                        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                        transition-colors duration-200
                        ${inputMethod === 'file'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-500/20 hover:text-blue-700 dark:hover:bg-blue-500/30 dark:hover:text-blue-300'
                        }
                    `}
                    aria-pressed={inputMethod === 'file'}
                >
                    <Upload size={16} /> File
                </button>
                <button
                    onClick={() => { setInputMethod('clipboard'); clearMessages(); }}
                    className={`
                        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                        transition-colors duration-200
                        ${inputMethod === 'clipboard'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-500/20 hover:text-blue-700 dark:hover:bg-blue-500/30 dark:hover:text-blue-300'
                        }
                    `}
                    aria-pressed={inputMethod === 'clipboard'}
                >
                    <Clipboard size={16} /> Paste
                </button>
                <button
                    onClick={() => { setInputMethod('pattern'); clearMessages(); }}
                    className={`
                        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                        transition-colors duration-200
                        ${inputMethod === 'pattern'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-500/20 hover:text-blue-700 dark:hover:bg-blue-500/30 dark:hover:text-blue-300'
                        }
                    `}
                    aria-pressed={inputMethod === 'pattern'}
                >
                    <Wand2 size={16} /> Pattern
                </button>
            </div>

            {/* Input Area */}
            <div className="flex-grow flex flex-col items-center justify-center p-2">
                {inputMethod === 'text' && (
                    <>
                        <textarea
                            value={inputValue}
                            onChange={handleTextInput}
                            placeholder={`Enter numbers separated by commas or spaces. E.g., 10, 5, 20, 15, 30. (Values ${MIN_VALUE} to ${MAX_VALUE})`}
                            rows="4"
                            className="w-full min-h-[100px] p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                            aria-label="Enter numbers manually"
                        />
                         <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                            <Info size={14} /> Example: <code className="font-mono text-blue-600 dark:text-blue-400">10, -5, 20, 100, 999</code>
                        </div>
                    </>
                )}

                {inputMethod === 'file' && (
                    <>
                        <label
                            htmlFor="file-upload"
                            className="
                                w-full flex items-center justify-center py-3 px-4
                                border border-dashed border-gray-400 dark:border-gray-500 rounded-md
                                text-gray-700 dark:text-gray-300 cursor-pointer
                                hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                            "
                        >
                            <Upload size={20} className="mr-2" /> Select or Drag File (.txt, .csv, .json)
                            <input
                                id="file-upload"
                                type="file"
                                accept=".txt,.csv,.json"
                                onChange={handleFileUpload}
                                className="hidden"
                                aria-label="Upload array from file"
                            />
                        </label>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                            <Info size={14} /> Ensure file contains numbers separated by commas/spaces or a JSON array of numbers.
                        </div>
                    </>
                )}

                {inputMethod === 'clipboard' && (
                    <>
                        <button
                            onClick={handlePasteFromClipboard}
                            className="
                                w-full flex items-center justify-center py-3 px-4
                                bg-blue-500 text-white rounded-md font-semibold
                                hover:bg-blue-600 transition-colors shadow-md
                            "
                            aria-label="Paste array from clipboard"
                        >
                            <Clipboard size={20} className="mr-2" /> Paste Numbers from Clipboard
                        </button>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                            <Info size={14} /> Paste numbers like: <code className="font-mono text-blue-600 dark:text-blue-400">1,2,3,4,5</code> or <code className="font-mono text-blue-600 dark:text-blue-400">1 2 3 4 5</code>
                        </div>
                    </>
                )}

                {inputMethod === 'pattern' && (
                    <div className="w-full flex flex-col gap-3">
                        <select
                            value={patternType}
                            onChange={(e) => setPatternType(e.target.value)}
                            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            aria-label="Select array pattern type"
                        >
                            <option value="nearlySorted">Nearly Sorted</option>
                            <option value="reverseSorted">Reverse Sorted</option>
                            <option value="fewUnique">Few Unique Values</option>
                            <option value="manyDuplicates">Many Duplicates</option>
                            <option value="highDuplicates">High Duplicates (Extreme)</option>
                            <option value="bellCurve">Bell Curve Distribution</option>
                            <option value="stepped">Stepped Pattern</option>
                        </select>
                        {renderPatternParameters()}
                        <button
                            onClick={handleGeneratePattern}
                            className="
                                w-full flex items-center justify-center py-2 px-4
                                bg-green-500 text-white rounded-md font-semibold
                                hover:bg-green-600 transition-colors shadow-md
                            "
                            aria-label="Generate array pattern"
                        >
                            <Wand2 size={20} className="mr-2" /> Generate Pattern
                        </button>
                    </div>
                )}
            </div>

            {/* Messages (Errors/Success) */}
            {(inputErrors.length > 0 || successMessage) && (
                <div className="mt-4 p-3 rounded-md min-h-[50px] flex items-center">
                    {inputErrors.length > 0 ? (
                        <div className="flex items-start text-red-600 dark:text-red-400 gap-2">
                            <TriangleAlert size={20} className="flex-shrink-0 mt-0.5" />
                            <ul className="list-none p-0 m-0">
                                {inputErrors.map((error, index) => (
                                    <li key={index} className="text-sm">{error}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center text-green-600 dark:text-green-400 gap-2">
                            <CheckCircle size={20} />
                            <p className="text-sm">{successMessage}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArrayInput;
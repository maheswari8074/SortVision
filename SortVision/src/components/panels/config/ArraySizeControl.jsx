

// import React, { useState, useEffect, useCallback } from 'react';
// import { Clipboard, FileText, Type, ChevronDown, Repeat, HardDrive, List, LayoutGrid, AlertCircle, Sparkles } from 'lucide-react'; // Using Lucide React for icons

// // Constants for array size and value range
// const MAX_ARRAY_SIZE = 10000;
// const MIN_VALUE = -1000;
// const MAX_VALUE = 1000;
// const MIN_ARRAY_SIZE = 1; // Added for clarity

// // --- Array Input Manager ---
// class ArrayInputManager {
//     // Validates if a number is an integer and within the allowed range
//     static isValidValue(n) {
//         return Number.isInteger(n) && n >= MIN_VALUE && n <= MAX_VALUE;
//     }

//     /**
//      * Parses a string input into an array of numbers and collects any validation errors.
//      * This method is stricter, ensuring that string parts are entirely numeric before parsing.
//      * @param input The raw string input from text area, clipboard, or file.
//      * @returns An object containing the parsed numbers and any encountered errors.
//      */
//     static parseAndValidateInput(input) {
//         const parts = input
//             .split(/[,\s\n]+/)
//             .map(s => s.trim())
//             .filter(s => s !== ''); // Remove empty strings resulting from split

//         const numbers = [];
//         const errors = [];
//         const invalidInputStrings = [];

//         if (parts.length === 0 && input.trim() !== '') {
//             errors.push("No valid numbers found in input.");
//         } else if (input.trim() === '' && parts.length === 0) {
//             // This means the input was empty or just whitespace, no error needed for this case
//         }

//         parts.forEach(part => {
//             // Strict regex for integer: optional leading minus, followed by one or more digits
//             if (/^-?\d+$/.test(part)) {
//                 const num = parseInt(part);
//                 if (ArrayInputManager.isValidValue(num)) {
//                     numbers.push(num);
//                 } else {
//                     errors.push(`Number out of range (${MIN_VALUE} to ${MAX_VALUE}): ${part}`);
//                 }
//             } else {
//                 // If it doesn't match the strict integer regex, it's an invalid string
//                 invalidInputStrings.push(part);
//             }
//         });

//         if (invalidInputStrings.length > 0) {
//             errors.push(`Input contains non-numeric characters: ${[...new Set(invalidInputStrings)].join(', ')}`);
//         }

//         // Check array size constraint after all valid numbers are collected
//         if (numbers.length > MAX_ARRAY_SIZE) {
//             errors.push(`Array size (${numbers.length}) exceeds maximum limit of ${MAX_ARRAY_SIZE}.`);
//             // Note: For large arrays, consider truncating here if necessary, but for now, we just report.
//         }

//         return { numbers, errors };
//     }
// }

// // --- Pattern Generators ---
// class PatternGenerator {
//     /**
//      * Generates a random array of a given size.
//      * @param size The size of the array.
//      * @param min The minimum value for elements.
//      * @param max The maximum value for elements.
//      * @returns A new array with random numbers.
//      */
//     static generateRandom(size, min = MIN_VALUE, max = MAX_VALUE) {
//         return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
//     }

//     /**
//      * Generates a perfectly sorted increasing array.
//      * Values are distributed linearly between MIN_VALUE and MAX_VALUE.
//      * @param size The size of the array.
//      * @returns A new array with sorted increasing numbers.
//      */
//     static generateSortedIncreasing(size) {
//         if (size === 0) return [];
//         return Array.from({ length: size }, (_, i) =>
//             Math.floor(MIN_VALUE + (MAX_VALUE - MIN_VALUE) * (i / (size - 1)))
//         );
//     }

//     /**
//      * Generates a reverse sorted array.
//      * Values are distributed linearly between MAX_VALUE and MIN_VALUE.
//      * @param size The size of the array.
//      * @returns A reverse sorted array.
//      */
//     static generateReverseSorted(size) {
//         if (size === 0) return [];
//         return Array.from({ length: size }, (_, i) =>
//             Math.floor(MAX_VALUE - (MAX_VALUE - MIN_VALUE) * (i / (size - 1)))
//         );
//     }

//     /**
//      * Generates an array that is nearly sorted.
//      * @param size The size of the array.
//      * @param perturbation The percentage of elements to randomly swap (0.0 to 1.0).
//      * @returns A nearly sorted array.
//      */
//     static generateNearlySorted(size, perturbation = 0.05) {
//         // Start with a perfectly sorted array
//         const array = PatternGenerator.generateSortedIncreasing(size);
//         const swaps = Math.floor(size * perturbation);

//         for (let i = 0; i < swaps; i++) {
//             const idx1 = Math.floor(Math.random() * size);
//             const idx2 = Math.floor(Math.random() * size);
//             [array[idx1], array[idx2]] = [array[idx2], array[idx1]]; // Swap elements
//         }
//         return array;
//     }

//     /**
//      * Generates an array with a few unique values.
//      * @param size The size of the array.
//      * @param uniqueCount The number of unique values.
//      * @returns An array with limited unique values.
//      */
//     static generateFewUnique(size, uniqueCount = 5) {
//         const uniqueValues = [];
//         for (let i = 0; i < uniqueCount; i++) {
//             uniqueValues.push(Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE);
//         }
//         return Array.from({ length: size }, () => uniqueValues[Math.floor(Math.random() * uniqueCount)]);
//     }

//     /**
//      * Generates an array with many duplicate values.
//      * @param size The size of the array.
//      * @param duplicateFactor The factor by which values are duplicated (e.g., 0.2 means 20% unique values).
//      * @returns An array with many duplicates.
//      */
//     static generateManyDuplicates(size, duplicateFactor = 0.2) {
//         const numUnique = Math.max(1, Math.floor(size * duplicateFactor));
//         return this.generateFewUnique(size, numUnique); // Re-use few unique logic
//     }

//     /**
//      * Generates an array with values following a bell curve (normal) distribution.
//      * Uses the Box-Muller transform for normally distributed random numbers.
//      * @param size The size of the array.
//      * @param mean The mean of the distribution.
//      * @param stdDev The standard deviation of the distribution.
//      * @returns An array with bell curve distributed values.
//      */
//     static generateBellCurve(size, mean = 0, stdDev = 1) {
//         const array = [];
//         for (let i = 0; i < size; i++) {
//             let u = 0, v = 0;
//             while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
//             while (v === 0) v = Math.random();
//             const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
//             let value = Math.floor(z * stdDev + mean);

//             // Clamp values to the global min/max range
//             value = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value));
//             array.push(value);
//         }
//         return array;
//     }

//     /**
//      * Generates an array with a stepped pattern (e.g., 5,5,5,10,10,10,15,15,15...).
//      * @param size The size of the array.
//      * @param stepValue The increment value for each step.
//      * @param stepLength The number of elements per step.
//      * @returns An array with a stepped pattern.
//      */
//     static generateStepped(size, stepValue = 10, stepLength = 10) {
//         const array = [];
//         for (let i = 0; i < size; i++) {
//             let value = MIN_VALUE + Math.floor(i / stepLength) * stepValue;
//             value = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value)); // Clamp
//             array.push(value);
//         }
//         return array;
//     }
// }

// // Main App Component
// const App = () => {
//     const [originalArray, setOriginalArray] = useState([]);
//     const [inputMethod, setInputMethod] = useState('text');
//     const [textInputValue, setTextInputValue] = useState('');
//     const [patternType, setPatternType] = useState('generateRandom');
//     const [patternSize, setPatternSize] = useState(100);
//     const [patternParam1, setPatternParam1] = useState(undefined);
//     const [patternParam2, setPatternParam2] = useState(undefined);
//     const [errors, setErrors] = useState([]);

//     // Callback to set the array (no longer sorting)
//     const setAndValidateArray = useCallback((arr, validationErrors = []) => {
//         if (!arr) {
//             setOriginalArray([]);
//             setErrors(validationErrors);
//             return;
//         }

//         const sizeErrors = [];
//         if (arr.length > MAX_ARRAY_SIZE) {
//             sizeErrors.push(`Array size (${arr.length}) exceeds maximum limit of ${MAX_ARRAY_SIZE}.`);
//         } else if (arr.length < MIN_ARRAY_SIZE && arr.length > 0) {
//             sizeErrors.push(`Array size (${arr.length}) is below minimum limit of ${MIN_ARRAY_SIZE}.`);
//         }


//         const rangeCheckErrors = [];
//         if (arr.length > 0 && !arr.every(num => ArrayInputManager.isValidValue(num))) {
//             const invalidValues = arr.filter(n => !ArrayInputManager.isValidValue(n));
//             const uniqueInvalidValues = [...new Set(invalidValues.map(String))];
//             rangeCheckErrors.push(`Some numbers are out of range (${MIN_VALUE} to ${MAX_VALUE}): ${uniqueInvalidValues.join(', ')}.`);
//         }

//         const allErrors = [...validationErrors, ...sizeErrors, ...rangeCheckErrors];

//         if (allErrors.length > 0) {
//             setErrors(allErrors);
//             setOriginalArray([]);
//             return;
//         }

//         setErrors([]);
//         setOriginalArray([...arr]);
//     }, []);

//     // Effect to initialize with a random array on first load
//     useEffect(() => {
//         setPatternType('generateRandom');
//         setPatternSize(100);
//         setPatternParam1(undefined);
//         setPatternParam2(undefined);
//         const initialArray = PatternGenerator.generateRandom(100);
//         setAndValidateArray(initialArray);
//         if (inputMethod === 'text') { // Only update text input if text method is active initially
//             setTextInputValue(initialArray.join(', '));
//         }
//     }, [setAndValidateArray, inputMethod]);


//     // Handle manual text input change
//     const handleTextInputChange = (e) => {
//         const value = e.target.value;
//         setTextInputValue(value);
//         const { numbers, errors: inputErrors } = ArrayInputManager.parseAndValidateInput(value);
//         setAndValidateArray(numbers, inputErrors);
//     };

//     // Handle file upload
//     const handleFileUpload = async (e) => {
//         const file = e.target.files?.[0];
//         e.target.value = '';
//         if (!file) return;

//         setErrors([]);
//         try {
//             const content = await file.text();
//             let processedNumbers = [];
//             let processErrors = [];

//             if (file.type === 'application/json' || file.name.endsWith('.json')) {
//                 try {
//                     const jsonData = JSON.parse(content);
//                     if (Array.isArray(jsonData)) {
//                         const validatedJsonNumbers = [];
//                         const tempJsonErrors = [];
//                         jsonData.forEach(item => {
//                             if (typeof item === 'number' && Number.isInteger(item)) {
//                                 if (ArrayInputManager.isValidValue(item)) {
//                                     validatedJsonNumbers.push(item);
//                                 } else {
//                                     tempJsonErrors.push(`Number out of range (${MIN_VALUE} to ${MAX_VALUE}): ${item}`);
//                                 }
//                             } else {
//                                 tempJsonErrors.push(`Non-numeric or non-integer value found in JSON: ${item}`);
//                             }
//                         });
//                         processedNumbers = validatedJsonNumbers;
//                         processErrors = tempJsonErrors;
//                     } else {
//                         processErrors.push("JSON file does not contain a top-level array.");
//                     }
//                 } catch (jsonParseError) {
//                     processErrors.push(`Error parsing JSON: ${jsonParseError.message}`);
//                 }
//             } else if (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
//                 const tempResult = ArrayInputManager.parseAndValidateInput(content);
//                 processedNumbers = tempResult.numbers;
//                 processErrors = tempResult.errors;
//             } else {
//                 processErrors.push("Unsupported file type. Please upload CSV, JSON, or TXT.");
//             }
            
//             setAndValidateArray(processedNumbers, processErrors);
//         } catch (error) {
//             setErrors([`Failed to read file: ${error.message}`]);
//             setOriginalArray([]);
//         }
//     };

//     // Handle paste from clipboard
//     const handlePaste = async () => {
//         setErrors([]);
//         try {
//             const text = await navigator.clipboard.readText();
//             setTextInputValue(text);
//             handleTextInputChange({ target: { value: text } });
//         } catch (error) {
//             alert("Clipboard access denied or failed. Please paste your array directly into the 'Text Input' area. (e.g. 1,2,3,4)");
//             setErrors([`Failed to read clipboard: ${error.message}. Please paste manually into text input.`]);
//             setOriginalArray([]);
//         }
//     };

//     // Handle pattern generation
//     const handleGeneratePattern = useCallback(() => {
//         setErrors([]);
//         if (patternSize <= 0 || patternSize > MAX_ARRAY_SIZE) {
//             setErrors([`Pattern size must be between ${MIN_ARRAY_SIZE} and ${MAX_ARRAY_SIZE}.`]);
//             setOriginalArray([]);
//             return;
//         }

//         let generatedArray = [];
//         try {
//             switch (patternType) {
//                 case 'generateRandom':
//                     generatedArray = PatternGenerator.generateRandom(patternSize, MIN_VALUE, MAX_VALUE);
//                     break;
//                 case 'generateSortedIncreasing':
//                     generatedArray = PatternGenerator.generateSortedIncreasing(patternSize);
//                     break;
//                 case 'generateSortedDecreasing':
//                     generatedArray = PatternGenerator.generateReverseSorted(patternSize); // Re-using reverse sorted
//                     break;
//                 case 'generateHighDuplicates':
//                     // Use a very low duplicate factor for high duplicates, e.g., 0.01 (1% unique)
//                     generatedArray = PatternGenerator.generateManyDuplicates(patternSize, isNaN(parseFloat(patternParam1)) ? 0.01 : parseFloat(patternParam1));
//                     break;
//                 case 'generateNearlySorted':
//                     generatedArray = PatternGenerator.generateNearlySorted(patternSize, isNaN(parseFloat(patternParam1)) ? 0.05 : parseFloat(patternParam1));
//                     break;
//                 case 'generateFewUnique':
//                     generatedArray = PatternGenerator.generateFewUnique(patternSize, isNaN(parseInt(patternParam1)) ? 5 : parseInt(patternParam1));
//                     break;
//                 case 'generateManyDuplicates':
//                     generatedArray = PatternGenerator.generateManyDuplicates(patternSize, isNaN(parseFloat(patternParam1)) ? 0.2 : parseFloat(patternParam1));
//                     break;
//                 case 'generateBellCurve':
//                     generatedArray = PatternGenerator.generateBellCurve(
//                         patternSize,
//                         isNaN(parseFloat(patternParam1)) ? 0 : parseFloat(patternParam1),
//                         isNaN(parseFloat(patternParam2)) ? 10 : parseFloat(patternParam2)
//                     );
//                     break;
//                 case 'generateStepped':
//                     generatedArray = PatternGenerator.generateStepped(
//                         patternSize,
//                         isNaN(parseInt(patternParam1)) ? 10 : parseInt(patternParam1),
//                         isNaN(parseInt(patternParam2)) ? 10 : parseInt(patternParam2)
//                     );
//                     break;
//                 default:
//                     setErrors(["Unknown pattern type selected."]);
//                     return;
//             }
//             setAndValidateArray(generatedArray, []);
//         } catch (error) {
//             console.error("Error during pattern generation:", error);
//             setErrors([`Error generating pattern: ${error.message}. Please check input values.`]);
//             setOriginalArray([]);
//         }
//     }, [patternType, patternSize, patternParam1, patternParam2, setAndValidateArray]);

//     // Update pattern parameters based on selected pattern type
//     useEffect(() => {
//         setPatternParam1(undefined);
//         setPatternParam2(undefined);
//         switch (patternType) {
//             case 'generateNearlySorted':
//                 setPatternParam1(0.05); // perturbation
//                 break;
//             case 'generateFewUnique':
//                 setPatternParam1(5); // uniqueCount
//                 break;
//             case 'generateManyDuplicates':
//                 setPatternParam1(0.2); // duplicateFactor
//                 break;
//             case 'generateHighDuplicates':
//                 setPatternParam1(0.01); // A very low duplicate factor for emphasizing high duplicates
//                 break;
//             case 'generateBellCurve':
//                 setPatternParam1(0); // mean
//                 setPatternParam2(10); // stdDev
//                 break;
//             case 'generateStepped':
//                 setPatternParam1(10); // stepValue
//                 setPatternParam2(10); // stepLength
//                 break;
//             // No parameters for 'generateRandom', 'generateSortedIncreasing', 'generateSortedDecreasing'
//             default:
//                 break;
//         }
//     }, [patternType]);

//     const renderPatternParameters = () => {
//         switch (patternType) {
//             case 'generateNearlySorted':
//                 return (
//                     <div className="flex flex-col sm:flex-row gap-2">
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Perturbation (0 to 1, e.g., 0.05):
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 min="0"
//                                 max="1"
//                                 value={patternParam1 === undefined ? '' : patternParam1}
//                                 onChange={(e) => {
//                                     const val = parseFloat(e.target.value);
//                                     setPatternParam1(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder="e.g., 0.05"
//                             />
//                         </label>
//                     </div>
//                 );
//             case 'generateFewUnique':
//                 return (
//                     <div className="flex flex-col sm:flex-row gap-2">
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Unique Count (1 to {patternSize}):
//                             <input
//                                 type="number"
//                                 min="1"
//                                 max={patternSize}
//                                 value={patternParam1 === undefined ? '' : patternParam1}
//                                 onChange={(e) => {
//                                     const val = parseInt(e.target.value, 10);
//                                     setPatternParam1(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder="e.g., 5"
//                             />
//                         </label>
//                     </div>
//                 );
//             case 'generateManyDuplicates':
//             case 'generateHighDuplicates': // Both use a duplicate factor
//                 return (
//                     <div className="flex flex-col sm:flex-row gap-2">
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Duplicate Factor (0.01 to 1, e.g., {patternType === 'generateHighDuplicates' ? '0.01' : '0.2'}):
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 min="0.01"
//                                 max="1"
//                                 value={patternParam1 === undefined ? '' : patternParam1}
//                                 onChange={(e) => {
//                                     const val = parseFloat(e.target.value);
//                                     setPatternParam1(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder={patternType === 'generateHighDuplicates' ? 'e.g., 0.01' : 'e.g., 0.2'}
//                             />
//                         </label>
//                     </div>
//                 );
//             case 'generateBellCurve':
//                 return (
//                     <div className="flex flex-col sm:flex-row gap-4">
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Mean:
//                             <input
//                                 type="number"
//                                 value={patternParam1 === undefined ? '' : patternParam1}
//                                 onChange={(e) => {
//                                     const val = parseFloat(e.target.value);
//                                     setPatternParam1(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder="e.g., 0"
//                             />
//                         </label>
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Standard Deviation:
//                             <input
//                                 type="number"
//                                 value={patternParam2 === undefined ? '' : patternParam2}
//                                 onChange={(e) => {
//                                     const val = parseFloat(e.target.value);
//                                     setPatternParam2(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder="e.g., 10"
//                             />
//                         </label>
//                     </div>
//                 );
//             case 'generateStepped':
//                 return (
//                     <div className="flex flex-col sm:flex-row gap-4">
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Step Value:
//                             <input
//                                 type="number"
//                                 value={patternParam1 === undefined ? '' : patternParam1}
//                                 onChange={(e) => {
//                                     const val = parseInt(e.target.value, 10);
//                                     setPatternParam1(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder="e.g., 10"
//                             />
//                         </label>
//                         <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                             Step Length:
//                             <input
//                                 type="number"
//                                 value={patternParam2 === undefined ? '' : patternParam2}
//                                 onChange={(e) => {
//                                     const val = parseInt(e.target.value, 10);
//                                     setPatternParam2(isNaN(val) ? undefined : val);
//                                 }}
//                                 className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 placeholder="e.g., 10"
//                             />
//                         </label>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-inter p-4 sm:p-8 flex flex-col items-center">
//             <style>
//                 {`
//                 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
//                 body { font-family: 'Inter', sans-serif; }
//                 .glass-morphic {
//                     background: rgba(255, 255, 255, 0.2);
//                     backdrop-filter: blur(10px);
//                     -webkit-backdrop-filter: blur(10px);
//                     border-radius: 12px;
//                     border: 1px solid rgba(255, 255, 255, 0.3);
//                     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
//                 }
//                 .dark .glass-morphic {
//                     background: rgba(0, 0, 0, 0.2);
//                     border: 1px solid rgba(255, 255, 255, 0.1);
//                 }
//                 .input-method-btn {
//                     @apply px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200;
//                 }
//                 .input-method-btn.active {
//                     @apply bg-blue-600 text-white shadow-md;
//                 }
//                 .input-method-btn:not(.active) {
//                     @apply bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600;
//                 }
//                 `}
//             </style>

//             <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
//                 Array Size & Content Controller
//             </h1>
//             <p className="mb-8 text-lg text-center max-w-2xl">
//                 Input and generate arrays, and validate their size and content.
//             </p>

//             <div className="w-full max-w-4xl p-6 rounded-xl glass-morphic mb-8">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center">
//                     <LayoutGrid className="mr-2" size={24} /> Array Input Methods
//                 </h2>

//                 <div className="flex flex-wrap gap-3 mb-6 justify-center">
//                     <button
//                         type="button"
//                         className={`input-method-btn ${inputMethod === 'text' ? 'active' : ''}`}
//                         onClick={() => setInputMethod('text')}
//                     >
//                         <Type className="inline-block mr-1" size={18} /> Text Input
//                     </button>
//                     <button
//                         type="button"
//                         className={`input-method-btn ${inputMethod === 'pattern' ? 'active' : ''}`}
//                         onClick={() => setInputMethod('pattern')}
//                     >
//                         <Sparkles className="inline-block mr-1" size={18} /> Generate Pattern
//                     </button>
//                     <button
//                         type="button"
//                         className={`input-method-btn ${inputMethod === 'file' ? 'active' : ''}`}
//                         onClick={() => setInputMethod('file')}
//                     >
//                         <FileText className="inline-block mr-1" size={18} /> File Upload (.csv, .json, .txt)
//                     </button>
//                     <button
//                         type="button"
//                         className={`input-method-btn ${inputMethod === 'clipboard' ? 'active' : ''}`}
//                         onClick={handlePaste}
//                     >
//                         <Clipboard className="inline-block mr-1" size={18} /> Paste from Clipboard
//                     </button>
//                 </div>

//                 {/* Input Area */}
//                 <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-inner">
//                     {inputMethod === 'text' && (
//                         <div>
//                             <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Enter numbers (comma, space, or new-line separated, e.g., 1, 5, 2, 8):
//                             </label>
//                             <textarea
//                                 id="text-input"
//                                 className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px]"
//                                 value={textInputValue}
//                                 onChange={handleTextInputChange}
//                                 placeholder="e.g., 12, 11, 13, 5, 6, 7"
//                             />
//                         </div>
//                     )}

//                     {inputMethod === 'file' && (
//                         <div>
//                             <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Upload a CSV, JSON (array of numbers), or TXT file:
//                             </label>
//                             <input
//                                 id="file-upload"
//                                 type="file"
//                                 accept=".csv,.json,.txt"
//                                 onChange={handleFileUpload}
//                                 className="w-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                             />
//                         </div>
//                     )}

//                     {inputMethod === 'pattern' && (
//                         <div className="flex flex-col gap-4">
//                             <div className="flex flex-col sm:flex-row gap-2">
//                                 <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
//                                     Pattern Type:
//                                     <div className="relative mt-1">
//                                         <select
//                                             value={patternType}
//                                             onChange={(e) => setPatternType(e.target.value)}
//                                             className="block w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                         >
//                                             <option value="generateRandom">Random</option>
//                                             <option value="generateSortedIncreasing">Sorted Increasing</option>
//                                             <option value="generateSortedDecreasing">Sorted Decreasing</option>
//                                             <option value="generateNearlySorted">Nearly Sorted</option>
//                                             <option value="generateFewUnique">Few Unique Values</option>
//                                             <option value="generateManyDuplicates">Many Duplicates</option>
//                                             <option value="generateHighDuplicates">Random with High Duplicates</option>
//                                             <option value="generateBellCurve">Bell Curve (Normal Dist.)</option>
//                                             <option value="generateStepped">Stepped Pattern</option>
//                                         </select>
//                                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                                     </div>
//                                 </label>
//                                 <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-gray-300">
//                                     Size ({MIN_ARRAY_SIZE}-{MAX_ARRAY_SIZE}):
//                                     <input
//                                         type="number"
//                                         min={MIN_ARRAY_SIZE}
//                                         max={MAX_ARRAY_SIZE}
//                                         value={patternSize}
//                                         onChange={(e) => {
//                                             const val = parseInt(e.target.value, 10);
//                                             setPatternSize(isNaN(val) ? 0 : val);
//                                         }}
//                                         className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-24 sm:w-auto"
//                                     />
//                                 </label>
//                             </div>
//                             {renderPatternParameters()}
//                             <button
//                                 type="button"
//                                 onClick={handleGeneratePattern}
//                                 className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center justify-center"
//                             >
//                                 <Repeat className="mr-2" size={20} /> Generate Array
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Error Display */}
//             {errors.length > 0 && (
//                 <div className="w-full max-w-4xl p-4 mb-8 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-300 flex items-start">
//                     <AlertCircle className="mr-3 mt-1" size={20} />
//                     <div>
//                         <h4 className="font-semibold mb-1">Errors:</h4>
//                         <ul className="list-disc pl-5">
//                             {errors.map((err, index) => (
//                                 <li key={index}>{err}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             {/* Array Display */}
//             <div className="w-full max-w-4xl p-6 rounded-xl glass-morphic">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center">
//                     <List className="mr-2" size={24} /> Current Array
//                 </h2>

//                 <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-inner min-h-[150px] overflow-auto text-sm">
//                     {(!originalArray || originalArray.length === 0) ? (
//                         <p className="text-center text-gray-500 dark:text-gray-400">No array loaded. Please input or generate an array above.</p>
//                     ) : (
//                         <div className="flex flex-wrap gap-1">
//                             {originalArray.map((num, index) => (
//                                 <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md dark:bg-blue-900 dark:text-blue-200 text-xs sm:text-sm">
//                                     {num}
//                                 </span>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//                 <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//                     Current Array Size: {originalArray.length}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default App;



// src/components/ArrayInput.jsx
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
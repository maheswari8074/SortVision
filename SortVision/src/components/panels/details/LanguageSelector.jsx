import React, { useEffect, useRef } from 'react';
import { 
    Languages, 
    Code2, 
    Check,
    FileCode2,
    FileJson,
    Coffee,
    Binary,
    Boxes,
    Cog,
    FileType2,
    Hash,
    Code
} from 'lucide-react';

/**
 * LanguageSelector Component
 * 
 * A reusable component for selecting programming languages
 * with a beautiful UI matching the theme.
 */
const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Languages sorted by popularity based on GitHub stats, Stack Overflow surveys, and industry usage
    const languages = [
        {
            id: 'pseudocode',
            name: 'Pseudocode',
            icon: Code,
            iconColor: 'text-emerald-400'
        },
        { 
            id: 'python', 
            name: 'Python', 
            icon: FileCode2,
            iconColor: 'text-blue-400'
        },
        { 
            id: 'javascript', 
            name: 'JavaScript', 
            icon: FileJson,
            iconColor: 'text-yellow-400'
        },
        { 
            id: 'java', 
            name: 'Java', 
            icon: Coffee,
            iconColor: 'text-red-400'
        },
        { 
            id: 'typescript', 
            name: 'TypeScript', 
            icon: FileType2,
            iconColor: 'text-blue-400'
        },
        { 
            id: 'cpp', 
            name: 'C++', 
            icon: Binary,
            iconColor: 'text-blue-500'
        },
        {
            id: 'c',
            name: 'C',
            icon: Binary,
            iconColor: 'text-gray-400'
        },
        { 
            id: 'csharp', 
            name: 'C#', 
            icon: Hash,
            iconColor: 'text-purple-400'
        },
        {
            id: 'php',
            name: 'PHP',
            icon: Code,
            iconColor: 'text-indigo-400'
        },
        { 
            id: 'golang', 
            name: 'Go', 
            icon: Boxes,
            iconColor: 'text-cyan-400'
        },
        {
            id: 'swift',
            name: 'Swift',
            icon: Binary,
            iconColor: 'text-orange-500'
        },
        {
            id: 'kotlin',
            name: 'Kotlin',
            icon: FileType2,
            iconColor: 'text-purple-500'
        },
        { 
            id: 'rust', 
            name: 'Rust', 
            icon: Cog,
            iconColor: 'text-orange-400'
        },
        {
            id: 'ruby',
            name: 'Ruby',
            icon: FileCode2,
            iconColor: 'text-red-500'
        },
        {
            id: 'scala',
            name: 'Scala',
            icon: Cog,
            iconColor: 'text-red-600'
        },
        {
            id: 'dart',
            name: 'Dart',
            icon: FileCode2,
            iconColor: 'text-sky-400'
        },
        {
            id: 'r',
            name: 'R',
            icon: Hash,
            iconColor: 'text-blue-600'
        }
    ];

    const handleLanguageSelect = (langId) => {
        setIsOpen(false);
        onLanguageChange?.(langId);
    };

    const currentLanguage = languages.find(l => l.id === selectedLanguage);
    const SelectedIcon = currentLanguage?.icon || Languages;

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            {/* Language Selector Button */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700/50 
                         hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
            >
                <SelectedIcon className={`h-4 w-4 ${currentLanguage?.iconColor}`} />
                <span className="text-sm text-slate-300 group-hover:text-slate-200">
                    {currentLanguage?.name || 'Select Language'}
                </span>
                <Code2 className="h-4 w-4 text-slate-500 group-hover:text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    ref={dropdownRef}
                    className="absolute z-[9999] mt-2 w-48 rounded-md bg-slate-800/95 backdrop-blur-sm border border-slate-700 
                             shadow-lg shadow-black/50 ring-1 ring-black ring-opacity-5 right-0 top-full"
                >
                    <div className="py-1 max-h-[260px] overflow-y-auto 
                                  scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50
                                  hover:scrollbar-thumb-slate-500 transition-colors duration-200">
                        {languages.map((lang) => {
                            const Icon = lang.icon;
                            return (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageSelect(lang.id)}
                                    className={`flex items-center justify-between w-full px-4 py-2 text-sm transition-colors duration-300
                                              ${selectedLanguage === lang.id 
                                                ? 'bg-emerald-500/10 text-emerald-400' 
                                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-200'}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Icon className={`h-4 w-4 ${lang.iconColor}`} />
                                        <span>{lang.name}</span>
                                    </div>
                                    {selectedLanguage === lang.id && (
                                        <Check className="h-4 w-4 text-emerald-400" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector; 
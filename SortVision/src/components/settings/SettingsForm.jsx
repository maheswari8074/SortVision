import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Languages as LanguagesIcon, Monitor, Contrast, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const themeIconMap = {
  light: Sun,
  dark: Moon,
  contrast: Contrast,
  system: Monitor,
};

const themeIconColor = {
  light: 'text-yellow-300',
  dark: 'text-purple-400',
  contrast: 'text-emerald-400',
  system: 'text-blue-400',
};

const SettingsForm = ({ onClose }) => {
  // Initialize state from localStorage or defaults
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const themes = [
    { id: 'light', name: 'Light Theme', icon: Sun },
    { id: 'dark', name: 'Dark Theme', icon: Moon },
    { id: 'contrast', name: 'High Contrast', icon: Contrast },
    { id: 'system', name: 'System Default', icon: Monitor },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  return (
    <div className="space-y-10">
      {/* Sound Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>Sound</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> Enable or disable sound effects
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-lg group relative overflow-hidden
            bg-slate-800/70
            ${isSoundEnabled
              ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
              : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'}
          `}
          style={{
            boxShadow: isSoundEnabled ? '0 2px 24px 0 rgba(168,85,247,0.10)' : undefined,
          }}
        >
          <motion.div
            animate={{ rotate: isSoundEnabled ? 0 : -20, scale: isSoundEnabled ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/30 to-slate-800/60 shadow-inner transition-all duration-300
              ${isSoundEnabled ? 'text-[color:var(--color-purple-400)]' : 'text-slate-400'}`}
          >
            {isSoundEnabled ? <Volume2 className="h-6 w-6 animate-pulse" /> : <VolumeX className="h-6 w-6" />}
          </motion.div>
          <div className="flex-1 text-left">
            <div className={`text-base font-semibold font-mono transition-colors duration-200 ${isSoundEnabled ? 'text-[color:var(--color-purple-400)]' : 'text-white'}`}>{isSoundEnabled ? 'Sound Enabled' : 'Sound Disabled'}</div>
            <div className="text-xs text-slate-400 font-mono">{isSoundEnabled ? 'Click to disable sound effects' : 'Click to enable sound effects'}</div>
          </div>
          {isSoundEnabled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
            >
              <Check className="h-4 w-4 text-[color:var(--color-purple-400)]" />
            </motion.div>
          )}
          {/* Glass shine effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
        </motion.button>
      </div>

      {/* Theme Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-purple-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>Theme</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> Choose your preferred color theme
        </div>
        <div className="grid grid-cols-2 gap-5">
          {themes.map((themeOption) => {
            const Icon = themeIconMap[themeOption.id];
            const iconColor = themeIconColor[themeOption.id];
            return (
              <motion.button
                key={themeOption.id}
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(themeOption.id)}
                className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden
                  bg-slate-800/70
                  ${theme === themeOption.id
                    ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
                    : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'}
                `}
                style={{
                  boxShadow: theme === themeOption.id ? '0 2px 24px 0 rgba(168,85,247,0.10)' : undefined,
                }}
              >
                <motion.span
                  className={`text-xl ${iconColor}`}
                  animate={{ rotate: theme === themeOption.id ? -20 : 0, scale: theme === themeOption.id ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
                <span className={`text-base font-mono font-semibold transition-colors duration-200 ${theme === themeOption.id ? 'text-[color:var(--color-purple-400)]' : 'text-white'}`}>{themeOption.name}</span>
                {theme === themeOption.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
                  >
                    <Check className="h-4 w-4 text-[color:var(--color-purple-400)]" />
                  </motion.div>
                )}
                {/* Glass shine effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Language Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-purple-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>Language</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> Select your language
        </div>
        <div className="grid grid-cols-2 gap-5">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLanguage(lang.code)}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden
                bg-slate-800/70
                ${language === lang.code
                  ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
                  : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'}
              `}
              style={{
                boxShadow: language === lang.code ? '0 2px 24px 0 rgba(168,85,247,0.10)' : undefined,
              }}
            >
              <motion.span
                className="text-xl text-blue-400"
                animate={{ rotate: language === lang.code ? -20 : 0, scale: language === lang.code ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <LanguagesIcon className="h-7 w-7" />
              </motion.span>
              <span className={`text-base font-mono font-semibold transition-colors duration-200 ${language === lang.code ? 'text-[color:var(--color-purple-400)]' : 'text-white'}`}>{lang.name} <span className="ml-1 text-xs font-bold text-slate-400">({lang.code.toUpperCase()})</span></span>
              {language === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
                >
                  <Check className="h-4 w-4 text-[color:var(--color-purple-400)]" />
                </motion.div>
              )}
              {/* Glass shine effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
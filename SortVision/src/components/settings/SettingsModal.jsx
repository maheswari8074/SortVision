import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import SettingsForm from './SettingsForm';

const SettingsModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
        >
          <Card
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in-0 duration-500 rounded-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
            </button>

            <CardHeader className="text-center pr-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Settings2 
                  className="h-7 w-7 transition-all duration-300 text-emerald-400 animate-pulse" 
                  style={{ animationDuration: '2.5s' }}
                  aria-hidden="true"
                />
                <CardTitle className="text-2xl font-bold font-mono text-white">
                  <span className="text-emerald-400">Sort</span>
                  <span className="text-purple-400">Settings</span>
                </CardTitle>
              </div>
              <CardDescription className="text-slate-400 font-mono">
                <span className="text-amber-400">//</span> Customize your visualization preferences<br />
                <span className="text-amber-400">//</span> Adjust sound, theme, and language settings to enhance your experience
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              <SettingsForm onClose={onClose} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal; 
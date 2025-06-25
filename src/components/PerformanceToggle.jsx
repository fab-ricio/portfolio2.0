import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Bouton pour activer/désactiver les effets de performance
 */
export default function PerformanceToggle() {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Récupérer la préférence sauvegardée
    const saved = localStorage.getItem('portfolio-effects-enabled');
    if (saved !== null) {
      setEffectsEnabled(JSON.parse(saved));
    }
  }, []);

  const toggleEffects = () => {
    const newState = !effectsEnabled;
    setEffectsEnabled(newState);
    localStorage.setItem('portfolio-effects-enabled', JSON.stringify(newState));
    
    // Dispatch un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('performance-toggle', { 
      detail: { effectsEnabled: newState } 
    }));
  };

  return (
    <div className="fixed top-4 right-4 z-[150]">
      <motion.button
        onClick={toggleEffects}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          effectsEnabled 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-red-500 hover:bg-red-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {effectsEnabled ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-12 top-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl"
          >
            {effectsEnabled ? 'Désactiver les effets' : 'Activer les effets'}
            <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion } from 'framer-motion';
import React from 'react';

const FuturisticLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Logo ou icône */}
      <motion.div
        initial={{ scale: 0.7, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="mb-8"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#60a5fa" strokeWidth="4" opacity="0.3" />
          <motion.circle
            cx="32" cy="32" r="20"
            stroke="#a5b4fc"
            strokeWidth="4"
            strokeDasharray="125.6"
            strokeDashoffset="0"
            initial={{ strokeDashoffset: 125.6 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 12px #60a5fa)' }}
          />
          <motion.circle
            cx="32" cy="32" r="12"
            stroke="#f472b6"
            strokeWidth="3"
            fill="none"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            style={{ transformOrigin: '32px 32px' }}
          />
        </svg>
      </motion.div>
      {/* Texte animé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-xl md:text-2xl font-bold text-blue-100 tracking-widest drop-shadow-lg"
      >
        Chargement...
      </motion.div>
    </div>
  );
};

export default FuturisticLoader;

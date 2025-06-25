import React from 'react';
import { motion } from 'framer-motion';

/**
 * Version de test simplifiée des étoiles filantes
 */
export default function ShootingStarsTest() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Étoile de test simple */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full"
        style={{
          boxShadow: '0 0 10px white, -10px 0 5px rgba(255,255,255,0.5)'
        }}
        animate={{
          x: ['-10%', '110%'],
          y: ['-10%', '110%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Étoile de test 2 */}
      <motion.div
        className="absolute w-3 h-3 bg-cyan-400 rounded-full"
        style={{
          boxShadow: '0 0 15px #06b6d4, -15px 0 8px rgba(6,182,212,0.5)'
        }}
        animate={{
          x: ['110%', '-10%'],
          y: ['-10%', '110%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 4,
          delay: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Point fixe pour test */}
      <div 
        className="absolute w-4 h-4 bg-red-500 rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
}

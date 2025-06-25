import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../hooks/usePerformance';

/**
 * Étoiles filantes avec debug
 */
export default function ShootingStarsDebug({ count = 8 }) {
  const { isLowPerformance, reducedMotion } = usePerformance();

  useEffect(() => {
    console.log('ShootingStars Debug:', {
      isLowPerformance,
      reducedMotion,
      count,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }, [isLowPerformance, reducedMotion, count]);

  // Version simple sans conditions pour débugger
  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: -10,
      startY: 10 + i * 15,
      endX: 110,
      endY: 60 + i * 15,
      duration: 3,
      delay: i * 0.8,
      color: ['#ffffff', '#06b6d4', '#eab308', '#f59e0b', '#3b82f6'][i],
      size: 3
    }));
  }, []);

  console.log('Rendering stars:', stars);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black bg-opacity-10">
      {/* Point de référence visible */}
      <div 
        className="absolute w-4 h-4 bg-red-500 rounded-full z-10"
        style={{ top: '10px', left: '10px' }}
      />
      
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 10px ${star.color}`,
            zIndex: 1
          }}
          initial={{
            x: `${star.startX}%`,
            y: `${star.startY}%`,
            opacity: 0
          }}
          animate={{
            x: `${star.endX}%`,
            y: `${star.endY}%`,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
      
      {/* Texte de debug */}
      <div className="absolute top-16 left-4 text-white text-sm bg-black bg-opacity-50 p-2 rounded z-10">
        <p>isLowPerformance: {isLowPerformance.toString()}</p>
        <p>reducedMotion: {reducedMotion.toString()}</p>
        <p>Stars count: {stars.length}</p>
      </div>
    </div>
  );
}

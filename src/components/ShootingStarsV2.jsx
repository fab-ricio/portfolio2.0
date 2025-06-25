import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../hooks/usePerformance';

/**
 * Étoiles filantes - Version finale optimisée
 */
export default function ShootingStarsV2({ count = 8 }) {
  const { isLowPerformance, reducedMotion } = usePerformance();
  console.log('ShootingStarsV2 debug', { isLowPerformance, reducedMotion, count });

  // Ajuster le nombre d'étoiles selon la performance
  const starCount = reducedMotion ? 0 : (isLowPerformance ? Math.min(count / 2, 4) : count);

  const stars = useMemo(() => {
    if (starCount === 0) return [];
    
    return Array.from({ length: starCount }, (_, i) => {
      const colors = ['#ffffff', '#06b6d4', '#eab308', '#3b82f6', '#f59e0b', '#8b5cf6'];
      
      return {
        id: i,
        // Trajectoires variées
        path: i % 4 === 0 
          ? { startX: -5, startY: 20, endX: 105, endY: 80 }  // Diagonal standard
          : i % 4 === 1
          ? { startX: 105, startY: 20, endX: -5, endY: 80 }  // Diagonal inverse
          : i % 4 === 2
          ? { startX: 20, startY: -5, endX: 80, endY: 105 }  // Vertical
          : { startX: -5, startY: 60, endX: 105, endY: 40 }, // Horizontal
        
        duration: 2.5 + Math.random() * 1.5, // 2.5-4s
        delay: Math.random() * 6 + i * 0.8,
        color: colors[i % colors.length],
        size: 2 + Math.random() * 2, // 2-4px
      };
    });
  }, [starCount]);

  // Si les animations sont désactivées, ne pas afficher
  if (reducedMotion || starCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 4}px ${star.color}, -${star.size * 6}px 0 ${star.size * 2}px ${star.color}88`,
            left: `${star.path.startX}%`,
            top: `${star.path.startY}%`,
          }}
          animate={{
            x: [`0%`, `${star.path.endX - star.path.startX}vw`],
            y: [`0%`, `${star.path.endY - star.path.startY}vh`],
            opacity: [0, 0.8, 1, 0.8, 0],
            scale: [0.5, 1, 1.2, 1, 0.5]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Étoiles statiques scintillantes (version légère) */}
      {!isLowPerformance && Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`twinkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i * 7) % 80}%`,
            opacity: 0.3
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

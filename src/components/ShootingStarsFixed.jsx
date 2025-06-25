import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../hooks/usePerformance';

/**
 * Étoiles filantes optimisées - Version corrigée
 */
export default function ShootingStars({ count = 8 }) {
  const { isLowPerformance, reducedMotion } = usePerformance();

  // Ajuster le nombre d'étoiles selon la performance
  const starCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (isLowPerformance) return Math.min(count / 2, 4);
    return count;
  }, [count, isLowPerformance, reducedMotion]);

  const stars = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => {
      // Trajectoires pré-définies
      const trajectories = [
        { startX: -10, startY: 10, endX: 110, endY: 90 },
        { startX: 110, startY: 10, endX: -10, endY: 90 },
        { startX: 10, startY: -10, endX: 90, endY: 110 },
        { startX: -10, startY: 50, endX: 110, endY: 20 },
        { startX: 50, startY: -10, endX: 20, endY: 110 },
      ];
      
      const trajectory = trajectories[i % trajectories.length];
      const colors = ['#ffffff', '#06b6d4', '#eab308', '#3b82f6', '#f59e0b'];
      
      return {
        id: i,
        startX: trajectory.startX,
        startY: trajectory.startY,
        endX: trajectory.endX,
        endY: trajectory.endY,
        duration: isLowPerformance ? 
          Math.random() * 2 + 3 :  // 3-5s pour appareils lents
          Math.random() * 1.5 + 2, // 2-3.5s pour appareils normaux
        delay: Math.random() * 8 + i * 1.5,
        color: colors[i % colors.length],
        size: Math.random() * 2 + 2, // 2-4px
      };
    });
  }, [starCount, isLowPerformance]);

  if (reducedMotion || starCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: isLowPerformance 
              ? `0 0 ${star.size * 3}px ${star.color}`
              : `0 0 ${star.size * 3}px ${star.color}, 
                 -${star.size * 4}px 0 ${star.size * 2}px ${star.color}99, 
                 -${star.size * 8}px 0 ${star.size}px ${star.color}66`
          }}
          initial={{
            x: `${star.startX}%`,
            y: `${star.startY}%`,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            x: `${star.endX}%`,
            y: `${star.endY}%`,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeOut',
            opacity: {
              times: [0, 0.1, 0.8, 1],
              ease: 'easeOut'
            }
          }}
        />
      ))}
      
      {/* Étoiles statiques scintillantes (uniquement sur appareils performants) */}
      {!isLowPerformance && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`static-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + (i * 10) % 60}%`,
                top: `${15 + (i * 13) % 70}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

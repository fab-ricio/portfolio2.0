import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../hooks/usePerformance';

/**
 * Étoiles filantes optimisées avec détection de performance
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
    // Trajectoires pré-définies pour les étoiles filantes
    const trajectories = [
      // Diagonale classique (haut-gauche vers bas-droite)
      { startX: -10, startY: -10, endX: 120, endY: 120, angle: 45 },
      // Diagonale inverse (haut-droite vers bas-gauche)  
      { startX: 110, startY: -10, endX: -20, endY: 120, angle: -45 },
      // Plus vertical (haut vers bas avec léger angle)
      { startX: 20, startY: -10, endX: 80, endY: 120, angle: 25 },
      // Plus horizontal (gauche vers droite avec angle)
      { startX: -20, startY: 30, endX: 120, endY: 70, angle: 15 },
      // Trajectoire en arc
      { startX: -10, startY: 50, endX: 110, endY: 20, angle: -15 },
    ];

    return Array.from({ length: starCount }, (_, i) => {
      const trajectory = trajectories[i % trajectories.length];
      
      return {
        id: i,
        ...trajectory,
        // Durées variées pour effet naturel
        duration: isLowPerformance ? 
          Math.random() * 3 + 4 :  // 4-7s pour appareils lents
          Math.random() * 2 + 2,   // 2-4s pour appareils normaux
        // Délais très étalés pour éviter la synchronisation
        delay: Math.random() * 12 + i * 2,
        // Couleurs d'étoiles
        color: ['white', 'cyan', 'yellow', 'blue'][Math.floor(Math.random() * 4)],
        // Taille variable
        size: Math.random() * 3 + 2, // 2-5px
        // Intensité de la traînée
        trailIntensity: Math.random() * 0.5 + 0.3 // 0.3-0.8
      };
    });
  }, [starCount, isLowPerformance]);
  // Style de la traînée lumineuse optimisé
  const getStarStyle = (star) => {
    const { color, size, trailIntensity } = star;
    
    const colorMap = {
      white: '#ffffff',
      cyan: '#06b6d4', 
      yellow: '#eab308',
      blue: '#3b82f6'
    };

    const baseColor = colorMap[color];
    const tailLength = isLowPerformance ? 15 : 25;
    
    return {
      width: size,
      height: size,
      background: baseColor,
      borderRadius: '50%',
      // Traînée avec box-shadow (très performant)
      boxShadow: isLowPerformance ? 
        `0 0 ${size * 2}px ${baseColor}` :
        `
          0 0 ${size * 2}px ${baseColor},
          -${tailLength * 0.3}px 0 ${size}px ${baseColor}${Math.floor(trailIntensity * 255).toString(16).padStart(2, '0')},
          -${tailLength * 0.6}px 0 ${size * 0.7}px ${baseColor}${Math.floor(trailIntensity * 153).toString(16).padStart(2, '0')},
          -${tailLength}px 0 ${size * 0.4}px ${baseColor}${Math.floor(trailIntensity * 76).toString(16).padStart(2, '0')}
        `,
      // Rotation selon l'angle de trajectoire
      transform: `rotate(${star.angle}deg)`
    };
  };

  // Animation des étoiles filantes
  const getStarAnimation = (star) => {
    if (isLowPerformance) {
      // Version simplifiée pour appareils lents
      return {
        animate: {
          x: [star.startX + '%', star.endX + '%'],
          y: [star.startY + '%', star.endY + '%'],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5]
        },
        transition: {
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease: 'easeOut',
        }
      };
    }

    // Version complète pour appareils performants
    return {
      animate: {
        x: [star.startX + '%', star.endX + '%'],
        y: [star.startY + '%', star.endY + '%'],
        opacity: [0, 0.3, 1, 0.8, 0],
        scale: [0.3, 0.8, 1.2, 1, 0.5],
        // Petite variation pour effet naturel
        rotate: [0, star.angle * 0.1, 0]
      },
      transition: {
        duration: star.duration,
        delay: star.delay,
        repeat: Infinity,
        ease: 'easeOut',
        // Courbes différentes pour chaque propriété
        opacity: {
          times: [0, 0.1, 0.4, 0.8, 1],
          ease: 'easeOut'
        },
        scale: {
          times: [0, 0.2, 0.5, 0.8, 1],
          ease: 'easeOut'
        }
      }
    };
  };

  if (reducedMotion) {
    return null; // Pas d'effet si prefers-reduced-motion
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={getStarStyle(star)}
          {...getStarAnimation(star)}
        />
      ))}
        {/* Étoiles statiques subtiles en arrière-plan (uniquement sur appareils performants) */}
      {!isLowPerformance && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

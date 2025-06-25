import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../hooks/usePerformance';

/**
 * Particules géométriques légères avec détection de performance
 */
export default function GeometricParticles({ count = 15 }) {
  const { isLowPerformance, reducedMotion } = usePerformance();

  // Ajuster le nombre de particules selon la performance
  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (isLowPerformance) return Math.min(count / 2, 8);
    return count;
  }, [count, isLowPerformance, reducedMotion]);
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      // Trajectoires pré-définies pour l'optimisation
      const movementPatterns = [
        // Pattern 1: Mouvement en 8
        { x: [0, 15, 0, -15, 0], y: [0, -10, -20, -10, 0] },
        // Pattern 2: Zigzag vertical
        { x: [0, 20, -10, 15, 0], y: [0, -15, -30, -45, 0] },
        // Pattern 3: Cercle
        { x: [0, 10, 0, -10, 0], y: [0, -10, -20, -10, 0] },
        // Pattern 4: Spirale
        { x: [0, 8, 16, 8, 0], y: [0, -8, -16, -24, -32] },
        // Pattern 5: Vague
        { x: [0, 25, 0, -25, 0], y: [0, -12, -24, -12, 0] },
        // Pattern 6: Triangle
        { x: [0, 12, -12, 0], y: [0, -20, -20, 0] }
      ];

      const pattern = movementPatterns[i % movementPatterns.length];
      
      return {
        id: i,
        size: Math.random() * 8 + 4, // 4-12px
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: isLowPerformance ? Math.random() * 35 + 25 : Math.random() * 25 + 15, // Plus lent sur appareils lents
        delay: Math.random() * 8, // Délais plus variés pour éviter la synchronisation
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
        color: ['cyan', 'indigo', 'purple', 'pink'][Math.floor(Math.random() * 4)],
        movementPattern: pattern,
        // Rotation aléatoire du pattern pour plus de variété
        patternRotation: Math.random() * 360
      };
    });
  }, [particleCount, isLowPerformance]);

  const getShapeClass = (shape, color) => {
    const baseClass = `absolute pointer-events-none`;
    const opacityClass = isLowPerformance ? 'opacity-10' : 'opacity-20';
    
    const colorClasses = {
      cyan: 'bg-cyan-400',
      indigo: 'bg-indigo-400', 
      purple: 'bg-purple-400',
      pink: 'bg-pink-400'
    };

    switch(shape) {
      case 'circle':
        return `${baseClass} ${colorClasses[color]} ${opacityClass} rounded-full`;
      case 'square':
        return `${baseClass} ${colorClasses[color]} ${opacityClass} rotate-45`;
      case 'triangle':
        return `${baseClass} ${colorClasses[color]} ${opacityClass} rotate-12`;
      default:
        return `${baseClass} ${colorClasses[color]} ${opacityClass} rounded-full`;
    }
  };
  // Animations avec mouvements aléatoires optimisés
  const getAnimationProps = (particle) => {
    const { movementPattern, patternRotation } = particle;
    
    if (isLowPerformance) {
      // Version simplifiée pour appareils lents
      return {
        animate: {
          y: [0, movementPattern.y[1] || -15, 0],
          x: [0, movementPattern.x[1] || 10, 0],
          opacity: [0.1, 0.2, 0.1]
        },
        transition: {
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      };
    }

    // Version complète pour appareils performants
    return {
      animate: {
        // Mouvement selon le pattern pré-défini
        y: movementPattern.y,
        x: movementPattern.x,
        // Rotation continue avec offset aléatoire
        rotate: [patternRotation, patternRotation + 360],
        // Échelle pulsante
        scale: [1, 1.1, 1.2, 1.1, 1],
        // Opacité variable
        opacity: [0.2, 0.4, 0.3, 0.4, 0.2]
      },
      transition: {
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: 'easeInOut',
        // Différentes courbes d'animation pour chaque propriété
        rotate: { 
          duration: particle.duration * 1.2, 
          ease: 'linear' 
        },
        scale: { 
          duration: particle.duration * 0.8, 
          ease: 'easeInOut' 
        }
      }
    };
  };

  if (reducedMotion) {
    return null; // Pas d'effet si prefers-reduced-motion
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={getShapeClass(particle.shape, particle.color)}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          {...getAnimationProps(particle)}
        />
      ))}
        {/* Lignes de connexion dynamiques entre particules proches */}
      {!isLowPerformance && particles.length > 6 && (
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
          {particles.slice(0, 6).map((particle, i) => {
            // Connecter chaque particule aux 2 suivantes pour créer un réseau
            const connections = [
              particles[(i + 1) % 6],
              particles[(i + 2) % 6]
            ];
            
            return connections.map((targetParticle, connectionIndex) => (
              <motion.line
                key={`line-${i}-${connectionIndex}`}
                x1={`${particle.x}%`}
                y1={`${particle.y}%`}
                x2={`${targetParticle.x}%`}
                y2={`${targetParticle.y}%`}
                stroke="currentColor"
                strokeWidth="1"
                className={`text-${particle.color}-400`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0], 
                  opacity: [0, 0.3, 0],
                  strokeDasharray: ["0 10", "5 5", "10 0"]
                }}
                transition={{ 
                  duration: particle.duration * 1.5, 
                  delay: (i + connectionIndex) * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ));
          })}
        </svg>
      )}

      {/* Particules "fantômes" qui apparaissent/disparaissent aléatoirement */}
      {!isLowPerformance && (
        <div className="absolute inset-0">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={`ghost-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full opacity-10"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0]
              }}
              transition={{
                duration: 8 + i * 2,
                delay: i * 3,
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

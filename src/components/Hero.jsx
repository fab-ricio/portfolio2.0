import React from 'react';
import { motion } from 'framer-motion';
// import { usePerformance } from '../hooks/usePerformance';

const Hero = () => {
  // Hook désactivé temporairement
  // const { isLowPerformance, reducedMotion } = usePerformance();
  const reducedMotion = false; // Temporaire

  return (
    <section
      id="hero"
      className="w-full relative flex flex-col justify-center items-center text-center min-h-[60vh] sm:min-h-[80vh] md:min-h-screen px-0 py-0 bg-none dark:bg-none text-white mt-20"
    >
      {/* Texte principal animé */}
      <motion.h1
        className="text-base sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.3 : 1 }}
      >
        Bonjour, je suis Fabricio
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        className="text-xs sm:text-base md:text-lg lg:text-xl max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: reducedMotion ? 0.1 : 1, duration: reducedMotion ? 0.3 : 1 }}
      >
        Développeur Freelance spécialisé en automatisation et solutions web modernes.
      </motion.p>

      {/* Bouton d'action */}
      <motion.a
        href="#projects"
        className="inline-block px-4 sm:px-8 py-2 sm:py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg hover:bg-indigo-50 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600 transition text-xs sm:text-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reducedMotion ? 0.2 : 1.8, duration: reducedMotion ? 0.3 : 0.5 }}
      >
        Voir mes projets
      </motion.a>      {/* Arrière-plan léger - À REMPLACER */}
    </section>
  );
};

export default Hero;

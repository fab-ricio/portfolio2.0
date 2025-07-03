import React from 'react';
// import { motion } from 'framer-motion';
// import { usePerformance } from '../hooks/usePerformance';
import ShootingStarsV2 from './ShootingStarsV2';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import ProjetsWeb from './ProjetsWeb';
import Services from './Services';
import Contact from './Contact';

export default function Main({ language }) {
  // Configuration simplifiée - hook désactivé temporairement
  // const { isLowPerformance, reducedMotion } = usePerformance();

  return (
    <main className="w-full relative flex flex-col justify-center items-center text-center px-2 sm:px-4 md:px-8 pt-20 bg-gradient-to-br from-[#181c2a] via-[#23265d] to-[#312e81] dark:from-gray-900 dark:to-gray-800 text-white overflow-hidden">      {/* Étoiles Filantes Spectaculaires */}
      <ShootingStarsV2 count={10} />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <Hero language={language} />
        <About language={language} />
        <Projects language={language} />
        <ProjetsWeb language={language} />
        <Services language={language} />
        <Contact language={language} />
      </div>
    </main>
  );
}

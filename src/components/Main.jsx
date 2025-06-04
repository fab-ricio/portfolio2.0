import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import ProjetsWeb from './ProjetsWeb';
import Services from './Services';
import Contact from './Contact';

export default function Main() {
  return (
    <main className="w-full relative flex flex-col justify-center items-center text-center px-2 sm:px-4 md:px-8 pt-20 bg-gradient-to-br from-[#181c2a] via-[#23265d] to-[#312e81] dark:from-gray-900 dark:to-gray-800 text-white overflow-hidden">
      {/* Cercles lumineux animés futuristes */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden w-screen h-screen box-border">
        {/* Cercle principal */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[clamp(200px,40vw,600px)] h-[clamp(200px,40vw,600px)] rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cercle bleu en haut à gauche */}
        <motion.div
          className="absolute top-[2vw] left-[2vw] w-[clamp(120px,22vw,350px)] h-[clamp(120px,22vw,350px)] rounded-full bg-blue-400 opacity-20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Cercle rose en bas à droite */}
        <motion.div
          className="absolute bottom-[2vw] right-[2vw] w-[clamp(140px,25vw,400px)] h-[clamp(140px,25vw,400px)] rounded-full bg-pink-400 opacity-20 blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Cercle vert en bas à gauche */}
        <motion.div
          className="absolute bottom-[4vw] left-[4vw] w-[clamp(90px,15vw,220px)] h-[clamp(90px,15vw,220px)] rounded-full bg-emerald-400 opacity-10 blur-2xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* Cercle cyan en haut à droite */}
        <motion.div
          className="absolute top-[4vw] right-[4vw] w-[clamp(70px,12vw,180px)] h-[clamp(70px,12vw,180px)] rounded-full bg-cyan-400 opacity-10 blur-2xl"
          animate={{ scale: [1, 1.13, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <Hero />
        <About />
        <Projects />
        <ProjetsWeb />
        <Services />
        <Contact />
      </div>
    </main>
  );
}

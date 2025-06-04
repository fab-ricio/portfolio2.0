import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = ['Accueil', 'À propos', 'Projets', 'Services', 'Contact'];

export default function HeaderMobile() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-95 backdrop-blur-xl shadow-xl border-b border-indigo-900 md:hidden">
      <div className="max-w-6xl mx-auto px-3 py-2 flex flex-row justify-between items-center text-white w-full">
        {/* Logo simple mobile */}
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="28" fill="#23265d" />
            <ellipse cx="24" cy="38" rx="3.2" ry="1.5" fill="#60a5fa" />
            <ellipse cx="40" cy="38" rx="3.2" ry="1.5" fill="#60a5fa" />
            <rect x="27" y="46" width="10" height="2.2" rx="1" fill="#0ff" />
          </svg>
          <span className="text-base font-bold tracking-wide">MonPortfolio</span>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(open => !open)}
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-black w-10 h-10 flex items-center justify-center"
          title="Menu"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute left-0 top-full w-full z-40 flex flex-col items-center gap-2 bg-black bg-opacity-95 backdrop-blur-xl shadow-xl border-b border-indigo-900 rounded-b-xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
          >
            {links.map((link, i) => {
              let sectionId = link.toLowerCase().replace(/ /g, '-');
              if (link === 'Accueil') sectionId = 'hero';
              if (link === 'À propos') sectionId = 'about';
              if (link === 'Projets') sectionId = 'projects';
              return (
                <motion.a
                  key={i}
                  href={`#${sectionId}`}
                  whileHover={{ scale: 1.08 }}
                  className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors duration-200 py-2 px-6 w-full text-center"
                  onClick={e => {
                    e.preventDefault();
                    const section = document.getElementById(sectionId);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.hash = `#${sectionId}`;
                    }
                    setMenuOpen(false);
                  }}
                >
                  {link}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

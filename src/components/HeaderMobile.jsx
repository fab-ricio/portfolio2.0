import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { t } from '../i18n';

const links = ['Accueil', 'À propos', 'Projets', 'Services', 'Contact'];

export default function HeaderMobile({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blink, setBlink] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const logoRef = useRef();

  // Animation clignement automatique
  useEffect(() => {
    let timeout;
    let isUnmounted = false;
    function scheduleBlink() {
      const next = 2500 + Math.random() * 3500;
      timeout = setTimeout(() => {
        if (isUnmounted) return;
        setBlink(true);
        setTimeout(() => setBlink(false), 120 + Math.random() * 60);
        scheduleBlink();
      }, next);
    }
    scheduleBlink();
    return () => {
      isUnmounted = true;
      clearTimeout(timeout);
    };
  }, []);

  // Suivi du doigt sur mobile (touch)
  useEffect(() => {
    function handleTouch(e) {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let mx, my;
      if (e.touches && e.touches.length > 0) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      } else {
        mx = cx;
        my = cy;
      }
      let dx = mx - cx;
      let dy = my - cy;
      // Limiter l'amplitude
      dx = Math.max(-10, Math.min(10, dx));
      dy = Math.max(-10, Math.min(10, dy));
      setEyeOffset({ x: dx, y: dy });
    }
    function resetEye() {
      setEyeOffset({ x: 0, y: 0 });
    }
    const node = logoRef.current;
    if (node) {
      node.addEventListener('touchmove', handleTouch);
      node.addEventListener('touchend', resetEye);
    }
    return () => {
      if (node) {
        node.removeEventListener('touchmove', handleTouch);
        node.removeEventListener('touchend', resetEye);
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-95 backdrop-blur-xl shadow-xl border-b border-indigo-900 md:hidden">
      <div className="max-w-6xl mx-auto px-3 py-2 flex flex-row justify-between items-center text-white w-full">
        {/* Logo mobile animé identique à desktop */}
        <div className="flex items-center gap-2" ref={logoRef} style={{ touchAction: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cyber-glow-header-mobile" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#23265d" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="cyber-stroke-header-mobile" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0ff" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="cyber-eye-header-mobile" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
            <ellipse cx="32" cy="32" rx="28" ry="28" fill="url(#cyber-glow-header-mobile)" />
            <path d="M14 44 Q32 60 50 44 Q58 30 32 12 Q6 30 14 44Z" fill="#181c2a" stroke="url(#cyber-stroke-header-mobile)" strokeWidth="3" />
            {/* Yeux animés (clignement + suivi doigt) */}
            <motion.ellipse
              cx={24 + eyeOffset.x * 0.5}
              cy={38 + eyeOffset.y * 0.5}
              rx="3.2"
              ry={blink ? 0.3 : 1.5}
              fill="url(#cyber-eye-header-mobile)"
              animate={{ ry: blink ? 0.3 : 1.5, cx: 24 + eyeOffset.x * 0.5, cy: 38 + eyeOffset.y * 0.5 }}
              transition={{ duration: 0.13, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={40 + eyeOffset.x * 0.5}
              cy={38 + eyeOffset.y * 0.5}
              rx="3.2"
              ry={blink ? 0.3 : 1.5}
              fill="url(#cyber-eye-header-mobile)"
              animate={{ ry: blink ? 0.3 : 1.5, cx: 40 + eyeOffset.x * 0.5, cy: 38 + eyeOffset.y * 0.5 }}
              transition={{ duration: 0.13, ease: 'easeInOut' }}
            />
            <rect x="27" y="46" width="10" height="2.2" rx="1" fill="#0ff" />
            <line x1="32" y1="12" x2="32" y2="4" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="14" y1="44" x2="4" y2="58" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50" y1="44" x2="60" y2="58" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          <span className="text-base font-bold tracking-wide">{t(language, 'portfolio_brand')}</span>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(open => !open)}
          className="p-2 rounded-lg text-indigo-500 hover:text-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-10 h-10 flex items-center justify-center bg-transparent border-none shadow-none"
          title="Menu"
          aria-label="Ouvrir le menu"
          style={{ boxShadow: 'none', background: 'none' }}
        >
          <motion.span
            initial={false}
            animate={{ rotate: menuOpen ? 90 : 0, scale: menuOpen ? 1.15 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center justify-center w-full h-full"
          >
            {menuOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
          </motion.span>
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
                  {t(language, link)}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

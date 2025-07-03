import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import services from './servicesList';
import { t } from '../i18n';

const links = [
  'Accueil',
  'À propos',
  'Projets',
  'Services',
  'Contact',
];

export default function HeaderDesktop({ language, setLanguage }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blink, setBlink] = useState(false);
  const [blinkTimeout, setBlinkTimeout] = useState(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const logoRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    let timeout;
    let isUnmounted = false;
    function scheduleBlink() {
      const next = 2500 + Math.random() * 3500;
      timeout = setTimeout(() => {
        if (isUnmounted) return;
        if (Math.random() < 0.1) {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            setTimeout(() => {
              setBlink(true);
              setTimeout(() => setBlink(false), 110);
            }, 120);
          }, 110);
        } else {
          setBlink(true);
          setTimeout(() => setBlink(false), 140 + Math.random() * 60);
        }
        scheduleBlink();
      }, next);
    }
    scheduleBlink();
    return () => {
      isUnmounted = true;
      clearTimeout(timeout);
    };
  }, [loading]);

  useEffect(() => {
    function handleMove(e) {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = e.clientX;
      const my = e.clientY;
      let dx = mx - cx;
      let dy = my - cy;
      const maxDist = 7;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
      }
      setEyeOffset({ x: dx, y: dy });
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  function handleLogoClick() {
    setBlink(true);
    if (blinkTimeout) clearTimeout(blinkTimeout);
    const t = setTimeout(() => setBlink(false), 220);
    setBlinkTimeout(t);
  }

  const handleServiceClick = (service) => {
    localStorage.setItem('selectedService', JSON.stringify(service));
    setServicesOpen(false);
    setTimeout(() => {
      window.location.hash = '#services';
      const section = document.getElementById('services');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      if (typeof window.setSelectedServiceFromHeader === 'function') {
        window.setSelectedServiceFromHeader(service);
      }
    }, 50);
  };

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        {/* ...loader code inchangé... */}
      </AnimatePresence>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-row justify-between items-center text-white w-full">
        {/* Logo avec clignement et clic */}
        <motion.div
          className="flex items-center gap-2 group cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          onClick={handleLogoClick}
          title="Cyberbot - cliquez pour un clin d'œil !"
          ref={logoRef}
        >
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cyber-glow-header" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#23265d" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="cyber-stroke-header" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0ff" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="cyber-eye-header" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
            <ellipse cx="32" cy="32" rx="28" ry="28" fill="url(#cyber-glow-header)" />
            <path d="M14 44 Q32 60 50 44 Q58 30 32 12 Q6 30 14 44Z" fill="#181c2a" stroke="url(#cyber-stroke-header)" strokeWidth="3" />
            {/* Yeux animés (clignement + suivi souris) */}
            <motion.ellipse
              cx={24 + eyeOffset.x * 0.5}
              cy={38 + eyeOffset.y * 0.5}
              rx="3.2"
              ry={blink ? 0.3 : 1.5}
              fill="url(#cyber-eye-header)"
              animate={{ ry: blink ? 0.3 : 1.5, cx: 24 + eyeOffset.x * 0.5, cy: 38 + eyeOffset.y * 0.5 }}
              transition={{ duration: 0.13, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={40 + eyeOffset.x * 0.5}
              cy={38 + eyeOffset.y * 0.5}
              rx="3.2"
              ry={blink ? 0.3 : 1.5}
              fill="url(#cyber-eye-header)"
              animate={{ ry: blink ? 0.3 : 1.5, cx: 40 + eyeOffset.x * 0.5, cy: 38 + eyeOffset.y * 0.5 }}
              transition={{ duration: 0.13, ease: 'easeInOut' }}
            />
            <rect x="27" y="46" width="10" height="2.2" rx="1" fill="#0ff" />
            <line x1="32" y1="12" x2="32" y2="4" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="14" y1="44" x2="4" y2="58" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50" y1="44" x2="60" y2="58" stroke="#0ff" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          <motion.h1
            className="text-base sm:text-xl md:text-2xl font-bold mb-0 group-hover:text-cyan-400 transition-colors duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ letterSpacing: '0.08em' }}
          >
            {t(language, 'portfolio_brand')}
          </motion.h1>
        </motion.div>
        {/* Desktop Menu */}
        <nav className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium items-center">
          {links.map((link, i) => {
            let sectionId = link.toLowerCase().replace(/ /g, '-');
            if (link === 'Accueil') sectionId = 'hero';
            if (link === 'À propos') sectionId = 'about';
            if (link === 'Projets') sectionId = 'projects';
            if (link === 'Services') {
              return (
                <div key={i} className="relative group flex items-center"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <motion.a
                    href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                    className="transition-colors duration-200 hover:text-cyan-400 px-2 py-1"
                  >
                    {t(language, link)}
                  </motion.a>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.22 }}
                        className="absolute left-0 top-full mt-2 min-w-[220px] bg-[#181c2a] border border-indigo-700 rounded-xl shadow-xl py-2 z-50 flex flex-col items-center"
                        style={{ minWidth: '220px' }}
                      >
                        {services.map((srv) => {
                          const localSrv = services.find(s => s.id === srv.id);
                          return (
                            <li key={srv.id} className="px-4 py-2 text-sm text-white hover:bg-indigo-700/60 cursor-pointer transition-colors duration-150 w-full text-center"
                              onClick={() => handleServiceClick(localSrv)}
                            >
                              {srv.title}
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <motion.a
                key={i}
                href={`#${sectionId}`}
                className="transition-colors duration-200 hover:text-cyan-400 px-2 py-1"
              >
                {t(language, link)}
              </motion.a>
            );
          })}
        </nav>
        {/* Switch minimaliste langue */}
        <button
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
          className="relative w-14 h-8 bg-gray-800 rounded-full flex items-center px-1 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4"
          aria-label="Switch language"
        >
          <span className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-blue-500 shadow transform transition-transform ${language === 'fr' ? '' : 'translate-x-6'}`}></span>
          <span className={`z-10 text-xs font-bold ml-2 ${language === 'fr' ? 'text-white' : 'text-gray-400'}`}>FR</span>
          <span className={`z-10 text-xs font-bold ml-auto mr-2 ${language === 'en' ? 'text-white' : 'text-gray-400'}`}>EN</span>
        </button>
      </div>
    </header>
  );
}

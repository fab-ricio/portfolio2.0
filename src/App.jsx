import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle.tsx';
import StickyDarkModeHelper from './components/StickyDarkModeHelper';
import HeaderDesktop from './components/HeaderDesktop';
import HeaderMobile from './components/HeaderMobile';
import FuturisticLoader from './components/FuturisticLoader.jsx';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <FuturisticLoader />
      )}
      <div
        className={
          'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen overflow-x-hidden transition-opacity duration-700' +
          (loading ? ' opacity-0 pointer-events-none select-none' : ' opacity-100')
        }
      >
        <HeaderMobile language={language} setLanguage={setLanguage} />
        <div className="hidden md:block">
          <HeaderDesktop language={language} setLanguage={setLanguage} />
        </div>
        <Main language={language} />
        <Footer />
        <DarkModeToggle />
        <StickyDarkModeHelper />
      </div>
    </>
  );
}

export default App;

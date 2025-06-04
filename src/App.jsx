import React from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle.tsx';
import StickyDarkModeHelper from './components/StickyDarkModeHelper';
import HeaderDesktop from './components/HeaderDesktop';
import HeaderMobile from './components/HeaderMobile';

function App() {
  return (
    <>
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen overflow-x-hidden">
      <HeaderMobile />
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>
      <Main />
      <Footer />
      <DarkModeToggle />
      <StickyDarkModeHelper />
      </div>
    </>
  );
}

export default App;

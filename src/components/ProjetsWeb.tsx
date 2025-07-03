// @ts-nocheck
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n';

function getWebApps(lang) {
  return [
    {
      title: t(lang, 'project_weather_title'),
      description: t(lang, 'project_weather_desc'),
      github: 'https://github.com/tonprofil/weather-app',
      image: `${import.meta.env.BASE_URL}Weather-app.png`,
    },
    {
      title: t(lang, 'project_todo_title'),
      description: t(lang, 'project_todo_desc'),
      github: 'https://github.com/tonprofil/todo-list',
      image: `${import.meta.env.BASE_URL}to-do.png`,
    },
    {
      title: t(lang, 'project_subtitles_title'),
      description: t(lang, 'project_subtitles_desc'),
      github: 'https://github.com/tonprofil/generateur-sous-titres',
      image: `${import.meta.env.BASE_URL}gen-sous-titres.png`,
    },
  ];
}

function CoverflowWebProjects({ projects, language }) {
  const [active, setActive] = useState(1);
  const maxVisible = 1;
  const touchStartX = useRef(null);
  const isDragging = useRef(false);
  const coverflowRef = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = false;
  }
  function handleTouchMove() {
    isDragging.current = true;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (!isDragging.current && Math.abs(dx) < 10) return;
    if (dx > 40) setActive((prev) => (prev - 1 + projects.length) % projects.length);
    if (dx < -40) setActive((prev) => (prev + 1) % projects.length);
    touchStartX.current = null;
    isDragging.current = false;
  }

  function handleMouseDown(e) {
    touchStartX.current = e.clientX;
    isDragging.current = false;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  function handleMouseMove() {
    isDragging.current = true;
  }
  function handleMouseUp(e) {
    if (touchStartX.current === null) return;
    const dx = e.clientX - touchStartX.current;
    if (!isDragging.current && Math.abs(dx) < 10) return;
    if (dx > 40) setActive((prev) => (prev - 1 + projects.length) % projects.length);
    if (dx < -40) setActive((prev) => (prev + 1) % projects.length);
    touchStartX.current = null;
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') setActive((prev) => (prev - 1 + projects.length) % projects.length);
    if (e.key === 'ArrowRight') setActive((prev) => (prev + 1) % projects.length);
  }

  return (
    <div
      ref={coverflowRef}
      className="relative w-full flex flex-col items-center"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative h-[300px] md:h-[340px] flex items-center justify-center overflow-visible select-none touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'grab' }}
      >
        {projects.map((project, i) => {
          const offset = i - active;
          if (Math.abs(offset) > maxVisible) return null;
          const translateX = offset * 90;
          const rotateY = offset * -22;
          const scale = offset === 0 ? 1.04 : 0.93;
          const zIndex = 10 - Math.abs(offset);
          const style = {
            zIndex,
            transform: `translate3d(-50%, -50%, 0) translateX(${translateX}px) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransformStyle: 'preserve-3d',
          };
          if (offset === 0) {
            return (
              <motion.div
                key={i}
                className={
                  'absolute left-1/2 top-1/2 w-60 h-72 md:w-72 md:h-80 flex flex-col items-center justify-center bg-gradient-to-br from-[#232b4e] via-[#2e3a6a] to-[#3b82f6] border border-blue-400/40 shadow-lg backdrop-blur-[1px] transition-all duration-500 rounded-2xl md:rounded-3xl'
                }
                style={style}
                tabIndex={0}
                onClick={() => setActive(i)}
                layout
                transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
              >
                <img src={project.image} alt={project.title} className="w-full h-36 md:h-44 object-cover rounded-t-2xl md:rounded-t-3xl shadow mb-3 border-b-2 border-indigo-400 bg-white/10 transition-all duration-300 relative z-10" />
                <h3 className="text-base md:text-xl font-bold mb-1 text-blue-100 text-center uppercase drop-shadow futuristic-font transition-all duration-300 relative z-10 bg-gradient-to-r from-[#60a5fa] via-[#facc15] to-[#818cf8] bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-gray-100 mb-2 text-xs md:text-sm opacity-95 text-center px-2 transition-all duration-300 relative z-10">
                  {project.description}
                </p>
                <a
                  href={project.github}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#60a5fa] via-[#facc15] to-[#818cf8] text-gray-900 font-bold shadow transition-all duration-200 text-xs md:text-base mt-1 relative z-10 border border-blue-300/40 group"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir sur GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-gray-900 group-hover:text-[#232b4e]"
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.29 9.29 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                  </svg>
                </a>
              </motion.div>
            );
          }
          const blur = 'backdrop-blur-[2px] blur-[1px] grayscale opacity-60';
          const shadow = 'shadow';
          const border = 'border border-indigo-400/10';
          return (
            <motion.div
              key={i}
              className={`absolute left-1/2 top-1/2 w-60 h-72 md:w-72 md:h-80 flex flex-col items-center justify-center ${blur} ${shadow} ${border} transition-all duration-500 rounded-2xl md:rounded-3xl`}
              style={style}
              layout
              transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
              tabIndex={0}
              onClick={() => setActive(i)}
            >
              <img src={project.image} alt={project.title} className="w-full h-36 md:h-44 object-cover rounded-t-2xl md:rounded-t-3xl shadow mb-3 border-b-2 border-indigo-400 bg-white/10 transition-all duration-300" />
              <h3 className="text-base md:text-xl font-bold mb-1 text-blue-200 text-center uppercase drop-shadow futuristic-font transition-all duration-300">{project.title}</h3>
              <p className="text-gray-200 mb-2 text-xs md:text-sm opacity-90 text-center px-2 transition-all duration-300">{project.description}</p>
              <a
                href={project.github}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#60a5fa] via-[#facc15] to-[#818cf8] text-gray-900 font-bold shadow transition-all duration-200 text-xs md:text-base mt-1 relative z-10 border border-blue-300/40 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir sur GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-900 group-hover:text-[#232b4e]"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.29 9.29 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-1.5 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition text-sm"
          onClick={() => setActive((prev) => (prev - 1 + projects.length) % projects.length)}
        >
          {t(language, 'previous')}
        </button>
        <button
          className="px-4 py-1.5 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition text-sm"
          onClick={() => setActive((prev) => (prev + 1) % projects.length)}
        >
          {t(language, 'next')}
        </button>
      </div>
    </div>
  );
}

const ProjetsWeb = ({ language }) => {
  const projects = getWebApps(language);
  return (
    <section id="web-app-coverflow" className="w-full max-w-5xl mx-auto mt-16 px-4 pt-6 pb-16">
      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-8 text-center text-blue-200">{t(language, 'projects_title')}</h3>
      <div className="h-8" />
      <div className="w-full h-[320px] md:h-[360px] bg-transparent rounded-xl flex items-center justify-center">
        <CoverflowWebProjects projects={projects} language={language} />
      </div>
    </section>
  );
};

export default ProjetsWeb;

import { useState, useEffect } from 'react';

/**
 * Hook pour détecter les appareils avec des performances limitées
 */
export const usePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userEffectsEnabled, setUserEffectsEnabled] = useState(true);

  useEffect(() => {
    // Récupérer la préférence utilisateur
    const savedEffects = localStorage.getItem('portfolio-effects-enabled');
    if (savedEffects !== null) {
      setUserEffectsEnabled(JSON.parse(savedEffects));
    }

    // Écouter les changements de préférence utilisateur
    const handlePerformanceToggle = (event) => {
      setUserEffectsEnabled(event.detail.effectsEnabled);
    };

    window.addEventListener('performance-toggle', handlePerformanceToggle);

    // Détection des préférences utilisateur pour la réduction d'animations
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Détection approximative de la performance de l'appareil
    const detectPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsLowPerformance(true);
        return;
      }

      // Vérification des specs GPU
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      
      // Détection des GPU intégrés ou anciens
      const lowEndGPUs = ['intel', 'integrated', 'mobile', 'mali', 'adreno 3', 'adreno 4'];
      const isLowEndGPU = lowEndGPUs.some(gpu => renderer.toLowerCase().includes(gpu));

      // Vérification de la RAM (approximative)
      const isLowRAM = navigator.deviceMemory && navigator.deviceMemory < 4;

      // Vérification du nombre de coeurs CPU
      const isLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

      // Test de performance simple
      const start = performance.now();
      for (let i = 0; i < 100000; i++) {
        Math.random() * Math.random();
      }
      const duration = performance.now() - start;
      const isSlowExecution = duration > 10;

      setIsLowPerformance(isLowEndGPU || isLowRAM || isLowCPU || isSlowExecution);
    };

    detectPerformance();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('performance-toggle', handlePerformanceToggle);
    };
  }, []);

  // Les effets sont désactivés si :
  // - L'utilisateur les a désactivés manuellement
  // - L'appareil a des performances limitées ET l'utilisateur n'a pas forcé l'activation
  const effectsDisabled = !userEffectsEnabled || (isLowPerformance && userEffectsEnabled === null);

  return { 
    isLowPerformance, 
    reducedMotion: reducedMotion || effectsDisabled,
    userEffectsEnabled,
    effectsDisabled
  };
};

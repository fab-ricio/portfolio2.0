import React from 'react';

/**
 * Lignes de circuit électronique animées avec CSS pur
 */
export default function CircuitLines() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-15">
      {/* Lignes horizontales */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" 
           style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse" 
           style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Lignes verticales */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse" 
           style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
      <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" 
           style={{ animationDuration: '3s', animationDelay: '2.5s' }} />

      {/* Points de connexion */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" 
           style={{ animationDuration: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-ping" 
           style={{ animationDuration: '3s', animationDelay: '1s' }} />
      <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" 
           style={{ animationDuration: '2.5s', animationDelay: '2s' }} />

      {/* Coins décoratifs */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-indigo-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/50" />

      {/* Grille subtile */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} />
    </div>
  );
}

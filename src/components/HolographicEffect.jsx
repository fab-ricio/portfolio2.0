import React from 'react';

/**
 * Effet holographique minimaliste avec CSS pur
 */
export default function HolographicEffect() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Scan lines effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-4 animate-ping"
             style={{ 
               backgroundSize: '100% 2px',
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.1) 2px, rgba(6, 182, 212, 0.1) 4px)',
               animationDuration: '8s'
             }} />
      </div>

      {/* Holographic shimmer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent w-full h-full animate-pulse transform -skew-x-12"
             style={{ animationDuration: '6s' }} />
      </div>

      {/* Corner brackets */}
      <div className="absolute inset-4">
        {/* Top left */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="absolute top-0 left-0 w-8 h-0.5 bg-cyan-400/60 animate-pulse" />
          <div className="absolute top-0 left-0 w-0.5 h-8 bg-cyan-400/60 animate-pulse" />
        </div>
        
        {/* Top right */}
        <div className="absolute top-0 right-0 w-12 h-12">
          <div className="absolute top-0 right-0 w-8 h-0.5 bg-indigo-400/60 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-0 right-0 w-0.5 h-8 bg-indigo-400/60 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Bottom left */}
        <div className="absolute bottom-0 left-0 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-purple-400/60 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-purple-400/60 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Bottom right */}
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-pink-400/60 animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-pink-400/60 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 via-transparent to-purple-950/10" />
    </div>
  );
}

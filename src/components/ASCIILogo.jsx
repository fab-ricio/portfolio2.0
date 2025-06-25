import React, { useState, useEffect } from 'react';

/**
 * Logo ASCII animé personnalisé
 */
export default function ASCIILogo() {
  const [glitchFrame, setGlitchFrame] = useState(0);

  // Logo principal en ASCII
  const mainLogo = [
    "  ███████╗ ██████╗",
    "  ██╔════╝██╔════╝", 
    "  █████╗  ██║     ",
    "  ██╔══╝  ██║     ",
    "  ██║     ╚██████╗",
    "  ╚═╝      ╚═════╝"
  ];

  // Versions glitchées du logo
  const glitchVersions = [
    mainLogo,
    [
      "  ███████╗ ██████╗",
      "  ██╔▓▓▓▓██╔════╝", 
      "  █████╗▒▒██║     ",
      "  ██╔══╝░░██║     ",
      "  ██║▓▓▓▓▓╚██████╗",
      "  ╚═╝      ╚═════╝"
    ],
    [
      "  ███▓▓▓▓╗ ██████╗",
      "  ██╔════╝██╔▒▒▒▒╝", 
      "  █████╗  ██║░░░░░",
      "  ██╔══╝  ██║     ",
      "  ██║     ╚██████╗",
      "  ╚═╝▓▓▓▓▓▓╚═════╝"
    ],
    [
      "  ███████╗ ██▓▓▓▓╗",
      "  ██╔════╝██╔════╝", 
      "  █████╗▒▒██║▒▒▒▒▒",
      "  ██╔══╝░░██║░░░░░",
      "  ██║     ╚██████╗",
      "  ╚═╝      ╚═════╝"
    ]
  ];

  // Éléments décoratifs ASCII
  const decorations = [
    "╔══════════════════════════════╗",
    "║ PORTFOLIO SYSTEM v2.0        ║",
    "║ STATUS: ONLINE               ║", 
    "║ UPTIME: 99.9%                ║",
    "╚══════════════════════════════╝"
  ];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchFrame(prev => (prev + 1) % glitchVersions.length);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [glitchVersions.length]);

  const currentLogo = glitchVersions[glitchFrame];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Logo principal centré */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15">
        <pre className="text-indigo-400 font-mono text-sm md:text-base lg:text-lg">
          {currentLogo.join('\n')}
        </pre>
      </div>

      {/* Panneau de statut en haut */}
      <div className="absolute top-4 left-4 opacity-20">
        <pre className="text-cyan-400 font-mono text-xs">
          {decorations.join('\n')}
        </pre>
      </div>

      {/* Motifs géométriques ASCII dans les coins */}
      <div className="absolute top-4 right-4 opacity-15">
        <pre className="text-purple-400 font-mono text-xs">
{`    ╱╲╱╲╱╲
   ╱▲╲╱▲╲╱▲╲
  ╱▲▲╲╱▲▲╲╱▲▲╲
 ╱▲▲▲╲╱▲▲▲╲╱▲▲▲╲`}
        </pre>
      </div>

      <div className="absolute bottom-4 left-4 opacity-15">
        <pre className="text-green-400 font-mono text-xs">
{`◢◤◢◤◢◤◢◤
◥◣◥◣◥◣◥◣
◢◤◢◤◢◤◢◤
◥◣◥◣◥◣◥◣`}
        </pre>
      </div>

      <div className="absolute bottom-4 right-4 opacity-15">
        <pre className="text-pink-400 font-mono text-xs">
{`░▒▓█▓▒░
▒▓█▓▒░▒
▓█▓▒░▒▓
█▓▒░▒▓█`}
        </pre>
      </div>

      {/* Lignes de connexion */}
      <div className="absolute top-1/4 left-0 right-0 opacity-10">
        <div className="text-center">
          <span className="text-cyan-400 font-mono text-xs">
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </span>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-0 right-0 opacity-10">
        <div className="text-center">
          <span className="text-indigo-400 font-mono text-xs">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          </span>
        </div>
      </div>

      {/* Indicateur de chargement animé */}
      <div className="absolute bottom-8 right-8 opacity-25">
        <div className="text-yellow-400 font-mono text-xs">
          <div className="mb-1">LOADING...</div>
          <div className="flex">
            <span>[</span>
            <span className="animate-pulse">████████████</span>
            <span>] 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

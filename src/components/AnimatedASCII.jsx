import React, { useState, useEffect } from 'react';

/**
 * ASCII Art animé avec des motifs qui changent
 */
export default function AnimatedASCII() {
  const [frame, setFrame] = useState(0);

  // Différents motifs ASCII pour l'animation
  const patterns = [
    [
      "    ╭─────────────╮",
      "    │  ◢◤  ◢◤  ◢◤ │",
      "    │ ◢◤  ◢◤  ◢◤  │",
      "    │◢◤  ◢◤  ◢◤   │",
      "    ╰─────────────╯"
    ],
    [
      "    ╭─────────────╮",
      "    │ ◥◣  ◥◣  ◥◣  │",
      "    │  ◥◣  ◥◣  ◥◣ │",
      "    │   ◥◣  ◥◣  ◥◣│",
      "    ╰─────────────╯"
    ],
    [
      "    ╭─────────────╮",
      "    │ ▲▼▲ ▲▼▲ ▲▼▲ │",
      "    │ ▼▲▼ ▼▲▼ ▼▲▼ │",
      "    │ ▲▼▲ ▲▼▲ ▲▼▲ │",
      "    ╰─────────────╯"
    ],
    [
      "    ╭─────────────╮",
      "    │ ╱╲╱ ╱╲╱ ╱╲╱ │",
      "    │ ╲╱╲ ╲╱╲ ╲╱╲ │",
      "    │ ╱╲╱ ╱╲╱ ╱╲╱ │",
      "    ╰─────────────╯"
    ]
  ];

  // Motifs de coins animés
  const cornerPatterns = [
    { tl: "╭", tr: "╮", bl: "╰", br: "╯" },
    { tl: "┌", tr: "┐", bl: "└", br: "┘" },
    { tl: "╔", tr: "╗", bl: "╚", br: "╝" },
    { tl: "◢", tr: "◣", bl: "◥", br: "◤" }
  ];

  // Lignes de scan ASCII
  const scanLines = [
    "═══════════════════════════════════",
    "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
    "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
    "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % patterns.length);
    }, 2000); // Change toutes les 2 secondes

    return () => clearInterval(interval);
  }, [patterns.length]);

  const currentPattern = patterns[frame];
  const currentCorner = cornerPatterns[frame];
  const currentScan = scanLines[frame];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ASCII Art principal centré */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
        <pre className="text-cyan-400 text-xs md:text-sm font-mono leading-tight">
          {currentPattern.join('\n')}
        </pre>
      </div>

      {/* Coins animés */}
      <div className="absolute top-4 left-4 text-indigo-400 opacity-30 font-mono text-lg">
        {currentCorner.tl}
      </div>
      <div className="absolute top-4 right-4 text-indigo-400 opacity-30 font-mono text-lg">
        {currentCorner.tr}
      </div>
      <div className="absolute bottom-4 left-4 text-purple-400 opacity-30 font-mono text-lg">
        {currentCorner.bl}
      </div>
      <div className="absolute bottom-4 right-4 text-purple-400 opacity-30 font-mono text-lg">
        {currentCorner.br}
      </div>

      {/* Ligne de scan horizontale */}
      <div className="absolute top-1/3 left-0 right-0 text-center opacity-5">
        <div className="text-cyan-300 font-mono text-xs animate-pulse">
          {currentScan}
        </div>
      </div>

      {/* Indicateurs de statut ASCII */}
      <div className="absolute top-8 left-8 opacity-20">
        <pre className="text-green-400 font-mono text-xs">
{`[████████████] 100%
[▓▓▓▓▓▓▓▓░░░░] 67%
[████▓▓▓▓░░░░] 34%`}
        </pre>
      </div>

      {/* Code binaire défilant */}
      <div className="absolute right-8 top-1/4 opacity-10">
        <div className="text-blue-300 font-mono text-xs animate-pulse">
          <div className="mb-1">01001000 01100101</div>
          <div className="mb-1">01101100 01101100</div>
          <div className="mb-1">01101111 00100000</div>
          <div className="mb-1">01010111 01101111</div>
          <div className="mb-1">01110010 01101100</div>
          <div>01100100 00100001</div>
        </div>
      </div>

      {/* Terminal cursor clignotant */}
      <div className="absolute bottom-8 left-8 opacity-25">
        <span className="text-green-400 font-mono text-sm">
          user@portfolio:~$ <span className="animate-ping">█</span>
        </span>
      </div>
    </div>
  );
}

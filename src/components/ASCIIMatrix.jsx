import React, { useState, useEffect } from 'react';

/**
 * ASCII Matrix avec des caractères qui tombent
 */
export default function ASCIIMatrix() {
  const [matrix, setMatrix] = useState([]);
  
  // Caractères ASCII spéciaux
  const chars = '░▒▓█▄▀▐▌▬▲▼◄►◆◇○●◎◉⚡⚪⚫⭐✦✧✨⭕⚙⚠⚡';
  const binaryChars = '01';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
  
  const cols = 80;
  const rows = 30;

  useEffect(() => {
    // Initialiser la matrice
    const initMatrix = () => {
      const newMatrix = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const rand = Math.random();
          let char = ' ';
          let color = 'text-gray-600';
          
          if (rand < 0.1) {
            char = chars[Math.floor(Math.random() * chars.length)];
            color = 'text-cyan-400';
          } else if (rand < 0.3) {
            char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
            color = 'text-green-400';
          } else if (rand < 0.4) {
            char = symbols[Math.floor(Math.random() * symbols.length)];
            color = 'text-purple-400';
          }
          
          row.push({ char, color, id: `${i}-${j}` });
        }
        newMatrix.push(row);
      }
      return newMatrix;
    };

    setMatrix(initMatrix());

    // Animer la matrice
    const interval = setInterval(() => {
      setMatrix(prevMatrix => {
        const newMatrix = [...prevMatrix];
        
        // Faire "tomber" quelques caractères
        for (let col = 0; col < cols; col++) {
          if (Math.random() < 0.3) { // 30% de chance par colonne
            // Décaler tous les caractères vers le bas
            for (let row = rows - 1; row > 0; row--) {
              newMatrix[row][col] = { ...newMatrix[row - 1][col] };
            }
            
            // Nouveau caractère en haut
            const rand = Math.random();
            let char = ' ';
            let color = 'text-gray-600';
            
            if (rand < 0.15) {
              char = chars[Math.floor(Math.random() * chars.length)];
              color = 'text-cyan-400';
            } else if (rand < 0.4) {
              char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
              color = 'text-green-400';
            } else if (rand < 0.5) {
              char = symbols[Math.floor(Math.random() * symbols.length)];
              color = 'text-purple-400';
            }
            
            newMatrix[0][col] = { char, color, id: `0-${col}` };
          }
        }
        
        return newMatrix;
      });
    }, 150); // Plus rapide pour l'effet Matrix

    return () => clearInterval(interval);
  }, [chars, binaryChars, symbols, cols, rows]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
      <div className="font-mono text-xs leading-none p-2">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <span
                key={`${rowIndex}-${colIndex}`}
                className={`${cell.color} transition-colors duration-300`}
                style={{ width: '0.75rem' }}
              >
                {cell.char}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Overlay pour l'effet de dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />
    </div>
  );
}

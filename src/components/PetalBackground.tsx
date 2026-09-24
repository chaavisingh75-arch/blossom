import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
  color: string;
}

export const PetalBackground: React.FC = () => {
  const petals = useMemo<Petal[]>(() => {
    const colors = [
      'rgba(247, 193, 204, 0.45)', // blush pink
      'rgba(242, 156, 163, 0.35)', // soft rose
      'rgba(255, 230, 235, 0.5)',  // light cream pink
      'rgba(232, 239, 233, 0.35)', // soft sage hint
    ];
    
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 95),
      size: Math.floor(Math.random() * 12) + 12, // 12px to 24px
      duration: Math.floor(Math.random() * 12) + 14, // 14s to 26s
      delay: Math.floor(Math.random() * 15) * 0.7,
      rotation: Math.floor(Math.random() * 360),
      opacity: Math.random() * 0.3 + 0.35,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill={petal.color}
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            {/* Organic petal shape */}
            <path d="M12 0 C4 6 0 16 2 24 C4 30 12 32 12 32 C12 32 20 30 22 24 C24 16 20 6 12 0 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

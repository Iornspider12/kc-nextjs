'use client';

import React, { useEffect, useState } from 'react';

interface FloatingBackgroundProps {
  particleCount?: number;
  boxCount?: number;
  className?: string;
}

interface FloatingElement {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

const FloatingBackground = ({ 
  particleCount = 30, 
  boxCount = 6,
  className = ""
}: FloatingBackgroundProps) => {
  const [particles, setParticles] = useState<FloatingElement[]>([]);
  const [boxes, setBoxes] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random positions only on client-side mount
    const generateParticles = (count: number) =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 10}s`,
      }));

    const generateBoxes = (count: number) =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${20 + Math.random() * 10}s`,
      }));

    // Use setTimeout to avoid calling setState synchronously within an effect
    setTimeout(() => {
      setParticles(generateParticles(particleCount));
      setBoxes(generateBoxes(boxCount));
    }, 0);
  }, [particleCount, boxCount]);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[1] ${className}`}>
      {/* --- Particles --- */}
      {particles.map((p) => (
        <div
          key={`p-${p.id}`}
          className="absolute w-1 h-1 bg-indigo-500/50 rounded-full animate-particle-drift 2xl:w-[6px] 2xl:h-[6px]"
          style={{ 
            left: p.left, 
            top: p.top, 
            animationDelay: p.delay, 
            animationDuration: p.duration 
          }}
        />
      ))}

      {/* --- Floating Boxes --- */}
      {boxes.map((b) => (
        <div
          key={`b-${b.id}`}
          className="absolute w-[60px] h-[60px] bg-card/10 border border-white/10 rounded-xl backdrop-blur-sm animate-box-float 2xl:w-[80px] 2xl:h-[80px]"
          style={{ 
            left: b.left, 
            top: b.top, 
            animationDelay: b.delay, 
            animationDuration: b.duration 
          }}
        />
      ))}
    </div>
  );
};

// Memoize to prevent re-generation when parent props (like isActive) change
export default FloatingBackground;
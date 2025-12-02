'use client';

import React, { useState, useEffect } from 'react';
import { ModeToggle } from '@/components/ui/theme';

interface EntranceProps {
  onEnter: () => void;
}

// Types for background elements
interface FloatingElement {
  id: number;
  left: string;
  top: string;
  delay: string;
}

const Slide00Entrance: React.FC<EntranceProps> = ({ onEnter }) => {
  const [qClicks, setQClicks] = useState(0);
  const [aClicks, setAClicks] = useState(0);
  const [apostropheClicked, setApostropheClicked] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  // State for particles/cubes to prevent hydration mismatch
  const [particles, setParticles] = useState<FloatingElement[]>([]);
  const [cubes, setCubes] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random positions only on the client side
    const generateElements = (count: number) =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
      }));

    setTimeout(() => {
      setParticles(generateElements(50));
      setCubes(generateElements(8));
    }, 0);
  }, []);

  const resetState = () => {
    setQClicks(0);
    setAClicks(0);
    setApostropheClicked(false);
    setButtonEnabled(false);
  };

  const handleQClick = () => {
    if (qClicks < 4) {
      setQClicks((prev) => prev + 1);
    } else {
      resetState();
    }
  };

  const handleAClick = () => {
    if (qClicks === 4) {
      if (aClicks < 2) {
        setAClicks((prev) => prev + 1);
      } else {
        resetState();
      }
    } else {
      resetState();
    }
  };

  const handleApostropheClick = () => {
    if (qClicks === 4 && aClicks === 2) {
      if (!apostropheClicked) {
        setApostropheClicked(true);
        setButtonEnabled(true);
      }
    } else {
      resetState();
    }
  };

  // Helper for Q letter specific transformations
  const getQClasses = () => {
    const baseShadow = 'drop-shadow-[0_0_30px_rgba(99,102,241,0.8)] brightness-150';
    switch (qClicks) {
      case 1: return `rotate-90 scale-115 ${baseShadow}`;
      case 2: return `rotate-180 scale-130 ${baseShadow}`;
      case 3: return `rotate-[270deg] scale-145 ${baseShadow}`; // 270 deg
      case 4: return `rotate-[360deg] scale-160 ${baseShadow}`;
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-background overflow-hidden z-[10000] flex items-center justify-center">

      {/* --- Theme Toggle --- */}
      <div className="absolute top-6 right-6 z-[10001]">
        <ModeToggle />
      </div>

      {/* --- Parallax Background Layers --- */}
      <div className="absolute inset-0 w-full h-full opacity-30 animate-float-1 bg-[radial-gradient(ellipse_at_30%_30%,var(--primary)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 w-full h-full opacity-30 animate-float-2 bg-[radial-gradient(ellipse_at_70%_70%,var(--secondary)_0%,transparent_50%)]"></div>

      {/* --- Particles --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-particle-float md:w-[3px] md:h-[3px] 2xl:w-[5px] 2xl:h-[5px]"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      {/* --- Floating Cubes --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {cubes.map((c) => (
          <div
            key={c.id}
            className="absolute w-10 h-10 border border-primary/30 rounded-lg backdrop-blur-md animate-cube-float bg-card/5 md:w-[40px] md:h-[40px] 2xl:w-[50px] 2xl:h-[50px]"
            style={{ left: c.left, top: c.top, animationDelay: c.delay }}
          />
        ))}
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 text-center animate-fade-in-scale w-full px-4">

        {/* Title Container */}
        <h1 className="flex items-baseline justify-center flex-nowrap
          mb-[clamp(2rem,6vh,5rem)] mt-[clamp(-60px,-10vh,-180px)] 
          drop-shadow-[0_10px_40px_rgba(99,102,241,0.3)]
          max-w-[100vw]"
        >
          {/* Letter Q */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] 
              origin-center animate-glow-pulse
              h-[clamp(200px,35vw,500px)] 
              ${getQClasses()}`}
            src="/logo/Q.webp"
            alt="Q"
            onClick={handleQClick}
            draggable={false}
          />

          {/* Apostrophe */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className={`relative flex items-center justify-center
              transition-all duration-300 ease-out
              h-[clamp(180px,30vw,450px)]
              ${qClicks > 0 ? 'translate-x-5' : ''}
              z-50`}
          >
            <div
              className="absolute inset-0 -m-8 md:m-0 z-50 cursor-pointer"
              onClick={handleApostropheClick}
            />
            <img
              className={`
                h-full w-auto
                ${apostropheClicked ? 'brightness-150' : ''}
                pointer-events-none`}
              src="/logo/'.webp"
              alt="'"
              draggable={false}
            />
          </div>

          {/* Letter A */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`cursor-pointer transition-all duration-300 ease-out 
              h-[clamp(180px,30vw,450px)] ml-[clamp(-10px,-1.5vw,-15px)]
              ${qClicks > 0 ? 'translate-x-[clamp(10px,2vw,20px)]' : ''}
              ${aClicks > 0 ? 'brightness-150' : ''}
              relative z-50`}
            src="/logo/A.webp"
            alt="A"
            onClick={handleAClick}
            draggable={false}
          />

          {/* NTA */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`transition-all duration-300 ease-out 
                h-[clamp(180px,30vw,450px)]
              ${qClicks > 0 ? 'translate-x-[clamp(10px,2vw,20px)]' : ''}`}
            src="/logo/NTA.webp"
            alt="NTA"
            draggable={false}
          />
        </h1>

        {/* --- Access System (Button) --- */}
        <div className="flex flex-col items-center gap-8">
          <button
            onClick={buttonEnabled ? onEnter : undefined}
            disabled={!buttonEnabled}
            className={`
              px-[clamp(2.5rem,5vw,4rem)] py-[clamp(1rem,2vh,1.5rem)]
              text-[clamp(1rem,1.8vw,1.5rem)] font-bold uppercase tracking-[clamp(1px,0.2vw,2px)]
              text-white rounded-full border-none transition-all duration-400 ease-out
              shadow-[0_10px_40px_rgba(99,102,241,0.3)]
              ${buttonEnabled
                ? 'bg-gradient-to-br from-primary to-secondary hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_60px_rgba(99,102,241,0.5)] hover:from-secondary hover:to-accent cursor-pointer animate-button-pulse'
                : 'bg-gradient-to-br from-indigo-500/30 to-violet-500/30 cursor-not-allowed opacity-50'
              }
            `}
          >
            Future of Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide00Entrance;
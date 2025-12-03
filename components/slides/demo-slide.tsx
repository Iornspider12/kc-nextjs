'use client';

import React, { useEffect, useState } from 'react';
import FloatingBackground from '@/components/elements/floating-background';
import { Play } from 'lucide-react'; // Using Lucide icon for the "Demo" feel

interface SlideProps {
  isActive: boolean;
}

const Slide07ProductDemo: React.FC<SlideProps> = ({ isActive }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Base design size
      const baseWidth = 1600;
      const baseHeight = 900;

      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;

      // Use the smaller scale to ensure it fits both dimensions (contain)
      const newScale = Math.min(scaleX, scaleY, 1.5);

      setScale(newScale);
    };

    handleResize(); // Initial calc
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="product"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={30} boxCount={6} />

      {/* 
        --- Scaled Container ---
        Uses transform scale to fit content perfectly.
      */}
      <div
        className="relative z-10 flex flex-col items-center justify-center origin-center"
        style={{
          width: '1600px',
          height: '900px',
          transform: `scale(${scale})`,
        }}
      >

        {/* --- Title --- */}
        <h2 className="
          relative z-20 flex-shrink-0
          text-primary font-bold uppercase tracking-wider text-center
          text-[40px]
          mb-[40px]
          animate-text-bootstrap
        ">
          Our Product Platform
        </h2>

        {/* 
           --- Product Demo Container --- 
        */}
        <div className="
          w-[1400px] h-[700px]
          relative flex flex-col
          bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-indigo-500/10
          border border-primary/20 rounded-2xl
          backdrop-blur-xl shadow-[0_0_50px_rgba(99,102,241,0.15)]
          overflow-hidden
          group cursor-pointer
          transition-all duration-500 hover:shadow-[0_0_80px_rgba(99,102,241,0.25)] hover:border-primary/40
        ">

          {/* Mock Window Header (UI Polish) */}
          <div className="w-full h-[50px] border-b border-white/10 bg-black/20 flex items-center px-6 gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500/80" />
            <div className="w-4 h-4 rounded-full bg-amber-500/80" />
            <div className="w-4 h-4 rounded-full bg-green-500/80" />
          </div>

          {/* Inner Content Area */}
          <div className="flex-1 w-full h-full flex flex-col items-center justify-center relative">

            {/* Animated Grid Background inside the box */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* Glowing Center Orb */}
            <div className="absolute w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px] animate-pulse" />

            {/* Main Text Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">

              {/* Play Button Icon */}
              <div className="
                w-[100px] h-[100px] rounded-full bg-white/10 border border-white/20 backdrop-blur-md
                flex items-center justify-center
                transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20
              ">
                <Play className="w-[40px] h-[40px] text-white ml-2 fill-white" />
              </div>

              <h3 className="
                text-[50px] font-black text-center
                bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-clip-text text-transparent
                drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]
              ">
                Interactive Product Demo
              </h3>

              <p className="text-muted-foreground/80 font-mono text-[18px] tracking-widest uppercase">
                Click to Initialize Experience
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Slide07ProductDemo;
'use client';

import React from 'react';
import FloatingBackground from '@/components/elements/floating-background';
import { Play } from 'lucide-react'; // Using Lucide icon for the "Demo" feel

interface SlideProps {
  isActive: boolean;
}

const Slide07ProductDemo: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <section 
      id="product" 
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      
      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={30} boxCount={6} />

      {/* 
        --- Main Layout Container ---
        1. flex-col & h-full: Ensures the layout takes full height.
        2. pt-[110px]: Clears the Navbar.
        3. pb-[40px]: Bottom padding for breathing room.
      */}
      <div className="relative z-10 w-full h-full flex flex-col items-center
        pt-[110px] pb-[40px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">
        
        {/* --- Title --- */}
        <h2 className="
          relative z-20 flex-shrink-0
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(1.5rem,3vw,2.5rem)]
          mb-[clamp(1.5rem,3vh,2.5rem)]
          animate-text-bootstrap
        ">
          Our Product Platform
        </h2>

        {/* 
           --- Product Demo Container --- 
           This replaces the inline style: width: 100%, height: calc(100vh - 180px)
           We use flex-1 to automatically fill the remaining height.
        */}
        <div className="
          w-full max-w-[1600px] flex-1
          relative flex flex-col
          bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-indigo-500/10
          border border-primary/20 rounded-2xl
          backdrop-blur-xl shadow-[0_0_50px_rgba(99,102,241,0.15)]
          overflow-hidden
          group cursor-pointer
          transition-all duration-500 hover:shadow-[0_0_80px_rgba(99,102,241,0.25)] hover:border-primary/40
        ">
          
          {/* Mock Window Header (UI Polish) */}
          <div className="w-full h-10 border-b border-white/10 bg-black/20 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {/* Inner Content Area */}
          <div className="flex-1 w-full h-full flex flex-col items-center justify-center relative">
            
            {/* Animated Grid Background inside the box */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* Glowing Center Orb */}
            <div className="absolute w-[200px] h-[200px] bg-primary/30 rounded-full blur-[80px] animate-pulse" />

            {/* Main Text Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              
              {/* Play Button Icon */}
              <div className="
                w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md
                flex items-center justify-center
                transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20
              ">
                <Play className="w-8 h-8 text-white ml-1 fill-white" />
              </div>

              <h3 className="
                text-[clamp(1.5rem,3vw,3rem)] font-black text-center
                bg-gradient-to-r from-indigo-300 via-white to-indigo-300 bg-clip-text text-transparent
                drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]
              ">
                Interactive Product Demo
              </h3>
              
              <p className="text-muted-foreground/80 font-mono text-sm tracking-widest uppercase">
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
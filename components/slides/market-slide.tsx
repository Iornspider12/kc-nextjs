'use client';

import React from 'react';
import { Globe, MapPin, Target } from 'lucide-react';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const Slide08Market: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <section 
      id="market" 
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      
      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={2} />

      {/* 
        --- Scrollable Container ---
        pt-[110px] clears Navbar.
        overflow-y-auto enables scrolling on mobile.
      */}
      <div className="relative z-10 w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden
        pt-[110px] pb-[50px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">
        
        {/* Title Section */}
        <div className="text-center mb-[clamp(2rem,4vh,4rem)] max-w-4xl mx-auto">
          <h2 className="
            text-primary font-bold uppercase tracking-wider
            text-[clamp(1.5rem,3vw,2.5rem)]
            mb-4 animate-text-bootstrap
          ">
            Global Market Size-2030
          </h2>
          <p className="
            text-muted-foreground font-medium
            text-[clamp(1rem,1.5vw,1.5rem)]
            animate-text-bootstrap delay-100
          ">
            Global B2C E-Commerce Market Size is growing at a CAGR of 19.1%
          </p>
        </div>

        {/* 
           --- Main Layout Grid ---
           Mobile: Flex Col (Blobs first, then stats grid)
           Desktop: 3-Column Grid (Stats | Blobs | Stats)
        */}
        <div className="
          w-full max-w-[1600px]
          flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px]
          items-center gap-12 lg:gap-8
        ">

          {/* --- LEFT STATS (Desktop: Left Col, Mobile: Grid item 1) --- */}
          <div className="hidden lg:flex flex-col gap-[8rem] justify-center h-full">
            <StatBlock 
              icon={Globe}
              value="$17T"
              label="Available Market"
              color="text-[#3b5998]"
              bg="bg-[#3b5998]/15"
              border="border-[#3b5998]"
              delay={0.2}
            />
            <StatBlock 
              icon={MapPin}
              value="$180B"
              label="Obtainable Market"
              color="text-[#d65369]"
              bg="bg-[#d65369]/15"
              border="border-[#d65369]"
              delay={0.6}
            />
          </div>

          {/* --- CENTER BLOBS (The Visualization) --- */}
          <div className="
            relative w-full flex items-center justify-center
            h-[400px] md:h-[500px] lg:h-[600px]
          ">
            
            {/* 1. TAM - Outermost Blob (Blue) */}
            <div className="
              relative flex flex-col justify-end items-center pb-8
              w-[clamp(280px,80vw,700px)] h-[clamp(280px,80vw,600px)]
              bg-gradient-to-br from-[#4a5f9d] via-[#3b5998] to-[#2d4373]
              border-[4px] border-indigo-500/40
              shadow-[0_25px_60px_rgba(59,89,152,0.3),inset_0_4px_20px_rgba(255,255,255,0.1)]
              z-10 animate-layout-breathe
            "
            style={{ borderRadius: '48% 52% 58% 42% / 45% 50% 50% 55%' }}
            >
              <span className="absolute top-[8%] lg:top-[50px] text-white font-black text-[clamp(2rem,3.5vw,3.5rem)] drop-shadow-md">TAM</span>

              {/* 2. SAM - Middle Blob (Orange) */}
              <div className="
                relative flex flex-col justify-center items-center
                w-[85%] h-[75%]
                bg-gradient-to-br from-[#e89b7a] via-[#d47b55] to-[#bf6842]
                border-[3px] border-[#d47b55]/50
                shadow-[0_20px_50px_rgba(212,123,85,0.3),inset_0_3px_15px_rgba(255,255,255,0.15)]
                z-20
              "
              style={{ borderRadius: '46% 54% 56% 44% / 48% 45% 55% 52%' }}
              >
                <span className="absolute top-[10%] lg:top-[45px] text-white font-black text-[clamp(1.8rem,3vw,3rem)] drop-shadow-md">SAM</span>

                {/* 3. SOM - Innermost Blob (Red) */}
                <div className="
                  absolute bottom-[5%]
                  flex items-center justify-center
                  w-[70%] h-[60%]
                  bg-gradient-to-br from-[#e87a8f] via-[#d65369] to-[#c43d52]
                  border-[3px] border-[#d65369]/50
                  shadow-[0_15px_40px_rgba(214,83,105,0.4),inset_0_3px_12px_rgba(255,255,255,0.2)]
                  z-30
                "
                style={{ borderRadius: '48% 52% 55% 45% / 50% 45% 55% 50%' }}
                >
                   <span className="text-white font-black text-[clamp(1.5rem,2.5vw,2.5rem)] drop-shadow-md">SOM</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT STATS (Desktop: Right Col, Mobile: Hidden) --- */}
          <div className="hidden lg:flex flex-col gap-[8rem] justify-center h-full">
            <StatBlock 
              icon={Target}
              value="$6T"
              label="Available Market"
              color="text-[#d47b55]"
              bg="bg-[#d47b55]/15"
              border="border-[#d47b55]"
              delay={0.4}
            />
             {/* Spacer to align visually with the staggered layout if needed */}
             <div className="h-20 hidden lg:block"></div>
          </div>

          {/* --- MOBILE STATS GRID (Only visible on Mobile/Tablet) --- */}
          <div className="lg:hidden w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
             <StatBlock 
              icon={Globe}
              value="$17T"
              label="Total Available (TAM)"
              color="text-[#3b5998]"
              bg="bg-[#3b5998]/15"
              border="border-[#3b5998]"
              delay={0.2}
            />
            <StatBlock 
              icon={Target}
              value="$6T"
              label="Serviceable (SAM)"
              color="text-[#d47b55]"
              bg="bg-[#d47b55]/15"
              border="border-[#d47b55]"
              delay={0.4}
            />
            <StatBlock 
              icon={MapPin}
              value="$180B"
              label="Obtainable (SOM)"
              color="text-[#d65369]"
              bg="bg-[#d65369]/15"
              border="border-[#d65369]"
              delay={0.6}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

// --- Sub-Component: Reusable Stat Block ---
interface StatBlockProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  bg: string;
  border: string;
  delay: number;
}

const StatBlock = ({ icon: Icon, value, label, color, bg, border, delay }: StatBlockProps) => (
  <div 
    className="flex items-center gap-4 lg:gap-6 animate-text-bootstrap group cursor-default"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className={`
      flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 
      flex items-center justify-center 
      rounded-full border-2 ${bg} ${border}
      transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12
    `}>
      <Icon className={`w-8 h-8 lg:w-10 lg:h-10 ${color.replace('text-', 'stroke-')}`} strokeWidth={2.5} />
    </div>
    
    <div className="flex flex-col">
      <div className={`text-[2.5rem] lg:text-[3.5rem] font-black leading-none ${color} drop-shadow-sm`}>
        {value}
      </div>
      <div className="text-foreground font-bold text-lg lg:text-xl leading-tight opacity-90">
        {label}
      </div>
    </div>
  </div>
);

export default Slide08Market;
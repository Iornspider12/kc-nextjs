'use client';

import React, { useEffect, useState } from 'react';
import { Globe, MapPin, Target } from 'lucide-react';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const Slide08Market: React.FC<SlideProps> = ({ isActive }) => {
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
      id="market"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={2} />

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

        {/* Title Section */}
        <div className="text-center mb-[50px] max-w-4xl mx-auto">
          <h2 className="
            text-primary font-bold uppercase tracking-wider
            text-[40px]
            mb-4 animate-text-bootstrap
          ">
            Global Market Size-2030
          </h2>
          <p className="
            text-muted-foreground font-medium
            text-[24px]
            animate-text-bootstrap delay-100
          ">
            Global B2C E-Commerce Market Size is growing at a CAGR of 19.1%
          </p>
        </div>

        {/* 
           --- Main Layout Grid ---
           Desktop: 3-Column Grid (Stats | Blobs | Stats)
        */}
        <div className="
          w-full max-w-[1600px]
          grid grid-cols-[350px_1fr_350px]
          items-center gap-8
          animate-layout-breathe
        ">

          {/* --- LEFT STATS --- */}
          <div className="flex flex-col gap-[140px] justify-center h-full pl-[100px] -mt-[80px]">
            <div className="-mt-[30px]">
              <StatBlock
                icon={Globe}
                value="$17T"
                label="Total Addressable Market"
                color="text-[#3b5998]"
                bg="bg-[#3b5998]/15"
                border="border-[#3b5998]"
                delay={0.2}
              />
            </div>
            <StatBlock
              icon={MapPin}
              value="$180B"
              label="Serviceable Obtainable Market"
              color="text-[#d65369]"
              bg="bg-[#d65369]/15"
              border="border-[#d65369]"
              delay={0.6}
            />
          </div>

          {/* --- CENTER BLOBS (The Visualization) --- */}
          <div className="
            relative w-full flex items-center justify-center
            h-[600px]
          ">

            {/* 1. TAM - Outermost Blob (Blue) */}
            <div className="
              relative flex flex-col justify-end items-center pb-8
              w-[650px] h-[550px]
              bg-gradient-to-br from-[#4a5f9d] via-[#3b5998] to-[#2d4373]
              border-[4px] border-indigo-500/40
              shadow-[0_25px_60px_rgba(59,89,152,0.3),inset_0_4px_20px_rgba(255,255,255,0.1)]
              z-10
            "
              style={{ borderRadius: '48% 52% 58% 42% / 45% 50% 50% 55%' }}
            >
              {/* Line from TAM to left stat */}
              <div className="absolute left-[80px] top-[80px] w-[210px] h-[2px] -translate-x-full bg-[#3b5998]" />
              <div className="absolute left-[80px] top-[80px] w-[8px] h-[8px] -translate-y-1/2 rounded-full bg-[#3b5998]" />
              
              <span className="absolute top-[50px] text-white font-black text-[50px] drop-shadow-md">TAM</span>

              {/* 2. SAM - Middle Blob (Orange) */}
              <div className="
                absolute bottom-0
                flex flex-col justify-center items-center
                w-[85%] h-[75%]
                bg-gradient-to-br from-[#e89b7a] via-[#d47b55] to-[#bf6842]
                border-[3px] border-[#d47b55]/50
                shadow-[0_20px_50px_rgba(212,123,85,0.3),inset_0_3px_15px_rgba(255,255,255,0.15)]
                z-20
              "
                style={{ borderRadius: '46% 54% 56% 44% / 48% 45% 55% 52%' }}
              >
                {/* Line from SAM to right stat */}
                <div className="absolute right-[60px] top-[70px] w-[240px] h-[2px] translate-x-full bg-[#d47b55]" />
                <div className="absolute right-[60px] top-[70px] w-[8px] h-[8px] -translate-y-1/2 rounded-full bg-[#d47b55]" />
                
                <span className="absolute top-[45px] text-white font-black text-[40px] drop-shadow-md">SAM</span>

                {/* 3. SOM - Innermost Blob (Red) */}
                <div className="
                  absolute bottom-0
                  flex items-center justify-center
                  w-[70%] h-[60%]
                  bg-gradient-to-br from-[#e87a8f] via-[#d65369] to-[#c43d52]
                  border-[3px] border-[#d65369]/50
                  shadow-[0_15px_40px_rgba(214,83,105,0.4),inset_0_3px_12px_rgba(255,255,255,0.2)]
                  z-30
                "
                  style={{ borderRadius: '48% 52% 55% 45% / 50% 45% 55% 50%' }}
                >
                  {/* Line from SOM to left bottom stat */}
                  <div className="absolute left-[60px] top-[50px] w-[323px] h-[2px] -translate-x-full bg-[#d65369]" />
                  <div className="absolute left-[60px] top-[50px] w-[8px] h-[8px] -translate-y-1/2 rounded-full bg-[#d65369]" />
                  
                  <span className="text-white font-black text-[30px] drop-shadow-md">SOM</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT STATS --- */}
          <div className="flex flex-col gap-[140px] justify-center h-full pr-[100px] mt-[80px]">
            <StatBlock
              icon={Target}
              value="$6T"
              label="Serviceable Addressable Market"
              color="text-[#d47b55]"
              bg="bg-[#d47b55]/15"
              border="border-[#d47b55]"
              delay={0.4}
            />
            {/* Spacer to align visually with the staggered layout if needed */}
            <div className="h-20 hidden lg:block"></div>
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
    className={`flex items-center gap-3 group cursor-default px-2 py-3 rounded-xl border-2 ${border} ${bg} backdrop-blur-sm shadow-lg`}
  >
    <div className={`
      flex-shrink-0 w-[70px] h-[70px] 
      flex items-center justify-center 
      rounded-full border-2 ${bg} ${border}
      transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12
    `}>
      <Icon className={`w-[35px] h-[35px] ${color.replace('text-', 'stroke-')}`} strokeWidth={2.5} />
    </div>

    <div className="flex flex-col">
      <div className={`text-[50px] font-black leading-none ${color} drop-shadow-sm`}>
        {value}
      </div>
      <div className="text-foreground font-bold text-[18px] leading-tight opacity-90">
        {label}
      </div>
    </div>
  </div>
);

export default Slide08Market;
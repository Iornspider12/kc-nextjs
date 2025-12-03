'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const Slide06Solution: React.FC<SlideProps> = ({ isActive }) => {
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
      id="solution"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Background --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={30} boxCount={0} />

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

        {/* Title */}
        <h2 className="
          absolute top-[40px] z-20
          text-primary font-extrabold uppercase tracking-wider text-center
          text-[40px]
          animate-text-bootstrap
        ">
          Disruptive Innovation and Radical Solutions
        </h2>

        {/* 
           --- MAIN LAYOUT WRAPPER ---
           The "Orb Arena" (Absolute positioning)
        */}
        <div className="
          relative w-full h-full
          animate-layout-breathe
        ">

          {/* --- CENTRAL META HUMAN --- */}
          <div className="
            absolute left-1/2 -translate-x-1/2 top-[120px] 
            w-[500px] h-[700px]
            z-10
            animate-human-float
          ">
            <Image
              src="/metahuman 3.webp"
              alt="PanSas Solution Meta Human"
              fill
              className="object-contain object-bottom"
              priority
              draggable={false}
            />
          </div>

          {/* --- LEFT ORBS --- */}

          {/* 1. AI Genie (Top Left) */}
          <FeatureOrb
            icon="🤖"
            title="Your Cosmic GenAI Genie"
            description="Our AI-powered genie delivers instant answers, smooth navigation, transparent pricing, and hyper-personalized journeys."
            positionClass="top-[140px] left-[200px]"
            delay={0}
          />

          {/* 2. Community (Middle Left - Moved Up & Left) */}
          <FeatureOrb
            icon="🎮"
            title="Gamified Social Shopping Engine"
            description="Turn static sites into shared adventures with rewards, group buys, and live co-shopping."
            positionClass="top-[320px] left-[0px]"
            delay={0.6}
          />

          {/* 3. Alerts/QiD (Bottom Left) */}
          <FeatureOrb
            icon="🔐"
            title="QiD: Your Data. Your Rules!"
            description="Quantum-secure identity puts users in full control—unbreakable encryption, zero data trading."
            positionClass="bottom-[50px] left-[200px]"
            delay={1.2}
          />

          {/* --- RIGHT ORBS --- */}

          {/* 4. 3D Home (Top Right - Moved more right) */}
          <FeatureOrb
            icon="🏠"
            title='"Hack Me" - Bring home any product'
            description="Our genie auto-buys at drops and bargains for you—reviving the thrill of shopping."
            positionClass="top-[140px] right-[150px]"
            delay={0.3}
          />

          {/* 5. AR Shield (Middle Right - Moved Up & Right) */}
          <FeatureOrb
            icon="🛡️"
            title="Seller's Shield – Unmatched Protection"
            description="A first-of-its-kind insurance shields sellers from fraud and abusive returns."
            positionClass="top-[320px] right-[0px]"
            delay={0.9}
          />

          {/* 6. Security/XR (Bottom Right - Moved more right) */}
          <FeatureOrb
            icon="🥽"
            title="Immersive and holistic xR experience"
            description="Gamified 3D and virtual storefronts let customers explore products anywhere, anytime."
            positionClass="bottom-[50px] right-[150px]"
            delay={1.5}
          />

        </div>
      </div>
    </section>
  );
};

// --- Sub-Component: Feature Orb ---
interface FeatureOrbProps {
  icon: string;
  title: string;
  description: string;
  positionClass: string;
  delay: number;
}

const FeatureOrb = ({ icon, title, description, positionClass, delay }: FeatureOrbProps) => {
  return (
    <div
      className={`
        /* Base Dimensions & Shape */
        w-[340px] h-[340px]
        rounded-full flex flex-col items-center justify-center text-center p-[30px]
        
        /* Positioning */
        absolute ${positionClass}
        
        /* Styling: Glassmorphism */
        bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.15)_0%,rgba(99,102,241,0.12)_25%,rgba(139,92,246,0.08)_60%,transparent_100%)]
        dark:bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.05)_0%,rgba(99,102,241,0.1)_25%,transparent_100%)]
        border-[2px] border-indigo-500/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.15)]
        
        /* Animation & Interaction */
        animate-orb-float cursor-pointer transition-all duration-500 ease-out group
        hover:scale-110 hover:-translate-y-4 hover:border-amber-500/80 hover:shadow-[0_0_60px_rgba(245,158,11,0.4)]
        hover:z-50
      `}
      style={{ animationDelay: `${delay}s` }}
    >

      {/* ::before Reflection Effect */}
      <div className="absolute top-[15%] left-[25%] w-8 h-8 rounded-full bg-white/40 blur-[2px] animate-orb-shimmer pointer-events-none" />

      {/* ::after Pulse Ring */}
      <div className="absolute -inset-2 rounded-full border-2 border-indigo-500/30 animate-orb-pulse pointer-events-none group-hover:border-amber-500/50 group-hover:animate-none group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <span className="text-[50px] mb-2 filter drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(245,158,11,0.5)]">
          {icon}
        </span>

        <h3 className="text-foreground font-extrabold text-[20px] leading-tight animate-text-pulse group-hover:text-amber-500 transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground font-bold text-[15px] leading-snug animate-text-bootstrap">
          {description}
        </p>
      </div>

    </div>
  );
};

export default Slide06Solution;
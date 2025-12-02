'use client';

import React from 'react';
import Image from 'next/image';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const Slide05Problem2: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <section 
      id="problem2" 
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      
      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={4} />

      {/* 
        --- Scrollable Container ---
        pt-[120px] clears Navbar.
        overflow-y-auto enables scrolling for tall content.
      */}
      <div className="relative z-10 w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden
        pt-[110px] pb-[50px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">
        
        {/* Title */}
        <h2 className="
          relative z-20
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(1.5rem,3vw,2.5rem)]
          mb-[clamp(1rem,3vh,3rem)]
          animate-text-bootstrap
        ">
          What&apos;s Broken in Online Shopping?
        </h2>

        {/* 
           --- Layout Grid --- 
           Mobile: 1 col (Image Top)
           Desktop: Grid with Puzzle Cards (Left) + Image (Right)
        */}
        <div className="w-full max-w-[1800px] grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-[clamp(1rem,2vw,2rem)] items-center">
          
          {/* --- Left: Puzzle Cards --- */}
          <div className="order-2 lg:order-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] lg:gap-0 px-[0.5rem] lg:pr-[3.5rem]">
            
            {/* Card 1: No Freedom */}
            <PuzzleCard 
              index={0}
              icon="🏠"
              title={<>No bargaining power.<br />No pricing control.<br />No sense of freedom!</>}
              description={`"I wanted it but not at that price. No way to bargain."\n\nToday's platforms lack auto-buy and bargaining features. Sellers are trapped by rigid pricing and miss opportunities to move inventory intelligently. Value is subjective, and platforms refuse to acknowledge it.`}
              stat="Non-Negotiable"
              statLabel="NO FREEDOM OF PRICE"
              shapeClass="lg:rounded-l-2xl lg:rounded-r-none lg:clip-[polygon(0%_0%,85%_0%,90%_15%,100%_25%,90%_35%,100%_50%,90%_65%,100%_75%,85%_100%,0%_100%)]"
            />

            {/* Card 2: Lifeless (Center Piece) */}
            <PuzzleCard 
              index={1}
              icon="🛡️"
              title="Every Site Feels the Same–Static, Cold, and Lonely"
              description={`"I shop alone. No friend recommendations. No creator trends. No buzz."\n\nShopping is not just a transaction—it's an emotional, adrenaline-filled, social activity. Yet, today's online stores fail to capture these shared moments.`}
              stat="Lifeless"
              statLabel="HEARTLESS, SPIRITLESS"
              shapeClass="lg:rounded-none lg:-mx-[6px] lg:clip-[polygon(15%_0%,85%_0%,90%_15%,100%_25%,90%_35%,100%_50%,90%_65%,100%_75%,85%_100%,15%_100%,10%_75%,0%_65%,10%_50%,0%_35%,10%_25%,0%_15%)]"
            />

            {/* Card 3: Vulnerable (Spans full width on tablet) */}
            <PuzzleCard 
              index={2}
              icon="🌌"
              title={<>Privacy isn&apos;t a feature—<br />it&apos;s a fundamental right!</>}
              description={`"I added my card, then paused. What if my personal data leaks?"\n\nConsumers feel their data isn't safe, as most platforms store and share it without consent. Privacy-first experiences are essential: they build lasting customer trust.`}
              stat="Vulnerable"
              statLabel="YOUR DATA SOLD"
              shapeClass="md:col-span-2 lg:col-span-1 lg:rounded-r-2xl lg:rounded-l-none lg:clip-[polygon(15%_0%,100%_0%,100%_100%,15%_100%,10%_75%,0%_65%,10%_50%,0%_35%,10%_25%,0%_15%)]"
            />

          </div>

          {/* --- Right: Image (Top on Mobile) --- */}
          <div className="order-1 lg:order-2 flex justify-center items-center relative z-10 lg:-ml-[2rem]">
            <div className="relative 
              w-[clamp(280px,30vw,450px)] h-[300px] md:h-[400px] lg:h-[600px]
            ">
              <Image 
                src="/arab dark.webp" 
                alt="Online Shopping Problems" 
                fill
                className="object-contain object-center"
                draggable={false}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// --- Sub-Component: Puzzle Card (Reused from Slide 4 but kept here for self-containment) ---
interface PuzzleCardProps {
  index: number;
  icon: string;
  title: React.ReactNode;
  description: string;
  stat: string;
  statLabel: string;
  shapeClass: string;
}

const PuzzleCard = ({ index, icon, title, description, stat, statLabel, shapeClass }: PuzzleCardProps) => {
  return (
    <div 
      className={`
        relative flex flex-col justify-start text-center
        bg-card/50 border border-primary/20 backdrop-blur-md
        /* Mobile/Tablet: Standard Card Shape */
        rounded-2xl min-h-[400px] p-[1.5rem]
        /* Desktop: Puzzle Shape */
        lg:min-h-[580px] lg:p-[1.2rem] lg:border-2 ${shapeClass}
        /* Animation & Interaction */
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:-translate-y-2 hover:scale-[1.02] hover:bg-destructive/5 hover:border-destructive hover:shadow-[0_20px_40px_rgba(239,68,68,0.25)] hover:z-10
        group cursor-pointer
        animate-float
      `}
      style={{ animationDelay: `${index}s` }}
    >
      
      {/* Icon */}
      <div className="text-[2.8rem] mb-4 filter grayscale-[0.3] transition-transform duration-600 group-hover:animate-zoom-shake block">
        {icon}
      </div>

      {/* Title */}
      <h3 className="
        text-[clamp(1.2rem,1.5vw,1.5rem)] font-bold text-foreground leading-tight mb-4
        animate-text-pulse
      " style={{ animationDelay: `${index * 0.5}s` }}>
        {title}
      </h3>

      {/* Description */}
      <p className="
        text-[clamp(0.95rem,1.15vw,1.1rem)] text-muted-foreground leading-relaxed flex-grow whitespace-pre-line
        animate-text-bootstrap
      " style={{ animationDelay: `${0.2 + (index * 0.5)}s` }}>
        {description}
      </p>

      {/* Stats */}
      <div className="mt-6">
        <div className="
          text-[clamp(1.5rem,2.5vw,2rem)] font-bold 
          text-foreground group-hover:text-destructive group-hover:drop-shadow-[2px_2px_4px_rgba(239,68,68,0.3)]
          transition-colors duration-300
          mb-1 animate-text-pulse
        " style={{ animationDelay: `${0.3 + (index * 0.5)}s` }}>
          {stat}
        </div>
        <div className="text-[clamp(0.9rem,1.1vw,1.1rem)] font-semibold text-muted-foreground">
          {statLabel}
        </div>
      </div>
      
      {/* Hover Stripe Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600 bg-[linear-gradient(45deg,transparent_45%,rgba(239,68,68,0.1)_50%,transparent_55%)]" />

    </div>
  );
};

export default Slide05Problem2;
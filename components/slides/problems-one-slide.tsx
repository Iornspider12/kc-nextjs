'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const Slide04Problem: React.FC<SlideProps> = ({ isActive }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Base design size (e.g., standard laptop/desktop)
      const baseWidth = 1600;
      const baseHeight = 900;

      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;

      // Use the smaller scale to ensure it fits both dimensions (contain)
      // But don't scale up too much on huge screens (cap at 1.5)
      const newScale = Math.min(scaleX, scaleY, 1.5);

      setScale(newScale);
    };

    handleResize(); // Initial calc
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="problem"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={4} />

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

        <div className="w-full h-full flex flex-col items-center justify-center px-[60px]">

          {/* Title */}
          <h2 className="
          relative z-20
          text-primary font-bold uppercase tracking-wider text-center
          text-[40px]
          mb-[30px]
          animate-text-bootstrap
        ">
            What&apos;s Broken in Online Shopping?
          </h2>

          {/* 
           --- Layout Grid --- 
           Mobile: 1 col (Image hidden)
           Desktop: Grid with Image (Left) + Puzzle Cards (Right)
        */}
          <div className="w-full max-w-[1800px] grid grid-cols-1 lg:grid-cols-[0.6fr_3.4fr] gap-[30px] items-center">

            {/* --- Left: Image (Hidden on Mobile) --- */}
            <div className="hidden lg:flex justify-start items-center relative z-10 -ml-[60px]">
              <div className="relative 
              w-[400px] h-[600px]
            ">
                <Image
                  src="/slide4.webp"
                  alt="Online Shopping Problems"
                  fill
                  className="object-contain object-left"
                  draggable={false}
                />
              </div>
            </div>

            {/* --- Right: Puzzle Cards --- */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-0 px-[10px]">

              {/* Card 1: Carts */}
              <PuzzleCard
                index={0}
                icon="🛒"
                title="The Unsolved $12 Trillion Problem–Abandoned Carts"
                description={`"I spent 20 minutes filling up my cart. One confusion, and I walked away."\n\nNearly 70% of online carts were abandoned; that's $12 trillion worth because of poor UI with hostile navigation, countless filters, lack of transparency in pricing, and eventually broken trust.`}
                stat="$12T"
                statLabel="ABANDONED"
                shapeClass="lg:rounded-l-2xl lg:rounded-r-none lg:[clip-path:polygon(0%_0%,85%_0%,90%_15%,100%_25%,90%_35%,100%_50%,90%_65%,100%_75%,85%_100%,0%_100%)]"
              />

              {/* Card 2: Returns (Center Piece) */}
              <PuzzleCard
                index={1}
                icon="💸"
                title="The $890 Billion Nightmare–Returns Are Killing Retail"
                description={`"Bought online, found a better deal elsewhere, forced to pay return fees—never again!"\n\nIn the US, 25% of online purchases were returned last year, costing retailers $890 billion—due to better deals elsewhere, unmet expectations, intrusive sponsored recommendations, and $100B in fraudulent returns.`}
                stat="$890B"
                statLabel="LOST"
                shapeClass="lg:rounded-none lg:-mx-[6px] lg:[clip-path:polygon(15%_0%,85%_0%,90%_15%,100%_25%,90%_35%,100%_50%,90%_65%,100%_75%,85%_100%,15%_100%,10%_75%,0%_65%,10%_50%,0%_35%,10%_25%,0%_15%)]"
              />

              {/* Card 3: Search */}
              <PuzzleCard
                index={2}
                icon="🔍"
                title="Shoppers cannot speak—search feels like an infinite puzzle."
                description={`You can't simply say, "Show me black boots under $100 with next-day delivery."\n\nToday's search fails. It offers no conversation, guidance, or answers—just endless filters, resets, and abandonment. Lost intent means lost revenue.`}
                stat="70%"
                statLabel="SHOPPERS SUFFER"
                shapeClass="lg:rounded-r-2xl lg:rounded-l-none lg:[clip-path:polygon(15%_0%,100%_0%,100%_100%,15%_100%,10%_75%,0%_65%,10%_50%,0%_35%,10%_25%,0%_15%)]"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Sub-Component: Puzzle Card ---
interface PuzzleCardProps {
  index: number;
  icon: string;
  title: string;
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
        lg:min-h-[550px] lg:px-[40px] lg:py-[30px] lg:border-2 ${shapeClass}
        /* Animation & Interaction */
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:-translate-y-2 hover:scale-[1.02] hover:bg-destructive/5 hover:border-destructive hover:shadow-[0_20px_40px_rgba(239,68,68,0.25)] hover:z-10
        group cursor-pointer
        animate-float
      `}
      style={{ animationDelay: `${index}s` }}
    >

      {/* Icon with Zoom/Shake on Hover */}
      <div className="text-[40px] mb-4 filter grayscale-[0.3] transition-transform duration-600 group-hover:animate-zoom-shake block">
        {icon}
      </div>

      {/* Title */}
      <h3 className="
        text-[22px] font-extrabold text-foreground leading-tight mb-4
        drop-shadow-md
        animate-text-pulse
      " style={{ animationDelay: `${index * 0.5}s` }}>
        {title}
      </h3>

      {/* Description */}
      <p className="
        text-[16px] font-medium text-foreground/90 leading-relaxed flex-grow whitespace-pre-line
        px-2 drop-shadow-sm
        animate-text-bootstrap
      " style={{ animationDelay: `${0.2 + (index * 0.5)}s` }}>
        {description}
      </p>

      {/* Stats */}
      <div className="mt-6">
        <div className="
          text-[32px] font-bold 
          bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent
          mb-1 animate-text-pulse
        " style={{ animationDelay: `${0.3 + (index * 0.5)}s` }}>
          {stat}
        </div>
        <div className="text-[14px] font-semibold text-muted-foreground">
          {statLabel}
        </div>
      </div>

      {/* Hover Stripe Effect (Pseudo-element replacement) */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600 bg-[linear-gradient(45deg,transparent_45%,rgba(239,68,68,0.1)_50%,transparent_55%)]" />

    </div>
  );
};

export default Slide04Problem;  
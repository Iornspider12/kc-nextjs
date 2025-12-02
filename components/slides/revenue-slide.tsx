'use client';

import React, { useRef, useEffect } from 'react';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const REVENUE_STREAMS = [
  {
    title: "Channel Margin",
    desc: "Revenue from commissions on marketplace transactions and retail solutions."
  },
  {
    title: "SaaS Licensing",
    desc: "Tiered SaaS subscriptions for retailers, retailer plans include product placements, co-branded campaigns, and AI-powered affiliate sales."
  },
  {
    title: "Premium Membership",
    desc: "Exclusive buyer memberships offering immersive AR/VR shopping, early access to product launches, hyper-personalized recommendations, and loyalty rewards."
  },
  {
    title: "Advertisement",
    desc: "Contextual, AI-powered ads tailored to real-time user intent and mood—designed to maximize relevance without feeling intrusive."
  },
  {
    title: "Virtual Real Estate",
    desc: "Monetization through prime locations in metaverse shopping districts, branded virtual environments, and fully immersive storefronts."
  },
  {
    title: "HackMe",
    desc: "A tailored demand-intelligence system based on customers' need, enabling dynamic pricing, precision engagement, and optimized inventory flow."
  },
  {
    title: "QiD Licensing",
    desc: "License QiD encryption + privacy stack to payment gateways, marketplaces, and financial institutions."
  }
];

const Slide11Revenue: React.FC<SlideProps> = ({ isActive }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Optional: Add horizontal scroll wheel support
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section 
      id="revenue" 
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full h-full flex flex-col items-center
        pt-[110px] pb-[40px]
        lg:pt-[130px] lg:pb-[60px]
      ">
        
        <h2 className="
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(1.5rem,3vw,2.5rem)]
          mb-[clamp(2rem,4vh,4rem)]
          animate-text-bootstrap
        ">
          Revenue Model
        </h2>

        {/* 
           --- Horizontal Scroll Container (Desktop) --- 
           We use a flex container that allows horizontal scrolling on desktop.
           On mobile, we can switch to vertical scrolling if preferred, 
           but here I kept the horizontal "Story" feel for consistency with the design.
        */}
        <div 
          ref={scrollContainerRef}
          className="
            w-full flex-1 overflow-x-auto overflow-y-hidden
            px-[20px] lg:px-[60px]
            scrollbar-hide cursor-grab active:cursor-grabbing
          "
        >
          <div className="
            flex items-start gap-[2rem] lg:gap-[4rem]
            min-w-max /* Forces items to stay in one row */
            py-10 /* Padding for hover effects */
            h-full
          ">
            
            {REVENUE_STREAMS.map((item, index) => {
              // ZigZag Logic: Odd items go down
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`
                    relative w-[300px] h-[300px] lg:w-[380px] lg:h-[380px]
                    rounded-full flex items-center justify-center p-8 text-center
                    bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10
                    border border-primary/20 backdrop-blur-md
                    shadow-[0_0_30px_rgba(99,102,241,0.1)]
                    transition-all duration-500 ease-out
                    hover:scale-110 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:border-primary/50 hover:z-50
                    group
                    ${!isEven ? 'mt-[150px] lg:mt-[200px]' : 'mt-0'}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Inner Glow Pulse */}
                  <div className="absolute inset-4 rounded-full border border-white/5 animate-pulse opacity-50 pointer-events-none group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-col gap-3">
                    <h3 className="
                      text-[clamp(1.2rem,1.5vw,1.6rem)] font-bold text-foreground 
                      group-hover:text-primary transition-colors
                    ">
                      {item.title}
                    </h3>
                    <p className="
                      text-[clamp(0.9rem,1.1vw,1.1rem)] text-muted-foreground leading-relaxed
                      group-hover:text-foreground/90 transition-colors
                    ">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Slide11Revenue;
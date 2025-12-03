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
  const [scale, setScale] = React.useState(1);

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1600;
      const baseHeight = 900;
      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      const newScale = Math.min(scaleX, scaleY, 1.5);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="revenue"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      {/* --- Scaled Container --- */}
      <div
        className="relative z-10 flex flex-col items-center justify-center origin-center"
        style={{
          width: '1600px',
          height: '900px',
          transform: `scale(${scale})`,
        }}
      >

        <h2 className="
          text-primary font-bold uppercase tracking-wider text-center
          text-[40px]
          mb-[60px]
          animate-text-bootstrap
        ">
          Revenue Model
        </h2>

        {/* 
           --- Bubbles Container --- 
           Flex row with negative margins to overlap items and fit them all.
        */}
        <div className="
          w-full flex justify-center items-start
          px-[40px]
        ">

          {REVENUE_STREAMS.map((item, index) => {
            // ZigZag Logic: Odd indices (1, 3, 5...) go down
            const isBottom = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`
                    relative w-[380px] h-[380px]
                    rounded-full flex items-center justify-center p-10 text-center
                    bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10
                    border border-primary/20 backdrop-blur-md
                    shadow-[0_0_30px_rgba(99,102,241,0.1)]
                    transition-all duration-500 ease-out
                    hover:scale-110 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:border-primary/50 hover:z-50
                    group
                    ${isBottom ? 'mt-[220px]' : 'mt-0'}
                  `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  marginLeft: index === 0 ? '0px' : '-130px' // Increased negative margin for larger bubbles
                }}
              >
                {/* Inner Glow Pulse */}
                <div className="absolute inset-4 rounded-full border border-white/5 animate-pulse opacity-50 pointer-events-none group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col gap-4 items-center justify-center">
                  <h3 className="
                      text-[26px] font-extrabold text-foreground 
                      group-hover:text-primary transition-colors
                      leading-tight
                    ">
                    {item.title}
                  </h3>
                  <p className="
                      text-[17px] font-medium text-muted-foreground/90 leading-relaxed
                      group-hover:text-foreground transition-colors
                    ">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Slide11Revenue;
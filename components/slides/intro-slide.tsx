'use client';

import React from 'react';
import Image from 'next/image';
import FloatingBackground from '@/components/elements/floating-background';

const Slide01Intro = ({ isActive }: { isActive: boolean }) => {
  return (
    <section
      id="intro"
      className={`relative w-full h-full overflow-hidden bg-background flex flex-col items-center justify-center 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Splash Effects (Background Gradients) --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />

      {/* --- Reusable Background Component --- */}
      <FloatingBackground particleCount={30} boxCount={6} />

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] 
        gap-[clamp(4rem,10vw,12rem)] items-center
        /* Mobile Padding */
        p-[clamp(120px,12vh,140px)_clamp(20px,5vw,35px)_clamp(30px,5vh,50px)]
        /* Desktop Padding */
        lg:pl-[clamp(120px,12vw,180px)] lg:pr-[clamp(20px,2vw,40px)] lg:pt-[clamp(100px,10vh,120px)]
      ">


        {/* LEFT COLUMN: Text */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left relative z-20">
          <h1 className="
            font-bold leading-[0.9] tracking-tight whitespace-nowrap
            bg-gradient-to-br from-foreground via-primary via-secondary to-accent bg-clip-text text-transparent
            animate-text-pulse
            text-[clamp(2.2rem,8vw,9rem)]
            mb-[clamp(2rem,4vh,4rem)] pb-[0.2em]
            w-full
          ">
            Revolutionizing<br />
            Shopping
          </h1>

          <p className="
            font-medium text-muted-foreground leading-[1.4] tracking-tight
            animate-text-bootstrap
            text-[clamp(1.1rem,2.8vw,2.8rem)]
            mb-[clamp(1.5rem,2.5vh,2vw)]
            max-w-[90%] lg:max-w-none
            w-full
          ">
            A Gen AI-Powered, Gamified,<br />
            Premium, Immersive and<br />
            Holistic Experience
          </p>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-center relative z-10 
          max-w-full overflow-visible lg:mr-[-20px]">
          <div className="relative 
            w-[clamp(250px,60vw,350px)] h-[clamp(250px,60vw,350px)]
            md:w-[clamp(350px,42vw,480px)] md:h-[clamp(350px,42vw,480px)]
            lg:w-[clamp(400px,35vw,650px)] lg:h-[clamp(400px,35vw,650px)]
            2xl:w-[clamp(500px,38vw,720px)] 2xl:h-[clamp(500px,38vw,720px)]
            transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:scale-105 hover:drop-shadow-[0_15px_40px_rgba(99,102,241,0.4)]
            drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]
            shrink-0
          ">
            <Image
              src="/meta human 2 light.webp"
              alt="PanSas Meta Human"
              fill
              className="object-contain"
              priority
              draggable={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Slide01Intro;
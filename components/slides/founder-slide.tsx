'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const Slide02Founder: React.FC<SlideProps> = ({ isActive }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid calling setState synchronously within an effect
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const amazonLogoSrc = mounted && resolvedTheme === 'light'
    ? "/company_logo/Amazon_light.webp"
    : "/company_logo/Amazon_dark.webp";

  return (
    <section
      id="founder"
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={4} />

      {/* 
        --- Main Content Container --- 
        1. overflow-y-auto: Enables scrolling on mobile if content is too tall.
        2. justify-start: Starts content at the top on mobile (fixes cutout).
        3. lg:justify-center: Centers content on desktop (classic slide feel).
        4. pt-[100px]: Adds specific top padding to clear Navbar on mobile.
      */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center
        overflow-y-auto overflow-x-hidden
        gap-[clamp(1.5rem,3vw,6rem)]
        pt-[110px] pb-[50px] px-[20px]
        lg:p-[clamp(40px,5vw,80px)]
      ">

        {/* --- LEFT: CEO Image --- */}
        <div className="flex-shrink-0 relative group order-1">
          <div className="relative 
            w-[180px] h-[180px]
            md:w-[280px] md:h-[280px]
            lg:w-[350px] lg:h-[350px]
            2xl:w-[450px] 2xl:h-[450px]
            rounded-full border-[3px] md:border-4 border-primary transition-all duration-400 ease-out
            group-hover:scale-105 group-hover:shadow-[0_0_40px_12px_rgba(99,102,241,0.2)]
            overflow-hidden shadow-2xl
          ">
            <Image
              src="/photos_profile/VP.webp"
              alt="Surendar VP - CEO"
              fill
              className="object-cover"
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* --- RIGHT: Content --- */}
        <div className="flex flex-col items-center text-center max-w-[1400px] order-2 w-full px-2 lg:px-0 my-auto">

          <h2 className="text-primary font-bold uppercase tracking-wider mb-2 text-base md:text-lg lg:text-xl">
            Founder and CEO
          </h2>

          <h1 className="
            font-black tracking-tight leading-[1.1]
            bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent
            animate-text-pulse
            text-[2.5rem] md:text-[4rem] lg:text-[5rem]
            mb-4 md:mb-6
          ">
            Surendar VP
          </h1>

          <p className="
            font-medium text-muted-foreground leading-relaxed
            animate-text-bootstrap
            text-sm md:text-lg lg:text-xl
            mb-8
            max-w-[100%] lg:max-w-[1100px]
          ">
            For two decades, I&apos;ve operated at the intersection of deep-tech
            and human centric engineering design. I&apos;ve led iconic product
            engineering teams at Google, Apple, and Amazon across the
            globe. Now, I&apos;m channeling that expertise into redefining
            the future of shopping through gen AI and gamification.
          </p>

          {/* 
             --- Experience Cards Container ---
             1. flex-wrap: Allows cards to wrap to next line on tiny screens if needed.
             2. w-full: Ensures container uses full width.
          */}
          <div className="
            w-full flex flex-col md:flex-row flex-wrap gap-4 
            items-stretch justify-center
          ">

            <ExperienceCard
              logo="/company_logo/google.webp"
              logoClass="h-[35px] md:h-[45px] w-auto"
              title="Head of Product and Eng"
              subtitle="Pixel Ecosystem"
            />

            <ExperienceCard
              logo={amazonLogoSrc}
              logoClass="h-[45px] md:h-[55px] w-auto"
              title="Sr Management • Tech PMO"
              subtitle="FireTV and Kindle"
            />

            <ExperienceCard
              logo="/company_logo/Apple_Logo.webp"
              logoClass="h-[48px] md:h-[58px] w-auto"
              title="Mid Management • Systems"
              subtitle="Eng iPhone and iPad"
            />

          </div>
        </div>
      </div>
    </section>
  );
};

// --- Updated Card Component ---
// Uses min-h instead of fixed h to prevent overflow
const ExperienceCard = ({ logo, logoClass, title, subtitle }: { logo: string, logoClass: string, title: string, subtitle: string }) => (
  <div className="
    group relative flex flex-col items-center justify-center
    /* Sizing: flexible width, minimum height to ensure uniformity but allows growth */
    flex-1 min-w-[240px] max-w-full md:max-w-[300px]
    min-h-[140px]
    
    /* Spacing */
    p-4
    
    /* Styling */
    bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5
    border border-border/40 rounded-2xl backdrop-blur-md
    transition-all duration-300 ease-out
    hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]
    hover:from-indigo-500/15 hover:to-pink-500/15
  ">
    {/* Logo Area: Fixed height container to keep logos aligned */}
    <div className="h-[80px] w-full flex items-center justify-center mb-3">
      <img src={logo} alt="Company Logo" className={`object-contain max-h-full ${logoClass}`} draggable={false} />
    </div>

    {/* Text Area: Auto height */}
    <div className="text-center w-full flex flex-col justify-center">
      <div className="text-sm md:text-base text-muted-foreground font-bold leading-tight group-hover:text-foreground transition-colors mb-1">
        {title}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground/70 font-medium leading-tight">
        {subtitle}
      </div>
    </div>
  </div>
);

export default Slide02Founder;
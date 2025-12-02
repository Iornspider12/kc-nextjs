"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slide00Entrance from '@/components/slides/entrance-slide'
import { ModeToggle } from '@/components/ui/theme' // Adjust path if needed
import Slide01Intro from './slides/intro-slide'
import Slide02Founder from './slides/founder-slide'
import Slide03Team from './slides/teams-slide'
import Slide04Problem from './slides/problems-one-slide'
import Slide05Problem2 from './slides/problems-two-slide'
import Slide06Solution from './slides/solution-slide'
import Slide07ProductDemo from './slides/demo-slide'
import Slide08Market from './slides/market-slide'
import Slide09TargetMarket from './slides/target-markets-slide'
import Slide10Competitor from './slides/competitor-slide'
import Slide11Revenue from './slides/revenue-slide'
import Slide12GTM from './slides/gtm-slide'
import Slide13Roadmap from './slides/roadmap-slide'
import Slide14Ask from './slides/ask-slide'
import Slide15ThankYou from './slides/thank-you-slide'

// --- Slide Configuration ---
// Define this outside the component to prevent re-creation on render
const SLIDES_CONFIG = [
  { id: 'intro', render: (isActive: boolean) => <Slide01Intro isActive={isActive} /> },
  { id: 'founder', render: (isActive: boolean) => <Slide02Founder isActive={isActive} /> },
  { id: 'team', render: (isActive: boolean) => <Slide03Team isActive={isActive} /> },
  { id: 'problem1', render: (isActive: boolean) => <Slide04Problem isActive={isActive} /> },
  { id: 'problem2', render: (isActive: boolean) => <Slide05Problem2 isActive={isActive} /> },
  { id: 'solution', render: (isActive: boolean) => <Slide06Solution isActive={isActive} /> },
  { id: 'demo', render: (isActive: boolean) => <Slide07ProductDemo isActive={isActive} /> },
  { id: 'market', render: (isActive: boolean) => <Slide08Market isActive={isActive} /> },
  { id: 'target-markets', render: (isActive: boolean) => <Slide09TargetMarket isActive={isActive} /> },
  { id: 'competitor', render: (isActive: boolean) => <Slide10Competitor isActive={isActive} /> },
  { id: 'revenue', render: (isActive: boolean) => <Slide11Revenue isActive={isActive} /> },
  { id: 'gtm', render: (isActive: boolean) => <Slide12GTM isActive={isActive} /> },
  { id: 'roadmap', render: (isActive: boolean) => <Slide13Roadmap isActive={isActive} /> },
  { id: 'ask', render: (isActive: boolean) => <Slide14Ask isActive={isActive} /> },
  { id: 'thankyou', render: (isActive: boolean) => <Slide15ThankYou isActive={isActive} /> },
];

const Main = () => {
  // --- State ---
  const [showEntrance, setShowEntrance] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [navHidden, setNavHidden] = useState(false);

  // --- Navigation Logic ---
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < SLIDES_CONFIG.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // --- Effects ---

  // 1. Keyboard Navigation & Auto-hide Navbar
  useEffect(() => {
    if (showEntrance) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
      }
    };

    // Auto-hide navbar logic: hide after 2 seconds if not on the first slide
    let hideTimer: NodeJS.Timeout;
    if (currentSlide > 0) {
      hideTimer = setTimeout(() => setNavHidden(true), 2000);
    } else {
      // eslint-disable-next-line
      setNavHidden(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(hideTimer);
    };
  }, [currentSlide, showEntrance, nextSlide, prevSlide]);

  // --- Handlers ---
  const handleNavHover = () => setNavHidden(false);
  const handleEnter = () => setShowEntrance(false);

  // --- Render: Entrance ---
  if (showEntrance) {
    return <Slide00Entrance onEnter={handleEnter} />;
  }

  // --- Render: Main Slideshow ---
  return (
    <div className="relative w-full h-screen bg-background text-foreground overflow-hidden">

      {/* Invisible Hover Area (Top 100px) to reveal navbar */}
      <div
        className="fixed top-0 left-0 w-full h-[100px] z-[60]"
        onMouseEnter={handleNavHover}
        aria-hidden="true"
      />

      {/* --- Navbar --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-[70] transition-transform duration-500 ease-in-out border-b border-border/10 backdrop-blur-md bg-background/50
          ${navHidden ? '-translate-y-full' : 'translate-y-0'}
        `}
        onMouseEnter={handleNavHover}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-wider font-mono">PanSas</div>

          {/* Using your existing ModeToggle component */}
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* --- Navigation Arrows --- */}
      {currentSlide > 0 && (
        <NavButton direction="prev" onClick={prevSlide} />
      )}

      {currentSlide < SLIDES_CONFIG.length - 1 && (
        <NavButton direction="next" onClick={nextSlide} />
      )}

      {/* --- Slide Counter --- */}
      <div className={`fixed bottom-6 right-8 z-40 font-mono text-sm transition-opacity duration-500 pointer-events-none
        ${currentSlide > 0 ? 'opacity-60' : 'opacity-0'}
      `}>
        <span className="text-primary font-bold">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{SLIDES_CONFIG.length}</span>
      </div>

      {/* --- Slides Container --- */}
      <div className="relative w-full h-full">
        {SLIDES_CONFIG.map((slide, index) => {
          // Optimization: Only render active, prev, and next slides
          if (Math.abs(currentSlide - index) > 1) return null;

          let positionClass = 'translate-x-full opacity-0 pointer-events-none';
          if (index === currentSlide) positionClass = 'translate-x-0 opacity-100 z-10';
          else if (index < currentSlide) positionClass = '-translate-x-full opacity-0 pointer-events-none';

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${positionClass}`}
            >
              {slide.render(index === currentSlide)}
            </div>
          );
        })}
      </div>
    </div>
  )
}

// --- Sub-components ---

const PlaceholderSlide = ({ title, isActive }: { title: string, isActive: boolean }) => (
  <div className="flex flex-col items-center justify-center w-full h-full p-10 text-center">
    <h2 className={`text-5xl font-bold mb-4 transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {title}
    </h2>
    <p className="text-muted-foreground">Component coming soon...</p>
  </div>
);

const NavButton = ({ direction, onClick }: { direction: 'prev' | 'next', onClick: () => void }) => {
  const isNext = direction === 'next';
  return (
    <button
      onClick={onClick}
      aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
      className={`fixed ${isNext ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-40 p-3 rounded-full 
        bg-secondary/10 hover:bg-primary/20 hover:scale-110 text-foreground transition-all duration-300 group cursor-pointer backdrop-blur-sm`}
    >
      {isNext ? (
        <ChevronRight className="w-8 h-8 opacity-50 group-hover:opacity-100" />
      ) : (
        <ChevronLeft className="w-8 h-8 opacity-50 group-hover:opacity-100" />
      )}
    </button>
  );
};

export default Main
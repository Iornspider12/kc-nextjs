'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">Loading 3D Experience...</div>,
});

interface SlideProps {
  isActive: boolean;
}

const Slide15ThankYou: React.FC<SlideProps> = ({ isActive }) => {
  const [showThankYou, setShowThankYou] = React.useState(false);
  const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    // Start a 1-second timer (reduced by 2s) to simulate the "card join" completion
    holdTimerRef.current = setTimeout(() => {
      setShowThankYou(true);
    }, 1000);
  };

  const endHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  return (
    <section
      id="thankyou"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Responsive Container --- */}
      <div className="relative w-full h-full">
        <div
          className="relative w-full h-full overflow-hidden"
          onMouseDownCapture={startHold}
          onMouseUpCapture={endHold}
          onMouseLeave={endHold}
          onTouchStartCapture={startHold}
          onTouchEndCapture={endHold}
        >
          {/* --- Spline 3D Scene --- */}
          <Spline
            scene="https://prod.spline.design/bRXK8ysv3UvYg1hp/scene.splinecode"
            onLoad={(splineApp) => {
              splineApp.setBackgroundColor('transparent');
            }}
            className="w-full h-full"
          />

          {/* --- Logo Cover-up (Fallback) --- */}
          <div className="absolute bottom-0 right-0 w-[150px] h-[50px] bg-background z-50 pointer-events-none" />
        </div>
      </div>

      {/* --- Fullscreen Thank You Overlay --- */}
      <div
        className={`
          fixed inset-0 z-[100] bg-black flex items-center justify-center
          transition-all duration-1000 ease-in-out
          ${showThankYou ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="text-center">
          <h1 className="
            text-primary font-bold uppercase tracking-widest
            text-[clamp(3rem,8vw,8rem)]
            animate-text-bootstrap
            drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]
          ">
            Thank You
          </h1>
          <p className="
            text-muted-foreground mt-8 text-xl lg:text-2xl font-light tracking-wide
            opacity-0 animate-fade-in-up
          " style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Welcome on board.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Slide15ThankYou;
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
  return (
    <section
      id="thankyou"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Responsive Container --- */}
      <div className="relative w-full h-full
        /* Mobile Padding */
        p-[clamp(90px,10vh,110px)_clamp(20px,5vw,35px)_clamp(30px,5vh,50px)]
        /* Desktop Padding */
        lg:pl-[clamp(120px,12vw,180px)] lg:pr-[clamp(60px,6vw,100px)]
      ">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
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

    </section>
  );
};

export default Slide15ThankYou;
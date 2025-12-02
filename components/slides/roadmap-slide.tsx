'use client';

import React from 'react';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const ROADMAP_PHASES = [
  {
    id: 1,
    quarter: "Q1",
    title: "Foundation",
    theme: "indigo",
    gradient: "from-indigo-500 to-violet-500",
    borderColor: "border-indigo-500",
    shadowColor: "shadow-indigo-500/20",
    iconColor: "text-indigo-400",
    arrowColor: "border-b-indigo-500",
    features: [
      { icon: "🌍", text: "Tier 1 markets (US, UK, UAE)" },
      { icon: "📱", text: "Web & mobile app launch" },
      { icon: "✨", text: "Premium UX for Gen Z & Millennials" },
      { icon: "🤝", text: "Early adoption with partners" }
    ]
  },
  {
    id: 2,
    quarter: "Q2",
    title: "Innovation",
    theme: "violet",
    gradient: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500",
    shadowColor: "shadow-violet-500/20",
    iconColor: "text-violet-400",
    arrowColor: "border-b-violet-500",
    features: [
      { icon: "🕶️", text: "AR/VR immersive shopping" },
      { icon: "🌐", text: "Spatial WebVR desktop" },
      { icon: "🎮", text: "Gamified referrals (30%+ growth)" },
      { icon: "📢", text: "Influencer campaigns" },
      { icon: "💼", text: "Onboarding luxury brands" }
    ]
  },
  {
    id: 3,
    quarter: "Q3",
    title: "Expansion",
    theme: "amber",
    gradient: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500",
    shadowColor: "shadow-amber-500/20",
    iconColor: "text-amber-400",
    arrowColor: "border-b-amber-500",
    features: [
      { icon: "🛠️", text: "Scaled B2B partnerships" },
      { icon: "🏬", text: "Branded immersive storefronts" },
      { icon: "🔗", text: "Marketplace expansion" },
      { icon: "⚡", text: "White-label commerce" }
    ]
  },
  {
    id: 4,
    quarter: "Q4",
    title: "Future",
    theme: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500",
    shadowColor: "shadow-emerald-500/20",
    iconColor: "text-emerald-400",
    arrowColor: "border-b-emerald-500",
    features: [
      { icon: "🧠", text: "Gen-AI personalization at scale" },
      { icon: "🌐", text: "Global immersive commerce" },
      { icon: "🚀", text: "Redefining online shopping" }
    ]
  }
];

const Slide13Roadmap: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <section 
      id="roadmap" 
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      <div className="relative z-10 w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden
        pt-[110px] pb-[40px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">
        
        {/* Title */}
        <h2 className="
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(2rem,4vw,3.5rem)]
          mb-[clamp(1rem,3vh,3rem)]
          animate-text-bootstrap
          bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent
        ">
          Product Roadmap
        </h2>

        {/* --- Roadmap Container --- */}
        <div className="w-full max-w-[1600px] flex flex-col">
          
          {/* 
             TIMELINE HEADER (Desktop Only)
             A continuous gradient line with Q1-Q4 labels
          */}
          <div className="hidden lg:grid grid-cols-4 gap-8 mb-10 relative">
            
            {/* The Gradient Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-amber-500 to-emerald-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" />

            {/* Quarter Labels */}
            {ROADMAP_PHASES.map((phase) => (
              <div key={phase.id} className="text-center pb-6">
                <span className={`text-2xl font-black ${phase.iconColor} drop-shadow-md`}>
                  {phase.quarter}
                </span>
                {/* Small indicator triangle on the line */}
                <div className={`absolute bottom-[-6px] left-[calc(12.5%+(${phase.id-1}*25%))] w-3 h-3 rotate-45 ${phase.gradient.split(' ')[0].replace('from-', 'bg-')}`} />
              </div>
            ))}
          </div>

          {/* 
             CARDS GRID
             Mobile: 1 Column
             Desktop: 4 Columns
          */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 pt-4">
            {ROADMAP_PHASES.map((phase, index) => (
              <div 
                key={phase.id}
                className={`
                  relative flex flex-col items-center p-6 lg:p-8
                  rounded-3xl border-2 backdrop-blur-xl ${phase.borderColor} bg-opacity-10 bg-gray-900
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-2xl ${phase.shadowColor}
                  group
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* 
                   Connecting Arrow (Desktop Only) 
                   Points up to the timeline line
                */}
                <div className={`
                  hidden lg:block absolute -top-[22px] left-1/2 -translate-x-1/2
                  w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] ${phase.arrowColor}
                  drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
                `} />

                {/* Mobile Quarter Label */}
                <div className="lg:hidden absolute top-4 right-4 font-black text-xl opacity-50">
                  {phase.quarter}
                </div>

                {/* Number Circle */}
                <div className={`
                  w-14 h-14 rounded-full mb-6 flex items-center justify-center
                  bg-gradient-to-br ${phase.gradient}
                  text-white text-xl font-black shadow-lg
                `}>
                  {phase.id}
                </div>

                {/* Title */}
                <h3 className={`
                  text-[clamp(1.5rem,2vw,2rem)] font-black mb-6 text-center
                  bg-gradient-to-br ${phase.gradient} bg-clip-text text-transparent
                `}>
                  {phase.title}
                </h3>

                {/* Feature List */}
                <ul className="w-full space-y-4 text-left">
                  {phase.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground font-semibold leading-snug">
                      <span className="text-xl flex-shrink-0 mt-[-2px] filter drop-shadow-sm">
                        {feature.icon}
                      </span>
                      <span className="text-[0.95rem] lg:text-[1rem] group-hover:text-foreground transition-colors">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover Glow Background */}
                <div className={`
                  absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 
                  bg-gradient-to-b ${phase.gradient} transition-opacity duration-300 pointer-events-none
                `} />
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Slide13Roadmap;
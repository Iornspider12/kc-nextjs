'use client';

import React from 'react';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

const PHASES = [
  {
    id: 1,
    label: "Phase 1",
    title: "Penetration – Strategic Launch & Brand Seeding (Months 0–6)",
    markets: "US, UK, UAE",
    focus: "Build hype, validate product-market fit, and seed brand identity among Gen Z & Millennials in Tier-1 hubs.",
    moves: [
      "Influencer strategy, and experiential marketing - 90 days before launch",
      "Launch core app with AI concierge, AR/VR social shopping, and gamified onboarding",
      "Invite-only drops, golden ticket campaigns, and influencer livestreams",
      "Co-marketing with luxury/tech brands and boutique designers",
      "Community activation through forums, campus events, and social shopping"
    ],
    color: "from-indigo-500 to-violet-500",
    borderColor: "border-indigo-500",
    bgTint: "bg-indigo-500/10",
    lineColor: "bg-indigo-500"
  },
  {
    id: 2,
    label: "Phase 2",
    title: "Adoption – Regional Expansion & Ecosystem Growth (Months 7–18)",
    markets: "Japan, South Korea, Canada, Germany, Singapore",
    focus: "Scale into culturally aligned, tech-forward markets and deepen user engagement.",
    moves: [
      "Localize content, influencer strategy, and experiential marketing",
      "Expand team, establish regional partnerships, and scale infrastructure",
      "Introduce gamified referrals and viral growth loops",
      "Roll out SaaS tiers for brand partners with analytics and AR/VR placements",
      "Refine product and GTM using regional feedback and loyalty metrics"
    ],
    color: "from-violet-500 to-pink-500",
    borderColor: "border-violet-500",
    bgTint: "bg-violet-500/10",
    lineColor: "bg-violet-500"
  },
  {
    id: 3,
    label: "Phase 3",
    title: "Expansion – Global Rollout & Platform Maturity (Year 2+)",
    markets: "India, China, Australia, Middle East, Youth-driven Markets",
    focus: "Cement category leadership and scale toward trillion-dollar potential.",
    moves: [
      "Launch Software Development Kits (SDKs) for global brand integrations",
      "Host immersive offline activations (pop-ups, QR-linked experiences)",
      "Expand monetization with coins, skins, and premium subscriptions",
      "Drive thought leadership in AI commerce and digital fashion",
      "Optimize GTM and retention using real-time data across all regions"
    ],
    color: "from-pink-500 to-amber-500",
    borderColor: "border-pink-500",
    bgTint: "bg-pink-500/10",
    lineColor: "bg-pink-500"
  }
];

const Slide12GTM: React.FC<SlideProps> = ({ isActive }) => {
  const [scale, setScale] = React.useState(1);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      // Check if mobile (phones)
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        const baseWidth = 1600;
        const baseHeight = 900;
        const scaleX = window.innerWidth / baseWidth;
        const scaleY = window.innerHeight / baseHeight;
        const newScale = Math.min(scaleX, scaleY, 1.5);
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="gtm"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000
        ${!isMobile ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}
      `}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      {/* 
         --- Container ---
         On Desktop: Fixed 1600x900 scaled
         On Mobile: Fluid width/height
      */}
      <div
        className={`
          relative z-10 flex flex-col items-center
          ${!isMobile ? 'justify-center origin-center' : 'w-full px-4 py-20'}
        `}
        style={!isMobile ? {
          width: '1600px',
          height: '900px',
          transform: `scale(${scale})`,
        } : {}}
      >

        {/* Title */}
        <h2 className={`
          text-primary font-bold uppercase tracking-wider text-center
          animate-text-bootstrap
          ${!isMobile ? 'text-[40px] mb-[60px]' : 'text-3xl mb-10'}
        `}>
          Go-to-Market Strategy
        </h2>

        {/* --- Timeline Container --- */}
        <div className={`w-full flex flex-col items-center ${!isMobile ? 'px-[60px]' : ''}`}>

          {/* 
             DESKTOP: Horizontal Line 
             Hidden on mobile
          */}
          {!isMobile && (
            <div className="w-full relative h-[4px] mb-[60px] bg-gray-800 rounded-full">
              {/* Gradient Overlay Line */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 opacity-80" />

              {/* Markers on the line */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full grid grid-cols-3 gap-12 px-12">
                {PHASES.map((phase) => (
                  <div key={phase.id} className="relative flex justify-center">
                    <div className="relative">
                      {/* Dot on line */}
                      <div className={`w-4 h-4 rounded-full ${phase.lineColor} shadow-[0_0_10px_currentColor]`} />

                      {/* Phase Label Pill */}
                      <div className={`
                        absolute top-[-40px] left-1/2 -translate-x-1/2
                        px-4 py-1 rounded-full text-white text-sm font-bold whitespace-nowrap
                        bg-gradient-to-r ${phase.color} shadow-lg
                      `}>
                        {phase.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 
             CARDS CONTAINER
          */}
          <div className={`
            w-full grid gap-8 
            ${!isMobile ? 'grid-cols-3 gap-12 px-12' : 'grid-cols-1'}
          `}>

            {PHASES.map((phase, index) => (
              <div key={phase.id} className="relative flex flex-col items-center">

                {/* Connecting Line (Desktop Only) */}
                {!isMobile && (
                  <div className={`
                    absolute -top-[60px] left-1/2 -translate-x-1/2 w-[2px] h-[60px]
                    bg-gradient-to-b ${phase.color.replace('from-', 'from-').replace('to-', 'to-transparent')} 
                    opacity-60
                  `} />
                )}

                {/* Mobile Phase Label (Visible only on Mobile) */}
                {isMobile && (
                  <div className={`
                    mb-4 px-4 py-1 rounded-full text-white text-sm font-bold
                    bg-gradient-to-r ${phase.color}
                  `}>
                    {phase.label}
                  </div>
                )}

                {/* The Card */}
                <div
                  className={`
                    w-full h-full relative rounded-2xl
                    bg-gradient-to-br ${phase.bgTint} to-transparent
                    border border-opacity-30 ${phase.borderColor}
                    backdrop-blur-md shadow-lg
                    transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]
                    group
                    ${!isMobile ? 'p-8' : 'p-6'}
                  `}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className={`
                    font-extrabold text-foreground mb-4 leading-tight tracking-tight
                    ${!isMobile ? 'text-2xl' : 'text-xl'}
                  `}>
                    {phase.title}
                  </h3>

                  <div className={`space-y-4 text-muted-foreground ${!isMobile ? 'text-base' : 'text-sm'}`}>
                    <div>
                      <span className="font-extrabold text-foreground text-lg">Markets: </span>
                      <span className="font-semibold text-foreground/90">{phase.markets}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-foreground text-lg">Focus: </span>
                      <span className="font-semibold text-foreground/90">{phase.focus}</span>
                    </div>

                    <div className="pt-2">
                      <span className="font-extrabold text-foreground block mb-2 text-lg">Key Moves:</span>
                      <ul className="space-y-2 pl-1">
                        {phase.moves.map((move, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${phase.lineColor}`} />
                            <span className="leading-snug font-semibold text-foreground/80">{move}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${phase.color} pointer-events-none mix-blend-overlay`} />
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Slide12GTM;
'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem, ChartType } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import FloatingBackground from '@/components/elements/floating-background';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SlideProps {
  isActive: boolean;
}

// Data Config
const FUNDS_DATA = [
  { label: "Product & Tech", value: 35, amount: "$980K", color: "#6366f1", bg: "bg-indigo-500/10", border: "border-l-indigo-500" },
  { label: "Founding Team", value: 35, amount: "$980K", color: "#8b5cf6", bg: "bg-violet-500/10", border: "border-l-violet-500" },
  { label: "Marketing", value: 15, amount: "$420K", color: "#06b6d4", bg: "bg-cyan-500/10", border: "border-l-cyan-500" },
  { label: "Legal & Fundraising", value: 10, amount: "$280K", color: "#10b981", bg: "bg-emerald-500/10", border: "border-l-emerald-500" },
  { label: "Contingency", value: 5, amount: "$140K", color: "#f59e0b", bg: "bg-amber-500/10", border: "border-l-amber-500" }
];

const Slide14Ask: React.FC<SlideProps> = ({ isActive }) => {
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

  // Chart Data Configuration
  const chartData = {
    labels: FUNDS_DATA.map(d => d.label),
    datasets: [
      {
        data: FUNDS_DATA.map(d => d.value),
        backgroundColor: FUNDS_DATA.map(d => d.color),
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '40%', // Makes it a Doughnut (cleaner than Pie)
    plugins: {
      legend: { display: false }, // We built a custom legend
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 14 },
        callbacks: {
          label: (context: TooltipItem<ChartType>) => {
            const item = FUNDS_DATA[context.dataIndex];
            return `${item.label}: ${item.value}% (${item.amount})`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <section
      id="ask"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000
        ${!isMobile ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}
      `}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      {/* 
         --- Scaled Container ---
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
          ${!isMobile ? 'text-[40px] mb-[40px]' : 'text-3xl mb-10'}
        `}>
          Ask
        </h2>

        {/* --- Main Content Card --- */}
        <div className={`
          w-full flex flex-col
          bg-gradient-to-br from-indigo-500/10 to-violet-500/5
          border-2 border-indigo-500/30 rounded-3xl backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.2)]
          ${!isMobile ? 'max-w-[1400px] p-[50px]' : 'p-6'}
        `}>

          {/* Subtitle */}
          <h3 className={`
            font-black text-center text-foreground
            ${!isMobile ? 'text-[50px] mb-12' : 'text-3xl mb-8'}
          `}>
            $2.8M-Angel Round
          </h3>

          {/* 
             Content Grid 
             Mobile: Vertical Stack
             Desktop: Two Columns (Chart Left, Legend Right)
          */}
          <div className={`
            flex items-center justify-center w-full
            ${!isMobile ? 'flex-row gap-16' : 'flex-col gap-8'}
          `}>

            {/* Chart Side */}
            <div className={`
              relative flex items-center justify-center
              ${!isMobile ? 'w-[500px] h-[500px]' : 'w-full max-w-[350px] aspect-square'}
            `}>
              <Doughnut data={chartData} options={chartOptions} />

              {/* Center Text (Total Amount) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className={`font-black text-white ${!isMobile ? 'text-4xl' : 'text-3xl'}`}>$2.8M</div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total</div>
                </div>
              </div>
            </div>

            {/* Legend Side */}
            <div className={`
              flex flex-col justify-center
              ${!isMobile ? 'w-[600px]' : 'w-full'}
            `}>
              <h4 className="text-2xl font-bold text-center mb-6 text-foreground">
                Use of Funds
              </h4>

              <div className="space-y-4">
                {FUNDS_DATA.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex justify-between items-center rounded-xl
                      ${item.bg} border-l-[6px] ${item.border}
                      transition-transform duration-300 hover:scale-[1.02] hover:bg-opacity-20
                      ${!isMobile ? 'p-5' : 'p-4'}
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className={`font-bold text-foreground ${!isMobile ? 'text-[1.4rem]' : 'text-[1.1rem]'}`}>
                      {item.label}
                    </span>
                    <span className={`font-medium text-muted-foreground ${!isMobile ? 'text-[1.3rem]' : 'text-[1rem]'}`}>
                      {item.amount} <span className="opacity-60 ml-1">({item.value}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Slide14Ask;
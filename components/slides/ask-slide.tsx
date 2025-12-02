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
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      <div className="relative z-10 w-full h-full flex flex-col items-center overflow-hidden
        pt-[110px] pb-[40px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">

        {/* Title */}
        <h2 className="
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(2.5rem,4vw,3.5rem)]
          mb-[clamp(1rem,3vh,3rem)]
          animate-text-bootstrap
        ">
          Ask
        </h2>

        {/* --- Main Content Card --- */}
        <div className="
          w-full max-w-[1400px] flex-1
          flex flex-col
          bg-gradient-to-br from-indigo-500/10 to-violet-500/5
          border-2 border-indigo-500/30 rounded-3xl backdrop-blur-xl
          shadow-[0_20px_40px_rgba(0,0,0,0.2)]
          p-[clamp(1.5rem,3vw,3rem)]
        ">

          {/* Subtitle */}
          <h3 className="
            text-[clamp(2rem,4vw,3.5rem)] font-black text-center text-foreground
            mb-8 lg:mb-12
          ">
            $2.8M-Angel Round
          </h3>

          {/* 
             Content Grid 
             Mobile: Vertical Stack
             Desktop: Two Columns (Chart Left, Legend Right)
          */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 flex-1">

            {/* Chart Side */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <Doughnut data={chartData} options={chartOptions} />

              {/* Center Text (Total Amount) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-white">$2.8M</div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total</div>
                </div>
              </div>
            </div>

            {/* Legend Side */}
            <div className="w-full flex-1 flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-center lg:text-left mb-6 text-foreground">
                Use of Funds
              </h4>

              <div className="space-y-4">
                {FUNDS_DATA.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex justify-between items-center p-4 lg:p-5 rounded-xl
                      ${item.bg} border-l-[6px] ${item.border}
                      transition-transform duration-300 hover:scale-[1.02] hover:bg-opacity-20
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-[1.1rem] lg:text-[1.4rem] font-bold text-foreground">
                      {item.label}
                    </span>
                    <span className="text-[1rem] lg:text-[1.3rem] font-medium text-muted-foreground">
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
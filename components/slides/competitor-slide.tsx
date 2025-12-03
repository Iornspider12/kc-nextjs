'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartDataset,
  Point
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Scan, Table2 } from 'lucide-react';
import FloatingBackground from '@/components/elements/floating-background';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SlideProps {
  isActive: boolean;
}

// --- Data Configuration ---

const FEATURES = [
  'Gen-AI Shopping Genie',
  'Gamified Social Shopping',
  'QiD',
  'Hack Me',
  "Seller's Shield",
  'AR/VR Compatibility',
  'AI-Powered Personalization',
];

// Chart Datasets
const CHART_DATASETS = {
  pansas: {
    label: "Q'anta (100%)",
    data: [100, 100, 100, 100, 100, 100, 100],
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10b981',
    pointBackgroundColor: '#10b981',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#10b981',
    borderWidth: 3,
    pointRadius: 4,
    pointHoverRadius: 6,
    fill: true,
  },
  competitors: [
    {
      label: 'Amazon (29%)',
      data: [50, 0, 0, 0, 0, 0, 50],
      borderColor: '#f59e0b', // Amber
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#f59e0b',
      fill: true,
    },
    {
      label: 'Alibaba (43%)',
      data: [50, 50, 0, 0, 0, 50, 50],
      borderColor: '#ef4444', // Red
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#ef4444',
      fill: true,
    },
    {
      label: 'Pinduoduo (14%)',
      data: [0, 50, 0, 0, 0, 0, 0],
      borderColor: '#8b5cf6', // Violet
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#8b5cf6',
      fill: true,
    },
    {
      label: 'Shopify (29%)',
      data: [50, 0, 0, 0, 0, 0, 50],
      borderColor: '#06b6d4', // Cyan
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#06b6d4',
      fill: true,
    },
    {
      label: 'MercadoLibre (0%)',
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: '#84cc16', // Lime
      backgroundColor: 'rgba(132, 204, 22, 0.2)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#84cc16',
      fill: true,
    },
  ]
};

// Table Data
const TABLE_DATA = [
  { feature: 'Gen-AI Shopping Genie', amz: '🟡', ali: '🟡', pin: '❌', shop: '🟡' },
  { feature: 'Gamified Social Shopping', amz: '❌', ali: '🟡', pin: '🟡', shop: '❌' },
  { feature: 'QiD', amz: '❌', ali: '❌', pin: '❌', shop: '❌' },
  { feature: 'Hack Me', amz: '❌', ali: '❌', pin: '❌', shop: '❌' },
  { feature: "Seller's Shield", amz: '❌', ali: '❌', pin: '❌', shop: '❌' },
  { feature: 'AR/VR Compatibility', amz: '❌', ali: '🟡', pin: '❌', shop: '❌' },
  { feature: 'AI Personalization', amz: '🟡', ali: '🟡', pin: '❌', shop: '🟡' },
];

const Slide10Competitors: React.FC<SlideProps> = ({ isActive }) => {
  const [viewMode, setViewMode] = useState<'radar' | 'table'>('radar');
  const [filterMode, setFilterMode] = useState<'all' | 'pansas' | 'competitors'>('all');
  const [scale, setScale] = useState(1);

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

  // --- Dynamic Chart Config ---
  const getChartData = () => {
    const datasets: ChartDataset<"radar", (number | Point | [number, number] | null)[]>[] = [];

    if (filterMode === 'all' || filterMode === 'pansas') {
      datasets.push(CHART_DATASETS.pansas);
    }
    if (filterMode === 'all' || filterMode === 'competitors') {
      datasets.push(...CHART_DATASETS.competitors);
    }

    return {
      labels: FEATURES,
      datasets: datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(99, 102, 241, 0.2)' },
        grid: { color: 'rgba(99, 102, 241, 0.2)', circular: true },
        pointLabels: {
          color: '#e2e8f0', // Lighter text
          font: { size: 14, weight: 'bold' as const, family: 'Inter' },
          padding: 20,
        },
        ticks: { display: false, stepSize: 20, backdropColor: 'transparent' },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#e2e8f0',
          boxWidth: 20,
          padding: 25,
          font: { size: 16, weight: 'bold' as const }
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      }
    },
    elements: {
      line: { tension: 0 }, // Straight lines
    }
  };

  return (
    <section
      id="edge"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      {/* 
        --- Scaled Container ---
      */}
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
          mb-[30px] animate-text-bootstrap
        ">
          Competitor Current Static Landscape
        </h2>

        {/* --- View Toggles --- */}
        <div className="flex gap-6 mb-[30px] z-20">
          <button
            onClick={() => setViewMode('radar')}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-[18px] transition-all duration-300
              ${viewMode === 'radar'
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg scale-105'
                : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'}
            `}
          >
            <Scan className="w-6 h-6" /> Radar Chart
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-[18px] transition-all duration-300
              ${viewMode === 'table'
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg scale-105'
                : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'}
            `}
          >
            <Table2 className="w-6 h-6" /> Table View
          </button>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="w-[1400px] h-[650px] relative flex items-center justify-center">

          {/* --- RADAR VIEW --- */}
          {viewMode === 'radar' && (
            <div className="w-full h-full flex flex-col items-center animate-fade-in-scale">

              {/* Chart Filters */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <FilterBtn label="Show All" active={filterMode === 'all'} onClick={() => setFilterMode('all')} color="violet" />
                <FilterBtn label="Q'anta Only" active={filterMode === 'pansas'} onClick={() => setFilterMode('pansas')} color="emerald" />
                <FilterBtn label="Competitors Only" active={filterMode === 'competitors'} onClick={() => setFilterMode('competitors')} color="indigo" />
              </div>

              {/* Chart Container */}
              <div className="w-[1200px] h-[550px] flex justify-center items-center">
                <Radar data={getChartData()} options={chartOptions} />
              </div>

            </div>
          )}

          {/* --- TABLE VIEW --- */}
          {viewMode === 'table' && (
            <div className="w-full h-full flex flex-col animate-fade-in-scale rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-md p-6">
              <table className="w-full h-full text-left border-collapse table-fixed">
                <thead className="bg-primary/10 text-primary">
                  <tr>
                    <th className="p-4 text-[20px] font-black w-1/3">Feature</th>
                    <th className="p-4 text-center text-[18px] font-bold">Amazon</th>
                    <th className="p-4 text-center text-[18px] font-bold">Alibaba</th>
                    <th className="p-4 text-center text-[18px] font-bold">Pinduoduo</th>
                    <th className="p-4 text-center text-[18px] font-bold">Shopify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {TABLE_DATA.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-semibold text-foreground text-[18px] truncate" title={row.feature}>{row.feature}</td>
                      <td className="px-4 py-3 text-center text-[24px]">{row.amz}</td>
                      <td className="px-4 py-3 text-center text-[24px]">{row.ali}</td>
                      <td className="px-4 py-3 text-center text-[24px]">{row.pin}</td>
                      <td className="px-4 py-3 text-center text-[24px]">{row.shop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

// --- Sub-Component: Filter Button ---
const FilterBtn = ({ label, active, onClick, color }: { label: string, active: boolean, onClick: () => void, color: 'violet' | 'emerald' | 'indigo' }) => {
  const styles = {
    violet: active ? 'bg-violet-500/20 text-violet-300 border-violet-500' : 'text-muted-foreground border-transparent hover:bg-white/5',
    emerald: active ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'text-muted-foreground border-transparent hover:bg-white/5',
    indigo: active ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500' : 'text-muted-foreground border-transparent hover:bg-white/5',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-[16px] font-bold border transition-all duration-300 ${styles[color]}`}
    >
      {label}
    </button>
  );
};

export default Slide10Competitors;
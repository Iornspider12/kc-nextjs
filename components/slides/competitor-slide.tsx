'use client';

import React, { useState } from 'react';
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
import { Scan, Table2, Layers, Filter } from 'lucide-react';
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
    borderWidth: 2,
  },
  competitors: [
    {
      label: 'Amazon (29%)',
      data: [60, 20, 0, 0, 0, 30, 90],
      borderColor: '#f59e0b', // Amber
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: 'Alibaba (43%)',
      data: [50, 80, 0, 0, 0, 80, 90],
      borderColor: '#ef4444', // Red
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: 'Pinduoduo (14%)',
      data: [0, 90, 0, 0, 0, 0, 10],
      borderColor: '#8b5cf6', // Violet
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: 'Shopify (29%)',
      data: [60, 0, 0, 0, 0, 30, 80],
      borderColor: '#06b6d4', // Cyan
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: 'MercadoLibre (0%)',
      data: [0, 0, 0, 0, 0, 0, 0], // Mostly zero per chart
      borderColor: '#84cc16', // Lime
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    },
  ]
};

// Table Data (Simplified for display)
const TABLE_DATA = [
  { feature: 'Gen-AI Shopping Genie', amz: '🟡', ali: '🟡', pin: '❌', shop: '🟡', mer: '❌' },
  { feature: 'Gamified Social Shopping', amz: '❌', ali: '🟡', pin: '🟡', shop: '❌', mer: '❌' },
  { feature: 'QiD', amz: '❌', ali: '❌', pin: '❌', shop: '❌', mer: '❌' },
  { feature: 'Hack Me', amz: '❌', ali: '❌', pin: '❌', shop: '❌', mer: '❌' },
  { feature: "Seller's Shield", amz: '❌', ali: '❌', pin: '❌', shop: '❌', mer: '❌' },
  { feature: 'AR/VR Compatibility', amz: '❌', ali: '🟡', pin: '❌', shop: '❌', mer: '❌' },
  { feature: 'AI Personalization', amz: '🟡', ali: '🟡', pin: '❌', shop: '🟡', mer: '❌' },
];

const Slide10Competitors: React.FC<SlideProps> = ({ isActive }) => {
  const [viewMode, setViewMode] = useState<'radar' | 'table'>('radar');
  const [filterMode, setFilterMode] = useState<'all' | 'pansas' | 'competitors'>('all');

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
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#94a3b8', // Slate-400
          font: { size: 12, weight: 'bold' as const },
        },
        ticks: { display: false, stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { color: '#e2e8f0', boxWidth: 15, padding: 20, font: { size: 14 } },
      },
    },
  };

  // --- Responsive Options for Mobile ---
  const mobileOptions = {
    ...chartOptions,
    scales: {
      r: {
        ...chartOptions.scales.r,
        pointLabels: { font: { size: 9 } }, // Smaller text
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend on mobile to save space
    }
  };

  return (
    <section 
      id="edge" 
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <FloatingBackground particleCount={20} boxCount={2} />

      <div className="relative z-10 w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden
        pt-[110px] pb-[40px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">
        
        <h2 className="
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(1.5rem,3vw,2.5rem)]
          mb-4 animate-text-bootstrap
        ">
          Competitor Current Static Landscape
        </h2>

        {/* --- View Toggles --- */}
        <div className="flex gap-4 mb-8 z-20">
          <button
            onClick={() => setViewMode('radar')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
              ${viewMode === 'radar' 
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg scale-105' 
                : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'}
            `}
          >
            <Scan className="w-5 h-5" /> Radar Chart
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
              ${viewMode === 'table' 
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg scale-105' 
                : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'}
            `}
          >
            <Table2 className="w-5 h-5" /> Table View
          </button>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="w-full max-w-[1400px] flex-1 min-h-[500px] relative">
          
          {/* --- RADAR VIEW --- */}
          {viewMode === 'radar' && (
            <div className="w-full h-full flex flex-col items-center animate-fade-in-scale">
              
              {/* Chart Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <FilterBtn label="Show All" active={filterMode === 'all'} onClick={() => setFilterMode('all')} color="violet" />
                <FilterBtn label="Q'anta Only" active={filterMode === 'pansas'} onClick={() => setFilterMode('pansas')} color="emerald" />
                <FilterBtn label="Competitors Only" active={filterMode === 'competitors'} onClick={() => setFilterMode('competitors')} color="indigo" />
              </div>

              {/* Chart Container */}
              <div className="w-full h-[50vh] lg:h-[60vh] flex justify-center">
                 {/* Desktop Chart */}
                 <div className="hidden lg:block w-full h-full">
                    <Radar data={getChartData()} options={chartOptions} />
                 </div>
                 {/* Mobile Chart (Adjusted scales/legend) */}
                 <div className="lg:hidden w-full h-full">
                    <Radar data={getChartData()} options={mobileOptions} />
                 </div>
              </div>

            </div>
          )}

          {/* --- TABLE VIEW --- */}
          {viewMode === 'table' && (
            <div className="w-full h-full overflow-auto animate-fade-in-scale rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-md">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead className="bg-primary/10 text-primary">
                  <tr>
                    <th className="p-4 text-xl font-black">Feature</th>
                    <th className="p-4 text-center font-bold">Amazon</th>
                    <th className="p-4 text-center font-bold">Alibaba</th>
                    <th className="p-4 text-center font-bold">Pinduoduo</th>
                    <th className="p-4 text-center font-bold">Shopify</th>
                    <th className="p-4 text-center font-bold">MercadoLibre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {TABLE_DATA.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-foreground text-lg">{row.feature}</td>
                      <td className="p-4 text-center text-2xl">{row.amz}</td>
                      <td className="p-4 text-center text-2xl">{row.ali}</td>
                      <td className="p-4 text-center text-2xl">{row.pin}</td>
                      <td className="p-4 text-center text-2xl">{row.shop}</td>
                      <td className="p-4 text-center text-2xl">{row.mer}</td>
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
      className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-300 ${styles[color]}`}
    >
      {label}
    </button>
  );
};

export default Slide10Competitors;
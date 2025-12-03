"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import FloatingBackground from "@/components/elements/floating-background";
import { Play, Pause } from "lucide-react";

// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface SlideProps {
  isActive: boolean;
}

// --- Data Structure ---
interface MarketData {
  id: string;
  name: string;
  coords: [number, number]; // [longitude, latitude]
  stats: {
    tam: string;
    sam: string;
    som: string;
    growth: string;
  };
}

const MARKET_DATA: MarketData[] = [
  {
    id: "JP",
    name: "Japan Market",
    coords: [138.2529, 36.2048],
    stats: { tam: "$195B", sam: "$12.8B", som: "$6-13M", growth: "42% CAGR" },
  },
  {
    id: "UK",
    name: "UK Market",
    coords: [-0.1278, 51.5074],
    stats: { tam: "$150B", sam: "$10B", som: "$5-10M", growth: "12% CAGR" },
  },
  {
    id: "DE",
    name: "Germany Market",
    coords: [10.4515, 51.1657],
    stats: { tam: "$120B", sam: "$8B", som: "$4-8M", growth: "15% CAGR" },
  },
  {
    id: "AE",
    name: "UAE Market",
    coords: [54.3773, 24.4539],
    stats: { tam: "$50B", sam: "$5B", som: "$2-5M", growth: "25% CAGR" },
  },
  {
    id: "SG",
    name: "Singapore Market",
    coords: [103.8198, 1.3521],
    stats: { tam: "$20B", sam: "$2B", som: "$1-3M", growth: "18% CAGR" },
  },
  {
    id: "US",
    name: "USA Market",
    coords: [-95.7129, 37.0902],
    stats: { tam: "$1.2T", sam: "$100B", som: "$50-100M", growth: "10% CAGR" },
  },
];

const Slide09TargetMarket: React.FC<SlideProps> = ({ isActive }) => {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isChartReady, setIsChartReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);
  const mapChartRef = useRef<am5map.MapChart | null>(null);
  const pointSeriesRef = useRef<am5map.MapPointSeries | null>(null);

  // --- Scaling Logic ---
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setScale(1); // No scaling on phones, let CSS flow naturally
      } else {
        const baseWidth = 1600;
        const baseHeight = 900;
        // Calculate scale to fit the 1600x900 box into the current window
        // We use Math.min to ensure it fits both width and height (contain)
        const scaleX = window.innerWidth / baseWidth;
        const scaleY = window.innerHeight / baseHeight;
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Auto-Rotation Timer ---
  useEffect(() => {
    if (!isActive || !isChartReady || !isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MARKET_DATA.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, isChartReady, isPlaying]);

  // --- Rotate Globe & Update Labels on Active Index Change ---
  useEffect(() => {
    if (!mapChartRef.current || !pointSeriesRef.current || !isChartReady) return;

    const target = MARKET_DATA[activeIndex];

    // 1. Animate rotation to target coordinates
    mapChartRef.current.animate({
      key: "rotationX",
      to: -target.coords[0],
      duration: 1500,
      easing: am5.ease.inOut(am5.ease.cubic),
    });

    mapChartRef.current.animate({
      key: "rotationY",
      to: -target.coords[1],
      duration: 1500,
      easing: am5.ease.inOut(am5.ease.cubic),
    });

    // 2. Update Label Visibility
    if (pointSeriesRef.current.dataItems) {
      for (const dataItem of pointSeriesRef.current.dataItems) {
        const context = dataItem.dataContext as any;
        const bullet = dataItem.bullets?.[0];

        if (bullet) {
          const sprite = bullet.get("sprite") as am5.Container;
          if (sprite && sprite.children) {
            // Robustly find the Label component
            const label = sprite.children.values.find(child => child instanceof am5.Label) as am5.Label;

            if (label) {
              if (context.id === target.id) {
                // Active Country: Show Label
                label.animate({ key: "opacity", to: 1, duration: 500 });
                label.animate({ key: "dy", from: 10, to: 0, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
              } else {
                // Inactive: Hide Label
                label.animate({ key: "opacity", to: 0, duration: 300 });
              }
            }
          }
        }
      }
    }

  }, [activeIndex, isChartReady]);


  // --- Globe Initialization ---
  useLayoutEffect(() => {
    if (!isActive || !chartRef.current) return;

    if (rootRef.current) {
      rootRef.current.dispose();
    }

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );
    mapChartRef.current = chart;

    // Polygon Series (Land)
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      fill: am5.color(0x334155),
      stroke: am5.color(0x1e293b),
      strokeWidth: 1,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x6366f1),
    });

    // Point Series (Markers)
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeriesRef.current = pointSeries;

    pointSeries.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 6,
        tooltipText: "{name}",
        cursorOverStyle: "pointer",
        tooltipY: 0,
        fill: am5.color(0xffffff),
        stroke: am5.color(0x6366f1),
        strokeWidth: 2,
      });

      const circle2 = am5.Circle.new(root, {
        radius: 6,
        tooltipText: "{name}",
        cursorOverStyle: "pointer",
        tooltipY: 0,
        fill: am5.color(0x6366f1),
        stroke: am5.color(0x6366f1),
        strokeOpacity: 0,
      });

      circle2.animate({
        key: "scale",
        from: 1,
        to: 3,
        duration: 2000,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic),
      });

      circle2.animate({
        key: "opacity",
        from: 1,
        to: 0,
        duration: 2000,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic),
      });

      const container = am5.Container.new(root, {});
      container.children.push(circle2);
      container.children.push(circle);

      // Label (Initially Hidden)
      const label = am5.Label.new(root, {
        text: "{name}",
        fill: am5.color(0xffffff),
        fontSize: 18,
        fontWeight: "bold",
        centerY: am5.p0,
        opacity: 0, // Start hidden
        populateText: true
      });

      // Adapter to customize label position per country
      label.adapters.add("dx", function (dx, target) {
        if (target.dataItem && (target.dataItem.dataContext as any).id === "UK") {
          return -15; // Move to left for UK
        }
        return 15; // Default to right
      });

      label.adapters.add("centerX", function (centerX, target) {
        if (target.dataItem && (target.dataItem.dataContext as any).id === "UK") {
          return am5.p100; // Align right edge to point (so text grows left)
        }
        return am5.p0; // Default align left edge to point
      });

      container.children.push(label);

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    // Set Data
    pointSeries.data.setAll(
      MARKET_DATA.map(m => ({
        geometry: { type: "Point", coordinates: m.coords },
        name: m.name.replace(" Market", ""),
        id: m.id // Pass ID for matching
      }))
    );

    // Background (Ocean)
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x0f172a),
      fillOpacity: 0.1,
      stroke: am5.color(0x6366f1),
      strokeOpacity: 0.1,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoCircle({ longitude: 0, latitude: 0 }, 90),
    });

    setIsChartReady(true);

    return () => {
      root.dispose();
      setIsChartReady(false);
    };
  }, [isActive]);

  return (
    <section
      id="marketentryfocus"
      className={`relative w-full h-full bg-background flex flex-col items-center justify-center overflow-hidden
        ${isActive ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
    >
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={0} />

      <div
        className={`relative z-10 flex flex-col items-center justify-center ${isMobile ? 'w-full h-full p-4' : 'origin-center'}`}
        style={!isMobile ? {
          width: '1600px',
          height: '900px',
          transform: `scale(${scale})`,
        } : {}}
      >
        <h2 className="
          relative z-20 flex-shrink-0
          text-primary font-bold uppercase tracking-wider text-center
          text-[40px]
          mb-[10px]
          animate-text-bootstrap
        ">
          Target Market
        </h2>

        {/* 
           --- Main Layout: 2 Columns ---
           Left: Info Card
           Right: Globe
        */}
        <div className={`w-full max-w-[1400px] grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-[400px_1fr] gap-8'} items-center h-[700px]`}>

          {/* --- LEFT COLUMN: Content Card --- */}
          <div className={`flex flex-col gap-6 z-30 ${isMobile ? 'order-2' : 'pl-[40px]'}`}>

            {/* Info Card */}
            <div className="
              w-full bg-[#1e293b]/90 backdrop-blur-md border border-primary/30 rounded-xl p-8
              shadow-[0_0_40px_rgba(0,0,0,0.5)]
              flex flex-col gap-6
              animate-in fade-in slide-in-from-left-8 duration-500
            "
              key={activeIndex} // Re-animate on change
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">{MARKET_DATA[activeIndex].name}</h3>
                  <p className="text-base text-muted-foreground">Large tech-savvy market</p>
                </div>
              </div>

              <div className="space-y-4">
                <StatRow label="TAM" value={MARKET_DATA[activeIndex].stats.tam} color="bg-indigo-500/20 text-indigo-300" />
                <StatRow label="SAM" value={MARKET_DATA[activeIndex].stats.sam} color="bg-violet-500/20 text-violet-300" />
                <StatRow label="SOM" value={MARKET_DATA[activeIndex].stats.som} color="bg-amber-500/20 text-amber-300" />
                <StatRow label="Growth Outlook" value={MARKET_DATA[activeIndex].stats.growth} color="bg-emerald-500/20 text-emerald-300" />
              </div>
            </div>

            {/* Play/Pause Control */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="
                  flex items-center gap-2 px-6 py-3 rounded-full
                  bg-white/10 hover:bg-white/20 border border-white/20
                  text-white font-bold tracking-wide
                  transition-all duration-300 active:scale-95
                "
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" /> Pause Rotation
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Resume Rotation
                  </>
                )}
              </button>
            </div>

          </div>

          {/* --- RIGHT COLUMN: Globe --- */}
          <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'order-1 h-[300px]' : ''}`}>

            <div ref={chartRef} className="w-full h-full cursor-grab active:cursor-grabbing"></div>

            {/* Fallback/Loading State */}
            {isActive && !isChartReady && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-pulse">
                Loading Globe...
              </div>
            )}
          </div>

        </div>

        <div className="mt-[20px] max-w-4xl mx-auto text-center px-4 animate-text-bootstrap delay-300">
          <p className="text-[20px] font-bold leading-relaxed bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            With access to 6 high-growth countries totaling over 0.63 billion
            consumers, we&apos;re primed to tap into the $8.1 trillion global
            e-commerce market projected by 2027.
          </p>
        </div>
      </div>
    </section>
  );
};

const StatRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-lg ${color}`}>
    <span className="font-semibold text-sm opacity-80">{label}</span>
    <span className="font-bold text-base">{value}</span>
  </div>
);

export default Slide09TargetMarket;

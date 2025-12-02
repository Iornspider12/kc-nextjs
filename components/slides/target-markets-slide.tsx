"use client";

import React, { useLayoutEffect, useRef } from "react";
import FloatingBackground from "@/components/elements/floating-background";

// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface SlideProps {
  isActive: boolean;
}

const Slide09TargetMarket: React.FC<SlideProps> = ({ isActive }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!isActive || !chartRef.current) return;

    // 1. Create Root
    // If a root already exists, dispose it to prevent duplicates during hot-reloads
    if (rootRef.current) {
      rootRef.current.dispose();
    }

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    // 2. Set Theme
    root.setThemes([am5themes_Animated.new(root)]);

    // 3. Create Map Chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(), // 3D Globe Projection
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // 4. Create Polygon Series (The Land)
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    // Style the Land
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      fill: am5.color(0x334155), // Slate-700
      stroke: am5.color(0x1e293b), // Slate-800
      strokeWidth: 1,
    });

    // Hover state for land
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x6366f1), // Indigo-500
    });

    // 5. Create Point Series (The Markers for Target Countries)
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 6,
        tooltipText: "{name}",
        cursorOverStyle: "pointer",
        tooltipY: 0,
        fill: am5.color(0xffffff), // White center
        stroke: am5.color(0x6366f1), // Indigo border
        strokeWidth: 2,
      });

      // Add a ripple/pulse effect
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

      return am5.Bullet.new(root, {
        sprite: am5.Container.new(root, {
          
        }),
      });
    });

    // Data for Target Markets (Based on your image: UK, Germany, UAE, Japan, Singapore)
    pointSeries.data.setAll([
      {
        geometry: { type: "Point", coordinates: [-0.1278, 51.5074] },
        name: "United Kingdom",
      },
      {
        geometry: { type: "Point", coordinates: [10.4515, 51.1657] },
        name: "Germany",
      },
      {
        geometry: { type: "Point", coordinates: [54.3773, 24.4539] },
        name: "UAE",
      },
      {
        geometry: { type: "Point", coordinates: [138.2529, 36.2048] },
        name: "Japan",
      },
      {
        geometry: { type: "Point", coordinates: [103.8198, 1.3521] },
        name: "Singapore",
      },
      // Optional: Add US if it's part of the strategy, though not pinned in image
      {
        geometry: { type: "Point", coordinates: [-95.7129, 37.0902] },
        name: "USA",
      },
    ]);

    // 6. Add Background (The Ocean)
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x0f172a), // Slate-900 (Matches your background)
      fillOpacity: 0.1, // Slight transparency
      stroke: am5.color(0x6366f1),
      strokeOpacity: 0.1,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoCircle(
        {
          longitude: 0,
          latitude: 0,
        },
        90
      ),
    });

    // 7. Auto Rotation
    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity,
    });

    // Cleanup function
    return () => {
      root.dispose();
    };
  }, [isActive]);

  return (
    <section
      id="marketentryfocus"
      className={`relative w-full h-full bg-background flex flex-col 
        ${
          isActive ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
    >
      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={0} />

      {/* --- Main Content --- */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center
        pt-[110px] pb-[50px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      "
      >
        {/* Title */}
        <h2
          className="
          relative z-20 flex-shrink-0
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(1.5rem,3vw,2.5rem)]
          mb-[clamp(1rem,2vh,2rem)]
          animate-text-bootstrap
        "
        >
          Target Market
        </h2>

        {/* Globe Container */}
        <div
          className="
          relative flex-1 w-full max-w-[1200px]
          flex items-center justify-center
        "
        >
          {/* The Chart Div */}
          <div
            ref={chartRef}
            className="w-full h-[50vh] lg:h-[65vh] cursor-grab active:cursor-grabbing"
          ></div>

          {/* Fallback/Loading State (Optional Polish) */}
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-pulse">
              Loading Globe...
            </div>
          )}
        </div>

        {/* Footer Text */}
        <div
          className="
          mt-auto mb-4
          max-w-4xl mx-auto text-center px-4
          animate-text-bootstrap delay-300
        "
        >
          <p
            className="
            text-[clamp(1rem,1.3vw,1.4rem)] font-bold leading-relaxed
            bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent
          "
          >
            With access to 6 high-growth countries totaling over 0.63 billion
            consumers, we&apos;re primed to tap into the $8.1 trillion global
            e-commerce market projected by 2027.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Slide09TargetMarket;

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import FloatingBackground from '@/components/elements/floating-background';

interface SlideProps {
  isActive: boolean;
}

interface TeamMember {
  name: string;
  position: string;
  credentials: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Yujia', position: 'Head of Investor Relations', credentials: 'NYU and Columbia Alum • Ph.D', image: 'Yujia.webp' },
  { name: 'Sathiya', position: 'Head of Systems', credentials: 'Intel', image: 'Sathiya.webp' },
  { name: 'Devadharshini', position: 'AI Engineer', credentials: 'Neostats', image: 'DD.webp' },
  { name: 'Krish', position: 'AI Software Engineer', credentials: 'MS @ Purdue University', image: 'Krish.webp' },
  { name: 'Bharani Karthick', position: 'AI Engineer', credentials: 'Neostats', image: 'BharaniKarthick.webp' },
  { name: 'Karthik', position: 'AI Engineer', credentials: 'Standard Chartered', image: 'Karthick.webp' },
  { name: 'Manav', position: 'Game Designer & Developer', credentials: 'SRM University', image: 'Manav.webp' },
  { name: 'Narendran', position: 'Game Designer & Developer', credentials: 'SRM University', image: 'Narendran.webp' }
];

const Slide03Team: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <section
      id="team"
      className={`relative w-full h-full bg-background flex flex-col 
        ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >

      {/* --- Background Elements --- */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000 pointer-events-none" />
      <FloatingBackground particleCount={20} boxCount={4} />

      {/* 
        --- Scrollable Container ---
        pt-[120px] ensures the grid starts below the Navbar.
        overflow-y-auto ensures the grid is scrollable on mobile.
      */}
      <div className="relative z-10 w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden
        pt-[110px] pb-[50px] px-[20px]
        lg:pt-[130px] lg:px-[60px] lg:pb-[60px]
      ">

        {/* Title */}
        <h2 className="
          relative z-20
          text-primary font-bold uppercase tracking-wider text-center
          text-[clamp(1.5rem,3vw,2.5rem)]
          mb-[clamp(2rem,4vh,4rem)]
          animate-text-bootstrap
        ">
          Founding Team
        </h2>

        {/* 
           --- Grid Container ---
           Mobile: 2 cols
           Tablet: 3 cols
           Desktop: 4 cols
           Centered with max-width constraint
        */}
        <div className="
          w-full max-w-[1400px]
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-x-[clamp(1rem,2vw,3rem)] gap-y-[clamp(1.5rem,3vh,3rem)]
          justify-items-center
        ">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              member={member}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

// --- Sub-Component: Individual Card ---
const TeamMemberCard = ({ member, index }: { member: TeamMember, index: number }) => {
  return (
    <div
      className="flex flex-col items-center gap-3 w-full max-w-[280px] group cursor-pointer transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2"
    >
      {/* Profile Circle with Gradient Border */}
      <div className="
        relative
        w-[clamp(120px,32vw,180px)] h-[clamp(120px,32vw,180px)]
        rounded-full p-1
        bg-gradient-to-br from-primary via-secondary to-accent
        transition-all duration-400 ease-out
        group-hover:scale-105 group-hover:shadow-[0_0_30px_8px_rgba(99,102,241,0.2)]
      ">
        <TeamMemberImage src={member.image} alt={member.name} />
      </div>

      {/* Text Info */}
      <div className="text-center flex flex-col gap-1 w-full px-1">

        {/* Name */}
        <h3
          className="font-bold text-foreground leading-tight animate-text-pulse text-[clamp(1rem,2.8vw,1.4rem)]"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {member.name}
        </h3>

        {/* Position */}
        <div
          className="font-semibold text-muted-foreground leading-tight animate-text-bootstrap text-[clamp(0.85rem,2.2vw,1rem)]"
          style={{ animationDelay: `${0.1 + (index * 0.2)}s` }}
        >
          {member.position}
        </div>

        {/* Credentials */}
        <div className="font-medium text-muted-foreground/70 leading-tight text-[clamp(0.75rem,2vw,0.9rem)]">
          {member.credentials}
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Image with Fallback ---
const TeamMemberImage = ({ src, alt }: { src: string, alt: string }) => {
  const [imgSrc, setImgSrc] = useState(`/photos_profile/${src}`);

  return (
    <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 150px, 200px"
        onError={() => setImgSrc('/meta human 2 light.webp')} // Fallback image
        draggable={false}
      />
    </div>
  );
};

export default Slide03Team;
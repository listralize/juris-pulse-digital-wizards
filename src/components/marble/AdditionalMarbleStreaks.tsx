
import React from 'react';

const AdditionalMarbleStreaks: React.FC = () => {
  return (
    <>
      {/* Lower left area veins */}
      <path 
        className="marble-streak"
        d="M100,500 C200,508 L300,520 C380,490 L450,480 C520,510 L600,520 C700,500 L800,490"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.7"
      />
      
      {/* Lower right area veins */}
      <path 
        className="marble-streak"
        d="M1000,450 C1100,458 L1200,470 C1280,440 L1350,430 C1450,450 L1600,460 C1700,440 L1800,430"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.65"
      />
      
      {/* Additional fine veins */}
      <path 
        className="marble-streak"
        d="M200,150 C220,200 L250,250 C220,310 L180,350"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.5"
      />
      
      <path 
        className="marble-streak"
        d="M1600,200 C1620,250 L1650,300 C1620,360 L1580,400"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.55"
      />
      
      {/* Thin horizontal veins */}
      <path 
        className="marble-streak"
        d="M300,370 C450,363 L700,360"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.45"
      />
      
      <path 
        className="marble-streak"
        d="M1100,380 C1250,373 L1500,370"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.5"
      />
      
      {/* New additional deformed veins */}
      <path 
        className="marble-streak"
        d="M100,200 C180,230 L250,190 C350,220 L420,180"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M1500,600 C1580,570 L1650,620 C1750,580 L1820,630"
        fill="none"
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.65"
      />
      
      <path 
        className="marble-streak"
        d="M300,700 C380,680 L450,720 C520,670 L600,730"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.7"
      />
      
      {/* Intersecting veins */}
      <path 
        className="marble-streak"
        d="M700,800 C780,750 L850,790 C920,730 L980,780"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.65"
      />
      
      <path 
        className="marble-streak"
        d="M1100,850 C1180,820 L1250,870 C1320,810 L1380,860"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.6"
      />
    </>
  );
};

export default AdditionalMarbleStreaks;

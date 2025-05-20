
import React from 'react';

const DetailedStreaks: React.FC = () => {
  return (
    <>
      {/* Additional detailed diagonal veins */}
      <path 
        className="marble-streak"
        d="M500,150 C540,220 L600,280 C580,330 L550,380 C590,430 L650,470"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M1050,150 C1090,220 L1150,280 C1130,330 L1100,380 C1140,430 L1200,470"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.55"
      />
      
      <path 
        className="marble-streak"
        d="M1350,100 C1330,170 L1300,230 C1340,280 L1380,320 C1350,390 L1330,450"
        fill="none"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        opacity="0.5"
      />
    </>
  );
};

export default DetailedStreaks;

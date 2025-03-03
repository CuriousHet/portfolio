"use client"
import React, { useState } from "react";
import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Vortex
        backgroundColor="black"
        className="flex items-center justify-center w-full h-full overflow-hidden"
      >
        <div className="text-center text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-300  hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 landing-font"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(!hovered)}
        >
          {hovered ? "Welcome to my space." : "Heyy, take a look around!"}
        </div>
      </Vortex>
    </div>
  );
}

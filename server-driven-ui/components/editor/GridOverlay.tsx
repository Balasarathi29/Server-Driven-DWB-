"use client";

import React from "react";

export const GridOverlay = ({
  size = 12,
  color = "rgba(15,23,42,0.04)",
}: {
  size?: number;
  color?: string;
}) => {
  const bg = `linear-gradient(0deg, transparent 23px, ${color} 24px), linear-gradient(90deg, transparent 23px, ${color} 24px)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        backgroundImage: bg,
        backgroundSize: `${size}px ${size}px, ${size}px ${size}px`,
        opacity: 1,
      }}
    />
  );
};

export default GridOverlay;

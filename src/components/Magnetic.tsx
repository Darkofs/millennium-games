"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = containerRef.current;
    if (!zone) return;

    const btn = zone.firstElementChild as HTMLElement | null;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const x = gsap.utils.mapRange(
        rect.left,
        rect.right,
        -rect.width / 2,
        rect.width / 2,
        e.clientX
      );
      const y = gsap.utils.mapRange(
        rect.top,
        rect.bottom,
        -rect.height / 2,
        rect.height / 2,
        e.clientY
      );

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    zone.addEventListener("mousemove", handleMouseMove);
    zone.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMouseMove);
      zone.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(btn);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}

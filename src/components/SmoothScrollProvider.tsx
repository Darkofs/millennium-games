"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with optimized settings for fast and buttery-smooth scrolls
    const lenis = new Lenis({
      duration: 0.9, // Scrolling animation duration (seconds). Slightly faster than default (1.2s) for responsive feel.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1.0, // Wheel sensitivity
      touchMultiplier: 2.0, // Touch sensitivity
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}

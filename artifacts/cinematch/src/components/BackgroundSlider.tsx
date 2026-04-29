import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUNDS = [
  `${import.meta.env.BASE_URL}images/scene-1.png`,
  `${import.meta.env.BASE_URL}images/scene-2.png`,
  `${import.meta.env.BASE_URL}images/scene-3.png`,
];

export function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={BACKGROUNDS[currentIndex]}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: "easeInOut" },
            scale: { duration: 7, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Vignette + dark overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background)/0.6)_60%,_hsl(var(--background))_100%)]" />
      {/* Subtle grid for cinematic feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(188 75% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(188 75% 55%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

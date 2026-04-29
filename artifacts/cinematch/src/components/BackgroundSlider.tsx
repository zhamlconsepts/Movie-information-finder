import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUNDS = [
  `${import.meta.env.BASE_URL}images/scene-1.png`,
  `${import.meta.env.BASE_URL}images/scene-2.png`,
  `${import.meta.env.BASE_URL}images/scene-3.png`,
  `${import.meta.env.BASE_URL}images/scene-4.png`,
  `${import.meta.env.BASE_URL}images/scene-5.png`,
  `${import.meta.env.BASE_URL}images/scene-6.png`,
];

export function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 8000); // 8 seconds per slide for slower crossfade
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A101C]">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={BACKGROUNDS[currentIndex]}
          alt="Cinematic background"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 3, ease: "easeInOut" },
            scale: { duration: 12, ease: "linear" } 
          }}
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
      </AnimatePresence>
      
      {/* Deep Navy Overlay & Vignette - softer for better scene visibility */}
      <div className="absolute inset-0 bg-[hsl(220,30%,8%)]/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(220,30%,8%,0.65)_100%)]" />
      
      {/* Film Grain Texture */}
      <div className="absolute inset-0 film-grain pointer-events-none" />
    </div>
  );
}

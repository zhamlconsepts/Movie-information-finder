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
    }, 6000); // 6 seconds per slide
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={BACKGROUNDS[currentIndex]}
          alt="Cinematic background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 2, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" } 
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Vignette / Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background/90" />
    </div>
  );
}

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";
import { BackgroundSlider } from "./BackgroundSlider";

export function Hero() {
  return (
    <section id="home" className="relative h-[85vh] min-h-[640px] max-h-[820px] flex items-center justify-center overflow-hidden">
      <BackgroundSlider />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-soft text-xs font-medium uppercase tracking-widest text-primary mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Sahna Aniqlash
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold tracking-tight text-foreground leading-[1.05] text-glow"
        >
          Rasm orqali <br />
          <span className="text-primary">kinoni toping</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Filmdan olingan istalgan kadrni yuklang — sun'iy intellekt
          kinoning nomi, yili, rejissyori va janri haqida toʻliq maʼlumot bersin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          <span>Quyidan rasm yuklang</span>
        </motion.div>
      </div>
    </section>
  );
}

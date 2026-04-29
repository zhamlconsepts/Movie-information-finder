import { motion } from "framer-motion";
import { Upload, Sparkles, Film } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Rasmni yuklang",
    desc: "Filmdan olingan istalgan kadr yoki skrinshot rasmni yuklang. JPG, PNG va WEBP formatlari qoʻllab-quvvatlanadi.",
  },
  {
    icon: Sparkles,
    title: "AI tahlil qiladi",
    desc: "Bizning AI tizimimiz rasmni tahlil qilib, vizual fingerprint orqali kinoni qidiradi.",
  },
  {
    icon: Film,
    title: "Natijani oling",
    desc: "Kino nomi, chiqqan yili, rejissyori va janri haqida toʻliq maʼlumot bir necha soniyada tayyor.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <SectionTitle title="Qanday ishlaydi?" subtitle="Uch oddiy qadamda kinoni aniqlang" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 md:p-7 group hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:cyan-glow transition-all">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-primary/70">0{i + 1}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="accent-bar" />
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      {subtitle && <p className="text-muted-foreground text-sm md:text-base ml-4">{subtitle}</p>}
    </div>
  );
}

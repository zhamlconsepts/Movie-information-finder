import { motion } from "framer-motion";

const STATS = [
  { value: "50K+", label: "Aniqlangan kinolar" },
  { value: "98%", label: "Aniqlik darajasi" },
  { value: "<3s", label: "Oʻrtacha vaqt" },
  { value: "120+", label: "Davlat kinolari" },
];

export function StatsBar() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1.5 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

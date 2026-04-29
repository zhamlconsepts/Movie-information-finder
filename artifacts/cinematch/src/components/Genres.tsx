import { motion } from "framer-motion";
import { Swords, Heart, Ghost, Rocket, Drama, Smile, Search, Music } from "lucide-react";
import { SectionTitle } from "./HowItWorks";

const GENRES = [
  { name: "Jangari", icon: Swords, count: "1.2k+", color: "from-red-500/20 to-orange-500/10" },
  { name: "Drama", icon: Drama, count: "2.8k+", color: "from-purple-500/20 to-indigo-500/10" },
  { name: "Romantik", icon: Heart, count: "950+", color: "from-pink-500/20 to-rose-500/10" },
  { name: "Qoʻrqinchli", icon: Ghost, count: "640+", color: "from-slate-500/20 to-zinc-500/10" },
  { name: "Fantastika", icon: Rocket, count: "1.1k+", color: "from-blue-500/20 to-cyan-500/10" },
  { name: "Komediya", icon: Smile, count: "1.5k+", color: "from-amber-500/20 to-yellow-500/10" },
  { name: "Detektiv", icon: Search, count: "780+", color: "from-emerald-500/20 to-teal-500/10" },
  { name: "Musiqiy", icon: Music, count: "320+", color: "from-violet-500/20 to-fuchsia-500/10" },
];

export function Genres() {
  return (
    <section id="genres" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <SectionTitle title="Janrlar" subtitle="Sevimli janringizdagi kinolarni toping" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {GENRES.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.button
              key={g.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-xl border border-border/60 hover:border-primary/40 p-5 text-left group transition-colors hover-elevate"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-50 group-hover:opacity-80 transition-opacity`} />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-background/60 backdrop-blur-md border border-border/60 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{g.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{g.count} kino</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { SectionTitle } from "./HowItWorks";

const FILMS = [
  { title: "Inception", year: 2010, director: "Christopher Nolan", genre: "Sci-Fi", rating: "8.8" },
  { title: "The Godfather", year: 1972, director: "Francis F. Coppola", genre: "Crime", rating: "9.2" },
  { title: "Interstellar", year: 2014, director: "Christopher Nolan", genre: "Sci-Fi", rating: "8.7" },
  { title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", genre: "Crime", rating: "8.9" },
  { title: "The Dark Knight", year: 2008, director: "Christopher Nolan", genre: "Action", rating: "9.0" },
  { title: "Parasite", year: 2019, director: "Bong Joon-ho", genre: "Thriller", rating: "8.5" },
  { title: "Forrest Gump", year: 1994, director: "Robert Zemeckis", genre: "Drama", rating: "8.8" },
  { title: "The Matrix", year: 1999, director: "The Wachowskis", genre: "Sci-Fi", rating: "8.7" },
];

const GRADIENT_PALETTE = [
  "from-indigo-500/30 via-purple-500/20 to-blue-700/30",
  "from-emerald-500/25 via-teal-500/20 to-cyan-700/30",
  "from-rose-500/25 via-pink-500/20 to-purple-700/30",
  "from-amber-500/25 via-orange-500/20 to-red-700/30",
  "from-blue-500/25 via-cyan-500/20 to-sky-700/30",
  "from-violet-500/25 via-fuchsia-500/20 to-purple-700/30",
  "from-lime-500/25 via-emerald-500/20 to-teal-700/30",
  "from-slate-500/25 via-zinc-500/20 to-gray-700/30",
];

export function PopularFilms() {
  return (
    <section id="popular" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <SectionTitle title="Mashhur Kinolar" subtitle="Eng koʻp tanib olinadigan kinolar" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {FILMS.map((film, i) => (
          <motion.div
            key={film.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-border/60 group-hover:border-primary/40 transition-all duration-300">
              {/* Gradient poster placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_PALETTE[i % GRADIENT_PALETTE.length]}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

              {/* Title overlay center */}
              <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                <span className="font-display font-bold text-lg md:text-xl text-white/95 leading-tight drop-shadow-lg">
                  {film.title}
                </span>
              </div>

              {/* Bottom badge */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 h-6 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300">
                <Star className="w-3 h-3 fill-amber-300" />
                {film.rating}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-xs text-white/70 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {film.year} • {film.genre}
                </p>
                <p className="text-xs text-white/90 font-medium truncate">{film.director}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

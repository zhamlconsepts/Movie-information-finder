import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { SectionTitle } from "./HowItWorks";

const BASE = import.meta.env.BASE_URL;

const FILMS = [
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    rating: "8.8",
    poster: `${BASE}posters/inception.jpg`,
  },
  {
    title: "The Godfather",
    year: 1972,
    director: "Francis F. Coppola",
    genre: "Crime",
    rating: "9.2",
    poster: `${BASE}posters/godfather.jpg`,
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    rating: "8.7",
    poster: `${BASE}posters/interstellar.jpg`,
  },
  {
    title: "Stranger Things",
    year: 2016,
    director: "The Duffer Brothers",
    genre: "Sci-Fi / Horror",
    rating: "8.7",
    poster: `${BASE}posters/stranger-things.jpg`,
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: "Crime",
    rating: "8.9",
    poster: `${BASE}posters/pulp-fiction.jpg`,
  },
  {
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    genre: "Action",
    rating: "9.0",
    poster: `${BASE}posters/dark-knight.jpg`,
  },
  {
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    genre: "Thriller",
    rating: "8.5",
    poster: `${BASE}posters/parasite.jpg`,
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "The Wachowskis",
    genre: "Sci-Fi",
    rating: "8.7",
    poster: `${BASE}posters/matrix.webp`,
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: "Drama",
    rating: "8.8",
    poster: `${BASE}posters/forrest-gump.jpg`,
  },
];

export function PopularFilms() {
  return (
    <section id="popular" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <SectionTitle title="Mashhur Kinolar" subtitle="Eng koʻp tanib olinadigan kinolar va seriallar" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
        {FILMS.map((film, i) => (
          <motion.div
            key={film.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-border/60 group-hover:border-primary/50 transition-all duration-300 bg-secondary/40 group-hover:cyan-glow">
              {/* Real poster */}
              <img
                src={film.poster}
                alt={`${film.title} poster`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Top rating badge */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 h-6 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300 z-10">
                <Star className="w-3 h-3 fill-amber-300" />
                {film.rating}
              </div>

              {/* Bottom gradient + info */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                <h3 className="font-display font-semibold text-white text-sm md:text-base leading-tight line-clamp-1">
                  {film.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {film.year}
                  <span className="opacity-50">•</span>
                  <span className="truncate">{film.genre}</span>
                </p>
              </div>

              {/* Hover overlay with director */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pb-16">
                <p className="text-xs text-white font-medium truncate">
                  Rejissyor: {film.director}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

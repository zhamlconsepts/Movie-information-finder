import { motion } from "framer-motion";
import { Star, TrendingUp, Calendar } from "lucide-react";
import { SectionTitle } from "./HowItWorks";

const BASE = import.meta.env.BASE_URL;

const FILMS = [
  {
    title: "Breaking Bad",
    year: 2008,
    director: "Vince Gilligan",
    genre: "Crime / Drama",
    rating: "9.5",
    poster: `${BASE}posters/breaking-bad.jpg`,
  },
  {
    title: "The Lord of the Rings",
    year: 2001,
    director: "Peter Jackson",
    genre: "Fantasy",
    rating: "8.9",
    poster: `${BASE}posters/lotr-fellowship.webp`,
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    director: "Anthony & Joe Russo",
    genre: "Action",
    rating: "8.4",
    poster: `${BASE}posters/avengers-endgame.webp`,
  },
  {
    title: "Joker",
    year: 2019,
    director: "Todd Phillips",
    genre: "Drama / Thriller",
    rating: "8.4",
    poster: `${BASE}posters/joker.jpg`,
  },
  {
    title: "Spirited Away",
    year: 2001,
    director: "Hayao Miyazaki",
    genre: "Animation",
    rating: "8.6",
    poster: `${BASE}posters/spirited-away.webp`,
  },
  {
    title: "Fight Club",
    year: 1999,
    director: "David Fincher",
    genre: "Drama",
    rating: "8.8",
    poster: `${BASE}posters/fight-club.webp`,
  },
  {
    title: "Titanic",
    year: 1997,
    director: "James Cameron",
    genre: "Romance / Drama",
    rating: "7.9",
    poster: `${BASE}posters/titanic.jpg`,
  },
  {
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    genre: "Biography",
    rating: "8.3",
    poster: `${BASE}posters/oppenheimer.jpg`,
  },
  {
    title: "Gladiator",
    year: 2000,
    director: "Ridley Scott",
    genre: "Action / Drama",
    rating: "8.5",
    poster: `${BASE}posters/gladiator.jpg`,
  },
  {
    title: "La La Land",
    year: 2016,
    director: "Damien Chazelle",
    genre: "Romance / Musical",
    rating: "8.0",
    poster: `${BASE}posters/la-la-land.webp`,
  },
];

export function RecommendedFilms() {
  return (
    <section id="recommended" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SectionTitle title="Tavsiya etilgan kinolar" subtitle="Sizga yoqishi mumkin boʻlgan eng yaxshi kinolar" />
        <div className="flex items-center gap-2 px-3 h-9 rounded-lg glass-panel-soft text-xs font-medium text-primary">
          <TrendingUp className="w-4 h-4" />
          Trendda
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
        {FILMS.map((film, i) => (
          <motion.div
            key={film.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-border/60 group-hover:border-primary/50 transition-all duration-300 bg-secondary/40 group-hover:cyan-glow">
              <img
                src={film.poster}
                alt={`${film.title} poster`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 h-6 rounded-md bg-primary/90 backdrop-blur-md text-xs font-bold text-primary-foreground z-10">
                #{i + 1}
              </div>

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 h-6 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300 z-10">
                <Star className="w-3 h-3 fill-amber-300" />
                {film.rating}
              </div>

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

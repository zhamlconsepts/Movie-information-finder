import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Film, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Qanday ishlaydi", href: "#how" },
  { label: "Mashhur kinolar", href: "#popular" },
  { label: "Tavsiyalar", href: "#recommended" },
  { label: "Janrlar", href: "#genres" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center cyan-glow">
            <Film className="w-5 h-5 text-primary" strokeWidth={2.2} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-foreground">CINE</span>
            <span className="text-primary">MATCH</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover-elevate"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Qidirish"
            className="hidden sm:flex w-10 h-10 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover-elevate transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden sm:inline-flex items-center px-4 h-10 rounded-lg border border-primary/50 text-primary font-medium text-sm hover:bg-primary/10 hover:border-primary transition-all">
            Kirish
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-foreground hover-elevate"
            aria-label="Menyu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover-elevate"
              >
                {link.label}
              </a>
            ))}
            <button className="mt-2 inline-flex items-center justify-center px-4 h-10 rounded-lg border border-primary/50 text-primary font-medium text-sm hover:bg-primary/10">
              Kirish
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

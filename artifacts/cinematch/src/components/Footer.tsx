import { Film, Send, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-border/60 bg-background/60 backdrop-blur-xl mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Film className="w-5 h-5 text-primary" strokeWidth={2.2} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="text-foreground">CINE</span>
              <span className="text-primary">MATCH</span>
            </span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {year} CineMatch. Barcha huquqlar himoyalangan.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-1">
            <SocialLink href="#" label="Telegram" icon={<Send className="w-4 h-4" />} />
            <SocialLink href="#" label="Instagram" icon={<Instagram className="w-4 h-4" />} />
            <SocialLink href="#" label="YouTube" icon={<Youtube className="w-4 h-4" />} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover-elevate transition-colors"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

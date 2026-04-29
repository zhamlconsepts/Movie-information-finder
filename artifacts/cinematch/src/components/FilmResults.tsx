import { motion } from "framer-motion";
import { FilmInfo } from "@workspace/api-client-react";
import { RefreshCcw, XCircle, Search } from "lucide-react";
import { Button } from "./ui/button";

interface FilmResultsProps {
  data: FilmInfo;
  onReset: () => void;
  imageUrl: string | null;
}

export function FilmResults({ data, onReset, imageUrl }: FilmResultsProps) {
  if (!data.found) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto p-12 glass-panel rounded-3xl text-center space-y-8"
      >
        <div className="w-24 h-24 mx-auto bg-destructive/10 rounded-full flex items-center justify-center border border-destructive/20">
          <XCircle className="w-12 h-12 text-destructive" strokeWidth={1} />
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-display font-medium tracking-tight">Frame Not Found</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto font-light leading-relaxed">
            The archive holds no record of this scene. Ensure the image is clear and belongs to a feature film.
          </p>
        </div>
        <Button onClick={onReset} variant="outline" size="lg" className="rounded-full px-8 gap-3 border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all">
          <Search className="w-4 h-4" /> Search Again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="w-full max-w-5xl mx-auto glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-white/10 relative"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      {/* Left side - Uploaded Image Preview */}
      <div className="w-full md:w-2/5 relative min-h-[400px] bg-black">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Analyzed scene" 
            className="absolute inset-0 w-full h-full object-cover opacity-70 sepia-[0.2]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-background" />
        
        <div className="absolute bottom-8 left-8 right-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs tracking-widest uppercase font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {data.confidence ? `${data.confidence} Match` : 'High Match'}
          </div>
        </div>
      </div>

      {/* Right side - Movie Info */}
      <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col bg-background/50">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-display italic font-medium text-foreground tracking-tight leading-none text-glow">
              {data.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm tracking-widest uppercase font-medium text-muted-foreground/80">
              {data.year && (
                <span>{data.year}</span>
              )}
              {(data.year && data.director) && <span className="text-white/20">•</span>}
              {data.director && (
                <span className="text-foreground/90">DIR. {data.director}</span>
              )}
              {((data.year || data.director) && data.genre) && <span className="text-white/20">•</span>}
              {data.genre && (
                <span>{data.genre}</span>
              )}
            </div>
          </div>

          {data.description && (
            <div className="space-y-3 relative">
              <div className="w-8 h-px bg-primary/40 mb-4" />
              <p className="text-foreground/80 leading-relaxed font-light text-lg">
                {data.description}
              </p>
            </div>
          )}

          {data.sceneDescription && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
              <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Scene Context</h4>
              <p className="text-muted-foreground leading-relaxed italic font-display text-lg">
                "{data.sceneDescription}"
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
          <Button onClick={onReset} variant="ghost" className="gap-2 rounded-full px-6 hover:bg-white/5 hover:text-primary transition-colors text-muted-foreground">
            <RefreshCcw className="w-4 h-4" /> Scan Another Frame
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

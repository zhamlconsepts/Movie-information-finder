import { motion } from "framer-motion";
import { FilmInfo } from "@workspace/api-client-react";
import { Calendar, Clapperboard, Tag, Eye, RefreshCw, XCircle } from "lucide-react";
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
        className="w-full max-w-2xl mx-auto mt-8 p-10 glass-panel rounded-3xl text-center space-y-6"
      >
        <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center border border-destructive/20">
          <XCircle className="w-10 h-10 text-destructive" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground tracking-tight mb-2">Scene Not Recognized</h2>
          <p className="text-muted-foreground text-lg">We searched the archives but couldn't identify this specific frame. It might be too obscure, cropped, or not from a feature film.</p>
        </div>
        <Button onClick={onReset} variant="outline" size="lg" className="mt-4 gap-2">
          <RefreshCw className="w-5 h-5" /> Try Another Image
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-w-4xl mx-auto mt-8 glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row"
    >
      {/* Left side - Uploaded Image Preview */}
      <div className="w-full md:w-2/5 relative min-h-[300px] bg-black/50 border-r border-white/5">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Analyzed scene" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card/40" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90">
            <Eye className="w-3.5 h-3.5 text-primary" />
            {data.confidence ? `${data.confidence} Match` : 'High Match'}
          </div>
        </div>
      </div>

      {/* Right side - Movie Info */}
      <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white text-glow tracking-tight mb-2">
              {data.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
              {data.year && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" /> {data.year}
                </span>
              )}
              {data.director && (
                <span className="flex items-center gap-1.5">
                  <Clapperboard className="w-4 h-4 text-primary" /> {data.director}
                </span>
              )}
              {data.genre && (
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-primary" /> {data.genre}
                </span>
              )}
            </div>
          </div>

          {data.description && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Synopsis</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {data.description}
              </p>
            </div>
          )}

          {data.sceneDescription && (
            <div className="space-y-2 p-4 rounded-2xl bg-secondary/30 border border-white/5">
              <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Scene Context</h4>
              <p className="text-muted-foreground leading-relaxed text-sm italic">
                "{data.sceneDescription}"
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <Button onClick={onReset} variant="secondary" className="gap-2 rounded-xl">
            <RefreshCw className="w-4 h-4" /> Scan Another
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

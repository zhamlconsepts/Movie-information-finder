import { motion } from "framer-motion";
import { FilmInfo } from "@workspace/api-client-react";
import { Calendar, Clapperboard, Tag, Eye, RefreshCw, Sparkles, Search, Lightbulb, Image as ImageIcon, Film } from "lucide-react";
import { Button } from "./ui/button";

interface FilmResultsProps {
  data: FilmInfo;
  onReset: () => void;
  imageUrl: string | null;
}

const TIPS = [
  {
    icon: Film,
    title: "Aniq kino kadri",
    text: "Rasmda aktyor yuzi yoki tanish sahna koʻrinib tursin",
  },
  {
    icon: ImageIcon,
    title: "Yuqori sifatli rasm",
    text: "Xira yoki juda kichik rasmlardan saqlaning",
  },
  {
    icon: Sparkles,
    title: "Mashhur sahna",
    text: "Kinoning xarakterli sahnalari yaxshiroq aniqlanadi",
  },
];

export function FilmResults({ data, onReset, imageUrl }: FilmResultsProps) {
  if (!data.found) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mx-auto p-8 sm:p-10 glass-panel rounded-3xl"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {imageUrl && (
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-border/60 bg-black/40">
              <img src={imageUrl} alt="Yuklangan rasm" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 text-[10px] font-medium text-white/90 uppercase tracking-wider">
                <Eye className="w-3 h-3" /> Tahlil qilindi
              </div>
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold text-primary">
              <Search className="w-3.5 h-3.5" /> Mos keladigan kino topilmadi
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
              Bu kadr aniqlanmadi
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {data.sceneDescription ||
                "AI bu rasmdan kinoni aniqlay olmadi. Rasm kino kadriga oʻxshamasligi yoki juda noaniq boʻlishi mumkin."}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">
            <Lightbulb className="w-4 h-4 text-primary" />
            Yaxshiroq natija uchun maslahatlar
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIPS.map((tip) => (
              <div
                key={tip.title}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50"
              >
                <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                  <tip.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground">{tip.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug mt-0.5">{tip.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onReset} size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            <RefreshCw className="w-5 h-5" /> Yana urinib koʻring
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="w-full max-w-5xl mx-auto glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row"
    >
      {/* Image preview */}
      <div className="w-full md:w-2/5 relative min-h-[280px] md:min-h-[440px] bg-black/60 border-b md:border-b-0 md:border-r border-border/60">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Tahlil qilingan sahna"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card/40" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 backdrop-blur-md border border-primary/40 text-xs font-semibold text-primary">
            <Eye className="w-3.5 h-3.5" />
            {confidenceLabel(data.confidence)}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white/85">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            AI tahlili
          </div>
        </div>
      </div>

      {/* Film info */}
      <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col">
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">Kino aniqlandi</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-glow tracking-tight mb-3">
              {data.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
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
              <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Kino haqida
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {data.description}
              </p>
            </div>
          )}

          {data.sceneDescription && (
            <div className="space-y-2 p-4 rounded-2xl bg-secondary/40 border border-border/60">
              <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Sahna konteksti
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm italic">
                "{data.sceneDescription}"
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 flex justify-end">
          <Button onClick={onReset} variant="secondary" className="gap-2 rounded-xl">
            <RefreshCw className="w-4 h-4" /> Yana skanerlash
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function confidenceLabel(confidence: string | null | undefined) {
  if (!confidence) return "Yuqori moslik";
  const v = confidence.toLowerCase();
  if (v.includes("high")) return "Yuqori moslik";
  if (v.includes("medium")) return "Oʻrtacha moslik";
  if (v.includes("low")) return "Past moslik";
  return confidence;
}

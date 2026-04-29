import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Film, UploadCloud, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function DropzoneArea({ onFileSelect, isProcessing }: DropzoneAreaProps) {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && !isProcessing) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, isProcessing]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
    disabled: isProcessing,
  });

  return (
    <div
      className="w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative group overflow-hidden rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-500 glass-panel",
          "hover:border-primary/40",
          isDragActive && "border-primary/70 cyan-glow",
          isDragReject && "border-destructive/60",
          isProcessing && "opacity-90 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} />

        {/* Hover glow */}
        <div
          className={cn(
            "absolute -inset-1/2 opacity-0 blur-3xl transition-opacity duration-700 pointer-events-none",
            "bg-[conic-gradient(from_0deg,hsl(188_75%_55%/0.25),transparent,hsl(188_75%_55%/0.25))]",
            (isHovered || isDragActive) && "opacity-100 animate-[spin_8s_linear_infinite]"
          )}
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <AnimateIcon isProcessing={isProcessing} isDragActive={isDragActive} />

          <div className="space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {isProcessing
                ? "Sahna tahlil qilinmoqda..."
                : isDragActive
                ? "Rasmni shu yerga tashlang"
                : "Filmdan kadr yuklang"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm md:text-base">
              {isProcessing
                ? "Sun'iy intellekt rasmning vizual fingerprint'ini skanerlamoqda..."
                : "Skrinshotni shu yerga sudrang yoki bosib yuklang. AI kinoni daqiqada aniqlaydi."}
            </p>
          </div>

          {!isProcessing && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5 px-2.5 h-7 rounded-full glass-panel-soft">
                <ImageIcon className="w-3.5 h-3.5" /> JPG
              </span>
              <span className="flex items-center gap-1.5 px-2.5 h-7 rounded-full glass-panel-soft">
                <Film className="w-3.5 h-3.5" /> PNG
              </span>
              <span className="flex items-center gap-1.5 px-2.5 h-7 rounded-full glass-panel-soft">
                <ImageIcon className="w-3.5 h-3.5" /> WEBP
              </span>
              <span className="flex items-center gap-1.5 px-2.5 h-7 rounded-full glass-panel-soft text-primary">
                <Sparkles className="w-3.5 h-3.5" /> AI bilan ishonchli
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnimateIcon({
  isProcessing,
  isDragActive,
}: {
  isProcessing: boolean;
  isDragActive: boolean;
}) {
  if (isProcessing) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center border border-primary/40 cyan-glow pulse-ring"
      >
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ y: isDragActive ? -8 : 0, scale: isDragActive ? 1.1 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 border",
        isDragActive
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-secondary text-foreground/80 border-border/60 group-hover:bg-primary/15 group-hover:text-primary group-hover:border-primary/40"
      )}
    >
      <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
    </motion.div>
  );
}

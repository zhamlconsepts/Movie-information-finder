import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Loader2, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function DropzoneArea({ onFileSelect, isProcessing }: DropzoneAreaProps) {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !isProcessing) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect, isProcessing]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: isProcessing
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
          "relative group overflow-hidden rounded-[2rem] p-16 text-center cursor-pointer transition-all duration-700 ease-out",
          "glass-panel hover:bg-card/80 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
          isDragActive && "border-primary/40 bg-primary/5 shadow-[0_0_50px_rgba(218,165,32,0.15)]",
          isDragReject && "border-destructive/40 bg-destructive/5",
          isProcessing && "opacity-60 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent",
            (isHovered || isDragActive) && "opacity-100"
          )}
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-8">
          <AnimateIcon isProcessing={isProcessing} isDragActive={isDragActive} />
          
          <div className="space-y-4">
            <h3 className="font-display text-3xl font-medium tracking-wide text-foreground">
              {isProcessing ? "Analyzing Scene..." : 
               isDragActive ? "Release to Scan" : 
               "Upload a Cinematic Frame"}
            </h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed font-light">
              {isProcessing 
                ? "Searching our global database of classic and modern cinema..." 
                : "Drag & drop a screenshot, or click to browse. We'll identify the film, director, and context."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimateIcon({ isProcessing, isDragActive }: { isProcessing: boolean, isDragActive: boolean }) {
  if (isProcessing) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(218,165,32,0.1)]"
      >
        <Loader2 className="w-12 h-12 text-primary animate-spin" strokeWidth={1} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ 
        y: isDragActive ? -10 : 0,
        scale: isDragActive ? 1.05 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
        isDragActive ? "bg-primary text-primary-foreground shadow-[0_0_40px_rgba(218,165,32,0.3)]" : "bg-white/5 text-muted-foreground border border-white/10 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-primary/5"
      )}
    >
      <ImagePlus className="w-10 h-10" strokeWidth={1} />
    </motion.div>
  );
}

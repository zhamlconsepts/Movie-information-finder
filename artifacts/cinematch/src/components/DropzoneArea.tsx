import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Film, UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
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
      className="w-full max-w-2xl mx-auto mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative group overflow-hidden rounded-3xl p-12 text-center cursor-pointer transition-all duration-500",
          "glass-panel hover:bg-card/60",
          isDragActive && "border-primary/50 bg-primary/10 shadow-[0_0_40px_rgba(59,130,246,0.2)]",
          isDragReject && "border-destructive/50 bg-destructive/10",
          isProcessing && "opacity-75 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Animated background glow on hover */}
        <div 
          className={cn(
            "absolute -inset-full opacity-0 blur-3xl transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20",
            (isHovered || isDragActive) && "opacity-100",
            "animate-[spin_10s_linear_infinite]"
          )}
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <AnimateIcon isProcessing={isProcessing} isDragActive={isDragActive} />
          
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {isProcessing ? "Analyzing Scene..." : 
               isDragActive ? "Drop Scene Here" : 
               "Upload a Movie Scene"}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {isProcessing 
                ? "Our cinematic engine is scanning the visual fingerprint..." 
                : "Drag & drop a screenshot, or click to browse. We'll identify the film, year, and director."}
            </p>
          </div>

          {!isProcessing && (
            <div className="flex gap-4 mt-4 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> JPG</span>
              <span className="flex items-center gap-1.5"><Film className="w-4 h-4" /> PNG</span>
              <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> WEBP</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnimateIcon({ isProcessing, isDragActive }: { isProcessing: boolean, isDragActive: boolean }) {
  if (isProcessing) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
      >
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ 
        y: isDragActive ? -10 : 0,
        scale: isDragActive ? 1.1 : 1
      }}
      className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300",
        isDragActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground group-hover:bg-primary/20 group-hover:text-primary"
      )}
    >
      <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
    </motion.div>
  );
}

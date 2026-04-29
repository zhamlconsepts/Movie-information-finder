import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIdentifyFilmScene } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { fileToBase64 } from "@/lib/utils";

import { BackgroundSlider } from "@/components/BackgroundSlider";
import { DropzoneArea } from "@/components/DropzoneArea";
import { FilmResults } from "@/components/FilmResults";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { mutate, data: filmData, isPending, reset } = useIdentifyFilmScene({
    mutation: {
      onError: (error) => {
        toast({
          title: "Analysis Failed",
          description: error.error?.error || "We couldn't process the image. Please try another.",
          variant: "destructive",
        });
        setSelectedImage(null);
      }
    }
  });

  const handleFileSelect = async (file: File) => {
    try {
      // Create local preview URL
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);

      // Convert to base64 for API
      const base64 = await fileToBase64(file);
      
      mutate({
        data: {
          imageBase64: base64,
          mimeType: file.type
        }
      });
    } catch (err) {
      toast({
        title: "Error processing file",
        description: "Please ensure you selected a valid image.",
        variant: "destructive"
      });
      setSelectedImage(null);
    }
  };

  const handleReset = () => {
    reset();
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col text-foreground selection:bg-primary/30">
      <BackgroundSlider />
      
      <main className="relative z-10 flex-1 flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-widest text-primary mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI Scene Recognition
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter text-white text-glow">
            CineMatch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload any movie frame, and our cinematic engine will instantly identify the film, director, and context.
          </p>
        </motion.div>

        {/* Content Area */}
        <div className="w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {!filmData ? (
              <motion.div
                key="uploader"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <DropzoneArea 
                  onFileSelect={handleFileSelect} 
                  isProcessing={isPending} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <FilmResults 
                  data={filmData} 
                  onReset={handleReset}
                  imageUrl={selectedImage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground/60">
        <p>Powered by Advanced Vision AI &bull; Cinematic dark theme</p>
      </footer>
    </div>
  );
}

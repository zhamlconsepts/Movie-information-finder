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
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);

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
    <div className="min-h-screen w-full relative flex flex-col text-foreground selection:bg-primary/30 font-sans">
      <BackgroundSlider />
      
      <main className="relative z-10 flex-1 flex flex-col items-center pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!filmData && (
            <motion.div 
              key="header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto space-y-6 mb-16"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-display italic font-medium tracking-tight text-foreground text-glow drop-shadow-2xl">
                CineMatch
              </h1>
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl text-primary font-display tracking-wide uppercase">
                  Discover the film behind every frame
                </p>
                <p className="text-sm sm:text-base text-muted-foreground/80 tracking-widest uppercase">
                  Filmlarni rasm orqali toping
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {!filmData ? (
              <motion.div
                key="uploader"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
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
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
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

      <footer className="relative z-10 py-8 text-center text-xs tracking-widest uppercase text-muted-foreground/40 font-medium">
        <p>A Premium Cinematic Database Tool</p>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIdentifyFilmScene } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { fileToBase64, extractVideoFrame } from "@/lib/utils";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { DropzoneArea } from "@/components/DropzoneArea";
import { FilmResults } from "@/components/FilmResults";
import { HowItWorks, SectionTitle } from "@/components/HowItWorks";
import { PopularFilms } from "@/components/PopularFilms";
import { RecommendedFilms } from "@/components/RecommendedFilms";
import { Genres } from "@/components/Genres";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const { toast } = useToast();

  const { mutate, data: filmData, isPending, reset } = useIdentifyFilmScene({
    mutation: {
      onError: (error) => {
        toast({
          title: "Tahlil xatosi",
          description:
            error.error?.error ||
            "Faylni qayta ishlab boʻlmadi. Iltimos, boshqa fayl sinab koʻring.",
          variant: "destructive",
        });
        setSelectedImage(null);
      },
    },
  });

  const handleFileSelect = async (file: File) => {
    try {
      setIsPreparing(true);

      let base64: string;
      let mimeType: string;
      let previewUrl: string;

      if (file.type.startsWith("video/")) {
        toast({
          title: "Videodan kadr olinmoqda...",
          description: "Iltimos, biroz kuting.",
        });
        const frame = await extractVideoFrame(file);
        previewUrl = frame.dataUrl;
        base64 = await fileToBase64(frame.blob);
        mimeType = "image/jpeg";
      } else {
        previewUrl = URL.createObjectURL(file);
        base64 = await fileToBase64(file);
        mimeType = file.type || "image/jpeg";
      }

      setSelectedImage(previewUrl);
      mutate({ data: { imageBase64: base64, mimeType } });
    } catch (err) {
      toast({
        title: "Faylda xatolik",
        description:
          (err as Error)?.message ||
          "Iltimos, toʻgʻri rasm yoki video tanlanganligiga ishonch hosil qiling.",
        variant: "destructive",
      });
      setSelectedImage(null);
    } finally {
      setIsPreparing(false);
    }
  };

  const handleReset = () => {
    reset();
    if (selectedImage && selectedImage.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
  };

  const isBusy = isPending || isPreparing;

  return (
    <div className="min-h-screen w-full flex flex-col text-foreground selection:bg-primary/30">
      <Navbar />

      <main className="flex-1">
        {/* Hero with cycling movie scenes */}
        <Hero />

        {/* Upload section — center stage */}
        <section
          id="upload"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 pb-12"
        >
          <AnimatePresence mode="wait">
            {!filmData ? (
              <motion.div
                key="uploader"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
              >
                <DropzoneArea onFileSelect={handleFileSelect} isProcessing={isBusy} />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <FilmResults data={filmData} onReset={handleReset} imageUrl={selectedImage} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Stats */}
        <StatsBar />

        {/* How it works */}
        <HowItWorks />

        {/* Popular films */}
        <PopularFilms />

        {/* Recommended films */}
        <RecommendedFilms />

        {/* Genres */}
        <Genres />

        {/* CTA banner */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="relative overflow-hidden rounded-3xl glass-panel p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <SectionTitle title="Kinoning nomini eslay olmayapsizmi?" />
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Filmdan birgina kadr yetarli — sun'iy intellekt qolganini hal qiladi.
              </p>
              <a
                href="#upload"
                className="mt-6 inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors cyan-glow"
              >
                Hoziroq sinab koʻring
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

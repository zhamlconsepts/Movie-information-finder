import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Extract a representative frame from a video file as a JPEG blob.
 * Captures around 25% of the video's duration to skip intros / black frames.
 */
export function extractVideoFrame(
  file: File,
  options: { quality?: number; maxDimension?: number } = {}
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  const { quality = 0.85, maxDimension = 1280 } = options;

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    let resolved = false;
    const cleanup = () => {
      URL.revokeObjectURL(url);
      video.remove();
    };

    const fail = (msg: string) => {
      if (resolved) return;
      resolved = true;
      cleanup();
      reject(new Error(msg));
    };

    video.onerror = () => fail("Videoni oʻqib boʻlmadi");

    video.onloadedmetadata = () => {
      const target = isFinite(video.duration) && video.duration > 0
        ? Math.min(video.duration * 0.25, Math.max(0.1, video.duration - 0.1))
        : 0.5;
      try {
        video.currentTime = target;
      } catch {
        fail("Video kadrini olib boʻlmadi");
      }
    };

    video.onseeked = () => {
      try {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        if (!vw || !vh) {
          fail("Video oʻlchamlarini aniqlab boʻlmadi");
          return;
        }

        const scale = Math.min(1, maxDimension / Math.max(vw, vh));
        const w = Math.round(vw * scale);
        const h = Math.round(vh * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          fail("Canvas konteksti yaratilmadi");
          return;
        }
        ctx.drawImage(video, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              fail("Kadr rasmga aylantirib boʻlmadi");
              return;
            }
            if (resolved) return;
            resolved = true;
            cleanup();
            resolve({ blob, dataUrl, width: w, height: h });
          },
          "image/jpeg",
          quality
        );
      } catch (e) {
        fail((e as Error).message || "Video tahlili xatosi");
      }
    };

    video.src = url;
    video.load();
  });
}

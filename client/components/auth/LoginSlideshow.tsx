import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}

export default function LoginSlideshow({ images, intervalMs = 4000 }: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  useEffect(() => {
    // Preload images
    safeImages.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
  }, [safeImages]);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % safeImages.length), intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [safeImages.length, intervalMs]);

  if (!safeImages.length) return null;

  return (
    <div className="absolute inset-0">
      {safeImages.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      {/* Brand gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-secondary/60" />
    </div>
  );
}

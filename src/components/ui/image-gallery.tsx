"use client";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  title?: string;
  subtitle?: string;
}

export function ImageGallery({ images, title, subtitle }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full flex flex-col items-center justify-start py-16">
      {(title || subtitle) && (
        <div className="max-w-3xl text-center px-4 mb-10">
          {title && <h2 className="font-display text-3xl md:text-4xl font-light">{title}</h2>}
          {subtitle && <p className="text-sm text-[var(--siliq-accent)] mt-3">{subtitle}</p>}
        </div>
      )}
      {/* Desktop: all images, hover to expand */}
      <div className="hidden md:flex items-center gap-2 h-[400px] w-full max-w-6xl px-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
            <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
          </div>
        ))}
      </div>
      {/* Mobile: 5 images, tap to expand */}
      <div className="flex md:hidden items-center gap-1.5 h-[300px] w-full px-3">
        {images.slice(0, 5).map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            className="relative rounded-lg overflow-hidden h-[300px] transition-all duration-500 cursor-pointer"
            style={{ flexGrow: activeIndex === idx ? 4 : 1, flexBasis: 0 }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
          </div>
        ))}
      </div>
    </section>
  );
}

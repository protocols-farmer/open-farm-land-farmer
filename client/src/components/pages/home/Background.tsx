"use client";
//src/components/pages/home/Background.tsx
import Image from "next/image";
import { useState } from "react";

export default function Background() {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageUrl =
    "https://res.cloudinary.com/dhr9zmb3i/image/upload/f_auto,q_auto/v1773425904/background-image_kk1xci.png";

  const rgbDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+v//fwAJigPNkO3zwwAAAABJRU5ErkJggg==";

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-background">
      {/* Texture Layer 1 */}
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] mix-blend-multiply" />

      {/* Main Background Image */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12] sepia-[0.4] contrast-[1.4] dark:contrast-[1.2]">
        <Image
          src={imageUrl}
          alt="Open Farm Land Background"
          fill
          priority
          sizes="100vw"
          quality={100}
          placeholder="blur"
          blurDataURL={rgbDataURL}
          className={`object-cover object-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => console.error("Background image failed to load", e)}
        />
      </div>

      {/* Texture Layer 2 */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}

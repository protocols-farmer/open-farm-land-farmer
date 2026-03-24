// src/components/pages/home/Background.tsx
export default function Background() {
  const imageUrl =
    "https://res.cloudinary.com/dhr9zmb3i/image/upload/v1773425904/background-image_kk1xci.png";

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-background">
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] mix-blend-multiply" />

      <div
        className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.12]  sepia-[0.4] contrast-[1.4] dark:contrast-[1.2]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}

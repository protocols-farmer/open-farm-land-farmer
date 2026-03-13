// src/components/pages/home/Background.tsx
export default function Background() {
  const imageUrl =
    "https://res.cloudinary.com/dhr9zmb3i/image/upload/v1773425904/background-image_kk1xci.png";

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-background">
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] mix-blend-multiply" />

      <div
        className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.12] grayscale sepia-[0.4] contrast-[1.4] dark:contrast-[1.2]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-20 dark:opacity-30"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/20"
            />
          </pattern>
        </defs>

        <rect width="1440" height="600" fill="url(#grid)" />

        <g className="fill-primary/40 animate-in fade-in duration-1000 delay-500">
          <circle cx="720" cy="520" r="4" />
          <path
            d="M720 522 Q715 530, 715 540 L710 550"
            strokeWidth="5"
            className="stroke-primary/40 fill-none"
          />
          <path
            d="M718 535 L722 550"
            strokeWidth="4"
            className="stroke-primary/40 fill-none"
          />
          <path
            d="M718 528 L705 536"
            strokeWidth="3"
            className="stroke-primary/40 fill-none"
          />
          <path
            d="M700 528 L710 545"
            strokeWidth="1.5"
            className="stroke-primary/40 fill-none"
          />
          <path
            d="M708 543 L712 547"
            strokeWidth="3"
            className="stroke-primary/40 fill-none"
          />
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}

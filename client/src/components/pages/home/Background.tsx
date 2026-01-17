// src/components/pages/home/Background.tsx
export default function Background() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Sun / Glow */}
        <circle cx="80%" cy="20%" r="200" className="fill-primary/10" />

        {/* Far Mountains */}
        <path
          d="M0 400 L300 250 L600 400 L900 200 L1440 450 V600 H0 Z"
          className="fill-muted/20"
        />

        {/* Mid Mountains */}
        <path
          d="M0 500 L400 350 L800 500 L1100 300 L1440 500 V600 H0 Z"
          className="fill-muted/40"
        />

        {/* Close Hills */}
        <path
          d="M0 550 C 400 450, 1000 450, 1440 550 V600 H0 Z"
          className="fill-muted/60"
        />
      </svg>

      {/* This gradient blends the SVG into your black background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
}

// src/components/pages/home/Background.tsx
export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <circle cx="80%" cy="20%" r="200" className="fill-primary/10" />

        <path
          d="M0 400 L300 250 L600 400 L900 200 L1440 450 V600 H0 Z"
          className="fill-muted/15"
        />

        <path
          d="M0 500 L400 350 L800 500 L1100 300 L1440 500 V600 H0 Z"
          className="fill-muted/30"
        />

        <path
          d="M0 550 C 400 450, 1000 450, 1440 550 V600 H0 Z"
          className="fill-muted/50"
        />

        <path
          d="M20 560 Q 700 480 1420 560
             M50 570 Q 700 510 1390 570
             M80 580 Q 700 540 1360 580"
          className="stroke-muted/30 fill-none stroke-1"
        />

        <g className="fill-muted/70 animate-in fade-in duration-1000 delay-300">
          <circle cx="720" cy="520" r="4" />

          <path
            d="M720 522 Q715 530, 715 540 L710 550"
            strokeWidth="5"
            className="stroke-muted/70 fill-none"
          />

          <path
            d="M718 535 L722 550"
            strokeWidth="4"
            className="stroke-muted/70 fill-none"
          />

          <path
            d="M718 528 L705 536"
            strokeWidth="3"
            className="stroke-muted/70 fill-none"
          />

          <path
            d="M700 528 L710 545"
            strokeWidth="1.5"
            className="stroke-muted/70 fill-none"
          />

          <path
            d="M708 543 L712 547"
            strokeWidth="3"
            className="stroke-muted/70 fill-none"
          />
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
}

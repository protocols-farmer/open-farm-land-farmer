function MilkSVG() {
  return (
    <div className="top-0 hidden lg:block -right-52 xl:-right-60 absolute -z-10 opacity-90 transition-transform duration-700 hover:scale-105 rotate-45 pointer-events-none">
      <svg
        viewBox="0 0 120 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 md:w-32 xl:w-40 h-auto drop-shadow-2xl pointer-events-auto"
      >
        {/* Bottle Body - FIXED: Merged duplicate classNames */}
        <path
          d="M40 40 C 40 20, 80 20, 80 40 L 85 80 Q 105 90, 105 130 L 100 190 Q 100 205, 85 205 L 35 205 Q 20 205, 20 190 L 15 130 Q 15 90, 35 80 Z"
          fill="white"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="3"
          className="text-white"
        />

        {/* Milk Level (Liquid inside) - Updated D path for 'shakable' slosh look */}
        <path
          d="M22 135 Q 35 120, 60 140 T 98 130 L 95 185 Q 95 195, 85 195 L 35 195 Q 25 195, 25 185 Z"
          fill="currentColor"
          className="text-white"
        />

        {/* Label */}
        <rect
          x="28"
          y="120"
          width="64"
          height="35"
          rx="4"
          fill="currentColor"
          className="text-card"
        />

        {/* "MILK" Text */}
        <text
          x="60"
          y="142"
          textAnchor="middle"
          fontWeight="900"
          fontSize="14"
          fontFamily="sans-serif"
          fill="currentColor"
          className="text-primary"
          style={{ letterSpacing: "1px" }}
        >
          MILK
        </text>

        {/* Cap */}
        <path
          d="M42 20 H 78 V 35 Q 78 40, 73 40 H 47 Q 42 40, 42 35 Z"
          fill="currentColor"
          className="text-primary"
        />

        {/* Gloss/Reflections */}
        <path
          d="M35 95 Q 30 110, 30 160"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Droplets - Added extra splashes for the "shaken" effect */}
        <g className="text-white">
          {/* Original Drops */}
          <path
            d="M30 45 Q 25 55, 30 60 Q 35 55, 30 45"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M15 70 Q 12 76, 15 80 Q 18 76, 15 70"
            fill="currentColor"
            opacity="0.6"
          />

          {/* New Scattered Shaken Droplets */}
          <circle cx="10" cy="100" r="2.5" fill="currentColor" opacity="0.7" />
          <circle cx="110" cy="70" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="115" cy="140" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="15" cy="160" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="15" r="1.8" fill="currentColor" opacity="0.8" />
          <circle cx="90" cy="45" r="2.2" fill="currentColor" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

export default MilkSVG;

// function MilkSVG() {
//   return (
//     <div className="top-0 -right-60 absolute -z-10 opacity-90 transition-transform duration-700 hover:scale-105 rotate-45 pointer-events-none">
//       <svg
//         viewBox="0 0 120 220"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-24 md:w-32 xl:w-40 h-auto drop-shadow-2xl pointer-events-auto"
//       >
//         {/* Bottle Body - Refined Curves */}
//         <path
//           d="M40 40 C 40 20, 80 20, 80 40 L 85 80 Q 105 90, 105 130 L 100 190 Q 100 205, 85 205 L 35 205 Q 20 205, 20 190 L 15 130 Q 15 90, 35 80 Z"
//           fill="white"
//           className="text-white"
//           fillOpacity="0.15"
//           stroke="currentColor"
//           strokeWidth="3"
//           className="text-primary/30"
//         />

//         {/* Milk Level (Liquid inside) */}
//         <path
//           d="M22 130 Q 22 100, 38 90 L 82 90 Q 98 100, 98 130 L 95 185 Q 95 195, 85 195 L 35 195 Q 25 195, 25 185 Z"
//           fill="currentColor"
//           className="text-white"
//         />

//         {/* Label */}
//         <rect
//           x="28"
//           y="120"
//           width="64"
//           height="35"
//           rx="4"
//           fill="currentColor"
//           className="text-card"
//         />

//         {/* "MILK" Text replaces the flower */}
//         <text
//           x="60"
//           y="142"
//           textAnchor="middle"
//           fontWeight="900"
//           fontSize="14"
//           fontFamily="sans-serif"
//           fill="currentColor"
//           className="text-primary"
//           style={{ letterSpacing: "1px" }}
//         >
//           MILK
//         </text>

//         {/* Cap */}
//         <path
//           d="M42 20 H 78 V 35 Q 78 40, 73 40 H 47 Q 42 40, 42 35 Z"
//           fill="currentColor"
//           className="text-primary"
//         />

//         {/* Gloss/Reflections */}
//         <path
//           d="M35 95 Q 30 110, 30 160"
//           stroke="white"
//           strokeWidth="3"
//           strokeLinecap="round"
//           opacity="0.3"
//         />

//         {/* Droplets - Positioned to look "downward" when the bottle is tilted 45 deg */}
//         <g className="text-white">
//           {/* Main drop falling from cap */}
//           <path
//             d="M30 45 Q 25 55, 30 60 Q 35 55, 30 45"
//             fill="currentColor"
//             opacity="0.8"
//           />
//           {/* Smaller secondary drop */}
//           <path
//             d="M15 70 Q 12 76, 15 80 Q 18 76, 15 70"
//             fill="currentColor"
//             opacity="0.6"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// }

// export default MilkSVG;

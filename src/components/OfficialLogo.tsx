import React from 'react';

interface OfficialLogoProps {
  className?: string;
  size?: number | string;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 375 375"
      width={size}
      height={size}
      className={`select-none ${className}`}
      aria-label="Banshhata Foundation Official Logo"
    >
      <defs>
        <clipPath id="circle_clip_outer">
          <circle cx="187.5" cy="187.5" r="176" />
        </clipPath>
        <clipPath id="circle_clip_inner">
          <circle cx="187.5" cy="187.5" r="162" />
        </clipPath>
      </defs>

      {/* Outer Circle Stroke */}
      <circle
        cx="187.5"
        cy="187.5"
        r="174"
        fill="none"
        stroke="#006c50"
        strokeWidth="11"
      />

      {/* Inner Decorative Circle Stroke */}
      <circle
        cx="187.5"
        cy="187.5"
        r="161"
        fill="none"
        stroke="#006c50"
        strokeWidth="3"
      />

      {/* Right Floral Green Wing / Empathy Hand */}
      <path
        fill="#006c50"
        fillRule="evenodd"
        d="M 348.63 124.53 C 368.08 174.08 363.7 229.82 336.75 275.72 C 309.79 321.63 263.26 352.61 210.51 359.78 C 196.57 323.17 207.52 292.73 243.38 268.46 C 256.45 259.06 266.86 249.44 274.59 239.62 C 281.07 231.39 285.46 222.5 292.41 214.32 C 300.52 228.93 296.75 246.26 281.13 266.32 C 269.66 279.65 263.92 286.31 263.92 286.31 C 292.24 280.03 316.52 261.91 330.61 236.55 C 335.63 227.51 339.18 217.86 341.24 207.93 C 344.6 191.74 343.98 174.84 339.25 158.72 C 335.31 145.34 333.71 132.62 348.63 124.52 Z"
      />

      {/* Right Red Accent Flame / Heart */}
      <path
        fill="#eb1d27"
        fillRule="evenodd"
        d="M 318.32 146.51 C 342.04 185.66 342.63 219.72 320.05 248.69 C 328.68 228.18 327.55 205.09 316.69 179.39 C 312.21 168.8 307.66 155.25 318.32 146.51 Z"
      />

      {/* Left Floral Green Wing / Empathy Hand */}
      <path
        fill="#006c50"
        fillRule="evenodd"
        d="M 25.84 124.53 C 6.39 174.08 10.79 229.82 37.73 275.72 C 64.68 321.63 111.21 352.61 163.96 359.78 C 177.91 323.17 166.95 292.73 131.08 268.46 C 118.02 259.06 107.61 249.44 99.88 239.62 C 93.39 231.39 89.01 222.5 82.05 214.32 C 73.95 228.93 77.71 246.26 93.34 266.32 C 104.81 279.65 110.54 286.31 110.54 286.31 C 82.22 280.03 57.95 261.91 43.87 236.55 C 38.85 227.51 35.29 217.86 33.23 207.93 C 29.88 191.74 30.5 174.84 35.23 158.72 C 39.16 145.34 40.76 132.62 25.84 124.52 Z"
      />

      {/* Left Red Accent Flame / Heart */}
      <path
        fill="#eb1d27"
        fillRule="evenodd"
        d="M 56.15 146.51 C 32.43 185.66 31.85 219.72 54.42 248.69 C 45.8 228.18 46.92 205.09 57.78 179.39 C 62.26 168.8 66.81 155.25 56.15 146.51 Z"
      />

      {/* Top Right Flame Red */}
      <path
        fill="#eb1d27"
        fillRule="evenodd"
        d="M 292.87 73.32 C 239.56 77.93 207.3 124.57 242.51 171.75 C 214.79 153.32 194.72 123.96 195.5 89.89 C 196.21 60.17 212.98 33.35 238.29 19.72 C 225.12 36.44 205.84 74.86 243.75 71.29 C 260.61 69.66 280.66 66.87 292.87 73.32 Z"
      />

      {/* Top Right Green Leaf */}
      <path
        fill="#006c50"
        fillRule="evenodd"
        d="M 321.7 113.12 C 277.79 127 254.17 152.41 264.55 181.86 C 230.07 155.34 233.96 105.29 270.46 89.61 C 248.9 113.57 255.97 123.76 284.43 117.4 C 297.94 114.39 312.6 111.12 321.7 113.12 Z"
      />

      {/* Top Left Flame Green */}
      <path
        fill="#006c50"
        fillRule="evenodd"
        d="M 82.12 73.32 C 135.44 77.93 167.7 124.57 132.48 171.75 C 160.21 153.32 180.28 123.96 179.49 89.89 C 178.79 60.14 162.01 33.32 136.7 19.7 C 149.88 36.41 169.16 74.84 131.24 71.26 C 114.38 69.66 94.34 66.87 82.12 73.32 Z"
      />

      {/* Top Left Red Leaf */}
      <path
        fill="#eb1d27"
        fillRule="evenodd"
        d="M 53.3 113.12 C 97.21 127 120.83 152.41 110.44 181.86 C 144.92 155.34 141.04 105.29 104.53 89.61 C 126.09 113.57 119.02 123.76 90.57 117.4 C 77.08 114.39 62.39 111.12 53.3 113.12 Z"
      />

      {/* Small Circles (Dots) */}
      <circle cx="247.19" cy="49.59" r="8.5" fill="#eb1d27" />
      <circle cx="127.81" cy="49.59" r="8.5" fill="#006c50" />
      <circle cx="276.97" cy="107.55" r="5.5" fill="#006c50" />
      <circle cx="98.05" cy="107.55" r="5.5" fill="#eb1d27" />

      {/* Central Bengali Typography Emblem "বাঁশহাটা" */}
      <g transform="translate(107, 158)">
        <text
          x="80"
          y="70"
          textAnchor="middle"
          fill="#006c50"
          fontFamily="'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
          fontWeight="bold"
          fontSize="46"
          letterSpacing="1"
        >
          বাঁশহাটা
        </text>
      </g>
    </svg>
  );
};

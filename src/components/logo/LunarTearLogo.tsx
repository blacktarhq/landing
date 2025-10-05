export default function LunarTearLogo({
  className = "",
}: {
  className?: string;
}) {
  // Five-petal lily-like Lunar Tear with central stigma and green stem
  // Simple, delicate, white petals with subtle gray detail
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      fill="none"
      aria-label="Lunar Tear logo"
    >
      {/* Stem */}
      <path
        d="M50 70 C49 95, 51 115, 50 135"
        stroke="#9CA3AF"
        strokeWidth="2"
      />

      {/* Leaves on stem */}
      <path
        d="M50 92 C40 88, 38 82, 44 78 C47 80, 47 87, 50 90"
        fill="#A3A3A3"
        opacity="0.85"
      />
      <path
        d="M50 105 C60 101, 62 95, 56 91 C53 93, 53 100, 50 102"
        fill="#A3A3A3"
        opacity="0.85"
      />

      {/* Petal shape as a reusable path definition */}
      <defs>
        <path id="petal" d="M0,0 C10,-8 14,-22 0,-30 C-14,-22 -10,-8 0,0 Z" />
      </defs>

      {/* Five white petals arranged like a lily */}
      <g transform="translate(50,70)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <g key={i} transform={`rotate(${a}) translate(0,0)`}>
            <use href="#petal" fill="#ffffff" opacity="0.98" />
            <use
              href="#petal"
              fill="#d4d4d4"
              opacity="0.25"
              transform="scale(0.9) translate(0,-1)"
            />
          </g>
        ))}
      </g>

      {/* Central stigma and stamens */}
      <g transform="translate(50,70)">
        {/* Filaments */}
        {[-20, -5, 5, 20].map((x, i) => (
          <g key={i} transform={`rotate(${x})`}>
            <path d="M0,0 C0,-6 0,-10 0,-14" stroke="#9ca3af" strokeWidth="1" />
            <circle cx="0" cy="-14" r="1.8" fill="#cbd5e1" />
          </g>
        ))}
        {/* Central stigma body */}
        <circle cx="0" cy="-2" r="3.2" fill="#d4d4d8" />
        <circle cx="0" cy="-2" r="1.6" fill="#f3f4f6" />
      </g>
    </svg>
  );
}

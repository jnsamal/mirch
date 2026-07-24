import { C } from "../theme";

/* ---------------------------------------------------------
   Per-item illustration — small original SVG art, same family
   as the hero's plate art, varied by dish "kind" + a seed so
   items in the same kind don't look identical.
--------------------------------------------------------- */
export default function DishArt({ kind, seed = 0 }) {
  const palette = [C.cream, C.peach, C.coral, C.red];
  const rot = (seed * 47) % 360;
  const flip = seed % 2 === 0;
  const ringOrder = flip ? palette : [...palette].reverse();

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id={`dish-${kind}-${seed}`} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={ringOrder[3]} />
          <stop offset="45%" stopColor={ringOrder[2]} />
          <stop offset="75%" stopColor={ringOrder[1]} />
          <stop offset="100%" stopColor={ringOrder[0]} />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={C.ink} />
      <circle cx="100" cy="100" r="86" fill={`url(#dish-${kind}-${seed})`} />
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(43,23,16,0.16)" strokeWidth="1.5" />

      {kind === "bowl" && (
        <g fill={C.ink} opacity="0.55" transform={`rotate(${rot} 100 100)`}>
          {Array.from({ length: 7 }).map((_, i) => (
            <circle
              key={i}
              cx={100 + Math.cos((i / 7) * Math.PI * 2) * 34}
              cy={100 + Math.sin((i / 7) * Math.PI * 2) * 34}
              r="6"
            />
          ))}
        </g>
      )}

      {kind === "skewer" && (
        <g transform={`rotate(${rot % 30} 100 100)`}>
          {[64, 100, 136].map((x, i) => (
            <rect key={i} x={x - 10} y="70" width="20" height="60" rx="7" fill={C.ink} opacity="0.8" />
          ))}
          <line x1="40" y1="100" x2="160" y2="100" stroke={C.ink} strokeWidth="3" opacity="0.5" />
        </g>
      )}

      {kind === "rice" && (
        <g fill={C.ink} opacity="0.5">
          {Array.from({ length: 26 }).map((_, i) => {
            const a = (seed + i) * 137.5 * (Math.PI / 180);
            const r = 14 + ((i * 7) % 46);
            const x = 100 + Math.cos(a) * r;
            const y = 100 + Math.sin(a) * r;
            return <ellipse key={i} cx={x} cy={y} rx="4" ry="1.8" transform={`rotate(${a * (180 / Math.PI)} ${x} ${y})`} />;
          })}
        </g>
      )}

      {kind === "bread" && (
        <ellipse cx="100" cy="100" rx="52" ry="38" fill={C.ink} opacity="0.6" transform={`rotate(${rot % 20} 100 100)`} />
      )}

      {kind === "drink" && (
        <g transform={`rotate(${rot % 10} 100 100)`}>
          <rect x="76" y="56" width="48" height="86" rx="10" fill={C.ink} opacity="0.18" />
          <rect x="76" y="90" width="48" height="52" rx="10" fill={C.ink} opacity="0.65" />
          <line x1="100" y1="40" x2="100" y2="70" stroke={C.ink} strokeWidth="4" opacity="0.6" />
        </g>
      )}

      {kind === "sweet" && (
        <path
          d="M100 58 C118 58 133 74 133 96 C133 122 100 148 100 148 C100 148 67 122 67 96 C67 74 82 58 100 58 Z"
          fill={C.ink}
          opacity="0.7"
          transform={`rotate(${rot % 15} 100 100)`}
        />
      )}
    </svg>
  );
}

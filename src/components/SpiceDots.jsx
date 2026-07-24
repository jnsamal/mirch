import { C } from "../theme";

/* ---------------------------------------------------------
   Spice level indicator — dots along the palette itself,
   so it doubles as a legend for the site's own colour scale.
--------------------------------------------------------- */
export default function SpiceDots({ level }) {
  const colors = [C.cream, C.peach, C.coral, C.red];
  return (
    <div className="flex items-center gap-1" aria-label={`Spice level ${level} of 4`}>
      {colors.map((c, idx) => (
        <span
          key={idx}
          className="w-2 h-2 rounded-full"
          style={{
            background: idx < level ? c : "transparent",
            border: `1.5px solid ${idx < level ? c : C.inkSoft}`,
            opacity: idx < level ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

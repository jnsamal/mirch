/* ---------------------------------------------------------
   TOKENS
   cream  #FFEDCE  — mild
   peach  #FFC193  — medium
   coral  #FF8383  — hot
   red    #FF3737  — extra hot
   ink    #2B1710  — text / near-black warm brown
--------------------------------------------------------- */
export const C = {
  cream: "#FFEDCE",
  peach: "#FFC193",
  coral: "#FF8383",
  red: "#FF3737",
  ink: "#2B1710",
  inkSoft: "#5C4436",
};

// Replace with the real business number, digits only, country code first
// (e.g. "919876543210").
export const WHATSAPP_NUMBER = "919999999999";

// Sentinel passed to onOrder() to mean "no specific item — open a
// general order chat" rather than a real menu item name.
export const FULL_MENU = "the full menu";

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------------------------
   Shared font styles — every headline uses Fraunces, every
   price/label uses Space Mono. Defined once here instead of
   repeating the font-family string in every component.
--------------------------------------------------------- */
export const display = (weight = 600, extra = {}) => ({
  fontFamily: "'Fraunces', serif",
  fontWeight: weight,
  ...extra,
});

export const mono = (extra = {}) => ({
  fontFamily: "'Space Mono', monospace",
  ...extra,
});

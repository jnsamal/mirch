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
export const WHATSAPP_NUMBER = "+919078200464";

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

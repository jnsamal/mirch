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

// Replace these with the restaurant's real social profile URLs.
// `platform` must match a key Footer.jsx knows how to render an icon
// for (currently: instagram, facebook, twitter).
export const SOCIAL_LINKS = [
  { platform: "instagram", label: "Instagram", href: "https://instagram.com/mirch" },
  { platform: "facebook", label: "Facebook", href: "https://facebook.com/mirch" },
  { platform: "twitter", label: "Twitter", href: "https://twitter.com/mirch" },
];

// Daily operating hours, shown in the footer. One row per line —
// add or remove rows freely, they render in this order.
export const HOURS = [
  { days: "Tuesday – Sunday", time: "12:00 pm – 10:30 pm" },
  { days: "Monday", time: "Closed" },
];

// Contact details shown in the footer. `phoneDisplay` is just for
// display — it can be formatted however you like (spaces, +, etc);
// it's independent of WHATSAPP_NUMBER, which must stay digits-only
// for the wa.me link. Keep both in sync when you update one.
export const CONTACT = {
  phoneDisplay: "+91 99999 99999",
  email: "hello@mirch.example",
  address: "Civil Township Road, Rourkela, Odisha",
};

// Sentinel passed to onOrder() to mean "no specific item — open a
// general order chat" rather than a real menu item name.
export const FULL_MENU = "the full menu";

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the WhatsApp message text from what the person entered in
 * the order dialog. Handles two shapes:
 *  - a specific item (has a price): includes quantity and total
 *  - the general "order the full menu" flow: just notes, no total
 */
export function buildOrderMessage({ name, quantity = 1, price, notes }) {
  const trimmedNotes = notes?.trim();

  if (name === FULL_MENU) {
    let msg = "Hi Mirch! I'd like to place an order.";
    if (trimmedNotes) msg += `\nWhat I'd like: ${trimmedNotes}`;
    return msg;
  }

  let msg = `Hi Mirch! I'd like to order:\n${quantity} x ${name}`;
  if (trimmedNotes) msg += `\nPreferences/changes: ${trimmedNotes}`;
  if (typeof price === "number") {
    msg += `\nTotal: ₹${price * quantity}`;
  }
  return msg;
}

/**
 * Builds an itemized WhatsApp order message for multi-item cart orders.
 */
export function buildCartOrderMessage({ cartItems = [], orderType = "Delivery", customerName = "", phone = "", address = "", notes = "" }) {
  let msg = `🛒 *New Order for Mirch!* (${orderType})\n`;
  msg += `-----------------------------\n`;

  cartItems.forEach((cartItem, idx) => {
    const itemTotal = (cartItem.item.price || 0) * cartItem.quantity;
    msg += `${idx + 1}. *${cartItem.item.name}* x${cartItem.quantity} - ₹${itemTotal}\n`;
    if (cartItem.notes?.trim()) {
      msg += `   └ Note: ${cartItem.notes.trim()}\n`;
    }
  });

  const subtotal = cartItems.reduce((acc, ci) => acc + (ci.item.price || 0) * ci.quantity, 0);

  msg += `-----------------------------\n`;
  msg += `*Total Amount:* ₹${subtotal}\n`;

  if (customerName.trim()) msg += `\n*Name:* ${customerName.trim()}`;
  if (phone.trim()) msg += `\n*Phone:* ${phone.trim()}`;
  if (address.trim()) msg += `\n*Address/Details:* ${address.trim()}`;  if (notes.trim()) msg += `\n*Order Instructions:* ${notes.trim()}`;

  return msg;
}

/**
 * Builds the WhatsApp message text for the "Contact us" form —
 * a general query rather than an order.
 */
export function buildContactMessage({ name, phone, message }) {
  let msg = "Hi Mirch! I have a question.";
  if (name?.trim()) msg += `\nName: ${name.trim()}`;
  if (phone?.trim()) msg += `\nPhone: ${phone.trim()}`;
  if (message?.trim()) msg += `\nMessage: ${message.trim()}`;
  return msg;
}

/**
 * Builds the WhatsApp message for the footer newsletter box.
 * There's no email/newsletter service behind this site — signing
 * up sends a WhatsApp message asking to be added to updates,
 * same as every other form here.
 */
export function buildNewsletterMessage({ email }) {
  return `Hi Mirch! Please add me to your updates list.\nEmail: ${email.trim()}`;
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

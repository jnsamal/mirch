import { C } from "../theme";

const SIZES = {
  sm: { padding: "0.5rem 0.875rem", fontSize: "0.75rem", gap: 6 },
  md: { padding: "0.5rem 1rem", fontSize: "0.875rem", gap: 8 },
  lg: { padding: "0.875rem 1.5rem", fontSize: "0.875rem", gap: 8 },
};

const VARIANTS = {
  red: { background: C.red, color: "#fff" },
  ink: { background: C.ink, color: C.cream },
};

/**
 * OrderButton — the site's one WhatsApp-order-style CTA, used by
 * the navbar, menu cards, product cards, and the visit section.
 * Centralizing it means a style change (padding, colours, icon)
 * only has to happen once instead of in five separate places.
 */
export default function OrderButton({
  children = "Order on WhatsApp",
  onClick,
  size = "md",
  variant = "red",
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}) {
  const s = SIZES[size];
  const v = VARIANTS[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      {...rest}
      className={`inline-flex items-center rounded-full font-semibold transition-transform hover:scale-105 ${
        fullWidth ? "justify-center w-full" : "w-fit"
      } ${className}`}
      style={{ padding: s.padding, fontSize: s.fontSize, gap: s.gap, ...v }}
    >
      {children}
    </button>
  );
}

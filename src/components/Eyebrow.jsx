import { mono } from "../theme";

/**
 * Eyebrow — the small uppercase label above a section heading
 * ("The menu", "Since the first batch of mustard oil"). Pulled
 * out because ProductsPage and Story both hand-rolled the same
 * classes and inline font style.
 */
export default function Eyebrow({ children, color, opacity = 1, className = "" }) {
  return (
    <p className={`uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 ${className}`} style={mono({ color, opacity })}>
      {children}
    </p>
  );
}

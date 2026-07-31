import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollManager — React Router doesn't scroll anywhere on its own
 * when the route changes. This renders nothing; it just:
 *   - scrolls to the matching element when the URL has a hash
 *     (e.g. navigating to "/#menu" from another page), respecting
 *     each section's existing scroll-margin-top
 *   - otherwise scrolls to the top, so navigating to a plain route
 *     (e.g. "/about") doesn't land still scrolled halfway down
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick for the new page's content to mount before
      // looking for the element.
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

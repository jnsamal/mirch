import { C } from "../theme";

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@400;500;600&family=Space+Mono&display=swap');
      html { scroll-behavior: smooth; }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
      }
      a:focus-visible, button:focus-visible {
        outline: 2px solid ${C.red};
        outline-offset: 2px;
      }
    `}</style>
  );
}

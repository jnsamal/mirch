import { C } from "../theme";

export default function Footer() {
  return (
    <footer className="px-5 sm:px-8 md:px-14 py-10 text-center" style={{ background: C.ink, color: "rgba(255,237,206,0.7)" }}>
      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: C.cream }} className="text-lg">
        Mirch<span style={{ color: C.red }}>.</span>
      </span>
      <p className="text-xs mt-3">© {new Date().getFullYear()} Mirch. Order only through official WhatsApp — we never use third-party delivery apps.</p>
    </footer>
  );
}

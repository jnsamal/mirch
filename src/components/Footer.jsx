import { Instagram, Facebook, Twitter } from "lucide-react";
import { C, display, SOCIAL_LINKS } from "../theme";

const ICONS = { instagram: Instagram, facebook: Facebook, twitter: Twitter };

export default function Footer() {
  return (
    <footer className="px-5 sm:px-8 md:px-14 py-16 sm:py-20 text-center" style={{ background: C.ink, color: "rgba(255,237,206,0.7)" }}>
      <span style={display(700, { color: C.cream })} className="text-lg">
        Mirch<span style={{ color: C.red }}>.</span>
      </span>

      {SOCIAL_LINKS.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          {SOCIAL_LINKS.map(({ platform, label, href }) => {
            const Icon = ICONS[platform];
            if (!Icon) return null;
            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: "rgba(255,237,206,0.1)", color: C.cream }}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      )}

      <p className="text-xs mt-6">
        © {new Date().getFullYear()} Mirch. Order only through official WhatsApp — we never use third-party delivery apps.
      </p>
    </footer>
  );
}

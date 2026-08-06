import { Instagram, Facebook, Twitter, MessageCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import { C, display, mono, SOCIAL_LINKS, HOURS, CONTACT, FULL_MENU, waLink, buildOrderMessage } from "../theme";

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, twitter: Twitter };

function FooterHeading({ children }) {
  return (
    <h3
      className="uppercase tracking-[0.15em] text-xs mb-4"
      style={mono({ color: "rgba(255,237,206,0.55)" })}
    >
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 px-5 sm:px-8 md:px-14 pt-16 sm:pt-20 pb-8" style={{ background: C.ink, color: "rgba(255,237,206,0.75)" }}>
      <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-3 pb-12">
        {/* Brand + social */}
        <div>
          <span style={display(700, { color: C.cream })} className="text-lg">
            Mirch<span style={{ color: C.red }}>.</span>
          </span>
          <p className="text-sm mt-3 max-w-xs" style={{ color: "rgba(255,237,206,0.6)" }}>
            Real heat, cooked fresh, ordered straight through WhatsApp — no
            delivery-app middleman.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href={waLink(buildOrderMessage({ name: FULL_MENU }))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: C.red, color: "#fff" }}
            >
              <MessageCircle size={18} />
            </a>
            {SOCIAL_LINKS.map(({ platform, label, href }) => {
              const Icon = SOCIAL_ICONS[platform];
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
        </div>

        {/* Hours */}
        <div>
          <FooterHeading>Hours</FooterHeading>
          <ul className="space-y-3">
            {HOURS.map((row) => (
              <li key={row.days} className="flex items-start gap-3 text-sm">
                <Clock size={16} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />
                <span>
                  <span className="block" style={{ color: C.cream }}>
                    {row.days}
                  </span>
                  <span style={{ color: "rgba(255,237,206,0.6)" }}>{row.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />
              <a href={`tel:${CONTACT.phoneDisplay.replace(/\s+/g, "")}`} style={mono({ fontSize: "0.875rem" })}>
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-6xl mx-auto mb-12">
        <FooterHeading>Find us</FooterHeading>
        <div className="rounded-2xl overflow-hidden h-64 sm:h-72" style={{ border: "1px solid rgba(255,237,206,0.14)" }}>
          <iframe
            title="Mirch location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 text-center" style={{ borderTop: "1px solid rgba(255,237,206,0.12)" }}>
        <p className="text-xs">
          © {new Date().getFullYear()} Mirch. Order only through official WhatsApp — we never use third-party delivery apps.
        </p>
      </div>
    </footer>
  );
}

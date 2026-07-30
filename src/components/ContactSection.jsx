import { useState } from "react";
import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import OrderButton from "./OrderButton";
import { C, display, waLink, buildContactMessage } from "../theme";

const inputStyle = {
  background: "rgba(255,255,255,0.7)",
  border: `1px solid ${C.ink}22`,
  color: C.ink,
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() !== "" && message.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const text = buildContactMessage({ name, phone, message });
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <section
      id="contact-form"
      className="relative scroll-mt-24 py-20 sm:py-28 px-5 sm:px-8 md:px-14"
      style={{ background: C.coral }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <Eyebrow color={C.ink} opacity={0.6}>
            Have a question?
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight" style={display(600, { color: C.ink })}>
            Ask us directly, no forms that vanish into an inbox
          </h2>
          <p className="text-sm sm:text-base" style={{ color: C.inkSoft }}>
            Fill this in and it opens a WhatsApp chat with your message already
            written — same place your order would go, so a real person sees it
            and replies from there.
          </p>
        </div>

        <Glass className="rounded-3xl p-8 sm:p-10" style={{ color: C.ink }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Phone <span style={{ opacity: 0.6 }}>(optional)</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="If you'd like a call back"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to ask?"
                rows={4}
                required
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                style={inputStyle}
              />
            </div>

            <OrderButton
              size="lg"
              fullWidth
              className={canSubmit ? "" : "opacity-50 pointer-events-none"}
            >
              Send on WhatsApp
            </OrderButton>
          </form>
        </Glass>
      </div>
    </section>
  );
}

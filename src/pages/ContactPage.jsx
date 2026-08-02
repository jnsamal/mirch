import ContactSection from "../components/ContactSection";
import PageBanner from "../components/PageBanner";

/* ---------------------------------------------------------
   ContactPage — the WhatsApp contact form on its own route
   (/contact), fronted by a banner like the other subpages.
   The form itself lives in ContactSection so it stays a single
   source of truth.
--------------------------------------------------------- */
export default function ContactPage() {
  return (
    <>
      <PageBanner eyebrow="Contact" title="Message the kitchen" />
      <ContactSection />
    </>
  );
}

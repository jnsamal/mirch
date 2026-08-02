import Eyebrow from "./Eyebrow";
import { C, display } from "../theme";
import defaultImage from "../images/thali-spread-1200w.webp";

/**
 * PageBanner — the photo banner used at the top of every
 * secondary page (About, Products, Contact). Was hand-copied
 * into each page with only the eyebrow/title text differing;
 * pulled out here so that's the only thing each call site needs
 * to supply.
 */
export default function PageBanner({
  eyebrow,
  title,
  image = defaultImage,
  alt = "Full thali spread with curries, rice, roti, and raita",
}) {
  return (
    <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden" style={{ background: C.ink }}>
      <img src={image} alt={alt} className="w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(43,23,16,0.55) 0%, rgba(43,23,16,0.75) 100%)" }}
      />
      <div className="absolute inset-0 flex items-end px-5 sm:px-8 md:px-14 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto w-full">
          <Eyebrow color={C.peach}>{eyebrow}</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl" style={display(600, { color: "#fff" })}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

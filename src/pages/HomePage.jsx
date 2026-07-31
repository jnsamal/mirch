import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import Reviews from "../components/Reviews";
import Story from "../components/Story";
import ContactSection from "../components/ContactSection";

export default function HomePage({ onOrder }) {
  return (
    <>
      <Hero />
      <MenuSection onOrder={onOrder} />
      <Reviews />
      <Story />
      <ContactSection />
    </>
  );
}

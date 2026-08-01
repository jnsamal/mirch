import Hero from "../components/Hero";
import PopularDishes from "../components/PopularDishes";
import Reviews from "../components/Reviews";
import Story from "../components/Story";

export default function HomePage({ onOrder }) {
  return (
    <>
      <Hero />
      <PopularDishes onOrder={onOrder} />
      <Reviews />
      <Story />
    </>
  );
}

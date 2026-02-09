import Hero from "@/app/components/Hero";
import FeaturedProducts from "@/app/components/FeaturedProducts";

export const revalidate = 0; // Disable caching for the homepage to always show the latest featured products
export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
    </main>
  );
}
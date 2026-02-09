import ProductCard from "./ProductCard";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import type { Product } from "@/app/types";

export const dynamic = "force-dynamic"; // Ensure this component is server-rendered on each request to fetch the latest featured products
export const revalidate = 60; // Revalidate every 60 seconds
export default async function FeaturedProducts() {
  // Fetch featured products from Supabase
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4);

  const featured = (products as Product[]) || [];

  if (featured.length === 0) {
    return null; // Don't show section if no featured products
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Products
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            The freshest anime fits, handpicked for fans who wear their passion. 
            Bold prints, clean cuts, straight from the screen.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}        </div>
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-hover transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
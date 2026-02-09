import ProductCard from "@/app/components/ProductCard";
import { supabase } from "@/app/lib/supabase";
import type { Product } from "@/app/types";

export const revalidate = 0; // Always fetch fresh data (or use a number for ISR)

export default async function ShopPage() {
  // Fetch products from Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  const productsList = (products as Product[]) || [];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Shop All
          </h1>
          <p className="text-text-muted">
            Explore the full Otaku collection. Premium anime streetwear with
            bold prints and clean cuts.
          </p>
        </div>
        
        {productsList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
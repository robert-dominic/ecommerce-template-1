import ProductCard from "@/app/components/ProductCard";
import productsData from "@/app/data/products.json";
import type { Product } from "@/app/types";

const products = productsData as Product[];

export default function ShopPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

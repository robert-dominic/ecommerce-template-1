import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import type { Product } from "@/app/types";
import AddToCartButton from "@/app/components/AddToCartButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('products')
    .select('slug');
  
  return products?.map((p) => ({ slug: p.slug })) || [];
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Fetch product from Supabase
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) {
    notFound();
  }

  const productData = product as Product;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/shop"
          className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition"
        >
          ← Back to Shop
        </Link>
        <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-start">
          <div className="aspect-[4/5] relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
            {productData.image && (
              <Image
                src={productData.image}
                alt={productData.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
          <div className="pt-8 md:pt-0 md:pl-10 md:border-l md:border-gray-200 border-t border-gray-200 md:border-t-0">
            <p className="text-sm text-text-muted mb-2">{productData.category}</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {productData.name}
            </h1>
            <p className="text-2xl text-accent font-semibold mb-6">
              ${productData.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {productData.description}
            </p>
            <AddToCartButton product={productData} />
          </div>
        </div>
      </div>
    </main>
  );
}
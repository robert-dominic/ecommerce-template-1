import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import productsData from "@/app/data/products.json";
import type { Product } from "@/app/types";
import AddToCartButton from "@/app/components/AddToCartButton";

const products = productsData as Product[];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

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
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="pt-8 md:pt-0 md:pl-10 md:border-l md:border-gray-200 border-t border-gray-200 md:border-t-0">
            <p className="text-sm text-text-muted mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-accent font-semibold mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}

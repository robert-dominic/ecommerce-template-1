import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/app/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary/90 text-white text-xs font-heading font-semibold uppercase tracking-wider">
          {product.category}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          View
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
      <div className="border-t border-gray-300 p-5">
        <h3 className="font-heading font-semibold text-primary text-lg leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-3 text-xl font-semibold text-accent">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/app/types";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        className="bg-accent text-white px-6 py-3 rounded-md font-semibold bg-accent-hover transition disabled:opacity-70"
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
      <Link
        href="/cart"
        className="bg-primary text-white px-6 py-3 rounded-md font-semibold bg-primary-hover transition disabled:opacity-70"
      >
        View cart
      </Link>
    </div>
  );
}

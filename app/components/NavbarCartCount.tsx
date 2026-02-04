"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function NavbarCartCount() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-primary hover-primary transition" />
      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
        {itemCount}
      </span>
    </Link>
  );
}

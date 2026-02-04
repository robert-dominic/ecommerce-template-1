"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) clearCart();
  }, [sessionId, clearCart]);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Thank you for your order
        </h1>
        <p className="text-text-muted mb-8">
          Your payment was successful. We&apos;ll send you an email confirmation
          shortly.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-accent text-white px-8 py-3 rounded-md font-semibold bg-accent-hover transition"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

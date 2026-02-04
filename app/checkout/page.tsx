"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { items, itemCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        const message = res.status === 503 && data.error?.includes("Stripe")
          ? "Checkout isn't set up yet. Add STRIPE_SECRET_KEY to .env.local when you have a Stripe account."
          : (data.error || "Checkout failed");
        setError(message);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL returned");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Your cart is empty</h1>
          <Link href="/shop" className="inline-block bg-accent text-white px-8 py-3 rounded-md font-semibold bg-accent-hover transition">
            Shop now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Checkout</h1>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-text-muted mb-2">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
          <p className="text-xl font-semibold text-primary">Total: ${subtotal.toFixed(2)}</p>
        </div>
        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-accent text-white py-3 rounded-md font-semibold bg-accent-hover transition disabled:opacity-70"
        >
          {loading ? "Redirecting…" : "Pay with Stripe"}
        </button>
        <Link href="/cart" className="mt-4 block text-center text-primary font-medium hover-primary transition">
          Back to cart
        </Link>
      </div>
    </main>
  );
}

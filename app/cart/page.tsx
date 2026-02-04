"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const DELIVERY_FEE = 10;

export default function CartPage() {
  const { items, itemCount, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const total = subtotal + DELIVERY_FEE;

  if (itemCount === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-heading font-bold text-primary mb-4">Your cart is empty</h1>
          <p className="text-text-muted mb-8">
            Add something from the shop to get started.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md font-semibold bg-primary-hover transition"
          >
            Shop now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-10">
          Your cart
        </h1>
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Left: Cart items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-5 sm:gap-6 p-0 pb-8 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-heading font-semibold text-primary hover:text-accent transition text-base sm:text-lg"
                    >
                      {product.name}
                    </Link>
                    <ul className="text-sm text-text-muted mt-1.5 space-y-0.5">
                      <li>Category: {product.category}</li>
                      <li>Quantity: {quantity}</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-accent">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 text-primary hover:bg-gray-100 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 text-primary hover:bg-gray-100 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 sm:p-8 rounded-xl bg-gray-100 border border-gray-200">
              <h2 className="font-heading font-bold text-primary text-lg mb-4">
                Order total
              </h2>
              <dl className="space-y-2 text-sm text-text-muted">
                <div className="flex justify-between">
                  <dt>Cost of goods</dt>
                  <dd className="text-accent font-medium">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd className="text-accent font-medium">${DELIVERY_FEE.toFixed(2)}</dd>
                </div>
              </dl>
              <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
                <span className="font-heading font-bold">Total amount</span>
                <span className="font-heading font-bold text-accent text-lg">${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full text-center bg-accent text-white py-3.5 rounded-lg font-semibold bg-accent-hover transition"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

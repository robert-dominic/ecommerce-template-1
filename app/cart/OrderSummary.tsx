"use client";
import { FaWhatsapp } from "react-icons/fa6";
import { useWhatsAppOrder } from "@/app/hooks/useWhatsAppOrder";

type OrderSummaryProps = {
  subtotal: number
  deliveryFee: number
  total: number
}

export default function OrderSummary({ subtotal, deliveryFee, total }: OrderSummaryProps) {
  const { handleWhatsAppOrder } = useWhatsAppOrder();

  return (
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
          <dd className="text-accent font-medium">${deliveryFee.toFixed(2)}</dd>
        </div>
      </dl>
      <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
        <span className="font-heading font-bold">Total amount</span>
        <span className="font-heading font-bold text-accent text-lg">
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={handleWhatsAppOrder}
        className="mt-6 w-full text-white text-center bg-primary hover:bg-primary/90 py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2"
      >
        <FaWhatsapp className="w-6 h-6" />
        Order via WhatsApp
      </button>
    </div>
  )
}
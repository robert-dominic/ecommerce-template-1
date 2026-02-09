"use client";

import { useCart } from "@/app/context/CartContext";
// Using literal strings to keep this hook self-contained
const WHATSAPP_PHONE_NUMBER = "2349031978736";
const WHATSAPP_MESSAGE_PREFIX = "Hello! I would like to place an order:\n\n";
const WHATSAPP_MESSAGE_SUFFIX = "\n\nPlease confirm my order and provide shipping details.";
const CURRENCY = "$";

export function useWhatsAppOrder() {
  const { items } = useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Format order message
    let message = WHATSAPP_MESSAGE_PREFIX;

    items.forEach((item) => {
      message += `• ${item.product.name}\n`;
      message += `  Quantity: ${item.quantity}\n`;
      message += `  Price: ${CURRENCY}${item.product.price.toFixed(2)}\n`;
      message += `  Subtotal: ${CURRENCY}${(item.product.price * item.quantity).toFixed(2)}\n\n`;
    });

    const subtotal = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    message += `Total Amount: ${CURRENCY}${subtotal.toFixed(2)}`;
    message += WHATSAPP_MESSAGE_SUFFIX;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return { handleWhatsAppOrder };
}

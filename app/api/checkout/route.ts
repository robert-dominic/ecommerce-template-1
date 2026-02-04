import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartItem } from "@/app/types";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured. Add STRIPE_SECRET_KEY to .env.local" },
      { status: 503 }
    );
  }
  let body: { items: CartItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { items } = body;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart empty or invalid" }, { status: 400 });
  }
  const origin = request.headers.get("origin") || "http://localhost:3000";
  const line_items = items.map(({ product, quantity }) => ({
    quantity,
    price_data: {
      currency: "usd",
      unit_amount: Math.round(product.price * 100),
      product_data: {
        name: product.name,
        description: (product.description || "").slice(0, 500),
        images: product.image.startsWith("http") ? [product.image] : [origin + product.image],
      },
    },
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

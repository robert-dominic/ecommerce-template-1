'use client'

import { useCart } from '@/app/context/CartContext'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'
import EmptyCart from './EmptyCart'
import CartLoading from './CartLoading'

const DELIVERY_FEE = 10

export default function CartPage() {
  const { items, itemCount, loading, updateQuantity, removeItem } = useCart()

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const total = subtotal + DELIVERY_FEE

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <CartLoading />
      </main>
    )
  }

  if (itemCount === 0) {
    return (
      <main className="min-h-screen bg-white">
        <EmptyCart />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-10">
          Your cart
        </h1>
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              total={total}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
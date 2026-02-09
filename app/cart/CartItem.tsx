'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '@/app/types'

type CartItemProps = {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item
  const imageSrc = product.image || '/placeholder-product.png'

  return (
    <div className="flex gap-5 sm:gap-6 p-0 pb-8 border-b border-gray-200 last:border-0 last:pb-0">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
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
              onClick={() => onRemove(product.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
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
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="p-2 text-primary hover:bg-gray-100 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
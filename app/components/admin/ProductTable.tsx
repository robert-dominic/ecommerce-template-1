'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Edit2, Trash2 } from 'lucide-react'
import type { ProductTableProps } from '@/app/types'
import ProductListLoading from './ProductListLoading'

export default function ProductList({ products, loading, onDelete }: ProductTableProps) {
  if (loading) {
    return <ProductListLoading />
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-text-muted text-lg mb-4">No products yet</p>
        <Link
          href="/admin/products/new"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-accent-dark transition"
        >
          Create Your First Product
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200"
        >
          {/* Product Image */}
          <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3 className="font-bold text-primary text-lg truncate">
                {product.name}
              </h3>
              {product.featured && (
                <span className="bg-accent text-primary/80 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-text-muted mb-2 truncate">{product.slug}</p>
            {product.category && (
              <p className="text-xs text-gray-600 mb-3">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
            )}
            <p className="text-lg font-bold text-accent mb-4">
              ${product.price.toFixed(2)}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Edit Button */}
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition font-semibold flex items-center justify-center gap-2 py-2"
                title="Edit product"
              >
                <Edit2 size={16} />
                <span className="hidden sm:inline">Edit</span>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (confirm('Delete this product?')) {
                    onDelete(product.id, product.image)
                  }
                }}
                className="flex-1 bg-red-800 hover:bg-red-900 text-white rounded-md transition font-semibold flex items-center justify-center gap-2 py-2"
                title="Delete product"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
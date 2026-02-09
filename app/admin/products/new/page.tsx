'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/app/context/AdminAuthContext'
import { createProduct } from '@/app/lib/admin/productOperations'
import { uploadProductImage } from '@/app/lib/uploadImage'
import ProductForm from '@/app/components/admin/ProductForm'
import type { ProductFormData } from '@/app/types'

export default function NewProductPage() {
  const router = useRouter()
  const { isAdmin } = useAdminAuth()
  const [loading, setLoading] = useState(false)

  if (!isAdmin) {
    router.push('/admin')
    return null
  }

  const handleSubmit = async (formData: ProductFormData, imageFile: File | null) => {
    setLoading(true)

    try {
      let imageUrl: string | null = null

      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile)
        if (!imageUrl) {
          alert('Failed to upload image')
          setLoading(false)
          return
        }
      }

      const { error } = await createProduct({
        slug: formData.slug,
        name: formData.name,
        price: parseFloat(formData.price),
        image: imageUrl,
        description: formData.description,
        category: formData.category,
        featured: formData.featured,
      })

      if (error) {
        alert('Error creating product: ' + error.message)
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      alert('An error occurred')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Add New Product</h1>
          <p className="text-text-muted">Create a new product in your catalog</p>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Create Product"
        />

        <button
          onClick={() => router.push('/admin/dashboard')}
          className="mt-4 text-text-muted hover:text-primary transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/app/context/AdminAuthContext'
import { getProductById, updateProduct } from '@/app/lib/admin/productOperations'
import { uploadProductImage, deleteProductImage } from '@/app/lib/uploadImage'
import ProductForm from '@/app/components/admin/ProductForm'
import type { PageProps, ProductPageParams, Product, ProductFormData } from '@/app/types'

export default function EditProductPage({ params }: PageProps<ProductPageParams>) {
  const router = useRouter()
  const { isAdmin } = useAdminAuth()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [productId, setProductId] = useState<string>('')
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    params.then(({ id }) => setProductId(id))
  }, [params])

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin')
      return
    }

    if (productId) {
      fetchProduct()
    }
  }, [isAdmin, productId, router])

  const fetchProduct = async () => {
    const { data, error } = await getProductById(productId)

    if (error || !data) {
      alert('Product not found')
      router.push('/admin/dashboard')
      return
    }

    setProduct(data)
    setFetchLoading(false)
  }

  const handleSubmit = async (formData: ProductFormData, imageFile: File | null) => {
    if (!product) return
    
    setLoading(true)

    try {
      let imageUrl = product.image

      if (imageFile) {
        const newImageUrl = await uploadProductImage(imageFile)
        if (!newImageUrl) {
          alert('Failed to upload new image')
          setLoading(false)
          return
        }

        if (product.image) {
          await deleteProductImage(product.image)
        }

        imageUrl = newImageUrl
      }

      const { error } = await updateProduct(productId, {
        slug: formData.slug,
        name: formData.name,
        price: parseFloat(formData.price),
        image: imageUrl,
        description: formData.description,
        category: formData.category,
        featured: formData.featured,
      })

      if (error) {
        alert('Error updating product: ' + error.message)
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      alert('An error occurred')
    }

    setLoading(false)
  }

  if (fetchLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-text-muted">Loading...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Edit Product</h1>
          <p className="text-text-muted">Update product information</p>
        </div>

        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Update Product"
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
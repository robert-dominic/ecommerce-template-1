import { useState, useCallback } from 'react'
import { getAllProducts, deleteProduct as deleteProductOp } from '@/app/lib/admin/productOperations'
import { deleteProductImage } from '@/app/lib/uploadImage'
import type { Product } from '@/app/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const { data, error } = await getAllProducts()
    
    if (!error && data) {
      setProducts(data)
    }
    setLoading(false)
  }, [])

  const deleteProduct = useCallback(async (id: string, imageUrl: string | null) => {
    const { error } = await deleteProductOp(id)
    
    if (!error) {
      if (imageUrl) {
        await deleteProductImage(imageUrl)
      }
      await fetchProducts()
      return true
    }
    return false
  }, [fetchProducts])

  return { products, loading, fetchProducts, deleteProduct }
}
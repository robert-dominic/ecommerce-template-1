import { useState, useCallback } from 'react'
import type { ProductFormData, Product } from '@/app/types'

export function useProductForm(initialData?: Product) {
  const [formData, setFormData] = useState<ProductFormData>({
    slug: initialData?.slug || '',
    name: initialData?.name || '',
    price: initialData?.price?.toString() || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    featured: initialData?.featured || false,
  })
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }, [])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  return {
    formData,
    imageFile,
    imagePreview,
    handleChange,
    handleImageChange,
  }
}
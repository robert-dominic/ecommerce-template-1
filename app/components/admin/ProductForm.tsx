'use client'

import { useProductForm } from '@/app/hooks/useProductForm'
import ImageUpload from './ImageUpload'
import type { ProductFormProps } from '@/app/types'

export default function ProductForm({
  initialData,
  onSubmit,
  loading,
  submitLabel = 'Submit'
}: ProductFormProps) {
  const {
    formData,
    imageFile,
    imagePreview,
    handleChange,
    handleImageChange,
  } = useProductForm(initialData)

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(formData, imageFile)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-6">
      <ImageUpload
        currentImage={initialData?.image || null}
        preview={imagePreview}
        onImageChange={handleImageChange}
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          id="slug"
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="e.g., naruto-uchiha-tee"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., T-Shirts"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Featured Product
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : submitLabel}
      </button>
    </form>
  )
}
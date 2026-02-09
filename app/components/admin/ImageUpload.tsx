'use client'

import Image from 'next/image'
import type { ImageUploadProps } from '@/app/types'

export default function ImageUpload({
  currentImage,
  preview,
  onImageChange,
  label = 'Product Image'
}: ImageUploadProps) {
  return (
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
      />
      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            {currentImage !== preview ? 'New image preview:' : 'Current image:'}
          </p>
          <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image 
              src={preview} 
              alt="Preview" 
              width={400}
              height={400}
              className="object-cover" 
            />
          </div>
        </div>
      )}
    </div>
  )
}
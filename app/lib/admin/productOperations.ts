'use server'

import { supabase } from '@/app/lib/supabase'
import { revalidatePath } from 'next/cache'
import type { Product, ProductFormData } from '@/app/types'

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return { data: data as Product[] | null, error }
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as Product | null, error }
}

export async function createProduct(productData: {
  slug: string
  name: string
  price: number
  image: string | null
  description: string
  category: string
  featured: boolean
}) {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single()

  return { data: data as Product | null, error }
}

export async function updateProduct(id: string, productData: {
  slug: string
  name: string
  price: number
  image: string | null
  description: string
  category: string
  featured: boolean
}) {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single()

  if (!error) {
    // Revalidate the paths that display products
    revalidatePath('/')
    revalidatePath('/shop')
  }

  return { data: data as Product | null, error }
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (!error) {
    // Revalidate the paths that display products
    revalidatePath('/')
    revalidatePath('/shop')
  }

  return { error }
}
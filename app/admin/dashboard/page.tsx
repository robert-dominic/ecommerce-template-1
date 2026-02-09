'use client'

import { useEffect } from 'react'
import { useAdminAuth } from '@/app/context/AdminAuthContext'
import { useProducts } from '@/app/hooks/useProducts'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/app/components/admin/AdminHeader'
import ProductTable from '@/app/components/admin/ProductTable'
import AdminDashboardLoading from './loading'

export default function AdminDashboard() {
  const { isAdmin, signOut, loading: authLoading } = useAdminAuth()
  const { products, loading, fetchProducts, deleteProduct } = useProducts()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/admin')
      return
    }
    
    if (isAdmin) {
      fetchProducts()
    }
  }, [isAdmin, authLoading, router, fetchProducts])

  const handleLogout = async () => {
    await signOut()
    router.push('/admin')
  }

  if (authLoading || loading) {
    return <AdminDashboardLoading />
  }

  if (!isAdmin) return null

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminHeader />
        <ProductTable 
          products={products} 
          loading={loading} 
          onDelete={deleteProduct} 
        />
      </div>
    </main>
  )
}
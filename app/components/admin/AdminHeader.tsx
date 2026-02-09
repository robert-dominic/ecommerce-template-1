'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function AdminHeader() {
  return (
    <div className="flex flex sm:flex-row justify-between sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-text-muted">Manage your product catalog</p>
      </div>
      <Link
        href="/admin/products/new"
        className="bg-black text-white px-3 md:px-4 md:py-3 rounded-md font-semibold hover:bg-primary/90 transition flex items-center gap-2 w-fit sm:px-6 sm:py-2"
      >
        <Plus size={18} />
        <span className="inline">Add</span>
      </Link>
    </div>
  )
}
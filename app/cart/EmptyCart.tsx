import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl font-heading font-bold text-primary mb-4">
        Your cart is empty
      </h1>
      <p className="text-text-muted mb-8">
        Add something from the shop to get started.
      </p>
      <Link
        href="/shop"
        className="inline-block bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-dark transition"
      >
        Shop now
      </Link>
    </div>
  )
}
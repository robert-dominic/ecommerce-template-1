export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          {/* Image Skeleton */}
          <div className="bg-gray-200 rounded-lg aspect-square"></div>

          {/* Details Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>

            {/* Price */}
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>

            {/* Rating */}
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

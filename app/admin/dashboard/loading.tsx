export default function AdminDashboardLoading() {
  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-pulse">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-200"></div>

              {/* Content Skeleton */}
              <div className="p-4 space-y-4">
                {/* Title + Featured badge skeleton */}
                <div className="flex justify-between items-start gap-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>

                {/* Slug skeleton */}
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                {/* Category skeleton */}
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>

                {/* Price skeleton */}
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>

                {/* Buttons skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

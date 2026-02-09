export default function ProductListLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse"
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
  )
}

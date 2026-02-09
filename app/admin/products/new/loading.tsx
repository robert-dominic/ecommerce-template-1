export default function ProductFormLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-lg shadow p-8 space-y-6 animate-pulse">
          {/* Input Fields */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}

          {/* Textarea */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

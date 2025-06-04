const StepOneSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 space-y-4 animate-pulse">
      {/* Chapter Title Skeleton */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-2/3"></div>
        </div>
      </div>

      {/* Video Player Skeleton */}
      <div className="relative rounded-4xl overflow-hidden bg-gray-200 aspect-video">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[16px] border-l-gray-500 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

      {/* Content Outline Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xl">
        <div className="space-y-4">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>

          {/* Content blocks skeleton */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="space-y-1 ml-4">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="space-y-1 ml-4">
                <div className="h-4 bg-gray-100 rounded w-3/5"></div>
                <div className="h-4 bg-gray-100 rounded w-4/5"></div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="space-y-1 ml-4">
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Additional content lines */}
          <div className="space-y-2 mt-6">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneSkeleton;

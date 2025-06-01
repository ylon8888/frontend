import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StepsSkeleton = () => {
  return (
    <div className="flex flex-col">
      {/* Title Skeleton */}
      <Skeleton className="h-7 w-48 mb-6" />

      <div className="flex md:flex-col space-y-2">
        {/* Generate 11 step skeletons (10 regular steps + 1 final step) */}
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className={`flex transition-all duration-150 ${
              index === 0
                ? "bg-gray-100 rounded-md p-4"
                : "px-4 py-3 rounded-md"
            }`}
          >
            <div className="flex flex-col items-center md:mr-3">
              {/* Step Number Circle Skeleton */}
              <Skeleton className="w-8 h-8 rounded-full" />
              {/* Connecting Line Skeleton (not for last item) */}
              {index < 10 && <div className="w-0.5 h-8 my-1 bg-gray-200" />}
            </div>
            <div
              className={`hidden md:flex flex-col ${
                index === 10 ? "pb-1" : "pb-4"
              }`}
            >
              {/* Step Title Skeleton */}
              <Skeleton className="h-5 w-56 mb-2" />
              {/* Step Description Skeleton */}
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Step Button Skeleton */}
      <Skeleton className="mt-6 h-12 w-full rounded-md" />
    </div>
  );
};

export default StepsSkeleton;

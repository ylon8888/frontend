"use client";

import { motion } from "framer-motion";
import { CiLock } from "react-icons/ci";
import { ChevronDown } from "lucide-react";

const ChapterModulesSkeleton = () => {
  // Mock data for skeleton loading
  const skeletonChapters = Array(5).fill(null);

  return (
    <div className="bg-white container max-w-[1320px] mx-auto px-6 py-8 rounded-lg shadow-sm">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mt-2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      </div>

      {/* Chapter modules skeleton */}
      <div className="mt-8 space-y-4">
        {skeletonChapters.map((_, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex justify-between items-start p-4">
              <div className="space-y-3 w-full">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                {index > 0 ? (
                  <CiLock size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded content skeleton - only shown for first chapter */}
            {index === 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="mt-4 bg-gray-200 rounded-lg p-4 h-48 animate-pulse"></div>
                  <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChapterModulesSkeleton;

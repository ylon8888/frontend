"use client";

import { motion } from "framer-motion";

const BlogCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200 animate-pulse"></div>
      <div className="p-5">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default BlogCardSkeleton;

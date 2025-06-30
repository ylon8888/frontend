"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import { IBlog } from "@/components/modules/AdminDashboard/Blogs/BlogsPageComponent";

interface BlogCardProps {
  blog: IBlog;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={blog?.image || "/placeholder.svg"}
          alt={blog?.title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-800 mb-2">
          Uploaded:{" "}
          {new Date(blog?.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="font-montserrat text-2xl font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
          {blog?.title}
        </h3>
        <p
          className="text-gray-800 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: blog?.description?.split(" ").slice(0, 8).join(" ") + "...",
          }}
        />
        <Link
          href={`/blog/${blog?.id}`}
          className="inline-flex items-center text-secondary hover:text-secondary font-medium hover:font-semibold hover:underline"
        >
          Read More <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;

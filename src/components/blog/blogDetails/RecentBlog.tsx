"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/shared/cards/BlogCard";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blog.admin.api";
import { useParams } from "next/navigation";

const RecentBlog = () => {
  const id = useParams().id;
  const { data } = useGetSingleBlogQuery(id);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-primary">
      <div className="container max-w-[1320px] mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {data?.data?.relatedBlog
            .slice(0, 3)
            .map((blog: any, index: number) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RecentBlog;

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { blogData } from "@/lib/BlogData";
import BlogCard from "../shared/cards/BlogCard";

const Blogs = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(9);

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => Math.min(prev + 3, blogData.length));
  };

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
    <div className="py-16 ">
      <div className="container max-w-[1320px] mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {blogData.slice(0, visibleBlogs).map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </motion.div>

        {visibleBlogs < blogData.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={loadMoreBlogs}
              className="bg-secondary hover:bg-secondary text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              More Blog
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogs;

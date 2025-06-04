"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "../shared/cards/BlogCard";
import { useGetAllBlogQuery } from "@/redux/features/blog/blog.admin.api";
import BlogCardSkeleton from "../shared/skeleton/BlogCardSkeleton";
import { Pagination } from "antd";
import { IBlog } from "../modules/AdminDashboard/Blogs/BlogsPageComponent";

const Blogs = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [objectQuery, setObjectQuery] = useState([
    {
      name: "page",
      value: page,
    },
    {
      name: "pageSize",
      value: pageSize,
    },
  ]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setObjectQuery([
      {
        name: "page",
        value: page,
      },
      {
        name: "pageSize",
        value: pageSize,
      },
    ]);
  }, [page, pageSize]);

  const {
    data: getAllBlogResponse,
    isLoading,
    isFetching,
  } = useGetAllBlogQuery(objectQuery);

  const blogsData: IBlog[] = getAllBlogResponse?.data?.data || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (getAllBlogResponse?.data?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <h2 className="text-3xl md:text-5xl font-medium">No Blogs Found</h2>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container max-w-[1320px] mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {isLoading || isFetching
            ? Array(6)
                .fill(0)
                .map((_, idx) => <BlogCardSkeleton key={idx} index={idx} />)
            : blogsData?.map((blog: IBlog, idx: number) => (
                <BlogCard key={idx} blog={blog} index={idx} />
              ))}
        </motion.div>

        {!isLoading && !isFetching && (
          <div className="p-4 w-full flex justify-center items-center mt-6">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={getAllBlogResponse?.data?.meta?.total}
              onChange={handlePaginationChange}
              className="custom-pagination"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;

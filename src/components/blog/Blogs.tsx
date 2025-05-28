"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "../shared/cards/BlogCard";
import { useGetAllBlogQuery } from "@/redux/features/blog/blog.admin.api";
import Loading from "../ui/core/Loading/Loading";
import { IBlog } from "../modules/AdminDashboard/Blogs/BlogsPageComponent";
import { Pagination } from "antd";

const Blogs = () => {
  // const [visibleBlogs, setVisibleBlogs] = useState(9);
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

  // Handle pagination changes
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

  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (getAllBlogResponse?.data?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <h2 className="text-2xl font-bold">No Blogs Found</h2>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  console.log(blogsData);
  return (
    <div className="py-16 ">
      <div className="container max-w-[1320px] mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {blogsData?.slice(0, 9)?.map((blog: IBlog, idx: number) => (
            <BlogCard key={idx} blog={blog} index={idx} />
          ))}
        </motion.div>
        <div className="p-4 w-full flex justify-center items-center mt-6">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={getAllBlogResponse?.data?.meta?.total}
            // total={20}
            onChange={handlePaginationChange}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;

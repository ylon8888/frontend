"use client";

import { useGetSingleBlogQuery } from "@/redux/features/blog/blog.admin.api";

const BlogDescription = () => {
  const id = window.location.pathname.split("/").pop();
  const { data } = useGetSingleBlogQuery(id);
  return (
    <div className="container max-w-[1320px] mx-auto px-4 py-16 md:py-24">
      <p dangerouslySetInnerHTML={{ __html: data?.data?.blog?.description }} />
    </div>
  );
};

export default BlogDescription;

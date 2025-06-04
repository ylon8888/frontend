"use client";

import { useGetSingleBlogQuery } from "@/redux/features/blog/blog.admin.api";
import { useParams } from "next/navigation";

const BlogDescription = () => {
  const id = useParams().id;
  const { data } = useGetSingleBlogQuery(id);
  return (
    <div className="container max-w-[1320px] mx-auto px-4 py-16 md:py-24">
      <p dangerouslySetInnerHTML={{ __html: data?.data?.blog?.description }} />
    </div>
  );
};

export default BlogDescription;

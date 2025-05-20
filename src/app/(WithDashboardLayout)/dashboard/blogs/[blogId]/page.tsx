import Blog from '@/app/(withCommonLayout)/blog/page';
import BlogDetailsPageComponent from '@/components/modules/AdminDashboard/Blogs/BlogDetailsPage/BlogDetailsPageComponent';
import React from 'react';

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  return (
    <div>
      <BlogDetailsPageComponent blogId={blogId} />
    </div>
  );
};

export default BlogDetails;

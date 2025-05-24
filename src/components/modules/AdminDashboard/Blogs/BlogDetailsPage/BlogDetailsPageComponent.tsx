'use client';
import Loading from '@/components/ui/core/Loading/Loading';
import { useGetSingleBlogQuery } from '@/redux/features/blog/blog.admin.api';
import Image from 'next/image';
import React from 'react';
import { IBlog } from '../BlogsPageComponent';

const BlogDetailsPageComponent = ({ blogId }: { blogId: string }) => {
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetSingleBlogQuery(blogId);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  const blog: IBlog = response?.data?.blog;

  return (
    <main className="max-w-4xl py-8">
      {/* Featured Image */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        {blog?.image ? (
          <Image
            src={
              blog?.image?.includes('localhost')
                ? blog?.image?.replace('localhost', '10.0.10.33')
                : blog?.image
            }
            alt={blog?.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        )}
      </div>

      {/* Article Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {blog?.title || 'No title'}
      </h1>
      <div className="flex items-center text-gray-600 mb-8">
        <span>
          Uploaded Date:{' '}
          {blog?.createdAt
            ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'N/A'}
        </span>
        <span className="mx-2">•</span>
        <span>By Admin</span>
        {/* <span className="mx-2">•</span>
        <span>5 min read</span> */}
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
    </main>
  );
};

export default BlogDetailsPageComponent;

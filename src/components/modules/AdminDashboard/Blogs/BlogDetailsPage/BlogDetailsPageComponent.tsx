import Image from 'next/image';
import React from 'react';

const BlogDetailsPageComponent = ({ blogId }: { blogId: string }) => {
  return (
    <main className="max-w-4xl py-8">
      {/* Featured Image */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src="https://res.cloudinary.com/du68mtlti/image/upload/v1747739861/Image_placehlder_1_dlhezc.png"
          alt="Woman sitting at desk with tablet"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        The Importance of Early Literacy
      </h1>
      <div className="flex items-center text-gray-600 mb-8">
        <span>Uploaded Date: March 5, 2005</span>
        <span className="mx-2">•</span>
        <span>By Sarah Johnson</span>
        <span className="mx-2">•</span>
        <span>5 min read</span>
      </div>
    </main>
  );
};

export default BlogDetailsPageComponent;

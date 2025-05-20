import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TBlogCardProps {
  blog: {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
  };
}

const BlogCard = ({ blog }: TBlogCardProps) => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-md bg-white flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={
            'https://res.cloudinary.com/du68mtlti/image/upload/v1744520403/Frame_1321315189_2_gxtqlh.png'
          }
          alt={'title'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 384px"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-2">
          {blog?.title || 'The Importance of Early Literacy'}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {blog?.description ||
            'Learn why early literacy plays a crucial role in a child’s academic...'}
        </p>
        <div className="flex justify-end mt-auto">
          <Link
            href={`/dashboard/blogs/${blog?.id}`}
            className="!text-secondary text-sm font-medium flex items-center hover:underline"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.2004 10.0803C19.4644 10.0803 19.6804 9.86431 19.6804 9.60031V5.28031C19.6804 5.09791 19.6276 4.92991 19.5388 4.78591C19.5172 4.71151 19.4788 4.63951 19.4188 4.58191C19.3588 4.52191 19.2892 4.48591 19.2148 4.46191C19.0708 4.37311 18.9004 4.32031 18.7204 4.32031H14.4004C14.1364 4.32031 13.9204 4.53631 13.9204 4.80031C13.9204 5.06431 14.1364 5.28031 14.4004 5.28031H18.0412L13.3396 9.98191C13.1524 10.1691 13.1524 10.4739 13.3396 10.6611C13.4332 10.7547 13.5556 10.8027 13.678 10.8027C13.8004 10.8027 13.9228 10.7547 14.0164 10.6611L18.718 5.95951V9.60031C18.718 9.86431 18.934 10.0803 19.198 10.0803H19.2004Z"
                fill="#FD661F"
              />
              <path
                d="M4.32031 15.8403C4.32031 17.9571 6.04351 19.6803 8.16031 19.6803H14.8803C16.9971 19.6803 18.7203 17.9571 18.7203 15.8403V12.4803C18.7203 12.2163 18.5043 12.0003 18.2403 12.0003C17.9763 12.0003 17.7603 12.2163 17.7603 12.4803V15.8403C17.7603 17.4291 16.4691 18.7203 14.8803 18.7203H8.16031C6.57151 18.7203 5.28031 17.4291 5.28031 15.8403V9.12027C5.28031 7.53147 6.57151 6.24027 8.16031 6.24027H11.5203C11.7843 6.24027 12.0003 6.02427 12.0003 5.76027C12.0003 5.49627 11.7843 5.28027 11.5203 5.28027H8.16031C6.04351 5.28027 4.32031 7.00347 4.32031 9.12027V15.8403Z"
                fill="#FD661F"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

'use client';
import React from 'react';
import BlogCard from './BlogCard/BlogCard';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const blogsData = [
  {
    id: 'blog001',
    imageUrl: 'https://example.com/images/tech-trends.jpg',
    title: 'The Future of Technology in 2023',
    description:
      'Exploring the most exciting tech trends that will shape our future this year.',
  },
  {
    id: 'blog002',
    imageUrl: 'https://example.com/images/healthy-eating.jpg',
    title: '10 Tips for Healthy Eating on a Budget',
    description:
      'Learn how to maintain a nutritious diet without breaking the bank.',
  },
  {
    id: 'blog003',
    imageUrl: 'https://example.com/images/travel-photo.jpg',
    title: 'Hidden Gems: Undiscovered Travel Destinations',
    description:
      "Discover breathtaking locations that haven't been overrun by tourists yet.",
  },
  {
    id: 'blog004',
    imageUrl: 'https://example.com/images/home-office.jpg',
    title: 'Creating the Perfect Home Office Setup',
    description:
      'Essential tips for designing a productive and comfortable workspace at home.',
  },
  {
    id: 'blog005',
    imageUrl: 'https://example.com/images/fitness-routine.jpg',
    title: '30-Minute Workout Routines for Busy People',
    description:
      'Effective exercises you can do in half an hour to stay fit with a packed schedule.',
  },
  {
    id: 'blog006',
    imageUrl: 'https://example.com/images/sustainable-living.jpg',
    title: 'Simple Ways to Live More Sustainably',
    description:
      'Practical changes you can make today to reduce your environmental impact.',
  },
  {
    id: 'blog007',
    imageUrl: 'https://example.com/images/book-recommendations.jpg',
    title: 'Must-Read Books of the Year',
    description:
      'Our top picks for the most compelling reads across various genres.',
  },
  {
    id: 'blog008',
    imageUrl: 'https://example.com/images/mental-health.jpg',
    title: 'Mindfulness Techniques for Stress Relief',
    description:
      'Proven methods to help manage anxiety and improve mental wellbeing.',
  },
];

const BlogsPageComponent = () => {
  const router = useRouter();
  return (
    <div className="max-w-[1580px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-[32px] font-bold">Blogs</h2>
        <MyButton
          onClick={() => router.push('/dashboard/blogs/create-blog')}
          label="Add New Blog"
          customIcon={<PlusIcon className="w-5 h-5 text-white" />}
          iconPosition="left"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogsData?.map((blog, idx: number) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPageComponent;

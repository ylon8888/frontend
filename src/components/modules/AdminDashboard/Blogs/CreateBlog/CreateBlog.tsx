'use client';

import RichTextEditor from '@/components/shared/rich-text-editor';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormImageUpload from '@/components/ui/core/MyForm/MyFormImageUpload/MyFormImageUpload';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const addBlogValidationSchema = z.object({
  blogTitle: z
    .string()
    .min(1, 'Blog name is required')
    .max(50, 'Blog name must be less than 50 characters'),
  blogThumbnail: z
    .instanceof(File, { message: 'Thumbnail must be uploaded' })
    .refine((file) => !!file, { message: 'Thumbnail is required' }),
});

export default function CreateBlogPageComponent() {
  const [description, setDescription] = useState('');
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const isEditorEmpty = (html: string) => {
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    return textContent === '';
  };

  const onChange = (content: string) => {
    setDescription(content);
    if (content && !isEditorEmpty(content)) {
      setShowError(false);
    }
  };

  const handleSubmit = (data: any, reset: any) => {
    if (isEditorEmpty(description)) {
      setShowError(true);
      return;
    }

    // Handle form submission with both form data and rich text content
    console.log('New blog data:', {
      ...data,
      description,
    });

    toast.success('Blog added successfully!');

    // Reset form
    reset();
    setDescription('');
    setShowError(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white mx-auto p-6 rounded-lg shadow-md flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(addBlogValidationSchema)}
        >
          <div className="mb-4">
            <MyFormInput
              label="Blog Title"
              name="blogTitle"
              placeHolder="Enter the name of the blog"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-4">
            <MyFormImageUpload
              name="blogThumbnail"
              label="Thumbnail"
              inputClassName="cursor-pointer"
            >
              <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
                <UploadCloud className="w-5 h-5 mr-2" />
                <span className="text-sm text-center font-medium">
                  Upload item image
                </span>
                <p className="mt-1 text-xs text-center text-gray-500">
                  PNG, JPG up to 3MB
                </p>
              </div>
            </MyFormImageUpload>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-base">Blog Description</p>
            <RichTextEditor content={description} onChange={onChange} />
            {showError && isEditorEmpty(description) && (
              <p className="text-red-500 text-base mt-2">
                Description is required
              </p>
            )}
          </div>

          <div className="flex gap-5 justify-end">
            <MyButton
              onClick={() => router.back()}
              label="Cancel"
              className="!bg-slate-300 !text-black"
            />
            <MyButton label="Add Blog" type="submit" />
          </div>
        </MyFormWrapper>
      </div>
    </div>
  );
}

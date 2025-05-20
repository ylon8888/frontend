'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormTextArea from '@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea';
import MyFormVideoUpload from '@/components/ui/core/MyForm/MyFormVideoUpload/MyFormVideoUpload';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { z } from 'zod';

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTopic: (data: any, reset: any) => void;
}

const addTopicValidationSchema = z.object({
  topicName: z
    .string()
    .min(1, 'Topic name is required')
    .max(50, 'Topic name must be less than 50 characters'),
  topicDescription: z
    .string()
    .min(1, 'Topic description is required')
    .max(200, 'Topic description must be less than 200 characters'),
  topicVideo: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB
      'Video must be less than 10MB'
    )
    .refine(
      (file) => ['video/mp4', 'video/webm'].includes(file.type),
      'Only MP4 or WebM videos are allowed'
    )
    .optional(),
});

export default function AddTopicPageComponent() {
  const handleSubmit = (data: any, reset: any) => {
    // Handle adding a new topic
    console.log('New topic data:', data);
    reset();
  };

  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100"'>
      <div className='max-w-md w-full bg-white mx-auto p-6 rounded-lg shadow-md flex flex-col'>
      <h2 className="text-2xl font-bold mb-4">Add New Topic</h2>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(addTopicValidationSchema)}
      >
        <div className="mb-4">
          <MyFormInput
            label="Topic Name"
            // value={preAddedClassData.className}
            name="topicName"
            placeHolder="Enter the name of the topic"
            inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <MyFormTextArea
            label="Topic Description"
            // value={preAddedClassData.classDescription}
            name="topicDescription"
            placeHolder="Topic description"
            inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mb-4">
          {/* <MyFormImageUpload
            name="topicBanner"
            label="Display Image"
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
          </MyFormImageUpload> */}
          <MyFormVideoUpload
            name="topicVideo"
            label="Upload Lecture Video"
            defaultValue=""
          >
            <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
              <UploadCloud className="w-5 h-5 mr-2" />
              <span className="text-sm text-center font-medium">
                Click to upload video
              </span>
              <p className="mt-1 text-xs text-center text-gray-500">
                Format: .mp4 & Max file size: 10 MB
              </p>
            </div>
          </MyFormVideoUpload>
        </div>
        <MyButton label="Next: Add Topics" type="submit" fullWidth isArrow />
      </MyFormWrapper>
    </div>
    </div>
  );
}

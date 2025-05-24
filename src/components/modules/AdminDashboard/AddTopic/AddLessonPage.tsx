import RichTextEditor from '@/components/shared/rich-text-editor';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormTextArea from '@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea';
import MyFormVideoUpload from '@/components/ui/core/MyForm/MyFormVideoUpload/MyFormVideoUpload';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const addTopicValidationSchema = z.object({
  topicName: z
    .string()
    .min(1, 'Topic name is required')
    .max(50, 'Topic name must be less than 50 characters'),
  // topicDescription: z
  //   .string()
  //   .min(1, 'Topic description is required')
  //   .max(200, 'Topic description must be less than 200 characters'),
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

const AddLessonPage = ({ currentStep }: { currentStep: number }) => {
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
    // Handle adding a new topic
    console.log('New topic data:', data);
    reset();
    router.push(`/dashboard/classes/add-topic?step=${currentStep + 1}`);
  };
  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100"'>
      <div className="max-w-xl w-full bg-white mx-auto p-6 rounded-lg shadow-md flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Step-0{currentStep}</h2>
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
            {/* <MyFormTextArea
              label="Topic Description"
              // value={preAddedClassData.classDescription}
              name="topicDescription"
              placeHolder="Topic description"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            /> */}
            <p className="mb-2 text-base">Blog Description</p>
            <RichTextEditor content={description} onChange={onChange} />
            {showError && isEditorEmpty(description) && (
              <p className="text-red-500 text-base mt-2">
                Description is required
              </p>
            )}
          </div>
          <div className="mb-4">
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
          <MyButton label="Next Step" type="submit" fullWidth isArrow />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default AddLessonPage;

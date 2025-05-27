import RichTextEditor from '@/components/shared/rich-text-editor';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormTextArea from '@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea';
import MyFormVideoUpload from '@/components/ui/core/MyForm/MyFormVideoUpload/MyFormVideoUpload';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { useCreateStepMutation } from '@/redux/features/step/step.admin.api';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
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
      (file) => file.size <= 15 * 1024 * 1024, // 10MB
      'Video must be less than 15MB'
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
  const searchParams = useSearchParams();
  const chapterId = searchParams.get('chapterId');

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

  const [createStep] = useCreateStepMutation();

  const handleSubmit = async (data: any, reset: any) => {
    if (isEditorEmpty(description)) {
      setShowError(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', data.topicVideo);
    formData.append(
      'data',
      JSON.stringify({
        stepName: data.topicName,
        stepDescription: description,
      })
    );

    const payload = {
      data: formData,
      stepNumber:
        currentStep === 1
          ? 'one'
          : currentStep === 2
          ? 'two'
          : currentStep === 3
          ? 'three'
          : currentStep === 4
          ? 'four'
          : currentStep === 5
          ? 'five'
          : currentStep === 6
          ? 'six'
          : currentStep === 7
          ? 'seven'
          : currentStep === 8
          ? 'eight'
          : '',
      chapterId: chapterId,
    };
    const res = await handleAsyncWithToast(async () => {
      return createStep(payload);
    });
    if (res?.data?.success) {
      reset();
      router.push(
        `/dashboard/classes/add-topic?step=${
          currentStep + 1
        }&chapterId=${chapterId}`
      );
    }
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
            <p className="mb-2 text-base">Topic Description</p>
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

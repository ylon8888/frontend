'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import {
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UploadProps } from 'antd';
import { Button, Input, Upload, message } from 'antd';
import { useRouter } from 'next/navigation';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the validation schema
const questionAnswerSchema = z.object({
  topicName: z
    .string()
    .min(1, 'Topic name is required')
    .max(50, 'Topic name must be less than 50 characters'),
  video: z.any().optional(),
  questions: z.array(
    z.object({
      question: z.string().min(1, 'Question is required'),
      answer: z.string().min(1, 'Answer is required'),
    })
  ),
});

type QuestionAnswerFormData = z.infer<typeof questionAnswerSchema>;

const AddQAPage = ({ currentStep }: { currentStep?: number }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionAnswerFormData>({
    resolver: zodResolver(questionAnswerSchema),
    defaultValues: {
      topicName: '',
      questions: [{ question: '', answer: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data: QuestionAnswerFormData) => {
    console.log('Form data:', data);
    message.success('Form submitted successfully!');
    reset();
    router.push(`/dashboard/classes/add-topic?step=${currentStep! + 1}`);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', // Replace with your actual upload endpoint
    accept: 'video/*',
    beforeUpload: (file) => {
      const isVideo = file.type === 'video/mp4' || file.type === 'video/webm';
      if (!isVideo) {
        message.error('You can only upload MP4 or WebM video files!');
        return Upload.LIST_IGNORE;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Video must be smaller than 10MB!');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white mx-auto p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Step-0{currentStep}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="topicName" className="block text-gray-700 mb-2">
              Topic Name
            </label>
            <Controller
              name="topicName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="topicName"
                  placeholder="Enter the name of the class"
                  className="w-full"
                  status={errors.topicName ? 'error' : ''}
                />
              )}
            />
            {errors.topicName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.topicName.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="video" className="block text-gray-700 mb-2">
              Upload Video
            </label>
            <Controller
              name="video"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <Upload
                  {...uploadProps}
                  {...field}
                  onChange={(info) => {
                    uploadProps.onChange?.(info);
                    if (info.file.status === 'done') {
                      onChange(info.file.originFileObj);
                    }
                  }}
                  className="w-full"
                >
                  <div className="flex items-center flex-col justify-center text-gray-500 border border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors w-full sm:!w-[400px]">
                    <UploadOutlined className="text-2xl mb-2" />
                    <p className="text-center font-medium">
                      Drop file or brows
                    </p>
                    <p className="text-xs text-center text-gray-400 mt-1">
                      Format: .jpeg, .png & Max file size: 25 MB
                    </p>
                    <Button
                      type="primary"
                      size="small"
                      className="mt-3 bg-blue-500"
                    >
                      Browse Files
                    </Button>
                  </div>
                </Upload>
              )}
            />
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="mb-6">
              <div className="mb-4">
                <label
                  htmlFor={`question-${index}`}
                  className="block text-gray-700 mb-2"
                >
                  Question {String(index + 1).padStart(2, '0')}
                </label>
                <Controller
                  name={`questions.${index}.question`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={`question-${index}`}
                      placeholder="Enter the Question"
                      className="w-full"
                      status={
                        errors.questions?.[index]?.question ? 'error' : ''
                      }
                    />
                  )}
                />
                {errors.questions?.[index]?.question && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.questions[index]?.question?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`answer-${index}`}
                  className="block text-gray-700 mb-2"
                >
                  Answer:
                </label>
                <Controller
                  name={`questions.${index}.answer`}
                  control={control}
                  render={({ field }) => (
                    <Input.TextArea
                      {...field}
                      id={`answer-${index}`}
                      placeholder="Enter the answer"
                      className="w-full"
                      status={errors.questions?.[index]?.answer ? 'error' : ''}
                      autoSize={{ minRows: 2 }}
                    />
                  )}
                />
                {errors.questions?.[index]?.answer && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.questions[index]?.answer?.message}
                  </p>
                )}
              </div>

              {fields.length > 1 && (
                <Button
                  danger
                  onClick={() => remove(index)}
                  className="mt-2"
                  size="small"
                >
                  Remove Question
                </Button>
              )}
            </div>
          ))}

          <Button
            type="dashed"
            onClick={() => append({ question: '', answer: '' })}
            block
            icon={<PlusOutlined />}
            className="mb-6"
          >
            Add New Question
          </Button>

          <MyButton label="Next Step" type="submit" fullWidth isArrow />
        </form>
      </div>
    </div>
  );
};

export default AddQAPage;

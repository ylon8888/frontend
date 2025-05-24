'use client';

import RichTextEditor from '@/components/shared/rich-text-editor';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormImageUpload from '@/components/ui/core/MyForm/MyFormImageUpload/MyFormImageUpload';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormTextArea from '@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from 'antd';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubject: (data: any, reset: any) => void;
}

const addSubjectValidationSchema = z.object({
  subjectName: z
    .string()
    .min(1, 'Subject name is required')
    .max(50, 'Subject name must be less than 50 characters'),
  // subjectDescription: z
  //   .string()
  //   .min(1, 'Subject description is required')
  //   .max(200, 'Subject description must be less than 200 characters'),
  subjectBanner: z.instanceof(File).optional(),
});

export default function AddSubjectModal({
  isOpen,
  onClose,
  onAddSubject,
}: AddSubjectModalProps) {
  const [description, setDescription] = useState('');
  const [showError, setShowError] = useState(false);

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
    onAddSubject(data, reset);
    onClose();
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold">Add New Subject</h2>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      className="add-subject-modal"
      destroyOnHidden={true}
    >
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(addSubjectValidationSchema)}
      >
        <div className="mb-4">
          <MyFormInput
            label="Subject Name"
            // value={preAddedClassData.className}
            name="subjectName"
            placeHolder="Enter the name of the class"
            inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          {/* <MyFormTextArea
            label="Subject Description"
            // value={preAddedClassData.classDescription}
            name="subjectDescription"
            placeHolder="Provide a brief description of the class. This helps students understand the course content and objectives."
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
          <MyFormImageUpload
            name="subjectBanner"
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
          </MyFormImageUpload>
        </div>
        <MyButton label="Next: Add Subjects" type="submit" fullWidth isArrow />
      </MyFormWrapper>
    </Modal>
  );
}

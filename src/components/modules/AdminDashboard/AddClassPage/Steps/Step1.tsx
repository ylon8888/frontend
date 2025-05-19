'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormSelect from '@/components/ui/core/MyForm/MyFormSelect/MyFormSelect';
import MyFormTextArea from '@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type TStepProps = {
  goNext: () => void;
};

const addClassValidationSchema = z.object({
  className: z
    .string({ required_error: 'Class name is required' })
    .min(1, { message: 'Class name is required' })
    .max(50, { message: 'Class name must be less than 50 characters' }),
  classDescription: z
    .string({ required_error: 'Class description is required' })
    .min(1, { message: 'Class description is required' })
    .max(200, {
      message: 'Class description must be less than 200 characters',
    }),
  totalSubjects: z
    .number({ required_error: 'Total subjects is required' })
    .min(1, { message: 'Total subjects is required' })
    .max(20, { message: 'Total subjects must be less than 20' }),
});

const Step1 = ({ goNext }: TStepProps) => {
  const preAddedClassData: any = JSON.parse(
    sessionStorage.getItem('classData') || '{}'
  );

  const handleSubmit = (data: any, reset: any) => {
    sessionStorage.setItem('classData', JSON.stringify(data));
    reset();
    goNext();
  };
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-1">Step 01</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Class Basic Information
          </h1>
        </div>

        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(addClassValidationSchema)}
          defaultValues={{
            totalSubjects: preAddedClassData.totalSubjects, // ✅ ensure this is a number (1–20)
            // other fields...
          }}
        >
          <div className="mb-4">
            <MyFormInput
              label="Class Name"
              value={preAddedClassData.className}
              name="className"
              placeHolder="Enter the name of the class"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-4">
            <MyFormTextArea
              label="Class Description"
              value={preAddedClassData.classDescription}
              name="classDescription"
              placeHolder="Provide a brief description of the class. This helps students understand the course content and objectives."
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-6">
            <div className="relative">
              <MyFormSelect
                label="Select Total Subjects"
                defaultValue={preAddedClassData.totalSubjects}
                name="totalSubjects"
                options={Array.from({ length: 20 }, (_, i) => ({
                  value: i + 1,
                  label: `${i + 1} Subject${i > 0 ? 's' : ''}`,
                }))}
                className="w-full cursor-pointer appearance-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                placeHolder="Select total subjects"
              />
            </div>
          </div>
          <MyButton
            label="Next: Add Subjects"
            className='!text-white'
            type="submit"
            fullWidth
            isArrow
          />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default Step1;

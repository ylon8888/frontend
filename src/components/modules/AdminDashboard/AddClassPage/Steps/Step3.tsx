'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Subject {
  name: string;
}

type TStepProps = {
  goNext: () => void;
  goBack: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const Step3 = ({ goNext, goBack, setCurrentStep }: TStepProps) => {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[] | any>([]);

  // Load class data from session storage
  useEffect(() => {
    const classDataString = sessionStorage.getItem('classData');
    if (!classDataString) {
      router.push('/dashboard/classes/add-class');
      setCurrentStep(1);
      return;
    }

    const classData = JSON.parse(classDataString);
    const savedSubjects: string[] = classData.subjects || [];

    setSubjects(savedSubjects);
  }, [router, setCurrentStep]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">All Subject</h1>
        </div>

        <div className="space-y-3 mb-6">
          {subjects.map((subject: string, index: number) => (
            <button
              key={index}
              className="w-full text-left p-4 cursor-pointer border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <div>
                <h3 className="text-gray-800 font-medium">{subject}</h3>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <MyButton
            className="!bg-gray-200 !text-gray-800 !hover:bg-gray-300 transition duration-200"
            onClick={goBack}
            label="< Previous"
            fullWidth
          />
          <MyButton onClick={goNext} label="Finish" fullWidth isArrow />
        </div>
      </div>
    </div>
  );
};

export default Step3;

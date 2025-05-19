'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddSubjectModal from './AddSubjectModal/AddSubjectModal';
import { set } from 'react-hook-form';

interface Subject {
  subjectName: string;
  subjectDescription: string;
  enabled: boolean;
}

type TStepProps = {
  goNext: () => void;
  goBack: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const Step2 = ({ goNext, goBack, setCurrentStep }: TStepProps) => {
  const router = useRouter();

  // const [subjects, setSubjects] = useState<Subject[]>([
  //   { name: 'Mathematic', enabled: false },
  //   { name: 'English Language Arts', enabled: false },
  //   { name: 'Social Studies', enabled: false },
  //   { name: 'Science', enabled: false },
  //   { name: 'Computer Science', enabled: false },
  //   { name: 'Biology', enabled: false },
  //   { name: 'Physics', enabled: false },
  //   { name: 'Chemistry', enabled: false },
  //   { name: 'Art', enabled: false },
  // ]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);
  const [refetch, setRefetch] = useState(false);

  // Load class data from session storage
  useEffect(() => {
    const classDataString = sessionStorage.getItem('classData');
    if (!classDataString) {
      router.push('/dashboard/classes/add-class');
      setCurrentStep(1);
      return;
    }
    const classData = JSON.parse(classDataString);
    const savedSubjects: Subject[] = classData.subjects || [];
    setSubjects(savedSubjects);
  }, [router, setCurrentStep, refetch]);

  const toggleSubject = (subjectName: string) => {
    const classData = JSON.parse(sessionStorage.getItem('classData') || '{}');
    const updatedSubjects = (classData.subjects || []).map((subject: any) => {
      if (subject.subjectName === subjectName) {
        return { ...subject, enabled: !subject.enabled };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
    const updatedClassData = {
      ...classData,
      subjects: updatedSubjects,
    };
    sessionStorage.setItem('classData', JSON.stringify(updatedClassData));
  };

  const handleSubmit = () => {
    goNext();
  };

  const handleAddSubject = (data: any, reset: any) => {
    const preAddedClassData: any = JSON.parse(
      sessionStorage.getItem('classData') || '{}'
    );
    const updatedClassData = {
      ...preAddedClassData,
      subjects: [
        ...(preAddedClassData.subjects ?? []),
        { ...data, enabled: true },
      ],
    };
    sessionStorage.setItem('classData', JSON.stringify(updatedClassData));
    setRefetch(!refetch);
    reset();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-1">Step 02</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Add Subjects
          </h1>
        </div>

        <div className="mb-6">
          {subjects.length > 0 ? (
            <h3 className="text-gray-800 font-medium mb-4">
              Add Subjects to Class
            </h3>
          ) : (
            ''
          )}

          <div className="space-y-3">
            {subjects.map((subject, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-gray-800">{subject.subjectName}</span>
                <button
                  type="button"
                  onClick={() => toggleSubject(subject.subjectName)}
                  className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    subject.enabled ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={subject.enabled}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      subject.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {showNewSubjectInput ? (
          <AddSubjectModal
            isOpen={showNewSubjectInput}
            onClose={() => setShowNewSubjectInput(false)}
            onAddSubject={handleAddSubject}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowNewSubjectInput(true)}
            className="flex items-center text-gray-700 cursor-pointer font-medium gap-1 mb-6 hover:text-gray-900"
          >
            <PlusIcon className="w-5 h-5 text-black" />
            Add New Subject
          </button>
        )}

        <div className="flex !space-x-4 mt-5">
          <MyButton
            className="!bg-gray-200 !text-gray-800 !border-0 !hover:bg-gray-300 transition duration-200"
            onClick={goBack}
            label="< Previous"
            fullWidth
            variant="outline"
          />
          <MyButton onClick={handleSubmit} label="Next" fullWidth />
        </div>
      </div>
    </div>
  );
};

export default Step2;

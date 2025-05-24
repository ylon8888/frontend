'use client';

import Loading from '@/components/ui/core/Loading/Loading';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import { useGetAllSubjectQuery } from '@/redux/features/subject/subject.admin.api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type TSubject = {
  id: string;
  classId: string;
  subjectName: string;
  subjectDescription: string;
  banner: string;
  isVisible: boolean;
  createdAt: string; // or Date if you're converting to Date objects
  updatedAt: string; // or Date
};

type TStepProps = {
  goNext: () => void;
  goBack: () => void;
};

const Step3 = ({ goNext, goBack }: TStepProps) => {
  const router = useRouter();
  const [subjects, setSubjects] = useState<TSubject[]>([]);

  useEffect(() => {
    const classID = JSON.parse(sessionStorage.getItem('classId') || '{}');
    if (!classID) {
      toast.error('No class data found. Redirecting...');
      router.push('/dashboard/classes/add-class');
      return;
    }
  }, [router]);

  const classID = JSON.parse(sessionStorage.getItem('classId') || '{}');

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllSubjectQuery(classID, { skip: !classID });

  useEffect(() => {
    if (response?.data?.subject) {
      setSubjects(response.data.subject);
    }
  }, [response]);

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-1">Step 03</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            All Subjects
          </h1>
        </div>

        <div className="space-y-3 mb-6">
          {subjects?.length > 0 ? (
            subjects?.filter((subject) => subject.isVisible)?.map((subject, index) => (
              <div
                key={index}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <div>
                  <h3 className="text-gray-800 font-medium">
                    {subject.subjectName}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No subjects added yet.</p>
          )}
        </div>

        <div className="flex !space-x-4 mt-5">
          <MyButton
            className="!bg-gray-200 !text-gray-800 !border-0 !hover:bg-gray-300 transition duration-200"
            onClick={goBack}
            label="< Previous"
            fullWidth
            variant="outline"
          />
          <MyButton onClick={goNext} label="Finish" fullWidth isArrow />
        </div>
      </div>
    </div>
  );
};

export default Step3;

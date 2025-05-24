'use client';

import Loading from '@/components/ui/core/Loading/Loading';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import {
  useCreateSubjectMutation,
  useGetAllSubjectQuery,
  useUpdateSubjectVisibilityMutation,
} from '@/redux/features/subject/subject.admin.api';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddSubjectModal from './AddSubjectModal/AddSubjectModal';


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

const Step2 = ({ goNext, goBack }: TStepProps) => {
  const router = useRouter();
  const [subjects, setSubjects] = useState<TSubject[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  const [createSubject] = useCreateSubjectMutation();
  const [updateVisibility] = useUpdateSubjectVisibilityMutation();

  const handleAddSubject = async (data: any, reset: () => void) => {
    const { subjectBanner, ...rest } = data;
    const formData = new FormData();
    formData.append('file', subjectBanner);
    formData.append('data', JSON.stringify(rest));
    const res = await handleAsyncWithToast(async () => {
      return createSubject({ data: formData, classID: classID });
    });
    if (res?.data?.success) {
      setShowModal(false);
      reset();
      toast.success('Subject added successfully!');
    }
  };

  const toggleSubject = async (id: string, isVisible: boolean) => {
    await handleAsyncWithToast(async () => {
      return updateVisibility({ id, action: { isVisible } });
    });
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-1">Step 02</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Add Subjects
          </h1>
        </div>

        {subjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-800 font-medium mb-4">
              Add Subjects to Class
            </h3>
            <div className="space-y-3">
              {subjects.map((subject, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-800">{subject.subjectName}</span>
                  <button
                    type="button"
                    onClick={() =>
                      toggleSubject(subject?.id, !subject.isVisible)
                    }
                    className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      subject.isVisible ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={subject.isVisible}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        subject.isVisible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showModal ? (
          <AddSubjectModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onAddSubject={handleAddSubject}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center text-gray-700 cursor-pointer font-medium gap-1 mb-6 hover:text-gray-900"
          >
            <PlusIcon className="w-5 h-5 text-black" />
            Add New Subject
          </button>
        )}

        <div className="flex space-x-4 mt-5">
          <MyButton
            className="!bg-gray-200 !text-gray-800 !border-0 !hover:bg-gray-300 transition duration-200"
            onClick={goBack}
            label="< Previous"
            fullWidth
            variant="outline"
          />
          <MyButton onClick={goNext} label="Next" fullWidth />
        </div>
      </div>
    </div>
  );
};

export default Step2;

'use client';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import AddSubjectModal from '../AddClassPage/Steps/AddSubjectModal/AddSubjectModal';
import {
  useCreateSubjectMutation,
  useGetAllSubjectQuery,
} from '@/redux/features/subject/subject.admin.api';
import Loading from '@/components/ui/core/Loading/Loading';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { toast } from 'sonner';

type TSingleClassProps = {
  classId: string;
};

export type TSubject = {
  id: string;
  classId: string;
  subjectName: string;
  subjectDescription: string;
  banner: string;
  isVisible: boolean;
  createdAt: string; // or Date if you're converting to Date objects
  updatedAt: string; // or Date
  _count: {
    courseEnrolls: number;
    chapters: number;
  },
  totalLessons: number;
};

const SubjectsPageComponent = ({ classId }: TSingleClassProps) => {
  const router = useRouter();
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);
  // const subjects = [
  //   {
  //     id: '1',
  //     name: 'Mathematics',
  //     description: 'The study of numbers, shapes, and patterns.',
  //     image: 'https://example.com/images/mathematics.jpg',
  //   },
  //   {
  //     id: '2',
  //     name: 'Physics',
  //     description: 'The science of matter, motion, energy, and force.',
  //     image: 'https://example.com/images/physics.jpg',
  //   },
  //   {
  //     id: '3',
  //     name: 'Chemistry',
  //     description:
  //       'The study of substances, their properties, and how they interact.',
  //     image: 'https://example.com/images/chemistry.jpg',
  //   },
  //   {
  //     id: '4',
  //     name: 'Biology',
  //     description: 'The study of living organisms and life processes.',
  //     image: 'https://example.com/images/biology.jpg',
  //   },
  //   {
  //     id: '5',
  //     name: 'History',
  //     description: 'The study of past events and human civilization.',
  //     image: 'https://example.com/images/history.jpg',
  //   },
  //   {
  //     id: '6',
  //     name: 'Geography',
  //     description: "The study of Earth's landscapes, environments, and places.",
  //     image: 'https://example.com/images/geography.jpg',
  //   },
  // ];

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllSubjectQuery(classId);

  const subjects: TSubject[] = response?.data?.subject || [];
  const [createSubject] = useCreateSubjectMutation();

  const handleAddSubject = async (data: any, reset: () => void) => {
    const { subjectBanner, ...rest } = data;
    const formData = new FormData();
    formData.append('file', subjectBanner);
    formData.append('data', JSON.stringify(rest));
    const res = await handleAsyncWithToast(async () => {
      return createSubject({ data: formData, classID: classId });
    });
    if (res?.data?.success) {
      setShowNewSubjectInput(false);
      reset();
      toast.success('Subject added successfully!');
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (subjects.length === 0) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-200px)] items-center justify-center w-full h-full gap-3">
        <h1 className="font-['Montserrat',Helvetica] font-semibold text-[#101010] text-2xl sm:text-[32px] leading-[1.4]">
          No Subject Found
        </h1>
        <p className="font-['Montserrat',Helvetica] font-normal text-[#101010] text-base sm:text-lg leading-[1.4]">
          You don&apos;t have any subject yet.
        </p>
        <MyButton
          onClick={() => setShowNewSubjectInput(true)}
          label="Add New Subject"
          customIcon={<PlusIcon className="w-5 h-5 text-white" />}
          iconPosition="left"
        />
        {showNewSubjectInput ? (
          <AddSubjectModal
            isOpen={showNewSubjectInput}
            onClose={() => setShowNewSubjectInput(false)}
            onAddSubject={handleAddSubject}
          />
        ) : (
          ''
        )}
      </div>
    );
  }

  return (
    <section className="flex flex-col w-full max-w-[1580px] items-start gap-6">
      <div className="flex flex-col items-start gap-5 w-full">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
          <h1 className="font-['Montserrat',Helvetica] font-semibold text-[#101010] text-2xl sm:text-[32px] leading-[1.4]">
            All Subject
          </h1>
          <MyButton
            onClick={() => setShowNewSubjectInput(true)}
            label="Add New Subject"
            customIcon={<PlusIcon className="w-5 h-5 text-white" />}
            iconPosition="left"
          />
          {showNewSubjectInput ? (
            <AddSubjectModal
              isOpen={showNewSubjectInput}
              onClose={() => setShowNewSubjectInput(false)}
              onAddSubject={handleAddSubject}
            />
          ) : (
            ''
          )}
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {subjects?.map((subject) => (
            <div
              key={subject.id}
              onClick={() =>
                router.push(
                  `/dashboard/classes/subjects/${classId}/chapters/${subject.id}`
                )
              }
              className="border cursor-pointer border-neutral-300 rounded-2xl p-6 bg-white"
            >
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="flex items-center gap-5 justify-between w-full">
                    <h2 className="font-['Montserrat',Helvetica] font-semibold text-heading text-xl sm:text-2xl tracking-[0.48px] leading-[1.4]">
                      {subject.subjectName}
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="16"
                      viewBox="0 0 32 16"
                      fill="none"
                    >
                      <path
                        d="M31.6334 7.11518L31.6322 7.114L25.1007 0.613996C24.6114 0.127058 23.82 0.128871 23.3329 0.618246C22.8459 1.10756 22.8478 1.899 23.3371 2.386L27.7224 6.75H1.25C0.559625 6.75 0 7.30962 0 8C0 8.69037 0.559625 9.25 1.25 9.25H27.7223L23.3372 13.614C22.8479 14.101 22.846 14.8924 23.333 15.3817C23.8201 15.8712 24.6116 15.8729 25.1008 15.386L31.6323 8.88599L31.6334 8.88481C32.123 8.39618 32.1214 7.60218 31.6334 7.11518Z"
                        fill="#0B7077"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6]">
                      Total Chapter - {subject?._count?.chapters ?? 0}
                    </p>
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6] whitespace-nowrap">
                      Total Enrolled Student - {subject?._count?.courseEnrolls ?? 0}
                    </p>
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6] whitespace-nowrap">
                      Total Lesson - {subject?.totalLessons ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsPageComponent;

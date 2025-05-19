'use client';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddSubjectModal from '../AddClassPage/Steps/AddSubjectModal/AddSubjectModal';

type TSingleClassProps = {
  classId: string;
};

const SubjectsPageComponent = ({ classId }: TSingleClassProps) => {
  const router = useRouter();
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);
  const subjects = [
    {
      id: '1',
      name: 'Mathematics',
      description: 'The study of numbers, shapes, and patterns.',
      image: 'https://example.com/images/mathematics.jpg',
    },
    {
      id: '2',
      name: 'Physics',
      description: 'The science of matter, motion, energy, and force.',
      image: 'https://example.com/images/physics.jpg',
    },
    {
      id: '3',
      name: 'Chemistry',
      description:
        'The study of substances, their properties, and how they interact.',
      image: 'https://example.com/images/chemistry.jpg',
    },
    {
      id: '4',
      name: 'Biology',
      description: 'The study of living organisms and life processes.',
      image: 'https://example.com/images/biology.jpg',
    },
    {
      id: '5',
      name: 'History',
      description: 'The study of past events and human civilization.',
      image: 'https://example.com/images/history.jpg',
    },
    {
      id: '6',
      name: 'Geography',
      description: "The study of Earth's landscapes, environments, and places.",
      image: 'https://example.com/images/geography.jpg',
    },
  ];

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
    reset();
  };

  return (
    <section className="flex flex-col w-full max-w-[1580px] items-start gap-6">
      <div className="flex flex-col items-start gap-5 w-full">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
          <h1 className="font-['Montserrat',Helvetica] font-semibold text-[#101010] text-2xl sm:text-[32px] leading-[1.4]">
            Class 9 All Subject
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
              onClick={() => router.push(`/dashboard/classes/${classId}/${subject.id}`)}
              className="border cursor-pointer border-neutral-300 rounded-2xl p-6 bg-white"
            >
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="flex items-center gap-5 justify-between w-full">
                    <h2 className="font-['Montserrat',Helvetica] font-semibold text-heading text-xl sm:text-2xl tracking-[0.48px] leading-[1.4]">
                      {subject.name}
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
                      Total Chapter - 12
                    </p>
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6] whitespace-nowrap">
                      Total Enrolled Student - 200
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

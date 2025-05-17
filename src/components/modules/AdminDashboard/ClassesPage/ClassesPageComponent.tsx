import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ClassesPageComponent = () => {
  const classData = [
    {
      id: 1,
      name: 'Class 09',
      subjects: 9,
      chapters: 14,
      lessons: 56,
    },
    {
      id: 2,
      name: 'Class 10',
      subjects: 9,
      chapters: 14,
      lessons: 56,
    },
    {
      id: 3,
      name: 'Class 11',
      subjects: 9,
      chapters: 14,
      lessons: 56,
    },
    {
      id: 4,
      name: 'Class 12',
      subjects: 9,
      chapters: 14,
      lessons: 56,
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-[1580px] items-start gap-6">
      <div className="flex flex-col items-start gap-5 w-full">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
          <h1 className="font-['Montserrat',Helvetica] font-semibold text-[#101010] text-2xl sm:text-[32px] leading-[1.4]">
            All Classes
          </h1>
          <Link href={'/dashboard/classes/add-class'}>
            <MyButton
              label="Add New Class"
              customIcon={<PlusIcon className="w-5 h-5 text-white" />}
              iconPosition="left"
            />
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {classData.map((classItem) => (
            <div
              key={classItem.id}
              className="border border-neutral-300 rounded-2xl p-6 bg-white"
            >
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h2 className="font-['Montserrat',Helvetica] font-semibold text-heading text-xl sm:text-2xl tracking-[0.48px] leading-[1.4]">
                    {classItem.name}
                  </h2>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6]">
                      Total Subject - {classItem.subjects}
                    </p>
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6]">
                      Total Chapter - {classItem.chapters}
                    </p>
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6] whitespace-nowrap">
                      Total Lesson - {classItem.lessons}
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

export default ClassesPageComponent;

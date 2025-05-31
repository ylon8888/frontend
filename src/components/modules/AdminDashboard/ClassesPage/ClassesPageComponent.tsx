'use client';
import Loading from '@/components/ui/core/Loading/Loading';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import { useGetAllClassQuery } from '@/redux/features/class/class.admin.api';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type TClass = {
  id: string;
  className: string;
  classDescription: string; // contains HTML string
  isDeleted: boolean;
  createdAt: string; // or Date if you're converting it
  updatedAt: string; // or Date
  totalSubjects: number;
  totalChapters: number;
  lessons: number;
};

const ClassesPageComponent = () => {
  const router = useRouter();
  // const classData = [
  //   {
  //     id: 1,
  //     name: 'Class 09',
  //     subjects: 9,
  //     chapters: 14,
  //     lessons: 56,
  //   },
  //   {
  //     id: 2,
  //     name: 'Class 10',
  //     subjects: 9,
  //     chapters: 14,
  //     lessons: 56,
  //   },
  //   {
  //     id: 3,
  //     name: 'Class 11',
  //     subjects: 9,
  //     chapters: 14,
  //     lessons: 56,
  //   },
  //   {
  //     id: 4,
  //     name: 'Class 12',
  //     subjects: 9,
  //     chapters: 14,
  //     lessons: 56,
  //   },
  // ];

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllClassQuery(undefined);

  const classData: TClass[] = response?.data?.data;

  if (isLoading || isFetching) return <Loading />;

  if (response?.data?.data?.length === 0)
    return (
      <div className="flex flex-col min-h-[calc(100vh-200px)] items-center justify-center w-full h-full gap-3">
        <h1 className="font-['Montserrat',Helvetica] font-semibold text-[#101010] text-2xl sm:text-[32px] leading-[1.4]">
          No Class Found
        </h1>
        <p className="font-['Montserrat',Helvetica] font-normal text-[#101010] text-base sm:text-lg leading-[1.4]">
          You don&apos;t have any class yet.
        </p>
        <Link href={'/dashboard/classes/add-class'}>
          <MyButton
            label="Add New Class"
            customIcon={<PlusIcon className="w-5 h-5 text-white" />}
            iconPosition="left"
          />
        </Link>
      </div>
    );

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
          {classData?.map((classItem) => (
            <div
              key={classItem.id}
              onClick={() =>
                router.push(`/dashboard/classes/subjects/${classItem.id}`)
              }
              className="border cursor-pointer border-neutral-300 rounded-2xl p-6 bg-white"
            >
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="flex items-center gap-5 justify-between w-full">
                    <h2 className="font-['Montserrat',Helvetica] font-semibold text-heading text-xl sm:text-2xl tracking-[0.48px] leading-[1.4]">
                      {classItem.className}
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
                      Total Subject - {classItem.totalSubjects}
                    </p>
                    <p className="font-['Poppins',Helvetica] font-normal text-main-text text-sm sm:text-base leading-[1.6]">
                      Total Chapter - {classItem.totalChapters}
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

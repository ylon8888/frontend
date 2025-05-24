'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import AddChapterModal from './AddChapterModal/AddChapterModal';
import { useGetAllChapterQuery } from '@/redux/features/chapter/chapter.admin.api';
import Loading from '@/components/ui/core/Loading/Loading';

export type TChapter = {
  id: string;
  chapterName: string;
  chapterDescription: string;
  thumbnail: string; // URL to the image
};

export type TSubject = {
  id: string;
  subjectName: string;
  subjectDescription: string;
  banner: string;
};



const ChaptersPageComponent = ({ subjectId }: { subjectId: string }) => {
  const params = useParams();
  const classId = params.classId as string;
  const router = useRouter();
  const [showAddNewChapterModal, setShowAddNewChapterModal] = useState(false);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllChapterQuery(subjectId);

  const chapters: TChapter[] = response?.data?.data?.chapters;
  const subject: TSubject = response?.data?.data?.subject;

  const handleAddNewChapter = (data: any, reset: any) => {
    // In a real application, this would open a form to add a new chapter
    console.log(data);
    reset();
    router.push('/dashboard/classes/add-topic?step=1');
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (!chapters) {
    return <div>No chapters found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1580px]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {subject?.subjectName || 'N/A'}
          </h1>
          <MyButton
            onClick={() => setShowAddNewChapterModal(true)}
            label="Add New Chapter"
            customIcon={<PlusIcon className="w-5 h-5 text-white" />}
            iconPosition="left"
          />
          {showAddNewChapterModal ? (
            <AddChapterModal
              isOpen={showAddNewChapterModal}
              onClose={() => setShowAddNewChapterModal(false)}
              onAddChapter={handleAddNewChapter}
            />
          ) : (
            ''
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chapters.map((chapter: TChapter) => (
            <div
              key={chapter?.id}
              onClick={() => {
                router.push(
                  `/dashboard/classes/subjects/${classId}/chapters/${subjectId}/students/${chapter?.id}`
                );
              }}
              className="bg-white rounded-lg border border-gray-200 hover:border-secondary cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg md:text-[20px] font-semibold text-gray-900">
                    Chapter {chapter?.id}: {chapter?.chapterName}
                  </h2>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    <span className="text-sm font-medium text-gray-700">
                      Objective:
                    </span>{' '}
                    {chapter?.chapterDescription}
                  </p>
                </div>

                {/* <p className="text-sm text-gray-500 mb-3">
                  Instructor by: {chapter.instructor}
                </p> */}

                <div className="relative mt-auto rounded-md overflow-hidden">
                  <Image
                    src={chapter?.thumbnail || '/placeholder.svg'}
                    alt={`Thumbnail for ${chapter?.chapterName}`}
                    width={350}
                    height={200}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          opacity="0.4"
                          d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                          fill="#FD661F"
                        />
                        <path
                          d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                          stroke="#FD661F"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChaptersPageComponent;

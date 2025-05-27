'use client';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import AddChapterModal from './AddChapterModal/AddChapterModal';
import {
  useCreateChapterMutation,
  useGetAllChapterQuery,
} from '@/redux/features/chapter/chapter.admin.api';
import Loading from '@/components/ui/core/Loading/Loading';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';

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

  const [createChapter] = useCreateChapterMutation();

  const handleAddNewChapter = async (data: any, reset: any) => {
    const { chapterBanner, ...rest } = data;
    const formData = new FormData();
    formData.append('data', JSON.stringify(rest));
    formData.append('file', chapterBanner);
    const res = await handleAsyncWithToast(async () => {
      return createChapter({ data: formData, subjectId: subjectId });
    });
    if (res?.data?.success) {
      setShowAddNewChapterModal(false);
      reset();
      router.push(`/dashboard/classes/add-topic?step=1&chapterId=${res?.data?.data?.chapter?.id}`);
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (chapters?.length === 0) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-200px)] items-center justify-center w-full h-full gap-3">
        <h1 className="font-['Montserrat',Helvetica] font-semibold text-[#101010] text-2xl sm:text-[32px] leading-[1.4]">
          No Chapter Found
        </h1>
        <p className="font-['Montserrat',Helvetica] font-normal text-[#101010] text-base sm:text-lg leading-[1.4]">
          You don&apos;t have any chapter yet.
        </p>
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
    );
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
          {chapters?.map((chapter: TChapter) => (
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
                    Chapter: {chapter?.chapterName}
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: chapter?.chapterDescription,
                      }}
                    />
                  </p>
                </div>

                {/* <p className="text-sm text-gray-500 mb-3">
                  Instructor by: {chapter.instructor}
                </p> */}

                {/* <div className="relative mt-auto rounded-md overflow-hidden">
                  <Image
                    src={
                      chapter?.thumbnail?.includes('localhost')
                        ? chapter?.thumbnail?.replace('localhost', '10.0.10.33')
                        : chapter?.thumbnail
                    }
                    alt={`Thumbnail for ${chapter?.chapterName}`}
                    width={350}
                    height={200}
                    className="w-full h-auto"
                  />
                </div> */}
                {/* show skeleton as fallback of image */}
                <div className="relative mt-auto rounded-md overflow-hidden bg-gray-200 animate-pulse h-[200px] w-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="32"
                      height="32"
                      rx="4"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 32l8-8 8 8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                  </svg>
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

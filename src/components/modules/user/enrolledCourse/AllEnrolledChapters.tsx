"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Play, CheckCircle, Lock } from "lucide-react";
import Image from "next/image";
import { useCoursesOfChapterQuery } from "@/redux/features/userDashboard/userApi";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AllEnrolledChapters() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  // const id = window.location.pathname.split("/")[3];

  const id = useParams().id;
  const { data } = useCoursesOfChapterQuery(id);
  const subject = data?.data?.enroll?.subject || {};
  const chapters = subject?.chapters || [];

  const handleCardClick = (chapterSL: string) => {
    setExpandedChapter(expandedChapter === chapterSL ? null : chapterSL);
  };

  // Determine if a chapter is unlocked
  const isChapterUnlocked = (chapter: any, index: number) => {
    // First chapter is always unlocked
    if (index === 0) return true;

    // Check if previous chapter is completed
    const prevChapter = chapters[index - 1];
    return prevChapter?.userChapterProgress?.[0]?.isCompleted === true;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">{subject?.subjectName}</h1>
        <p
          className="text-gray-600"
          dangerouslySetInnerHTML={{
            __html: subject?.subjectDescription,
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter: any, index: number) => {
          const isExpanded = expandedChapter === chapter.sLNumber;
          const isCompleted =
            chapter?.userChapterProgress?.[0]?.isCompleted === true;
          const isUnlocked = isChapterUnlocked(chapter, index);
          const status = isCompleted
            ? "complete"
            : isUnlocked
            ? "in-progress"
            : "locked";

          return (
            <div
              key={chapter?.sLNumber}
              className={`overflow-hidden transition-all duration-200 hover:shadow-md rounded-lg bg-white ${
                status === "locked"
                  ? "opacity-60 cursor-not-allowed shadow-none"
                  : "cursor-pointer"
              }`}
              onClick={() =>
                status !== "locked" && handleCardClick(chapter?.sLNumber)
              }
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  {status === "complete" && (
                    <div className="flex items-center text-green-600 font-medium text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Chapter Completed
                    </div>
                  )}
                  {status === "in-progress" && (
                    <div className="flex items-center text-secondary font-medium text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-1"></div>
                      In Progress
                    </div>
                  )}
                  {status === "locked" && (
                    <div className="flex items-center text-gray-500 font-medium text-sm">
                      <Lock className="w-4 h-4 mr-1" />
                      Locked
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  Chapter {chapter?.sLNumber}: {chapter?.chapterName}
                </h3>

                <p
                  className="text-gray-600 text-sm mb-4"
                  dangerouslySetInnerHTML={{
                    __html: chapter?.chapterDescription,
                  }}
                />

                {status === "complete" && (
                  <Link
                    href={`/user/enrolled-courses/${subject?.id}/${chapter?.id}`}
                    className="bg-green-600 hover:bg-green-700 text-white text-base px-4 py-2 rounded-lg"
                  >
                    View Result
                  </Link>
                )}

                {status === "in-progress" && (
                  <div className="flex justify-between mt-4">
                    <Link
                      href={`/courses/${subject?.id}/chapters/${chapter?.id}`}
                      className="!bg-secondary !hover:bg-orange-600 !text-white !text-base !px-7 !py-2 !rounded-lg"
                    >
                      Continue
                    </Link>
                    <Link
                      href={`/user/enrolled-courses/${subject?.id}/${chapter?.id}`}
                      className="!bg-primary !hover:bg-orange-600 !text-white !text-base !px-7 !py-2 !rounded-lg"
                    >
                      See Progress
                    </Link>
                  </div>
                )}

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {status !== "locked" && chapter?.thumbnail && (
                      <Link
                        href={`/user/enrolled-courses/${subject?.id}/${chapter?.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                          <Image
                            src={
                              chapter?.thumbnail ||
                              `/placeholder.svg?height=180&width=320`
                            }
                            alt={`${chapter?.chapterName} thumbnail`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white hover:scale-105 transition cursor-pointer">
                              <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {status === "in-progress" && (
                      <p className="text-sm text-red-500 mt-3 flex items-center">
                        <span className="text-red-500 font-bold mr-1">!</span>
                        Complete each nine steps to unlock your Next Chapter!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

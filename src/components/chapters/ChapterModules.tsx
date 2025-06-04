"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { CiLock } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ChapterModulesSkeleton from "../shared/skeleton/ChapterModulesSkeleton";

const ChapterModules = ({
  chapters,
  isLoading,
}: {
  chapters: any;
  isLoading: boolean;
}) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  // Extract chapters from the API response
  const chapterList = chapters?.chapters || [];
  const subjectId = chapters?.subject?.id;

  const toggleChapter = (chapterId: string) => {
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterId);
    }
  };

  // Determine if a chapter is unlocked
  const isChapterUnlocked = (chapter: any, index: number) => {
    // First chapter is always unlocked
    if (index === 0) return true;

    // Check if previous chapter is completed
    const prevChapter = chapterList[index - 1];
    return prevChapter?.userChapterProgress?.[0]?.isCompleted === true;
  };

  if (isLoading || !chapters) {
    return <ChapterModulesSkeleton />;
  }

  return (
    <div className="bg-white container max-w-[1320px] mx-auto px-6 py-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <span className="text-secondary font-medium text-xs sm:text-sm tracking-wide uppercase">
          {chapters?.subject?.class?.className}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2 mb-3 sm:mb-4 text-gray-900">
          {chapters?.subject?.subjectName}
        </h1>
        <p
          className="text-gray-600 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: chapters?.subject?.subjectDescription,
          }}
        />
      </div>

      {/* Chapter modules content */}
      <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
        {chapterList.map((chapter: any, index: number) => {
          const isUnlocked = isChapterUnlocked(chapter, index);
          const isActive = expandedChapter === chapter.id;
          const isCompleted =
            chapter?.userChapterProgress?.[0]?.isCompleted === true;

          return (
            <motion.div
              key={chapter.id}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                isCompleted
                  ? "border-green-500 shadow-md"
                  : isActive
                  ? "border-orange-500 shadow-md"
                  : "border-gray-200"
              } ${!isUnlocked ? "opacity-70" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={isUnlocked ? { scale: 1.005 } : {}}
            >
              <div
                className={`flex flex-col sm:flex-row justify-between items-start p-3 sm:p-4 ${
                  isUnlocked ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={() => isUnlocked && toggleChapter(chapter.id)}
              >
                <div className="space-y-1 sm:space-y-2 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h2 className="font-montserrat text-lg sm:text-xl font-semibold">
                      Chapter {chapter?.sLNumber}: {chapter?.chapterName}
                    </h2>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-green-600">
                        <Check size={14} className="shrink-0" />
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-medium">Objective:</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: chapter?.chapterDescription,
                      }}
                    />
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 self-end sm:self-auto">
                  {isUnlocked ? (
                    <Link
                      href={`/courses/${subjectId}/chapters/${chapter.id}`}
                      className="text-xs sm:text-sm bg-secondary text-white px-2 sm:px-3 py-1 rounded hover:bg-secondary/90 transition-colors whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Start
                    </Link>
                  ) : (
                    <CiLock size={18} className="text-gray-400 shrink-0" />
                  )}
                  {expandedChapter === chapter.id ? (
                    <ChevronUp size={18} className="text-secondary shrink-0" />
                  ) : (
                    <ChevronDown
                      size={18}
                      className={`shrink-0 ${
                        isUnlocked ? "text-gray-600" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expandedChapter === chapter.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
                      {chapter?.thumbnail && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="mt-3 sm:mt-4 bg-gray-200 rounded-lg p-2 sm:p-4 flex justify-center"
                        >
                          <Image
                            src={chapter.thumbnail}
                            alt={chapter.chapterName}
                            width={875}
                            height={542}
                            className="object-contain w-full h-auto"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 875px"
                          />
                        </motion.div>
                      )}

                      {!isCompleted && isUnlocked && (
                        <Link
                          href={`/courses/${subjectId}/chapters/${chapter.id}`}
                          className="inline-block mt-3 sm:mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                        >
                          Continue Chapter
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterModules;

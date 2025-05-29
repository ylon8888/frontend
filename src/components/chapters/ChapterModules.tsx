"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { CiLock } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
// Dummy data for chapters
// const chaptersData = [
//   {
//     id: 1,
//     title: "Cell Structure and Function",
//     objective:
//       "Understanding the basic unit of life: Cells, and the various organelles involved in cell activities.",
//     instructor: "Saifur Rahman",
//     hasImage: true,
//     imageUrl: img,
//     imageAlt: "Cell Structure Diagram",
//     isLocked: false,
//     warningText: "Complete each nine steps to unlock your Next Chapter 2!",
//   },
//   {
//     id: 2,
//     title: "Transport in Plants and Animals",
//     objective:
//       "The processes of transpiration, osmosis, and circulation in both plants and animals.",
//     instructor: "Saifur Rahman",
//     hasImage: false,
//     isLocked: true,
//     warningText: "",
//   },
//   {
//     id: 3,
//     title: "Human Physiology",
//     objective:
//       "Detailed study of the human body, including the digestive, respiratory, circulatory, excretory, and nervous systems.",
//     instructor: "Saifur Rahman",
//     hasImage: false,
//     isLocked: true,
//     warningText: "",
//   },
//   {
//     id: 4,
//     title: "Genetics and Heredity",
//     objective:
//       "Understanding the principles of inheritance, genetic variation, and Mendelian genetics.",
//     instructor: "Saifur Rahman",
//     hasImage: false,
//     isLocked: true,
//     warningText: "",
//   },
//   {
//     id: 5,
//     title: "Evolution and Natural Selection",
//     objective:
//       "Exploring Darwin's theory of evolution and the mechanisms of natural selection.",
//     instructor: "Saifur Rahman",
//     hasImage: false,
//     isLocked: true,
//     warningText: "",
//   },
// ];

const ChapterModules = ({ chapters }: { chapters: any }) => {
  const [expandedChapter, setExpandedChapter] = useState(1);
  const [completedChapters, setCompletedChapters] = useState<number[]>([1]); //

  const toggleChapter = (chapterId: number) => {
    // Only allow toggle if chapter is not locked
    const chapter = chapters?.find((c: any) => c?.id === chapterId);
    if (
      !chapter ||
      (chapterId !== 1 && !completedChapters.includes(chapterId - 1))
    ) {
      return;
    }

    if (expandedChapter === chapterId) {
      setExpandedChapter(0);
    } else {
      setExpandedChapter(chapterId);
    }
  };

  // const completeChapter = (chapterId: number) => {
  //   if (!completedChapters.includes(chapterId)) {
  //     setCompletedChapters([...completedChapters, chapterId]);
  //   }
  //   // Automatically collapse the current chapter
  //   setExpandedChapter(0);
  // };
  return (
    <div className="bg-white container max-w-[1320px] mx-auto px-6 py-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <span className="text-secondary font-medium text-sm tracking-wide uppercase">
          {chapters?.subject?.class?.className}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
          {chapters?.subject?.subjectName}
        </h1>
        <p
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: chapters?.subject?.subjectDescription,
          }}
        />
      </div>

      {/* Chapter modules content */}

      <div className="mt-8 space-y-4">
        {chapters?.chapters?.map((chapter: any) => {
          const isUnlocked =
            chapter.sLNumber === 1 ||
            completedChapters.includes(chapter.id - 1);
          const isActive = expandedChapter === chapter.id;
          const isCompleted = completedChapters.includes(chapter.id);
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
              <Link
                href={`/courses/${chapters?.subject?.id}/chapters/${chapter?.id}`}
              >
                <motion.div
                  className={`flex justify-between items-start p-4 ${
                    isUnlocked ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  onClick={() => isUnlocked && toggleChapter(chapter.id)}
                  whileTap={isUnlocked ? { scale: 0.98 } : {}}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-montserrat text-xl font-semibold">
                        Chapter {chapter?.sLNumber}: {chapter?.chapterName}
                      </h2>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-sm text-green-600">
                          <Check size={16} />
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm flex gap-2">
                      <span className="font-medium">Objective:</span>{" "}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: chapter?.chapterDescription,
                        }}
                      />
                    </p>
                  </div>
                  <div className="flex items-center">
                    {!isUnlocked && (
                      <CiLock size={20} className="text-gray-400" />
                    )}
                    {expandedChapter === chapter.id ? (
                      <ChevronUp className="text-secondary" />
                    ) : (
                      <ChevronDown
                        className={
                          isUnlocked ? "text-gray-600" : "text-gray-400"
                        }
                      />
                    )}
                  </div>
                </motion.div>
              </Link>
              {/* <AnimatePresence>
                {expandedChapter === chapter?.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Link href={`/courses/${1}/chapters/${chapter.id}`}>
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        {chapter?.thumbnail && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 bg-gray-200 rounded-lg p-4 flex justify-center"
                          >
                            <Image
                              src={chapter?.thumbnail!}
                              alt={chapter?.chapterName!}
                              width={1000}
                              height={1000}
                              className="w-[875px] h-[542px]  object-contain"
                            />
                          </motion.div>
                        )}

                        {!isCompleted && isUnlocked && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => completeChapter(chapter.id)}
                            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Complete Chapter
                          </motion.button>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence> */}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterModules;

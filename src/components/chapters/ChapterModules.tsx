"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for chapters
const chaptersData = [
  {
    id: 1,
    title: "Cell Structure and Function",
    objective:
      "Understanding the basic unit of life: Cells, and the various organelles involved in cell activities.",
    instructor: "Saifur Rahman",
    hasImage: true,
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlQ5VrvtNlt6zsiChx3gMDOVsNGa3W.png",
    imageAlt: "Cell Structure Diagram",
    isLocked: false,
    warningText: "Complete each nine steps to unlock your Next Chapter 2!",
  },
  {
    id: 2,
    title: "Transport in Plants and Animals",
    objective:
      "The processes of transpiration, osmosis, and circulation in both plants and animals.",
    instructor: "Saifur Rahman",
    hasImage: false,
    isLocked: true,
    warningText: "",
  },
  {
    id: 3,
    title: "Human Physiology",
    objective:
      "Detailed study of the human body, including the digestive, respiratory, circulatory, excretory, and nervous systems.",
    instructor: "Saifur Rahman",
    hasImage: false,
    isLocked: true,
    warningText: "",
  },
  {
    id: 4,
    title: "Genetics and Heredity",
    objective:
      "Understanding the principles of inheritance, genetic variation, and Mendelian genetics.",
    instructor: "Saifur Rahman",
    hasImage: false,
    isLocked: true,
    warningText: "",
  },
  {
    id: 5,
    title: "Evolution and Natural Selection",
    objective:
      "Exploring Darwin's theory of evolution and the mechanisms of natural selection.",
    instructor: "Saifur Rahman",
    hasImage: false,
    isLocked: true,
    warningText: "",
  },
];

const ChapterModules = () => {
  const [expandedChapter, setExpandedChapter] = useState(1);
  const [completedChapters, setCompletedChapters] = useState<number[]>([1]); //

  const toggleChapter = (chapterId: number) => {
    // Only allow toggle if chapter is not locked
    const chapter = chaptersData.find((c) => c.id === chapterId);
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

  const completeChapter = (chapterId: number) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters([...completedChapters, chapterId]);
    }
    // Automatically collapse the current chapter
    setExpandedChapter(0);
  };

  return (
    <div className="bg-white container max-w-[1320px] mx-auto px-6 py-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <span className="text-secondary font-medium text-sm uppercase tracking-wide">
          CLASSES - 11
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
          Science - Biology
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This course provides an introduction to the key concepts of
          Photosynthesis, the Carbon Cycle, and Climate Change, focusing on
          their scientific foundations and real-world applications. Throughout
          this course, you will explore how plants produce food, how carbon
          moves through the Earth&apos;s ecosystems, and how human activities
          are contributing to climate change.
        </p>
      </div>

      {/* Chapter modules content */}
      <div className="mt-8 space-y-4">
        {chaptersData.map((chapter) => {
          const isUnlocked =
            chapter.id === 1 || completedChapters.includes(chapter.id - 1);
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
                      Chapter {chapter.id}: {chapter.title}
                    </h2>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <Check size={16} />
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Objective:</span>{" "}
                    {chapter.objective}
                  </p>
                </div>
                <div className="flex items-center">
                  {!isUnlocked && (
                    <svg
                      className="w-5 h-5 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                  {expandedChapter === chapter.id ? (
                    <ChevronUp className="text-secondary" />
                  ) : (
                    <ChevronDown
                      className={isUnlocked ? "text-gray-600" : "text-gray-400"}
                    />
                  )}
                </div>
              </motion.div>

              <AnimatePresence>
                {expandedChapter === chapter.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      {chapter.hasImage && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="mt-4 bg-gray-200 rounded-lg p-4 flex justify-center"
                        >
                          <Image
                            src={chapter.imageUrl! || "/placeholder.svg"}
                            alt={chapter.imageAlt!}
                            width={600}
                            height={400}
                            className="object-contain"
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

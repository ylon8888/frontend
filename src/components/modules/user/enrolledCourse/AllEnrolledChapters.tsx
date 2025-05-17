"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Play, CheckCircle, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "antd";

export default function AllEnrolledChapters() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chaptersData = {
    class: "Class 11",
    title: "Understanding the Foundations of Literature!",
    description:
      "In this chapter, we will explore the core literary elements that form the foundation of literature, such as plot, setting, characters, and themes. By the end of this chapter, you will be able to analyze different texts through the lens of these key concepts.",
    chapters: [
      {
        id: 1,
        title: "Cell Structure and Function",
        status: "complete",
        objective:
          "Understanding the basic unit of life: Cells, and the various organelles involved in cell activities.",
        hasResult: true,
        hasVideo: true,
        thumbnail: "/images/cell-structure.png",
        videoUrl: "/videos/cell-structure.mp4",
      },
      {
        id: 2,
        title: "Transport in Plants and Animals",
        status: "in-progress",
        objective:
          "The processes of transpiration, osmosis, and circulation in both plants and animals.",
        instructor: "Instructor: Seifur Rahman",
        hasVideo: true,
        thumbnail: "/images/transport.png",
        videoUrl: "/videos/transport.mp4",
      },
      {
        id: 3,
        title: "Human Physiology",
        status: "locked",
        objective:
          "Detailed study of the human body, including the digestive, respiratory, circulatory, excretory, and nervous systems.",
        hasVideo: true,
        thumbnail: "/images/physiology.png",
        videoUrl: "/videos/physiology.mp4",
      },
      {
        id: 4,
        title: "Genetics and Heredity",
        status: "locked",
        objective:
          "Understanding the principles of inheritance, genetic variation, and Mendelian genetics.",
      },
      {
        id: 5,
        title: "Evolution and Natural Selection",
        status: "locked",
        objective:
          "Concepts of evolution, Darwin's theory of natural selection, and the evidence supporting the theory.",
      },
      {
        id: 6,
        title: "Ecology and Environment",
        status: "locked",
        objective:
          "The study of ecosystems, biotic and abiotic factors, and human impact on the environment.",
      },
      {
        id: 7,
        title: "Reproduction in Plants and Animals",
        status: "locked",
        objective:
          "The reproductive mechanisms in plants and animals, including sexual and asexual reproduction.",
      },
      {
        id: 8,
        title: "Microorganisms",
        status: "locked",
        objective:
          "Study of microorganisms, their role in nature, and their use in various industries.",
      },
    ],
  };

  const handleCardClick = (chapterId: number, status: string) => {
    if (status === "locked") return;
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">{chaptersData.class}:</h1>
        <h2 className="text-xl font-semibold mb-2">{chaptersData.title}</h2>
        <p className="text-gray-600">{chaptersData.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chaptersData.chapters.map((chapter) => {
          const isExpanded = expandedChapter === chapter.id;

          return (
            <div
              key={chapter.id}
              className={`overflow-hidden transition-all duration-200 hover:shadow-md ${
                chapter.status === "locked"
                  ? "opacity-60 cursor-not-allowed shadow-none"
                  : "cursor-pointer"
              }`}
              onClick={() =>
                chapter.status !== "locked" &&
                handleCardClick(chapter.id, chapter.status)
              }
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  {chapter.status === "complete" && (
                    <div className="flex items-center text-primary   font-medium text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete Chapter
                    </div>
                  )}
                  {chapter.status === "in-progress" && (
                    <div className="flex items-center text-secondary font-medium text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-1"></div>
                      In Progress
                    </div>
                  )}
                  {chapter.status === "locked" && (
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
                  Chapter {chapter.id}: {chapter.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {chapter.objective}
                </p>

                {chapter.status === "complete" && chapter.hasResult && (
                  <Button className="bg-primary hover:bg-green-700 text-white">
                    View Result
                  </Button>
                )}

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {chapter.status !== "locked" && chapter.hasVideo && (
                      <div
                        className="relative aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Image
                          src={
                            chapter.thumbnail ||
                            `/placeholder.svg?height=180&width=320`
                          }
                          alt={`${chapter.title} thumbnail`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white hover:scale-105 transition cursor-pointer">
                            <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                          </div>
                        </div>
                      </div>
                    )}

                    {chapter.status === "in-progress" && chapter.instructor && (
                      <p className="text-sm text-gray-500 mb-3">
                        {chapter.instructor}
                      </p>
                    )}

                    {chapter.status === "in-progress" && (
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

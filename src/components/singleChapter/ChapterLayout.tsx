"use client";

import React, { useState, useEffect } from "react";
import Steps from "./Steps";
import StepOne from "./chapterContents/StepOne";
import StepTwo from "./chapterContents/StepTwo";
import StepThree from "./chapterContents/StepThree";
import { useGetCoursesOfChapterQuery } from "@/redux/features/course/course";

const STORAGE_KEY = "chapter_progress";

const ChapterLayout = () => {
  const id = window.location.pathname.split("/")[4];

  const { data } = useGetCoursesOfChapterQuery(id);
  console.log(data?.data?.chapters);

  // Initialize state with value from localStorage or default to 0
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  // Map step indexes to their corresponding components
  const stepComponents = [
    <StepOne key="stepOne" />,
    <StepTwo key="stepTwo" />,
    <StepThree key="stepThree" />,
    // Add more components for each step...
  ];

  // Save to localStorage whenever currentStepIndex changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentStepIndex.toString());
  }, [currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < stepComponents.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 xl:gap-10 w-full my-16 md:my-24">
      <div className="w-full md:w-2/3">{stepComponents[currentStepIndex]}</div>
      <div className="w-full md:w-1/3 border shadow-lg p-5 rounded-2xl">
        <Steps
          currentStepIndex={currentStepIndex}
          onStepClick={handleStepClick}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default ChapterLayout;

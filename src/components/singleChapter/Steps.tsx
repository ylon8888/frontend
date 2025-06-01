"use client";

import {
  useGetCoursesOfChapterQuery,
  useHandleStepProgressMutation,
} from "@/redux/features/course/course";
import { T_Step } from "@/types/Common";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import StepsSkeleton from "../shared/skeleton/StepsSkeleton";

interface StepsProps {
  currentStepIndex: number;
  onStepClick: (index: number) => void;
  onNext: () => void;
  onCompleteStep?: (index: number) => void;
}

const Steps = ({ currentStepIndex, onStepClick, onNext }: StepsProps) => {
  const id = window.location.pathname.split("/")[4];

  const { data, isLoading } = useGetCoursesOfChapterQuery(id);
  const chapterData = data?.data?.chapters?.[0];

  const [stepProgress, { isLoading: isUpdatingProgress }] =
    useHandleStepProgressMutation();

  const getFakeSteps = (chapterData: any): T_Step[] => [
    {
      id: chapterData?.stepOne?.id,
      number: "01",
      title: "Watch the Video or Read Topic",
      description: chapterData?.stepOne?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepTwo?.id,
      number: "02",
      title: "Listen to the Podcast",
      description: chapterData?.stepTwo?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepThree?.id,
      number: "03",
      title: "Watch the Video or Read Topic",
      description: chapterData?.stepThree?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepFour?.id,
      number: "04",
      title: "Watch the Video or Read Topic",
      description: chapterData?.stepFour?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepFive?.id,
      number: "05",
      title: "Watch the Video or Quiz Test",
      description: chapterData?.stepFive?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepSix?.id,
      number: "06",
      title: "Review Key Terms or Key Words",
      description: chapterData?.stepSix?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepSeven?.id,
      number: "07",
      title: "Watch the Story",
      description: chapterData?.stepSeven?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepEight?.id,
      number: "08",
      title: "Final Quiz",
      description: chapterData?.stepEight?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepNine?.id,
      number: "09",
      title: "Critical Thinking Questions",
      description: chapterData?.stepNine?.stepName || "-",
      isCompleted: false,
    },
    {
      id: chapterData?.stepTen?.id,
      number: "10",
      title: "Feedback and Track Progress",
      description: chapterData?.stepTen?.stepName || "-",
      isCompleted: false,
    },
    {
      id: "11",
      number: "🌟",
      title: "Finish Chapter 01 Unlock Next Chapter",
      description:
        "After you'll watch a comprehensive video Chapter that introduces the topic. This video covers all the core concepts clearly.",
      isCompleted: false,
      isLast: true,
    },
  ];

  const [steps, setSteps] = useState<T_Step[]>([]);

  useEffect(() => {
    if (chapterData) {
      setSteps(getFakeSteps(chapterData));
    }
  }, [chapterData]);

  // Mark step as completed when moving to next step
  const handleNextWithCompletion = async () => {
    if (currentStepIndex < steps.length - 1) {
      try {
        const currentStep = steps[currentStepIndex];

        console.log(currentStep?.id);
        // Prepare API payload
        const progressData = {
          chapterId: id,
          stepId: currentStep?.id,
          stepSerial: (currentStepIndex + 1).toString(),
        };

        // Call the API to track step progress
        const response = await stepProgress(progressData);

        // Update local state after successful API call
        const updatedSteps = [...steps];
        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          isCompleted: true,
        };
        setSteps(updatedSteps);

        // Move to next step
        onNext();
      } catch (error) {
        console.error("Failed to track step progress:", error);
        const updatedSteps = [...steps];
        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          isCompleted: true,
        };
        setSteps(updatedSteps);
        onNext();
      }
    }
  };

  if (isLoading) {
    return <StepsSkeleton />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-6 font-montserrat">
        Chapter 01 Progress
      </h2>

      <div className="flex md:flex-col space-y-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex cursor-pointer transition-all duration-150 ${
              index === currentStepIndex
                ? "bg-primary/10 rounded-md p-4"
                : "px-4 py-3 hover:bg-gray-50 rounded-md"
            }`}
            onClick={() => onStepClick(index)}
          >
            <div className="flex flex-col items-center md:mr-3">
              <div
                className={`flex items-center justify-center w-8 h-8 p-2 rounded-full text-sm font-medium ${
                  index === currentStepIndex
                    ? "bg-secondary text-white"
                    : step.isCompleted
                    ? "bg-secondary text-white"
                    : "bg-secondary/20 text-secondary"
                }`}
              >
                {step.number}
              </div>
              {!step.isLast && (
                <div
                  className={`w-0.5 h-full my-1 ${
                    step.isCompleted ? "bg-secondary" : "bg-secondary/20"
                  }`}
                />
              )}
            </div>
            <div
              className={`hidden md:flex flex-col ${
                step.isLast ? "pb-1" : "pb-4"
              }`}
            >
              <h3 className="font-medium font-montserrat text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm font-montserrat text-gray-600 mt-0.5">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleNextWithCompletion}
        disabled={currentStepIndex === steps.length - 1 || isUpdatingProgress}
        className="mt-6 bg-secondary text-white py-3 px-4 rounded-md flex items-center justify-center disabled:opacity-50 hover:bg-secondary/90 transition-colors font-medium"
      >
        {isUpdatingProgress
          ? "Saving Progress..."
          : currentStepIndex === steps.length - 1
          ? "Chapter Complete"
          : "Next Step"}
        {currentStepIndex < steps.length - 1 && !isUpdatingProgress && (
          <ChevronRight className="ml-1 h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default Steps;

"use client";

import {
  useCreateChapterProgressMutation,
  useHandleStepProgressMutation,
} from "@/redux/features/course/course";
import { T_Step } from "@/types/Common";
import { ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import StepsSkeleton from "../shared/skeleton/StepsSkeleton";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

interface StepsProps {
  currentStepIndex: number;
  onStepClick: (index: number) => void;
  onNext: () => void;
  onStepsInitialized?: (steps: { isAccessible: boolean }[]) => void;
  data: any;
  isLoading: boolean;
}

const Steps = ({
  currentStepIndex,
  onStepClick,
  onNext,
  onStepsInitialized,
  data,
  isLoading,
}: StepsProps) => {
  const [steps, setSteps] = useState<T_Step[]>([]);
  const id = useParams().chapterId;
  const chapterData = data?.data?.chapters?.[0];
  const [createChapterProgress] = useCreateChapterProgressMutation();
  const router = useRouter();
  const subjectId = useParams().id;
  const [stepProgress, { isLoading: isUpdatingProgress }] =
    useHandleStepProgressMutation();

  const getSteps = useCallback((chapterData: any): T_Step[] => {
    if (!chapterData) return [];

    const userProgress =
      chapterData?.userChapterProgress?.[0]?.userStepProgress || [];
    const completedStepsMap = new Map();

    userProgress.forEach((progress: any) => {
      completedStepsMap.set(progress.stepId, progress.isCompleted);
    });

    const allSteps = [
      {
        id: chapterData?.stepOne?.id,
        number: "01",
        title: "Watch the Video or Read Topic",
        description: chapterData?.stepOne?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepOne?.id) || false,
      },
      {
        id: chapterData?.stepTwo?.id,
        number: "02",
        title: "Listen to the Podcast",
        description: chapterData?.stepTwo?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepTwo?.id) || false,
      },
      {
        id: chapterData?.stepThree?.id,
        number: "03",
        title: "Watch the Video or Read Topic",
        description: chapterData?.stepThree?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepThree?.id) || false,
      },
      {
        id: chapterData?.stepFour?.id,
        number: "04",
        title: "Watch the Video or Read Topic",
        description: chapterData?.stepFour?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepFour?.id) || false,
      },
      {
        id: chapterData?.stepFive?.id,
        number: "05",
        title: "Watch the Video or Quiz Test",
        description: chapterData?.stepFive?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepFive?.id) || false,
      },
      {
        id: chapterData?.stepSix?.id,
        number: "06",
        title: "Review Key Terms or Key Words",
        description: chapterData?.stepSix?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepSix?.id) || false,
      },
      {
        id: chapterData?.stepSeven?.id,
        number: "07",
        title: "Watch the Story",
        description: chapterData?.stepSeven?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepSeven?.id) || false,
      },
      {
        id: Array.isArray(chapterData?.stepEight)
          ? chapterData?.stepEight[0]?.id
          : chapterData?.stepEight?.id,
        number: "08",
        title: "Final Quiz",
        description: "Complete the quiz to proceed",
        isCompleted: Array.isArray(chapterData?.stepEight)
          ? chapterData?.stepEight.some((step: any) =>
              completedStepsMap.get(step.id)
            )
          : completedStepsMap.get(chapterData?.stepEight?.id) || false,
      },
      {
        id: chapterData?.stepNine?.id,
        number: "09",
        title: "Critical Thinking Questions",
        description: chapterData?.stepNine?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepNine?.id) || false,
      },
      {
        id: chapterData?.stepTen?.id,
        number: "10",
        title: "Feedback and Track Progress",
        description: chapterData?.stepTen?.stepName || "-",
        isCompleted: completedStepsMap.get(chapterData?.stepTen?.id) || false,
      },
      {
        id: "11",
        number: "🌟",
        title: "Finish Chapter 01 Unlock Next Chapter",
        description: "Complete all steps to unlock the next chapter",
        isCompleted: false,
        isLast: true,
      },
    ];

    let highestCompletedIndex = -1;
    allSteps.forEach((step, index) => {
      if (step.isCompleted) highestCompletedIndex = index;
    });

    return allSteps.map((step, index) => ({
      ...step,
      isAccessible: !!(
        index === 0 ||
        step.isCompleted ||
        index === highestCompletedIndex + 1 ||
        step.isLast
      ),
    }));
  }, []);

  // Initialize steps only when chapterData changes
  useEffect(() => {
    if (chapterData && onStepsInitialized) {
      const updatedSteps = getSteps(chapterData);
      setSteps(updatedSteps);
      onStepsInitialized(updatedSteps);

      // Force update parent component's step state
      onStepClick(currentStepIndex);
    }
  }, [chapterData, onStepsInitialized, getSteps]);

  // Ensure step content stays in sync with navigation
  useEffect(() => {
    // This forces the parent to re-render the current step content
    onStepClick(currentStepIndex);
  }, [currentStepIndex, onStepClick]);

  const handleStepClick = (index: number) => {
    const step = steps[index];
    if (step.isAccessible) {
      // Call parent's handler to update current step
      onStepClick(index);
    } else {
      toast.warning("Please complete previous steps first");
    }
  };

  const handleCompleteChapter = async () => {
    try {
      const response = await createChapterProgress({
        chapterId: id,
        stepId: chapterData?.stepNine?.id,
        stepSerial: "9",
      }).unwrap();

      toast.success(response.message);
      router.push(`/courses/${subjectId}/chapters`);

      setSteps((prev) =>
        prev.map((step, i) =>
          i === prev.length - 1 ? { ...step, isCompleted: true } : step
        )
      );

      onNext();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to complete chapter");
    }
  };

  const handleNextWithCompletion = async () => {
    try {
      // First complete the current step
      await stepProgress({
        chapterId: id,
        stepId: steps[currentStepIndex]?.id,
        stepSerial: (currentStepIndex + 1).toString(),
      }).unwrap();

      // Update UI state
      setSteps((prev) =>
        prev.map((step, i) => {
          if (i === currentStepIndex) return { ...step, isCompleted: true };
          if (i === currentStepIndex + 1)
            return { ...step, isAccessible: true };
          return step;
        })
      );

      // Special handling for step 8 (index 7)
      if (currentStepIndex === 7) {
        try {
          // Complete steps 9 and 10 (indices 8 and 9)
          await Promise.all(
            [8, 9].map(async (index) => {
              await stepProgress({
                chapterId: id,
                stepId: steps[index]?.id,
                stepSerial: (index + 1).toString(),
              }).unwrap();
            })
          );

          // Update UI state for steps 9, 10, and 11
          setSteps((prev) =>
            prev.map((step, i) =>
              i >= 8 ? { ...step, isCompleted: true, isAccessible: true } : step
            )
          );
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to complete all steps");
          return;
        }
      }

      onNext();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save progress");
    }
  };

  if (isLoading) {
    return <StepsSkeleton />;
  }

  return (
    <div className="space-y-2 flex-1 md:h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col border shadow-lg p-5 rounded-2xl">
      <h2 className="text-xl font-semibold mb-6 font-montserrat">
        Chapter Progress
      </h2>

      <div className="flex md:flex-col space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-100 h-80">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex transition-all duration-150 ${
              index === currentStepIndex
                ? "bg-primary/10 rounded-md p-4"
                : "px-4 py-3 hover:bg-gray-50 rounded-md"
            } ${
              step.isAccessible
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleStepClick(index)}
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
                  className={`w-0.5 h-2 md:h-full my-1 ${
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
        onClick={
          currentStepIndex === steps.length - 1
            ? handleCompleteChapter
            : handleNextWithCompletion
        }
        disabled={isUpdatingProgress}
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

"use client";

import {
  useCreateChapterProgressMutation,
  useHandleStepProgressMutation,
} from "@/redux/features/course/course";
import { T_Step } from "@/types/Common";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import StepsSkeleton from "../shared/skeleton/StepsSkeleton";
import { toast } from "sonner";

interface StepsProps {
  currentStepIndex: number;
  onStepClick: (index: number) => void;
  onNext: () => void;
  onStepsInitialized?: (steps: { isAccessible: boolean }[]) => void;
  onCompleteStep?: (index: number) => void;
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
  const id = window.location.pathname.split("/")[4];
  const chapterData = data?.data?.chapters?.[0];
  const [createChapterProgress] = useCreateChapterProgressMutation();

  const [stepProgress, { isLoading: isUpdatingProgress }] =
    useHandleStepProgressMutation();

  const getSteps = (chapterData: any): T_Step[] => {
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

    // Find the highest completed step index
    let highestCompletedIndex = -1;
    allSteps.forEach((step, index) => {
      if (step.isCompleted) {
        highestCompletedIndex = index;
      }
    });

    // Determine which steps should be accessible
    return allSteps.map((step, index) => ({
      ...step,
      isAccessible: !!(
        (
          index === 0 || // First step always accessible
          step.isCompleted || // Completed steps accessible
          index === highestCompletedIndex + 1 || // Next step after last completed
          step.isLast
        ) // Last step always accessible
      ),
    }));
  };

  useEffect(() => {
    if (chapterData) {
      const updatedSteps = getSteps(chapterData);
      setSteps(updatedSteps);
      if (onStepsInitialized) {
        onStepsInitialized(updatedSteps);
      }
    }
  }, [chapterData]);

  const handleStepClick = (index: number) => {
    const step = steps[index];
    if (step.isAccessible) {
      onStepClick(index);
    } else {
      toast.warning("Please complete previous steps first");
    }
  };

  const handleNextWithCompletion = async () => {
    if (currentStepIndex < steps.length - 1) {
      try {
        const currentStep = steps[currentStepIndex];
        const isStepNine = currentStepIndex === 8; // Step 9 is index 8
        const isStepEleven = currentStepIndex === 10; // Step 9 is index 8

        // Prepare API payload
        const progressData = {
          chapterId: id,
          stepId: currentStep?.id,
          stepSerial: (currentStepIndex + 1).toString(),
        };

        // Call the API to track step progress
        try {
          const response = await stepProgress(progressData);
          if (response?.data?.success === true) {
            toast.success(response?.data?.message);

            // If completing step 9, also mark steps 10 and 11 as completed
            if (isStepNine) {
              const stepTenData = {
                chapterId: id,
                stepId: chapterData?.stepTen?.id,
                stepSerial: "10",
              };
              const stepElevenData = {
                chapterId: id,
                stepId: "11",
                stepSerial: "11",
              };

              await Promise.all([
                stepProgress(stepTenData),
                stepProgress(stepElevenData),
              ]);
            }
          }
        } catch (error) {
          toast.error(
            typeof error === "object" &&
              error !== null &&
              "data" in error &&
              (error as any).data?.message
              ? (error as any).data?.message
              : "An error occurred"
          );
        }

        // Update local state after successful API call
        const updatedSteps = [...steps];
        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          isCompleted: true,
          isAccessible: true,
        };

        // If completing step 9, also update steps 10 and 11
        if (isStepNine) {
          updatedSteps[9] = {
            ...updatedSteps[9],
            isCompleted: true,
            isAccessible: true,
          };
          updatedSteps[10] = {
            ...updatedSteps[10],
            isCompleted: true,
            isAccessible: true,
          };
        }

        // Make the next step accessible if it exists
        if (currentStepIndex + 1 < updatedSteps.length && !isStepNine) {
          updatedSteps[currentStepIndex + 1].isAccessible = true;
        }

        setSteps(updatedSteps);

        // Move to next step
        onNext();
      } catch (error) {
        console.error("Failed to track step progress:", error);
        const updatedSteps = [...steps];
        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          isCompleted: true,
          isAccessible: true,
        };
        setSteps(updatedSteps);
        onNext();
      }
    }
    if (currentStepIndex === steps.length - 1) {
      const stepElevenData = {
        chapterId: id,
        stepId: chapterData?.stepNine?.id,
        stepSerial: "9",
      };

      try {
        const res = await createChapterProgress(stepElevenData);
        console.log(res);
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error(
          typeof error === "object" &&
            error !== null &&
            "data" in error &&
            (error as any).data?.message
            ? (error as any).data?.message
            : "An error occurred"
        );
      }
    }
  };

  if (isLoading) {
    return <StepsSkeleton />;
  }

  return (
    <div className="space-y-2 flex-1 h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col border shadow-lg p-5 rounded-2xl">
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

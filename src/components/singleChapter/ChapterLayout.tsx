"use client";

import { useState, useEffect } from "react";
import Steps from "./Steps";
import StepOne from "./chapterContents/StepOne";
import StepTwo from "./chapterContents/StepTwo";
import StepThree from "./chapterContents/StepThree";
import StepFour from "./chapterContents/StepFour";
import StepFive from "./chapterContents/StepFive";
import StepSix from "./chapterContents/StepSix";
import StepSeven from "./chapterContents/StepSeven";
import StepEight from "./chapterContents/StepEight";
import StepNine from "./chapterContents/StepNine";
import StepTen from "./chapterContents/StepTen";
import StepEleven from "./chapterContents/StepEleven";
import Loading from "../ui/core/Loading/Loading";
import { useGetCoursesOfChapterQuery } from "@/redux/features/course/course";
import { useParams } from "next/navigation";

// const STORAGE_KEY = "chapter_progress";

const ChapterLayout = () => {
  const params = useParams();
  const chapterId = params.chapterId as string;

  // Reset to step 0 when chapterId changes
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [accessibleSteps, setAccessibleSteps] = useState<boolean[]>([]);
  const [stepsInitialized, setStepsInitialized] = useState(false);
  const [highestAccessibleStep, setHighestAccessibleStep] = useState(0);

  const { data, isLoading } = useGetCoursesOfChapterQuery(chapterId, {
    skip: !chapterId,
  });

  const stepComponents = [
    <StepOne key="stepOne" data={data} isLoading={isLoading} />,
    <StepTwo key="stepTwo" data={data} isLoading={isLoading} />,
    <StepThree key="stepThree" data={data} isLoading={isLoading} />,
    <StepFour key="stepFour" data={data} isLoading={isLoading} />,
    <StepFive key="stepFive" data={data} isLoading={isLoading} />,
    <StepSix key="stepSix" data={data} isLoading={isLoading} />,
    <StepSeven key="stepSeven" data={data} isLoading={isLoading} />,
    <StepEight key="stepEight" />,
    <StepNine key="stepNine" data={data} isLoading={isLoading} />,
    <StepTen key="stepTen" data={data} isLoading={isLoading} />,
    <StepEleven key="stepEleven" data={data} />,
  ];

  // Reset to step 0 when chapter changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setStepsInitialized(false);
  }, [chapterId]);

  const handleAccessibleStepsUpdate = (steps: { isAccessible: boolean }[]) => {
    const access = steps.map((step) => step.isAccessible);
    setAccessibleSteps(access);

    // Find the highest accessible step
    let highest = 0;
    for (let i = access.length - 1; i >= 0; i--) {
      if (access[i]) {
        highest = i;
        break;
      }
    }
    setHighestAccessibleStep(highest);
    setStepsInitialized(true);
  };

  const handleNext = () => {
    if (currentStepIndex < stepComponents.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (stepsInitialized && accessibleSteps[index]) {
      setCurrentStepIndex(index);
    }
  };

  const renderCurrentStep = () => {
    if (!stepsInitialized || isLoading) {
      return <Loading />;
    }

    // If current step is not accessible, show the highest accessible step
    if (!accessibleSteps[currentStepIndex]) {
      return stepComponents[highestAccessibleStep];
    }

    return stepComponents[currentStepIndex];
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 xl:gap-10 w-full my-16 md:my-24">
      <div className="w-full md:w-2/3">{renderCurrentStep()}</div>
      <div className="w-full md:w-1/3">
        <Steps
          currentStepIndex={currentStepIndex}
          onStepClick={handleStepClick}
          onNext={handleNext}
          onStepsInitialized={handleAccessibleStepsUpdate}
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChapterLayout;

"use client";

import React, { useState, useEffect } from "react";
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

const STORAGE_KEY = "chapter_progress";

const ChapterLayout = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const [accessibleSteps, setAccessibleSteps] = useState<boolean[]>([]);
  const [stepsInitialized, setStepsInitialized] = useState(false);
  const [highestAccessibleStep, setHighestAccessibleStep] = useState(0);

  const stepComponents = [
    <StepOne key="stepOne" />,
    <StepTwo key="stepTwo" />,
    <StepThree key="stepThree" />,
    <StepFour key="stepFour" />,
    <StepFive key="stepFive" />,
    <StepSix key="stepSix" />,
    <StepSeven key="stepSeven" />,
    <StepEight key="stepEight" />,
    <StepNine key="stepNine" />,
    <StepTen key="stepTen" />,
    <StepEleven key="stepEleven" />,
  ];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentStepIndex.toString());
  }, [currentStepIndex]);

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
    if (!stepsInitialized) {
      return <Loading />;
    }

    // Always show Step One when landing on the page
    if (currentStepIndex === 0) {
      return stepComponents[0];
    }

    // Show the highest accessible step if current step is locked
    if (!accessibleSteps[currentStepIndex] && currentStepIndex !== 0) {
      return stepComponents[highestAccessibleStep];
    }

    // Otherwise show the current step
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
        />
      </div>
    </div>
  );
};

export default ChapterLayout;

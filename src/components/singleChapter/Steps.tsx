"use client";

import { useState } from "react";
import { T_Step } from "@/types/Common";
import { ChevronRight } from "lucide-react";

const Steps = () => {
  const steps: T_Step[] = [
    {
      id: "1",
      number: "01",
      title: "Watch the Video or Read Topic",
      description: "Photosynthesis and the Carbon Cycle",
      isCompleted: true,
    },
    {
      id: "2",
      number: "02",
      title: "Listen to the Podcast",
      description: "Carbon Cycle & Climate Change",
      isCompleted: false,
    },
    {
      id: "3",
      number: "03",
      title: "Watch the Video or Read Topic",
      description:
        "Briefing Document: Photosynthesis, Carbon Cycle, and Climate Change",
      isCompleted: false,
    },
    {
      id: "4",
      number: "04",
      title: "Watch the Video or Read Topic",
      description: "Photosynthesis and Plant Biology",
      isCompleted: false,
    },
    {
      id: "5",
      number: "05",
      title: "Watch the Video or Quiz Test",
      description: "Test Your Knowledge",
      isCompleted: false,
    },
    {
      id: "6",
      number: "06",
      title: "Watch the Video or Read Topic",
      description: "Review Key Terms or Key Word",
      isCompleted: false,
    },
    {
      id: "7",
      number: "07",
      title: "Watch the Story",
      description: "Impact of Photosynthesis and the Carbon Cycle",
      isCompleted: false,
    },
    {
      id: "8",
      number: "08",
      title: "Final Quiz",
      description:
        "Photosynthesis, Carbon Cycle, and Climate Change: Student answer a lot of questions and get the results",
      isCompleted: false,
    },
    {
      id: "9",
      number: "09",
      title: "Watch the Video or Read Topic",
      description: "Critical Thinking Questions",
      isCompleted: false,
    },
    {
      id: "10",
      number: "10",
      title: "Feedback and Track Progress",
      description:
        "Review your quiz results and get feedback on areas you need to improve. Track your overall progress to ensure you're mastering each topic.",
      isCompleted: false,
    },
    {
      id: "11",
      number: "🌟",
      title: "Finish Chapter 01 Unlock Next Chapter",
      description:
        "After you'll watch a comprehensive video Chapter that introduces the topic. This video covers all the problem core concepts clearly.",
      isCompleted: false,
      isLast: true,
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-10 font-montserrat">
        Chapter 01 Progress
      </h2>
      <div className="flex flex-col space-y-1">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex cursor-pointer transition-all duration-150 ${
              index === currentStepIndex
                ? "bg-primary/20 rounded-md p-4"
                : "px-4"
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className="flex flex-col items-center mr-3">
              <div
                className={`flex items-center justify-center w-8 h-8 p-2 rounded-full text-sm font-medium ${
                  index === currentStepIndex
                    ? "bg-secondary text-white"
                    : step?.isCompleted
                    ? "bg-secondary/60 text-white"
                    : "bg-secondary/20 text-secondary"
                }`}
              >
                {step.number}
              </div>
              {!step.isLast && (
                <div className="w-0.5 h-full bg-secondary my-1" />
              )}
            </div>
            <div className={`flex flex-col pb-5 ${step?.isLast ? "pb-2" : ""}`}>
              <h3 className="font-medium font-montserrat">{step?.title}</h3>
              <p className="text-sm font-montserrat text-gray-800 mt-0.5">
                {step?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={currentStepIndex === steps.length - 1}
        className="mt-4 bg-secondary text-white py-3 rounded-md flex items-center justify-center disabled:opacity-50"
      >
        Next Step <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
};

export default Steps;

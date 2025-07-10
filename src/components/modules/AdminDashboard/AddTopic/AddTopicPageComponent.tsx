"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import AddLessonPage from "./AddLessonPage";
import AddPodcastPage from "./AddPodcastPage";
import AddQAPage from "./AddQAPage";
import QuizSet from "./QuizSet/QuizSet";

export default function AddTopicPageComponent() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentStep = Number(params.get("step")) || 1;
  const isEditMode = params.get("edit") === "true";

  const navigateToStep = (step: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("step", step.toString());
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const nextStep = () => {
    if (currentStep < 9) {
      navigateToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      navigateToStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {isEditMode && (
        <div className="max-w-xl w-full mx-auto flex flex-col md:flex-row gap-5 justify-between md:items-center p-4 bg-gray-100 border-b">
          <div className="flex space-x-2">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((step) => (
              <button
                key={step}
                onClick={() => navigateToStep(step)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step
                    ? "bg-primary text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded ${
                currentStep === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === 9}
              className={`px-4 py-2 rounded ${
                currentStep === 9
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="flex-grow p-4">
        {currentStep === 1 && (
          <AddLessonPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 2 && (
          <AddPodcastPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 3 && (
          <AddLessonPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 4 && (
          <AddLessonPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 5 && (
          <AddQAPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 6 && (
          <AddLessonPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 7 && (
          <AddLessonPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 8 && (
          <QuizSet currentStep={currentStep} isEditMode={isEditMode} />
        )}
        {currentStep === 9 && (
          <AddLessonPage currentStep={currentStep} isEditMode={isEditMode} />
        )}
      </div>
    </div>
  );
}

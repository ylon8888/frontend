// StepEight.tsx
"use client";

import { useState } from "react";
import StepEightContent from "../quizFlow/StepEightContent";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useSubmitQuizMutation } from "@/redux/features/course/course";

const StepEight = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const [submitQuiz] = useSubmitQuizMutation();

  const handleAnswerChange = (questionId: string, selectedOption: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (quizId: string) => {
    // Format answers exactly as required
    const answers = Object.entries(selectedAnswers)
      .filter(([_, answer]) => answer) // Remove unanswered questions
      .map(([quizId, selectedOption]) => ({
        quizId,
        selectedOption,
      }));

    const submissionData = {
      answers,
    };

    console.log("Submitting answers:", submissionData);

    const res = await handleAsyncWithToast(async () => {
      return submitQuiz({
        data: submissionData,
        id: quizId,
      });
    });

    if (res?.success) {
      console.log("Submission successful!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <StepEightContent
        selectedAnswers={selectedAnswers}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default StepEight;

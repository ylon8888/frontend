"use client";

import { useState } from "react";
import StepEightContent from "../quizFlow/StepEightContent";
import ReviewQuizResults from "../quizFlow/ReviewQuizResults";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useSubmitQuizMutation } from "@/redux/features/course/course";

const StepEight = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState<string>(""); // New state for quizId
  const [submitQuiz, { isLoading }] = useSubmitQuizMutation();

  const handleAnswerChange = (questionId: string, selectedOption: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (quizId: string) => {
    setCurrentQuizId(quizId);
    const answers = Object.entries(selectedAnswers)
      .filter(([_, answer]) => answer)
      .map(([questionId, selectedOption]) => ({
        quizId: questionId,
        selectedOption,
      }));

    const submissionData = { answers };

    try {
      const response = await handleAsyncWithToast(async () => {
        return await submitQuiz({
          data: submissionData,
          id: quizId,
        });
      });

      if (response) {
        console.log("Submission successful!", response);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    // Optionally reset answers if needed:
    // setSelectedAnswers({});
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {showResults ? (
        <ReviewQuizResults onRetake={handleRetakeQuiz} quizId={currentQuizId} />
      ) : (
        <StepEightContent
          selectedAnswers={selectedAnswers}
          handleAnswerChange={handleAnswerChange}
          handleSubmit={handleSubmit}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default StepEight;

import Loading from "@/components/ui/core/Loading/Loading";
import { useGetQuizResultsQuery } from "@/redux/features/course/course";
import React from "react";

interface ReviewQuizResultsProps {
  onRetake: () => void;
  quizId: string;
}

const ReviewQuizResults: React.FC<ReviewQuizResultsProps> = ({
  onRetake,
  quizId,
}) => {
  const { data, isLoading } = useGetQuizResultsQuery(quizId);
  if (isLoading) {
    return <Loading />;
  }
  if (!data?.data) {
    return <p>No data available</p>;
  }

  const { total, correct, wrong } = data.data;
  const correctPercentage = Math.round((correct / total) * 100);
  const wrongPercentage = Math.round((wrong / total) * 100);

  // Get all quiz attempts (both correct and wrong)
  const quizAttempts =
    data.data.quizresult.stepEightQuizSessions[0]?.stepEightQuizAttempts || [];

  const getOptionText = (quiz: any, option: string) => {
    switch (option) {
      case "optionA":
        return quiz.optionA;
      case "optionB":
        return quiz.optionB;
      case "optionC":
        return quiz.optionC;
      case "optionD":
        return quiz.optionD;
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="border p-6 rounded-lg mb-8">
        <h2 className="text-2xl lg:text-3xl font-semibold font-montserrat mb-6">
          Review Your Quiz Results
        </h2>
        <p className="text-gray-600 font-light mb-6 text-sm lg:text-base-">
          To ensure a strong understanding of the material, we recommend
          achieving at least 100% on your quiz. If your score is below 100%, you
          will be required to retake the quiz to reinforce your learning.
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-green-600 font-medium">
              Right {correctPercentage}%
            </span>
            <span className="text-[#FF0000] font-medium">
              Wrong {wrongPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-full flex">
              <div
                className="bg-[#00AF58] h-full"
                style={{ width: `${correctPercentage}%` }}
              ></div>
              <div
                className="bg-[#FF0000] h-full"
                style={{ width: `${wrongPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <h3 className="lg:text-xl font-semibold font-montserrat mb-4">
          Click to retake the quiz and improve your score.
        </h3>
        <button
          onClick={onRetake}
          className="px-8 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Retake Quiz
        </button>
      </div>

      {/* Review Results Section */}
      <div className="border p-6 rounded-lg">
        <h3 className="text-2xl font-semibold font-montserrat mb-4">
          Review Results
        </h3>
        <p className="text-gray-600 mb-6">
          Review all your answers below. Incorrect answers are highlighted in
          red, while correct answers are in green.
        </p>

        {/* All Questions */}
        <div className="space-y-6">
          {quizAttempts.map((attempt: any, index: number) => {
            const quiz = attempt.stepEightQuiz;
            const selectedOption = attempt.selectedOption;
            const correctAnswer = quiz.correctAnswer.toLowerCase(); // Convert to lowercase to match selectedOption format

            return (
              <div
                key={attempt.id}
                className="bg-gray-50 p-6 rounded-lg border"
              >
                <div className="mb-4">
                  <h4 className="font-semibold text-lg mb-3">
                    Quiz -{(index + 1).toString().padStart(2, "0")}{" "}
                    {quiz.questionText}
                  </h4>
                </div>

                <div className="space-y-3">
                  {["optionA", "optionB", "optionC", "optionD"].map(
                    (option) => {
                      const isSelected = selectedOption === option;
                      const isCorrectOption =
                        correctAnswer === option.toLowerCase(); // Convert to lowercase to match
                      const isWrongSelection = isSelected && !attempt.isCorrect;

                      let textColor = "text-gray-700";
                      if (isCorrectOption) {
                        textColor = "text-[#00AF58] font-medium";
                      } else if (isWrongSelection) {
                        textColor = "text-[#FF0000] font-medium";
                      }

                      return (
                        <label
                          key={option}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name={`question-${attempt.id}`}
                              checked={isSelected}
                              readOnly
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? attempt.isCorrect
                                    ? "border-[#00AF58] bg-[#00AF58]"
                                    : "border-[#FF0000] bg-[#FF0000]"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <span className={`text-sm ${textColor}`}>
                            {getOptionText(quiz, option)}
                            {isCorrectOption && !attempt.isCorrect && (
                              <span className="ml-2 text-xs text-[#00AF58]">
                                (Correct Answer)
                              </span>
                            )}
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewQuizResults;

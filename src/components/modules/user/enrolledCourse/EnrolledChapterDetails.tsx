"use client";

import { useGetSingleChapterByStudentQuery } from "@/redux/features/course/course";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const EnrolledChapterDetails = () => {
  const chapterId = useParams().chapterId;
  const { data } = useGetSingleChapterByStudentQuery(chapterId, {
    skip: !chapterId,
  });

  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<number>(0);

  const chapter = data?.data?.chapter;
  const quizzes = data?.data?.quiz || [];

  const calculatePercentage = (correct: number, total: number) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const toggleQuiz = (quizType: string) => {
    if (expandedQuiz === quizType) {
      setExpandedQuiz(null);
    } else {
      setExpandedQuiz(quizType);
    }
  };

  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return `${num}st`;
    if (j === 2 && k !== 12) return `${num}nd`;
    if (j === 3 && k !== 13) return `${num}rd`;
    return `${num}th`;
  };

  const renderCombinedProgressBar = (session: any) => {
    const correctPercentage = calculatePercentage(
      session.correctAttempts,
      session.totalAttempts
    );
    const wrongPercentage = 100 - correctPercentage;

    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-green-600 font-medium">
            Correct: {correctPercentage}%
          </span>
          <span className="text-red-600 font-medium">
            Wrong: {wrongPercentage}%
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-green-500"
            style={{ width: `${correctPercentage}%` }}
          />
          <div
            className="h-full bg-red-500"
            style={{ width: `${wrongPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-sm text-gray-500">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    );
  };

  const renderReviewResults = (session: any, attemptIndex: number) => {
    const wrongAnswers =
      session.attempts?.filter((a: any) => !a.isCorrect) || [];

    if (wrongAnswers.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          No wrong answers in this attempt
        </div>
      );
    }

    return (
      <div className="mb-6">
        <h3 className="font-medium mb-3">Review Wrong Answers</h3>
        {wrongAnswers.map((attempt: any) => (
          <div
            key={`${attempt.quizId}-${attemptIndex}`}
            className="mb-4 p-4 border rounded-lg"
          >
            <p className="font-medium mb-3">
              {attempt.stepEightQuiz?.questionText}
            </p>
            <div className="space-y-2">
              {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                <div
                  key={opt}
                  className={`p-3 border rounded-lg ${
                    attempt.selectedOption === opt
                      ? "bg-red-50 border-red-200"
                      : attempt.stepEightQuiz?.correctAnswer.toLowerCase() ===
                        opt
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {attempt.selectedOption === opt && (
                        <span className="inline-block h-4 w-4 rounded-full bg-red-500"></span>
                      )}
                      {attempt.stepEightQuiz?.correctAnswer.toLowerCase() ===
                        opt && (
                        <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>
                      )}
                    </span>
                    {attempt.stepEightQuiz[opt]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Chapter {chapter?.sLNumber}: {chapter?.chapterName}
        </h1>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: chapter?.chapterDescription,
          }}
        />
      </div>

      <div className="space-y-6">
        {quizzes.map((quiz: any) => {
          const hasSessions = quiz?.sessions.length > 0;
          const isExpanded = expandedQuiz === quiz?.questionId;
          const currentSession = hasSessions
            ? quiz?.sessions[selectedSession]
            : null;

          return (
            <div
              key={quiz?.questionId}
              className="border rounded-lg overflow-hidden"
            >
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  isExpanded ? "bg-gray-50" : ""
                }`}
                onClick={() => toggleQuiz(quiz?.questionId)}
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {quiz?.questionType} Quiz Step
                  </h2>
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: quiz?.questionDescription,
                    }}
                  />
                </div>
                {isExpanded ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </div>

              {isExpanded && (
                <div className="p-4 border-t">
                  {hasSessions ? (
                    <>
                      {/* Attempt Selection */}
                      <div className="mb-6">
                        <div className="flex gap-2 flex-wrap mb-4">
                          {quiz?.sessions.map((session: any, index: number) => (
                            <button
                              key={session.sessionId}
                              onClick={() => setSelectedSession(index)}
                              className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                                selectedSession === index
                                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                                  : "hover:bg-gray-100 border border-gray-200"
                              }`}
                            >
                              Attempt {index + 1}
                              {calculatePercentage(
                                session.correctAttempts,
                                session.totalAttempts
                              ) >= 70 && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Combined Progress Bar for Selected Attempt */}
                        {currentSession &&
                          renderCombinedProgressBar(currentSession)}

                        {/* Review Results for Selected Attempt Only */}
                        {currentSession &&
                          renderReviewResults(currentSession, selectedSession)}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No quiz attempts yet
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledChapterDetails;

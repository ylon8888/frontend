"use client";

import { useGetSingleChapterByStudentQuery } from "@/redux/features/course/course";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "antd";
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
  console.log();
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Chapter {chapter?.sLNumber}: {chapter?.chapterName}
        </h1>
        <p className="text-gray-700">{chapter?.chapterDescription}</p>
      </div>

      <div className="space-y-6">
        {quizzes.map((quiz: any) => {
          const hasSessions = quiz?.sessions.length > 0;
          const isExpanded = expandedQuiz === quiz?.questionId;
          const currentSession = hasSessions
            ? quiz?.sessions[selectedSession]
            : null;
          const wrongAnswers =
            currentSession?.attempts?.filter((a: any) => !a.isCorrect) || [];

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
                  <p className="text-gray-600">{quiz?.questionDescription}</p>
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
                        <div className="flex gap-4 mb-4">
                          {quiz?.sessions.map((session: any, index: number) => (
                            <button
                              key={session.sessionId}
                              onClick={() => setSelectedSession(index)}
                              className="flex items-center gap-2 "
                            >
                              Attempt {index + 1}
                              {session.correctAttempts /
                                session.totalAttempts >=
                                0.7 && <CheckCircle className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>

                        {/* First Attempt Result */}
                        <div className="mb-6">
                          <h3 className="font-medium mb-2">
                            First Attempt Result
                          </h3>
                          <div className="flex gap-4">
                            <div className="bg-gray-100 p-3 rounded flex-1">
                              <span className="block text-base text-gray-500">
                                Right
                              </span>
                              <span className="text-lg font-bold">
                                {calculatePercentage(
                                  quiz?.sessions[0].correctAttempts,
                                  quiz?.sessions[0].totalAttempts
                                )}
                                %
                              </span>
                            </div>
                            <div className="bg-gray-100 p-3 rounded flex-1">
                              <span className="block text-base text-gray-500">
                                Wrong Answer
                              </span>
                              <span className="text-lg font-bold">
                                {100 -
                                  calculatePercentage(
                                    quiz?.sessions[0].correctAttempts,
                                    quiz?.sessions[0].totalAttempts
                                  )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Second Attempt Result (if exists) */}
                        {quiz?.sessions.length > 1 && (
                          <div className="mb-6">
                            <h3 className="font-medium mb-2">
                              Second Attempt Result
                            </h3>
                            <div className="flex gap-4">
                              <div className="bg-gray-100 p-3 rounded flex-1">
                                <span className="block text-base text-gray-500">
                                  Right
                                </span>
                                <span className="text-lg font-bold">
                                  {calculatePercentage(
                                    quiz?.sessions[1].correctAttempts,
                                    quiz?.sessions[1].totalAttempts
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="bg-gray-100 p-3 rounded flex-1">
                                <span className="block text-base text-gray-500">
                                  Wrong Answer
                                </span>
                                <span className="text-lg font-bold">
                                  {100 -
                                    calculatePercentage(
                                      quiz?.sessions[1].correctAttempts,
                                      quiz?.sessions[1].totalAttempts
                                    )}
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Review Results - Only Wrong Answers */}
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-3">Review Results</h3>
                          {wrongAnswers.map((attempt: any) => (
                            <div
                              key={attempt.quizId}
                              className="mb-6 p-4 border rounded-lg"
                            >
                              <p className="font-medium mb-3">
                                Quiz -01 {attempt.stepEightQuiz?.questionText}
                              </p>
                              <div className="space-y-2">
                                {[
                                  "optionA",
                                  "optionB",
                                  "optionC",
                                  "optionD",
                                ].map((opt) => (
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

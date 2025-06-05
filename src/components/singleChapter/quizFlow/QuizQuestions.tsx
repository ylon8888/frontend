// QuizQuestions.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useGetQuizByTypeQuery } from "@/redux/features/course/course";
import { ButtonLoading } from "@/components/shared/button-loading/LoadingButton";
import StepEightContentSkeleton from "@/components/shared/skeleton/StepEightContentSkeleton";

type QuizQuestionProps = {
  quizId: string;
  selectedAnswers: Record<string, string>;
  handleAnswerChange: (questionId: string, option: string) => void;
  handleSubmit: () => void;
  loading: boolean;
};

const QuizQuestions: React.FC<QuizQuestionProps> = ({
  quizId,
  selectedAnswers,
  handleAnswerChange,
  handleSubmit,
  loading,
}) => {
  const { data: quiz, isLoading } = useGetQuizByTypeQuery(quizId);

  if (isLoading) return <StepEightContentSkeleton />;
  if (!quiz?.data) return <div>No quiz data available.</div>;

  const hasAnsweredQuestions = quiz?.data?.stepEightQuizzes?.some(
    (q: any) => selectedAnswers[q.id]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-medium flex items-center justify-between mb-6">
          {quiz.data.questionType} Quiz Step
        </h2>
        <p
          className="font-light mb-10"
          dangerouslySetInnerHTML={{ __html: quiz?.data?.questionDescription }}
        ></p>
      </div>

      {/* Quiz Questions */}
      <div className="space-y-4">
        {quiz.data.stepEightQuizzes?.map((question: any, index: number) => (
          <div key={question.id} className="border rounded-lg p-3 lg:p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <p className="flex-shrink-0 text-base lg:text-lg font-medium">
                  Quiz - {String(index + 1).padStart(2, "0")}
                </p>
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg mb-4">
                    {question?.questionText}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {["optionA", "optionB", "optionC", "optionD"].map(
                  (option, optionIndex) => (
                    <div
                      key={option}
                      className={`flex items-center space-x-3 p-2 lg:p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer text-sm lg:text-base ${
                        selectedAnswers[question?.id] === option
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleAnswerChange(question?.id, option)}
                    >
                      <input
                        type="radio"
                        name={question?.id}
                        value={option}
                        checked={selectedAnswers[question?.id] === option}
                        onChange={() =>
                          handleAnswerChange(question?.id, option)
                        }
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <label
                        htmlFor={`${question?.id}-${option}`}
                        className="flex-1 cursor-pointer font-normal"
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {question[option]}
                      </label>
                      {selectedAnswers[question?.id] === option && (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleSubmit}
          disabled={!hasAnsweredQuestions}
          className="px-8 py-2 bg-secondary text-primary-foreground rounded-md hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <ButtonLoading /> : "Submit Answers"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestions;

'use client';
import { useSearchParams } from 'next/navigation';
import Stats from './Stats/Stats';
import LineChart from './LineChart/LineChart';
import OverallGraph from './OverallGraph/OverallGraph';
import QuizResultAccordion from './QuizResultAccordion/QuizResultAccordion';
import { useGetStudentAnalysisReportByChapterQuery } from '@/redux/features/chapter/chapter.admin.api';

const StudentAnalyticsComponent = () => {
  const params = useSearchParams();
  const chapterId = params.get('chapterId');
  const studentId = params.get('studentId');

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetStudentAnalysisReportByChapterQuery(
    {
      chapterId: chapterId,
      studentId: studentId,
    },
    { skip: !chapterId || !studentId, refetchOnMountOrArgChange: true }
  );

  const baseData: any = response?.data || {};

  if (!chapterId || !studentId) {
    return <div>Invalid parameters</div>;
  }

  return (
    <div className="max-w-[1580px] space-y-8">
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center h-36 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 animate-pulse rounded-xl border border-gray-300/50 shadow-sm"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mb-3"></div>
              <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        Object.keys(baseData).length > 0 && <Stats apiResponse={baseData} />
      )}

      <div className="my-12 flex flex-col md:flex-row w-full gap-8">
        <div className="w-full md:w-[60%] p-5 bg-gray-50 rounded-lg border border-gray-300/50">
          {/* <LineChart /> */}
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center">Loading...</div>
          ) : (
            Object.keys(baseData).length > 0 && (
              <LineChart
                performanceData={baseData?.courseEnroll?.performanceData}
              />
            )
          )}
        </div>
        <div className="w-full flex items-center justify-center md:w-[40%] p-5 bg-gray-50 rounded-lg border border-gray-300/50">
          {!isLoading && !isFetching && Object.keys(baseData).length > 0 ? (
            <OverallGraph
              correctQuiz={baseData?.courseEnroll?.correctQuiz}
              wrongQuiz={baseData?.courseEnroll?.wrongQuiz}
            />
          ) : (
            <div className="flex items-center justify-center">Loading...</div>
          )}
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : Object.keys(baseData).length > 0 ? (
        baseData?.courseEnroll?.resultQuizWithCounts?.map(
          (result: any, index: number) => {
            const correctCount = result?.correctCount ?? 0;
            const wrongCount = result?.wrongCount ?? 0;
            const total = correctCount + wrongCount;
            const rightPercentage =
              total > 0 ? Math.round((correctCount / total) * 100) : 0;
            const wrongPercentage =
              total > 0 ? Math.round((wrongCount / total) * 100) : 0;
            return (
              <QuizResultAccordion
                key={index}
                attemptNumber={index + 1}
                rightPercentage={rightPercentage}
                wrongPercentage={wrongPercentage}
                quizResults={result?.stepEightQuizAttempts?.map(
                  (quizResult: any, idx: number) => ({
                    id: idx + 1,
                    question: quizResult?.stepEightQuiz?.questionText,
                    options: [
                      quizResult?.stepEightQuiz?.optionA,
                      quizResult?.stepEightQuiz?.optionB,
                      quizResult?.stepEightQuiz?.optionC,
                      quizResult?.stepEightQuiz?.optionD,
                    ],
                    selectedAnswer:
                      quizResult?.selectedOption === 'OptionA'
                        ? 0
                        : quizResult?.selectedOption === 'OptionB'
                        ? 1
                        : quizResult?.selectedOption === 'OptionC'
                        ? 2
                        : quizResult?.selectedOption === 'OptionD'
                        ? 3
                        : null,
                  })
                )}
                defaultOpen={true}
              />
            );
          }
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default StudentAnalyticsComponent;

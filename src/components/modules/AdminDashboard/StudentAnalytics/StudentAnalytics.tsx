'use client';
import { useSearchParams } from 'next/navigation';
import Stats from './Stats/Stats';
import LineChart from './LineChart/LineChart';
import OverallGraph from './OverallGraph/OverallGraph';
import QuizResultAccordion from './QuizResultAccordion/QuizResultAccordion';

const StudentAnalyticsComponent = () => {
  const params = useSearchParams();
  const chapterId = params.get('chapterId');
  const studentId = params.get('studentId');
  if (!chapterId || !studentId) {
    return <div>Invalid parameters</div>;
  }
  return (
    <div className="max-w-[1580px] space-y-8">
      <Stats />
      <div className="my-12 flex flex-col md:flex-row w-full gap-8">
        <div className="w-full md:w-[60%] p-5 bg-gray-50 rounded-lg border border-gray-300/50">
          <LineChart />
        </div>
        <div className="w-full md:w-[40%] p-5 bg-gray-50 rounded-lg border border-gray-300/50">
          <OverallGraph />
        </div>
      </div>
      <QuizResultAccordion
        attemptNumber={1}
        rightPercentage={70}
        wrongPercentage={30}
        quizResults={[
          {
            id: '01',
            question: "What does the term 'photosynthesis' mean?",
            options: [
              'Making with water',
              'Making with carbon dioxide',
              'Making with light',
              'Making with chlorophyll',
            ],
            selectedAnswer: 1, // Index of the selected answer (0-based)
          },
          {
            id: '10',
            question:
              'According to the sources, what is the effect of human activities on the amount of carbon dioxide in the atmosphere?',
            options: [
              'Human activities decrease carbon dioxide levels.',
              'Human activities increase carbon dioxide levels.',
              'Human activities have no effect on carbon dioxide levels',
              'Carbon dioxide levels are determined only by plants.',
            ],
            selectedAnswer: 2, // Index of the selected answer (0-based)
          },
        ]}
        defaultOpen={true}
      />
    </div>
  );
};

export default StudentAnalyticsComponent;

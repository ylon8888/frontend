// StepEightContent.tsx
'use client";';

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizQuestions from "../quizFlow/QuizQuestions";
import { useGetCoursesOfChapterQuery } from "@/redux/features/course/course";

type StepEightContentProps = {
  selectedAnswers: Record<string, string>;
  handleAnswerChange: (questionId: string, answer: string) => void;
  handleSubmit: (quizId: string) => void;
  loading: boolean;
};

const StepEightContent: React.FC<StepEightContentProps> = ({
  selectedAnswers,
  handleAnswerChange,
  handleSubmit,
  loading,
}) => {
  const id = window.location.pathname.split("/")[4];
  const { data } = useGetCoursesOfChapterQuery(id);
  const stepEightData = data?.data?.chapters?.[0]?.stepEight;
  const [activeTab, setActiveTab] = useState<string>(
    stepEightData?.[0]?.id || ""
  );

  if (!stepEightData) return <div>Loading quiz data...</div>;

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border-1 rounded-md mb-4">
          {stepEightData.map((item: any) => (
            <TabsTrigger key={item.id} value={item.id} className="">
              {item.questionType}
            </TabsTrigger>
          ))}
        </TabsList>
        {stepEightData.map((item: any) => (
          <TabsContent key={item.id} value={item.id}>
            <QuizQuestions
              quizId={item.id}
              selectedAnswers={selectedAnswers}
              handleAnswerChange={handleAnswerChange}
              handleSubmit={() => handleSubmit(item.id)}
              loading={loading}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StepEightContent;

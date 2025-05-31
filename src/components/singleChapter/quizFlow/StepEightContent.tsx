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
};

const StepEightContent: React.FC<StepEightContentProps> = ({
  selectedAnswers,
  handleAnswerChange,
  handleSubmit,
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
        <TabsList>
          {stepEightData.map((item: any) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="flex items-center gap-2"
            >
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
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StepEightContent;

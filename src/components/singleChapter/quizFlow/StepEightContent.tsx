"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizQuestions from "../quizFlow/QuizQuestions";
import { useGetCoursesOfChapterQuery } from "@/redux/features/course/course";
import StepEightContentSkeleton from "@/components/shared/skeleton/StepEightContentSkeleton";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const id = params.chapterId as string;
  const { data, isLoading } = useGetCoursesOfChapterQuery(id);
  const stepEightData = data?.data?.chapters?.[0]?.stepEight;
  const [activeTab, setActiveTab] = useState<string>("");

  // Set initial active tab when data loads
  useEffect(() => {
    if (stepEightData?.length) {
      setActiveTab(stepEightData[0]?.id);
    }
  }, [stepEightData]);

  if (isLoading || !stepEightData) {
    return <StepEightContentSkeleton />;
  }

  return (
    <div className="">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        orientation="horizontal"
      >
        <div className="overflow-x-auto pb-2 sm:pb-0">
          <TabsList className="bg-white border rounded-md mb-4 w-max sm:w-full">
            {stepEightData.map((item: any) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2"
              >
                {item.questionType}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {stepEightData.map((item: any) => (
          <TabsContent key={item.id} value={item.id} className="mt-0">
            <div className="border rounded-lg p-3 sm:p-4 bg-white">
              <QuizQuestions
                quizId={item.id}
                selectedAnswers={selectedAnswers}
                handleAnswerChange={handleAnswerChange}
                handleSubmit={() => handleSubmit(item.id)}
                loading={loading}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StepEightContent;

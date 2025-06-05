"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/step-accordian";
import StepOneSkeleton from "@/components/shared/skeleton/StepOneSkeleton";

const StepFive = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const stepFiveData = data?.data?.chapters?.[0]?.stepFive;
  // Function to play video

  if (isLoading) {
    return <StepOneSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Title */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <h2 className="font-semibold text-2xl font-montserrat">
          {data?.data?.chapters?.[0]?.chapterName}
        </h2>
      </div>

      {/* Video Section */}
      <div className="relative rounded-4xl overflow-hidden bg-black">
        <video
          className="w-full rounded-4xl"
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source src={stepFiveData?.stepVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Document Content */}
      <div className="bg-white rounded-lg p-8 border border-primary shadow-xl space-y-6">
        {/* Content Sections */}
        <h2 className="font-semibold text-2xl font-montserrat">
          Question Answer
        </h2>

        <div className="bg-white overflow-hidden">
          <Accordion type="multiple" className="w-full space-y-3">
            {stepFiveData?.questionAnswer.map((item: any, index: number) => (
              <AccordionItem
                key={`qa-${index}`}
                value={`qa-${index}`}
                className="border"
              >
                <AccordionTrigger className="px-6 py-6 text-left transition-colors duration-200">
                  <span className="text-gray-800">{item?.question}</span>
                </AccordionTrigger>
                <AccordionContent className="rounded-b-2xl bg-orange-100/30 px-4 py-2 pb-6">
                  <div className="border-gray-50">
                    <p className="text-gray-700 leading-relaxed mt-3">
                      {item?.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default StepFive;

"use client";

import StepOneSkeleton from "@/components/shared/skeleton/StepOneSkeleton";

const StepSeven = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const stepSevenData = data?.data?.chapters?.[0]?.stepSeven;
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
          <source src={stepSevenData?.stepVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Document Content */}
      <div className="bg-white rounded-lg p-8 border border-primary shadow-xl">
        {/* Content Sections */}
        <div
          dangerouslySetInnerHTML={{ __html: stepSevenData?.stepDescription }}
        />
      </div>
    </div>
  );
};

export default StepSeven;

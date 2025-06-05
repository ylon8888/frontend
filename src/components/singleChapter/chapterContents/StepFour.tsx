import StepOneSkeleton from "@/components/shared/skeleton/StepOneSkeleton";

const StepFour = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const stepFourData = data?.data?.chapters?.[0]?.stepFour;

  if (isLoading) {
    return <StepOneSkeleton />;
  }

  return (
    <div className="flex flex-col gap-5 space-y-4">
      {/* Chapter Title */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <h2 className="font-semibold text-2xl font-montserrat">
          {data?.data?.chapters?.[0]?.chapterName}
        </h2>
        <p
          className="text-gray-600 mt-1"
          dangerouslySetInnerHTML={{
            __html: data?.data?.chapters?.[0]?.chapterDescription,
          }}
        />
      </div>

      {/* Video Player */}
      <div className="relative rounded-4xl overflow-hidden bg-black">
        <video
          className="w-full rounded-4xl"
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source src={stepFourData?.stepVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Outline */}
      <div className="bg-white rounded-2xl border border-primary p-6 shadow-xl">
        <p
          className="prose prose-sm max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: stepFourData?.stepDescription }}
        />
      </div>
    </div>
  );
};

export default StepFour;

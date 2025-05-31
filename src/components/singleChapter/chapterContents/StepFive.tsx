"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { useGetCoursesOfChapterQuery } from "@/redux/features/course/course";

const StepFive = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const id = window.location.pathname.split("/")[4];
  const { data } = useGetCoursesOfChapterQuery(id);
  const stepFourData = data?.data?.chapters?.[0]?.stepFour;
  console.log(stepFourData, "stepFourData");

  // Function to play video
  const playVideo = () => setActiveVideoUrl(stepFourData?.stepVideo);

  const closeVideo = () => {
    setActiveVideoUrl(null);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Title */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <h2 className="font-semibold text-2xl font-montserrat">
          {data?.data?.chapters?.[0]?.chapterName}
        </h2>
      </div>

      {/* Video Section */}
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer aspect-video"
        onClick={playVideo}
      >
        {/* <img
          src={videoThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors">
          <Play className="w-12 h-12 text-white bg-secondary/70 rounded-full p-3" />
        </div>
      </div>

      {/* Document Content */}
      <div className="bg-white rounded-lg p-8 border border-primary shadow-xl">
        {/* Content Sections */}
        <div
          dangerouslySetInnerHTML={{ __html: stepFourData?.stepDescription }}
        />
      </div>

      {/* YouTube Player Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-10 bg-black/50 text-white p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src={`${activeVideoUrl}?autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepFive;

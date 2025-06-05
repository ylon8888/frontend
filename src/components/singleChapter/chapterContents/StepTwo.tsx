"use client";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import StepOneSkeleton from "@/components/shared/skeleton/StepOneSkeleton";
import Image from "next/image";

const StepTwo = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const stepTwoData = data?.data?.chapters?.[0]?.stepTwo;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isLoading) {
    return <StepOneSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Chapter Title */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <h2 className="font-semibold text-2xl font-montserrat">
          {data?.data?.chapters?.[0]?.chapterName}
        </h2>
      </div>

      {/* Podcast Player */}
      <div className="flex flex-col">
        <div className="relative rounded-lg overflow-hidden aspect-video">
          {/* Thumbnail with play button */}
          <div className="relative h-full w-full">
            <Image
              src={stepTwoData?.thumbnail}
              alt={stepTwoData?.podcastName}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-12 h-12 text-white bg-secondary/70 rounded-full p-3" />
              ) : (
                <Play className="w-12 h-12 text-white bg-secondary/70 rounded-full p-3" />
              )}
            </button>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={stepTwoData?.podcastVideo?.[0]}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Podcast Info */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold font-montserrat">
            {stepTwoData?.podcastName}
          </h3>
          {isPlaying && (
            <p className="text-sm text-gray-500 mt-1">Now playing...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;

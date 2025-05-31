/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { useGetCoursesOfChapterQuery } from "@/redux/features/course/course";
// import podcastData from "../data/podcasts.json";

// const podcastsData = {
//   chapterTitle: "Chapter 1: Introduction to Plot Podcast",
//   podcasts: [
//     {
//       id: "1",
//       title: "The Importance of Early Literacy",
//       youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     },
//     {
//       id: "2",
//       title: "Top 5 Study Tips for Exam Success",
//       youtubeUrl: "https://www.youtube.com/embed/6Ejga4kJUts",
//       thumbnail: "https://i.ytimg.com/vi/6Ejga4kJUts/maxresdefault.jpg",
//     },
//     {
//       id: "3",
//       title: "The Importance of Early Literacy",
//       youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     },
//     {
//       id: "4",
//       title: "Top 5 Study Tips for Exam Success",
//       youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//       thumbnail: "https://i.ytimg.com/vi/6Ejga4kJUts/maxresdefault.jpg",
//     },
//   ],
// };

const StepTwo = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const playVideo = (youtubeUrl: string) => setActiveVideoUrl(youtubeUrl);
  const closeVideo = () => setActiveVideoUrl(null);

  const id = window.location.pathname.split("/")[4];
  const { data } = useGetCoursesOfChapterQuery(id);
  const stepTwoData = data?.data?.chapters?.[0]?.stepTwo;
  // console.log(stepTwoData, "stepTwoData");
  // const { chapterTitle, podcasts } = podcastsData;

  return (
    <div className="flex flex-col space-y-6">
      {/* Chapter Title */}
      <div className="border-b pb-4">
        <h2 className="text-3xl font-semibold font-montserrat">
          {data?.data?.chapters?.[0]?.chapterName}
        </h2>
      </div>

      {/* Podcast Grid */}
      <div className="">
        <div key={stepTwoData?.id} className="flex flex-col">
          <div
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-video"
            onClick={() => playVideo(stepTwoData?.podcastVideo?.[0])}
          >
            <img
              src={stepTwoData?.thumbnail}
              alt={stepTwoData?.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              {/* <PlayCircle className="w-16 h-16 text-white" /> */}
              <Play className="w-12 h-12 text-white bg-secondary/70 rounded-full p-3" />
            </div>
          </div>
          <h3 className="mt-2 text-lg font-semibold font-montserrat">
            {stepTwoData?.title}
          </h3>
        </div>
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
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`${activeVideoUrl}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepTwo;

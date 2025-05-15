/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Play, X } from "lucide-react";

const briefingData = {
  title: "Briefing Document: Photosynthesis, Carbon Cycle, and Climate Change",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  videoThumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  overview:
    "<p>This briefing provides an introduction to photosynthesis, the carbon cycle, and climate change, focusing on the relationships between them. The larger context is how the Earth's systems interact with human activities and natural methods including habitat examination, diagrams, experiments, and activities. The chapter builds upon fundamental science to explore the complex dynamics of our planet.</p>",
  content: `
    <h3>Photosynthesis and the Carbon Cycle</h3>

    <h4>1. Photosynthesis</h4>
    <ul>
      <li>How and Why photosynthesis</li>
      <li>What happens inside a leaf</li>
    </ul>

    <h4>2. Carbon cycle</h4>
    <ul>
      <li>Carbon in Life and Air</li>
      <li>Fossil fuels and combustion</li>
    </ul>

    <h4>3. Climate change</h4>
    <ul>
      <li>Greenhouse gases</li>
      <li>Climate change: Past, Present, Future</li>
      <li>Impacts of climate change</li>
    </ul>
    `,
};

const StepThree = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const { title, videoUrl, videoThumbnail, content, overview } = briefingData;

  // Function to play video
  const playVideo = () => setActiveVideoUrl(videoUrl);

  const closeVideo = () => {
    setActiveVideoUrl(null);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold font-montserrat">{title}</h2>

      {/* Video Section */}
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer aspect-video"
        onClick={playVideo}
      >
        <img
          src={videoThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors">
          <Play className="w-12 h-12 text-white bg-secondary/70 rounded-full p-3" />
        </div>
      </div>

      {/* Document Content */}
      <div className="bg-white rounded-lg p-8 border border-primary shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 font-montserrat">{title}</h2>

        {/* Overview */}
        <div className="mb-6">
          <h3 className="font-montserrat text-lg font-semibold mb-2">
            Overview:
          </h3>
          <div dangerouslySetInnerHTML={{ __html: overview }} />
        </div>

        {/* Content Sections */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
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

export default StepThree;

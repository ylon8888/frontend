import Image from "next/image";
import img from "@/assets/content.png";
import video from "@/assets/thumbnail.png";

// Step data with HTML format
const getStepOneData = () => {
  return {
    title: "Chapter 1: Photosynthesis and the Carbon Cycle",
    objective:
      "Understanding the basic unit of life: Cells, and the various organelles involved in cell activities.",
    videoSrc: video,
    imageSrc: img,
    contentHtml: `
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
};

const StepOne = () => {
  const { title, objective, videoSrc, imageSrc, contentHtml } =
    getStepOneData();

  return (
    <div className="flex flex-col gap-5 space-y-4">
      {/* Chapter Title */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <h2 className="font-semibold text-2xl font-montserrat">{title}</h2>
        <div className=" text-gray-600 mt-1">{objective}</div>
      </div>

      {/* Video Player */}
      <div className="relative rounded-4xl overflow-hidden">
        <div className="relative aspect-video bg-black">
          <Image
            src={videoSrc}
            alt="Video thumbnail"
            width={1000}
            height={1000}
            className="object-contain rounded-4xl"
          />
        </div>
      </div>

      {/* Content Outline */}
      <div className="bg-white rounded-2xl border border-primary p-6 shadow-xl">
        <div
          className="prose prose-sm max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-6">
          <Image
            src={imageSrc}
            alt="Topic-related illustration"
            className="w-full"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;

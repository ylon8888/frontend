const ChapterModules = () => {
  return (
    <div className="bg-white container max-w-[1320px] mx-auto px-6 py-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <span className="text-orange-500 font-medium text-sm uppercase tracking-wide">
          CLASSES - 11
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
          Science - Biology
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This course provides an introduction to the key concepts of
          Photosynthesis, the Carbon Cycle, and Climate Change, focusing on
          their scientific foundations and real-world applications. Throughout
          this course, you will explore how plants produce food, how carbon
          moves through the Earth&apos;s ecosystems, and how human activities
          are contributing to climate change.
        </p>
      </div>

      {/* Chapter modules content will go here */}
      <div className="mt-8">{/* You can add chapter modules here */}</div>
    </div>
  );
};

export default ChapterModules;

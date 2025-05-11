import React from "react";
import CourseOutlineHero from "./ChaptersOutlineHero";
import ChapterModules from "./ChapterModules";

const CourseOutlinePage = () => {
  return (
    <div>
      <CourseOutlineHero />
      <div className="relative mb-80">
        <div className="absolute left-0 right-0 -bottom-40 z-20">
          <ChapterModules />
        </div>
      </div>
    </div>
  );
};

export default CourseOutlinePage;

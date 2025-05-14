import React from "react";
import CourseOutlineHero from "./ChaptersOutlineHero";
import ChapterModules from "./ChapterModules";

const CourseOutlinePage = () => {
  return (
    <div>
      <CourseOutlineHero />
      <div className="relative pb-20">
        <div className="-mt-20 px-3">
          <ChapterModules />
        </div>
      </div>
    </div>
  );
};

export default CourseOutlinePage;

"use client";

import React from "react";
import CourseOutlineHero from "./ChaptersOutlineHero";
import ChapterModules from "./ChapterModules";
import { useGetChaptersQuery } from "@/redux/features/course/course";

const CourseOutlinePage = () => {
  const id = window.location.pathname.split("/")[2];
  const { data: chapter } = useGetChaptersQuery(id);
  console.log(chapter);

  return (
    <div>
      <CourseOutlineHero chapters={chapter?.data?.data?.subject} />
      <div className="relative pb-20">
        <div className="-mt-20 px-3">
          <ChapterModules chapters={chapter?.data?.data} />
        </div>
      </div>
    </div>
  );
};

export default CourseOutlinePage;

"use client";

import React from "react";
import CourseOutlineHero from "./ChaptersOutlineHero";
import ChapterModules from "./ChapterModules";
import { useGetChaptersQuery } from "@/redux/features/course/course";
import { useParams } from "next/navigation";

const CourseOutlinePage = () => {
  const id = useParams().id;
  const { data: chapter, isLoading } = useGetChaptersQuery(id, { skip: !id });

  return (
    <div>
      <CourseOutlineHero chapters={chapter?.data?.data?.subject} />
      <div className="relative pb-20">
        <div className="-mt-20 px-3">
          <ChapterModules
            chapters={chapter?.data?.data}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseOutlinePage;

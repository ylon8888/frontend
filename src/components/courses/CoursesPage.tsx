"use client";

import React from "react";
import ClassesSection from "./ClassesSection";
// import { classData } from "@/lib/ClassData";
import { useGetAllClassQuery } from "@/redux/features/class/class.admin.api";
import Loading from "../ui/core/Loading/Loading";

const CoursesPage = () => {
  const { data: classData, isLoading } = useGetAllClassQuery({});

  // console.log("classes", classData);

  const classId = classData?.data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {classId?.map((classes: any) => (
        <ClassesSection
          key={classes?.id}
          title={`Make sure you complete your preparation for the examination.`}
          classData={classes}
          badge={`${classes?.className}`}
          id={classes?.id}
        />
      ))}
    </div>
  );
};

export default CoursesPage;

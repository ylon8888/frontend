import React from "react";
import ClassesSection from "./ClassesSection";
import { classData } from "@/lib/ClassData"; // Import your class data

const CoursesPage = () => {
  return (
    <div>
      {Object.keys(classData).map((grade, index) => (
        <ClassesSection
          key={index}
          title={`Make sure you complete your preparation for the examination.`}
          badge={`Classes ${grade}`}
          grade={grade as "9" | "10" | "11" | "12"}
        />
      ))}
    </div>
  );
};

export default CoursesPage;

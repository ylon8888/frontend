import AllEnrolledCourses from "@/components/modules/user/enrolledCourse/AllEnrolledCourses";
import React from "react";

const EnrolledCourses = () => {
  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-semibold font-montserrat">
        Your Enrolled Courses
      </h2>
      <AllEnrolledCourses />
    </div>
  );
};

export default EnrolledCourses;

import CoursesHero from "@/components/courses/CoursesHero";
import CoursesPage from "@/components/courses/CoursesPage";
import ExpectfromPodcastClasses from "@/components/home/ExpectfromPodcastClasses";
import Faq from "@/components/home/Faq";
import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import Testimonials from "@/components/shared/Testimonials/Testimonials";
import WithRole from "@/role-wrapper/WithAdmin";
import React from "react";

const Courses = () => {
  return (
    <WithRole allowedRoles={["STUDENT"]}>
      <div>
        <CoursesHero />
        <ExpectfromPodcastClasses />
        <CoursesPage />
        <Testimonials />
        <Faq />
        <SuccessInAcademicYear />
      </div>
    </WithRole>
  );
};

export default Courses;

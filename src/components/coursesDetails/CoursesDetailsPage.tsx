"use client";

import { useState } from "react";
import CourseContent from "./CourseContent";
import CourseDetailsHero from "./CourseDetailsHero";
import EnrollCard from "./EnrollCard";
import TabNavigation from "./TabNavigation";
import CourseInstructor from "./CourseInstructor";
import CourseDetails from "./CourseDetails";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import { courseData } from "@/lib/CourseData";
import { useGetSingleCourseDetailsQuery } from "@/redux/features/course/course";
import Loading from "../ui/core/Loading/Loading";
import { useParams } from "next/navigation";

const CoursesDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("instructor");
  const courseID = useParams().id;
  const { data, isLoading, isError } = useGetSingleCourseDetailsQuery(
    courseID,
    {
      skip: !courseID,
    }
  );
  const courseDetail = data?.data;

  const tabs = [
    { id: "instructor", label: "Course Instructor", href: "#instructor" },
    { id: "content", label: "What you will learn", href: "#content" },
    { id: "details", label: "Course details", href: "#details" },
    { id: "faq", label: "Frequently Asked Questions", href: "#faq" },
  ];

  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);

    const element = document.getElementById(tabId);
    const stickyHeader = document.querySelector(".sticky") as HTMLElement;

    if (element) {
      const yOffset = stickyHeader?.offsetHeight
        ? -stickyHeader.offsetHeight - 10
        : -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !courseDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center focus-within:text-gray-500 font-semibold text-2xl">
        No Data Found
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Banner Section - Fixed */}
      <div className="sticky top-0 z-10">
        <CourseDetailsHero courseDetail={courseDetail} />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 mt-8 flex flex-col-reverse xl:flex-row gap-8">
        {/* Course Details */}
        <div className="flex-1 max-w-full xl:max-w-3xl mx-auto px-4 py-8 border mt-10 rounded-2xl">
          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={scrollToSection}
          />

          <div className="mt-6 space-y-8">
            {/* Course Sections */}
            <section id="instructor">
              <CourseInstructor instructor={courseData.instructor} />
            </section>

            <section id="content">
              <CourseContent steps={courseData.steps} />
            </section>

            <section id="details">
              <CourseDetails details={courseData.details} />
            </section>

            <section id="faq">
              <FrequentlyAskedQuestions faqs={courseData.faqs} />
            </section>
          </div>
        </div>

        {/* Right Enroll Card - Fixed */}
        <div className="xl:w-lg w-full relative xl:sticky top-32 z-10 mb-40">
          <EnrollCard courseDetail={courseDetail} />
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsPage;

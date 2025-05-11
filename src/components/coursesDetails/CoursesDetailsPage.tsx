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

const CoursesDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("instructor");

  const tabs = [
    { id: "instructor", label: "Course Instructor", href: "#instructor" },
    { id: "content", label: "What you will learn", href: "#content" },
    { id: "details", label: "Course details", href: "#details" },
    { id: "faq", label: "Frequently Asked Questions", href: "#faq" },
  ];

  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId); // Update the active tab state
    const element = document.getElementById(tabId);

    if (element) {
      const yOffset = -80; // Adjust based on header height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section - Fixed */}
      <div className="sticky top-0 z-10">
        <CourseDetailsHero />
      </div>

      {/* Main Content Container */}
      <div className="container max-w-[1320px] mx-auto px-4 relative">
        <div className="flex gap-8">
          {/* Course Details  */}
          <div className="flex-1">
            <div className="max-w-3xl mx-auto px-4 py-8">
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
            {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
              <p>Course details and information...</p>
            </div>

            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <h3 className="text-xl font-semibold mb-3">
                  Section {index + 1}
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))} */}
          </div>

          {/* Right Enroll Card - Fixed */}
          <div className="w-lg relative">
            <div className="sticky z-40">
              <EnrollCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsPage;

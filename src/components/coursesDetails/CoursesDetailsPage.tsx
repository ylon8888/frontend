// "use client";

// import { useState } from "react";
// import CourseContent from "./CourseContent";
// import CourseDetailsHero from "./CourseDetailsHero";
// import EnrollCard from "./EnrollCard";
// import TabNavigation from "./TabNavigation";
// import CourseInstructor from "./CourseInstructor";
// import CourseDetails from "./CourseDetails";
// import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
// import { courseData } from "@/lib/CourseData";

// const CoursesDetailsPage = () => {
//   const [activeTab, setActiveTab] = useState("instructor");

//   const tabs = [
//     { id: "instructor", label: "Course Instructor", href: "#instructor" },
//     { id: "content", label: "What you will learn", href: "#content" },
//     { id: "details", label: "Course details", href: "#details" },
//     { id: "faq", label: "Frequently Asked Questions", href: "#faq" },
//   ];

//   const scrollToSection = (tabId: string) => {
//     setActiveTab(tabId); // Update the active tab state

//     // Find the section element by its id
//     const element = document.getElementById(tabId);

//     if (element) {
//       // Adjust the offset for header height or other fixed elements
//       const yOffset = -80;
//       const y =
//         element.getBoundingClientRect().top + window.pageYOffset + yOffset;

//       // Smooth scroll to the element
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="">
//       {/* Banner Section - Fixed */}
//       <div className="sticky top-0 z-10">
//         <CourseDetailsHero />
//       </div>

//       {/* Main Content Container */}
//       <div className="container max-w-[1320px] mx-auto px-4 relative flex gap-8">
//         {/* Course Details */}
//         <div className="flex-1 max-w-3xl mx-auto px-4 py-8 border mt-10 rounded-2xl">
//           {/* Tab Navigation */}
//           <TabNavigation
//             tabs={tabs}
//             activeTab={activeTab}
//             onTabChange={scrollToSection} // Pass the scrollToSection function
//           />

//           <div className="mt-6 space-y-8">
//             {/* Course Sections */}
//             <section id="instructor">
//               <CourseInstructor instructor={courseData.instructor} />
//             </section>

//             <section id="content">
//               <CourseContent steps={courseData.steps} />
//             </section>

//             <section id="details">
//               <CourseDetails details={courseData.details} />
//             </section>

//             <section id="faq">
//               <FrequentlyAskedQuestions faqs={courseData.faqs} />
//             </section>
//           </div>
//         </div>
//         {/* Right Enroll Card - Fixed */}
//         <div className="w-lg relative z-10">
//           <EnrollCard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursesDetailsPage;

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

    // Find the section element by its id
    const element = document.getElementById(tabId);

    if (element) {
      // Adjust the offset for header height or other fixed elements
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // Smooth scroll to the element
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Banner Section - Fixed */}
      <div className="sticky top-0 z-10">
        <CourseDetailsHero />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 mt-8 flex flex-col-reverse xl:flex-row gap-8">
        {/* Course Details */}
        <div className="flex-1 max-w-full xl:max-w-3xl mx-auto px-4 py-8 border mt-10 rounded-2xl">
          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={scrollToSection} // Pass the scrollToSection function
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
          <EnrollCard />
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsPage;

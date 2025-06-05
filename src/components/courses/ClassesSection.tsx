"use client";

import { useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import ClassCard from "../shared/cards/ClassCard";
import { useGetSingleCourseQuery } from "@/redux/features/course/course";
import Loading from "../ui/core/Loading/Loading";
// import { classData } from "@/lib/ClassData";

interface ClassesSectionProps {
  title: string;
  badge: string;
  classData: any;
  id: string;
}

const ClassesSection = ({
  id,
  title,
  badge,
  classData,
}: ClassesSectionProps) => {
  const [visibleCards, setVisibleCards] = useState(3);
  const { data: courseDatas, isLoading } = useGetSingleCourseQuery(id);
  const courseData = courseDatas?.data?.singleClass?.subjects;
  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  // Dynamic background color and text color based on grade
  const getBackgroundColor = (grade: string) => {
    switch (grade) {
      case "class 9":
        return { bgColor: "bg-primary", textColor: "text-white" };
      case "class 10":
        return { bgColor: "bg-white", textColor: "text-black" };
      case "class 11":
        return { bgColor: "bg-[#F5F5F5]", textColor: "text-black" };
      case "class 12":
        return { bgColor: "bg-white", textColor: "text-black" };
      default:
        return { bgColor: "bg-white", textColor: "text-black" };
    }
  };
  const { bgColor, textColor } = getBackgroundColor(badge);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container max-w-[1320px] mx-auto px-4">
        {/* Header for the section */}
        <div className="py-10 px-6 rounded-lg mb-12">
          <SectionHeader
            badge={badge}
            title={title}
            centered
            textColor={textColor}
            className="mb-0"
          />
        </div>

        {/* Class Cards Grid */}
        {/* Class Cards Grid or No Data Message */}
        {courseData && courseData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courseData
              .slice(0, visibleCards)
              .map((classItem: any, index: number) => (
                <ClassCard
                  key={classItem?.id || index}
                  id={classItem?.id}
                  subject={classItem?.subjectName}
                  count={classItem?._count?.chapters}
                  image={classItem?.banner}
                  index={index}
                  description={classItem?.subjectDescription}
                  chapters={classItem?._count?.chapters}
                  textColor={textColor}
                />
              ))}
          </div>
        ) : (
          <div className="text-center text-orange-500 mt-6 text-lg">
            No subjects found for this class.
          </div>
        )}

        {/* Button to load more cards */}
        <div className="flex justify-center mt-8">
          {visibleCards < classData["subjects"]?.length && (
            <button
              onClick={loadMoreCards}
              className="bg-secondary hover:bg-secondary/80 text-white font-semibold font-montserrat py-3 px-10 rounded-xl transition-colors"
            >
              More Chapter
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;

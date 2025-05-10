"use client";

import { useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import ClassCard from "../shared/cards/ClassCard";
import { classData } from "@/lib/ClassData";

interface ClassesSectionProps {
  title: string;
  badge: string;
  grade: "9" | "10" | "11" | "12";
}

const ClassesSection = ({ title, badge, grade }: ClassesSectionProps) => {
  const [visibleCards, setVisibleCards] = useState(3);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  // Dynamic background color and text color based on grade
  const getBackgroundColor = (grade: string) => {
    switch (grade) {
      case "9":
        return { bgColor: "bg-primary", textColor: "text-white" }; // Dark teal, white text
      case "10":
        return { bgColor: "bg-white", textColor: "text-black" }; // White background, black text
      case "11":
        return { bgColor: "bg-[#F5F5F5]", textColor: "text-black" }; // Light grey background, black text
      case "12":
        return { bgColor: "bg-white", textColor: "text-black" }; // White background, black text
      default:
        return { bgColor: "bg-white", textColor: "text-black" }; // Default white background, black text
    }
  };

  const { bgColor, textColor } = getBackgroundColor(grade);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {classData[grade]?.slice(0, visibleCards).map((classItem, index) => (
            <ClassCard
              key={index}
              subject={classItem.subject}
              count={classItem.count}
              image={classItem.image}
              index={index}
              description={classItem.description}
              chapters={classItem.chapters}
              textColor={textColor} // Pass text color to ClassCard
            />
          ))}
        </div>

        {/* Button to load more cards */}
        <div className="flex justify-center mt-8">
          {visibleCards < classData[grade]?.length && (
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/home/circle-bg.png";
import SectionHeader from "../shared/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectCard } from "../shared/cards/SubjectCard";

// Static data for now, will be replaced with API data later
const classData = {
  "09": [
    {
      subject: "English Language Arts",
      count: "125 Total Podcast Classes",
      image: "/images/english.jpg",
    },
    {
      subject: "Science",
      count: "125 Total Podcast Classes",
      image: "/images/science.jpg",
    },
    {
      subject: "Mathematics",
      count: "125 Total Podcast Classes",
      image: "/images/math.jpg",
    },
    {
      subject: "Social Studies",
      count: "125 Total Podcast Classes",
      image: "/images/social.jpg",
    },
    {
      subject: "Art",
      count: "125 Total Podcast Classes",
      image: "/images/art.jpg",
    },
    {
      subject: "Computer Science",
      count: "125 Total Podcast Classes",
      image: "/images/computer.jpg",
    },
  ],
  "10": [
    {
      subject: "Advanced English",
      count: "130 Total Podcast Classes",
      image: "/images/english.jpg",
    },
    {
      subject: "Physics",
      count: "120 Total Podcast Classes",
      image: "/images/science.jpg",
    },
    {
      subject: "Algebra",
      count: "135 Total Podcast Classes",
      image: "/images/math.jpg",
    },
    {
      subject: "World History",
      count: "115 Total Podcast Classes",
      image: "/images/social.jpg",
    },
    {
      subject: "Visual Arts",
      count: "100 Total Podcast Classes",
      image: "/images/art.jpg",
    },
    {
      subject: "Programming Basics",
      count: "110 Total Podcast Classes",
      image: "/images/computer.jpg",
    },
  ],
  "11": [
    {
      subject: "Literature & Composition",
      count: "140 Total Podcast Classes",
      image: "/images/english.jpg",
    },
    {
      subject: "Chemistry",
      count: "145 Total Podcast Classes",
      image: "/images/science.jpg",
    },
    {
      subject: "Geometry & Trigonometry",
      count: "150 Total Podcast Classes",
      image: "/images/math.jpg",
    },
    {
      subject: "Economics",
      count: "120 Total Podcast Classes",
      image: "/images/social.jpg",
    },
    {
      subject: "Digital Media",
      count: "105 Total Podcast Classes",
      image: "/images/art.jpg",
    },
    {
      subject: "Web Development",
      count: "130 Total Podcast Classes",
      image: "/images/computer.jpg",
    },
  ],
  "12": [
    {
      subject: "Advanced Composition",
      count: "150 Total Podcast Classes",
      image: "/images/english.jpg",
    },
    {
      subject: "Biology",
      count: "155 Total Podcast Classes",
      image: "/images/science.jpg",
    },
    {
      subject: "Calculus",
      count: "160 Total Podcast Classes",
      image: "/images/math.jpg",
    },
    {
      subject: "Political Science",
      count: "130 Total Podcast Classes",
      image: "/images/social.jpg",
    },
    {
      subject: "Fine Arts",
      count: "110 Total Podcast Classes",
      image: "/images/art.jpg",
    },
    {
      subject: "Mobile App Development",
      count: "140 Total Podcast Classes",
      image: "/images/computer.jpg",
    },
  ],
};

const MakeSureYouCompletePreparation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-30"
      >
        <Image
          src={bg || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Classes 9-12"
          title="Make sure you complete your preparation for the examination."
          centered
          className="mb-12"
        />

        {/* Tabs */}
        <Tabs defaultValue="09" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              {Object.keys(classData).map((classNum) => (
                <TabsTrigger
                  key={classNum}
                  value={classNum}
                  className="data-[state=active]:bg-gray-800  border  data-[state=active]:text-white"
                >
                  {`Class ${classNum}`}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {Object.entries(classData).map(([classNum, subjects]) => (
            <TabsContent key={classNum} value={classNum} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {subjects.map((subject: any, index: number) => (
                  <SubjectCard
                    key={index}
                    subject={subject.subject}
                    count={subject.count}
                    image={subject.image}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MakeSureYouCompletePreparation;

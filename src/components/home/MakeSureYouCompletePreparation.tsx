"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/home/circle-bg.png";
import SectionHeader from "../shared/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectCard } from "../shared/cards/SubjectCard";
import { useGetAllClassQuery } from "@/redux/features/class/class.admin.api";
import { useGetSingleCourseQuery } from "@/redux/features/course/course";

const MakeSureYouCompletePreparation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const { data: classesData } = useGetAllClassQuery({});
  const allClass = classesData?.data?.data || [];

  // Selected class ID state
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(
    undefined
  );

  // Default to first class ID
  useEffect(() => {
    if (allClass.length > 0 && !selectedClassId) {
      setSelectedClassId(allClass[0]?.id);
    }
  }, [allClass, selectedClassId]);

  // Fetch course subjects for selected class
  const { data: courseData, isFetching } = useGetSingleCourseQuery(
    selectedClassId,
    {
      skip: !selectedClassId, // Skip query if no class is selected
    }
  );

  // Correct data access based on your API response
  const singleClass = courseData?.data?.singleClass;
  const subjects = singleClass?.subjects || [];

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

      <div className="container max-w-[1320px] mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Classes 9-12"
          title="Make sure you complete your preparation for the examination."
          centered
          className="mb-12"
        />

        {/* Tabs */}
        <Tabs
          value={selectedClassId || ""}
          onValueChange={setSelectedClassId}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              {allClass.map((classItem: any) => (
                <TabsTrigger
                  key={classItem?.id}
                  value={classItem?.id}
                  className="data-[state=active]:bg-gray-800 border data-[state=active]:text-white uppercase"
                >
                  {classItem?.className}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value={selectedClassId || ""} className="mt-0">
            {isFetching ? (
              <p className="text-center text-gray-600">Loading subjects...</p>
            ) : subjects.length === 0 ? (
              <p className="text-center text-gray-600">
                No subjects found for this class
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {subjects.map((subject: any) => (
                  <SubjectCard
                    key={subject.id}
                    id={subject.id}
                    subject={subject.subjectName}
                    description={subject.subjectDescription}
                    image={subject.banner}
                    index={subject.id}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MakeSureYouCompletePreparation;

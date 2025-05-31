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

  // Selected class state
  const [selectedClassName, setSelectedClassName] = useState<
    string | undefined
  >(undefined);

  // Default to first class
  useEffect(() => {
    if (allClass.length > 0 && !selectedClassName) {
      setSelectedClassName(allClass[0].className);
    }
  }, [allClass, selectedClassName]);

  // Get selected class ID
  const selectedClass = allClass.find(
    (cls: any) => cls.className === selectedClassName
  );
  const selectedId = selectedClass?.id;

  // Fetch course subjects for selected class
  const { data: courseData, isFetching } = useGetSingleCourseQuery(selectedId, {
    skip: !selectedId,
  });
  const subjects = courseData?.data?.singleClass?.subjects || [];

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
          value={selectedClassName}
          onValueChange={setSelectedClassName}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              {allClass.map((classItem: any) => (
                <TabsTrigger
                  key={classItem?.id}
                  value={classItem?.className}
                  className="data-[state=active]:bg-gray-800 border data-[state=active]:text-white uppercase"
                >
                  {classItem?.className}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value={selectedClassName ?? ""} className="mt-0">
            {isFetching ? (
              <p className="text-center text-gray-600">Loading subjects...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {subjects.map((subject: any, index: number) => (
                  <SubjectCard
                    key={index}
                    id={subject?.id}
                    subject={subject?.subjectName}
                    description={subject?.subjectDescription}
                    image={subject?.banner}
                    index={index}
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

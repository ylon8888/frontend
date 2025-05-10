/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/home/circle-bg.png";
import SectionHeader from "../shared/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectCard } from "../shared/cards/SubjectCard";
import { classData } from "@/lib/ClassData";

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

      <div className="container max-w-[1320px] mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Classes 9-12"
          title="Make sure you complete your preparation for the examination."
          centered
          className="mb-12"
        />

        {/* Tabs */}
        <Tabs defaultValue="9" className="w-full">
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

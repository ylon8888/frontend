"use client";

import { motion } from "framer-motion";
import SectionHeader from "../shared/SectionHeader";
const stats = [
  {
    number: "12,30+",
    label: "Our Total Student",
    delay: 0.3,
  },
  {
    number: "100+",
    label: "Our Courses",
    delay: 0.5,
  },
  {
    number: "20",
    label: "Overall Category",
    delay: 0.7,
  },
];
const SuccessInAcademicYear = () => {
  return (
    <div className="bg-[#0A7B7F] py-16 md:py-24 overflow-hidden">
      <div className="container max-w-[1320px] mx-auto px-4 ">
        <SectionHeader
          title="Our Success in the 2022-24 Academic Year"
          subtitle="Your success is the driving force behind our commitment to providing exceptional learning experiences every day."
          textColor="text-white"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-16 mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[rgba(250,250,250,0.2)] p-8 md:p-4 lg:p-8 rounded-2xl text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.6 }}
            >
              <h3 className="font-montserrat text-3xl lg:text-6xl font-semibold mb-8">
                {stat.number}
              </h3>
              <p className="text-xl md:text-lg lg:text-3xl font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessInAcademicYear;

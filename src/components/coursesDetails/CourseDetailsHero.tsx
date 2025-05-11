"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/courses/hero-bg.png";

const CourseDetailsHero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg || "/placeholder.svg"}
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container max-w-[1320px] mx-auto px-4 py-10  relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white col-span-2"
          >
            <motion.p
              variants={itemVariants}
              className="mb-4 text-secondary max-w-3xl font-montserrat font-semibold"
            >
              Class Name
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-semibold font-montserrat mb-6 "
            >
              Our Blog
            </motion.h1>
            <motion.p variants={itemVariants} className="mb-8 max-w-3xl">
              Latest Insights and Updates. Stay updated with the latest trends,
              tips, and stories in education, literature, and beyond.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsHero;

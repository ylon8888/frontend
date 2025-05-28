"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/courses/hero-bg.png";
import banner from "@/assets/class.png";

const CourseOutlineHero = ({ chapters }: { chapters: any }) => {
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

      <div className="container max-w-[1320px] mx-auto px-4 pt-20 pb-20 md:pb-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.p
              variants={itemVariants}
              className="text-secondary mb-5 max-w-lg uppercase"
            >
              {chapters?.class?.className}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-montserrat"
            >
              {chapters?.subjectName}
            </motion.h1>
          </motion.div>

          {/* Right Content - Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full sm:w-[80vw] lg:w-[648px] h-[364px] rounded-3xl">
              <Image
                src={chapters?.banner || banner}
                alt="Learning Platform Banner"
                fill
                className="object-contain rounded-3xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CourseOutlineHero;

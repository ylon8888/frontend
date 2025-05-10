"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen, LayoutGrid, Star } from "lucide-react";
import bg from "@/assets/home/hero-section-bg.png";
import banner from "@/assets/home/hero-banner.png";

const Hero = () => {
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

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 leading-12 lg:leading-20"
            >
              Welcome to <br />
              Your <span className="bg-secondary px-2">Personalized</span>
              <br />
              <span className="bg-primary px-2">Learning</span> Journey
            </motion.h1>

            <motion.p variants={itemVariants} className="mb-8 max-w-lg">
              Engage with structured learning paths, track your progress, and
              master new skills!
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 mb-12"
            >
              <Link
                href="/courses"
                className="bg-secondary hover:bg-secondary/80 transition-colors text-white font-medium py-3 px-6 rounded-md"
              >
                Start Learning Now
              </Link>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    strokeWidth={0}
                    fill="url(#half-star)"
                  />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="half-star"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="50%" stopColor="#FACC15" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="">(10k+ Reviews)</span>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="flex items-center flex-wrap gap-6 lg:gap-20"
            >
              {/* Stats Cards */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="">Total</p>
                  <p className="">Students</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="">Total</p>
                  <p className="">Courses</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4">
                  <LayoutGrid className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="">Overall</p>
                  <p className="">Category</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full">
              <Image
                src={banner || "/placeholder.svg"}
                alt="Learning Platform Banner"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

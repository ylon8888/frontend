"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/courses/hero-bg.png";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blog.admin.api";
const DetailsHero = () => {
  const id = window.location.pathname.split("/").pop();
  const { data } = useGetSingleBlogQuery(id);
  console.log(data);
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
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold font-montserrat mb-6 leading-tight tracking-wide"
            >
              {data?.data?.blog?.title || "Blog Title"}
            </motion.h1>
          </motion.div>
          {/* Right Content - Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative col-span-1"
          >
            <div className="relative w-[243px] h-[250px]">
              <Image
                src={data?.data?.blog?.image}
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

export default DetailsHero;

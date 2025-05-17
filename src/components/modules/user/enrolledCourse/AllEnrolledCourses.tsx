"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { classData } from "@/lib/ClassData";
const AllEnrolledCourses = () => {
  const allClasses = Object.values(classData).flat();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {allClasses.map((classItem, index) => (
        <motion.div
          key={classItem?.id}
          className="rounded-lg overflow-hidden hover:shadow-md p-5 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link href={`/user/enrolled-courses/${classItem?.id}`}>
            <div className="relative h-48">
              <Image
                src={
                  classItem?.image || "/placeholder.svg?height=192&width=384"
                }
                alt={classItem?.subject}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="mt-6 text-gray-800">
              <p className="text-sm mb-4">{classItem?.chapters}</p>{" "}
              <h3 className="text-2xl font-semibold mb-1 font-montserrat">
                {classItem?.subject}
              </h3>
              <p className="mb-2 text-base">{classItem?.description}</p>
              {/* Display number of chapters */}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default AllEnrolledCourses;

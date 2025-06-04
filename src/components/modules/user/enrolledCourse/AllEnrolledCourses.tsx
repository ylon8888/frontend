"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEnrolledCourseQuery } from "@/redux/features/userDashboard/userApi";
import Loading from "@/components/ui/core/Loading/Loading";

const AllEnrolledCourses = () => {
  const { data, isLoading } = useEnrolledCourseQuery({});
  const allCourses = data?.data?.enroll || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {allCourses?.map((enrollment: any, index: number) => {
        const subject = enrollment?.subject;
        if (!subject) return null;

        return (
          <motion.div
            key={subject?.id}
            className="rounded-lg overflow-hidden hover:shadow-md p-5 border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link href={`/user/enrolled-courses/${subject?.id}`}>
              <div className="relative h-48">
                <Image
                  src={
                    subject?.banner || "/placeholder.svg?height=192&width=384"
                  }
                  alt={subject?.subjectName}
                  fill
                  className="bg-gray-200 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="mt-6 text-gray-800">
                <p className="text-sm mb-4">
                  {subject?._count?.chapters || 0} chapters
                </p>
                <h3 className="text-2xl font-semibold mb-1 font-montserrat">
                  {subject?.subjectName}
                </h3>
                <p
                  className="mb-2 text-base"
                  dangerouslySetInnerHTML={{
                    __html: subject?.subjectDescription,
                  }}
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllEnrolledCourses;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const SubjectCard = ({
  id,
  subject,
  description,
  image,
  index,
}: {
  id: string;
  subject: string;
  description: string;
  image: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-5"
    >
      <Link href={`/courses/${id}`}>
        <div className="relative aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={subject}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold font-montserrat text-xl mb-2">
            {subject}
          </h3>
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

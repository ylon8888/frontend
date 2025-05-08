"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

export const SubjectCard = ({
  subject,
  count,
  image,
  index,
}: {
  subject: string;
  count: string;
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
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={subject}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center group">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="bg-orange-500 rounded-full p-3 cursor-pointer"
          >
            <Play className="h-6 w-6 text-white" fill="white" />
          </motion.div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold font-montserrat text-xl mb-2">
          {subject}
        </h3>
        <p className="text-gray-600">{count}</p>
      </div>
    </motion.div>
  );
};

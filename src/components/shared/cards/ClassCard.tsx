"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ClassCardProps {
  subject: string;
  count: string;
  description: string;
  chapters: string;
  image: string;
  index: number;
  textColor: string; // Accept textColor as a prop
}

const ClassCard = ({
  subject,
  description,
  chapters,
  image,
  index,
  textColor,
}: ClassCardProps) => {
  return (
    <motion.div
      className="rounded-lg overflow-hidden hover:shadow-md p-5 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg?height=192&width=384"}
          alt={subject}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={`${textColor}`}>
        <p className="text-sm mb-4">{chapters}</p>{" "}
        <h3 className="text-2xl font-semibold mb-1 font-montserrat ">
          {subject}
        </h3>
        <p className="mb-2">{description}</p>
        {/* Display number of chapters */}
      </div>
    </motion.div>
  );
};

export default ClassCard;

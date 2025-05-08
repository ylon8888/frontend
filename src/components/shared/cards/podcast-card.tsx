"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

interface PodcastCardProps {
  image: string;
  title: string;
  description: string;
  index?: number;
}

const PodcastCard = ({
  image,
  title,
  description,
  index = 0,
}: PodcastCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="border p-5 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-video ">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center group">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="bg-orange-500 rounded-full p-3 cursor-pointer"
          >
            <Play className="h-6 w-6 text-white" fill="white" />
          </motion.div>
        </div>
      </div>
      <div className="py-8 bg-white">
        <h3 className="font-semibold font-montserrat text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mt-6">{description}</p>
      </div>
    </motion.div>
  );
};

export default PodcastCard;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import profile from "@/assets/profile.png";
interface ReviewCardProps {
  rating: number;
  review: string;
  name: string;
  image: string;
  index?: number;
}

const ReviewCard = ({
  rating,
  review,
  name,
  image,
  index = 0,
}: ReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
    >
      <div className="p-6 flex-grow">
        {/* Rating Stars */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
              strokeWidth={1}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
        </div>

        {/* Review Text */}
        {/* <p className="text-gray-700">{review}</p> */}
        <p className="text-gray-700">
          {review?.length > 160 ? `${review.substring(0, 160)}...` : review}
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-primary p-4 text-white flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-white">
          <Image
            src={image || profile}
            alt={name}
            width={500}
            height={500}
            className="object-cover w-12 h-12"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;

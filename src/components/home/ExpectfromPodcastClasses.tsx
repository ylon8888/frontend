"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/home/circle-bg.png";
import SectionHeader from "../shared/SectionHeader";
import PodcastCard from "../shared/cards/PodcastCard";

const podcastData = [
  {
    image: "/images/podcast-1.jpg",
    title: "What's happening in the online batch throughout the year?",
    description:
      "Complete preparation for 6th-10th grade studies from home with live classes from expert teachers, a well-organized masterbook, and model tests!",
  },
  {
    image: "/images/podcast-2.jpg",
    title: "What's happening in the online batch throughout the year?",
    description:
      "Complete preparation for 6th-10th grade studies from home with live classes from expert teachers, a well-organized masterbook, and model tests!",
  },
  {
    image: "/images/podcast-3.jpg",
    title: "What's happening in the online batch throughout the year?",
    description:
      "Complete preparation for 6th-10th grade studies from home with live classes from expert teachers, a well-organized masterbook, and model tests!",
  },
];

const ExpectfromPodcastClasses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -inset-0 z-0 opacity-50"
      >
        <Image
          src={bg || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      <div className="container max-w-[1320px] mx-auto px-4 relative z-10">
        <SectionHeader
          title="What Can You Expect from Our Podcast Classes This Year?"
          subtitle="May the advancement of education continue from any part of the country under the care of the best teachers."
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {podcastData.map((podcast, index) => (
            <PodcastCard
              key={index}
              image={podcast.image}
              title={podcast.title}
              description={podcast.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpectfromPodcastClasses;

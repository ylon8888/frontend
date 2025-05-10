"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/home/circle-bg.png";
import SectionHeader from "../shared/SectionHeader";
import { T_FaqItem } from "@/types/Common";
import { FaqItem } from "../shared/cards/FaqCards";

const faqData: T_FaqItem[] = [
  {
    question: "How do I register for a course?",
    answer:
      "To register for a course, simply navigate to the course catalog, choose the course you're interested in, and click \"Enroll Now.\" You will be prompted to create an account or log in if you haven't already. Once logged in, follow the steps to complete your enrollment.",
  },
  {
    question: "What types of courses are available on the platform?",
    answer:
      "We offer a wide range of courses across various fields including marketing, web development, design, data science, and more. You can choose from foundational courses, advanced workshops, and special classes with expert instructors.",
  },
  {
    question: "How long does it take to complete a course?",
    answer:
      "The duration of each course varies. You can find the estimated time to complete each course on its course page. However, you can learn at your own pace, so it's up to you how quickly you move through the material.",
  },
  {
    question: "Are the courses live or pre-recorded?",
    answer:
      "We offer both live and pre-recorded courses. Pre-recorded courses allow you to learn at your own pace, while live courses provide real-time interaction with instructors. The course description will specify whether it's live or pre-recorded.",
  },
  {
    question: "Can I access the courses on mobile devices?",
    answer:
      "Yes, our platform is fully responsive and optimized for mobile devices. You can access your courses on smartphones and tablets through our mobile app or web browser for learning on the go.",
  },
  {
    question: "How do I track my progress in a course?",
    answer:
      "Your progress is automatically tracked as you complete lessons and modules. You can view your progress on your dashboard, which shows completion percentages, quiz scores, and which modules you've finished.",
  },
  {
    question: "Will I receive a certificate upon completion of a course?",
    answer:
      "Yes, upon successful completion of a course, you will receive a digital certificate that you can download, print, and share on your professional profiles to showcase your new skills and knowledge.",
  },
  {
    question: "Can I request a refund if I'm not satisfied with the course?",
    answer:
      "We offer a satisfaction guarantee. If you're not satisfied with a course, you can request a refund within 30 days of purchase. Please refer to our refund policy for specific details and conditions.",
  },
];

const Faq = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-50"
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
          title="Frequently Asked Questions (FAQ)"
          centered
          className="max-w-[670px] mx-auto mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

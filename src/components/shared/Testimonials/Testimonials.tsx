"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bg from "@/assets/home/circle-bg.png";
import { useEffect } from "react";
import SectionHeader from "../SectionHeader";
import ReviewCard from "../cards/ReviewCard";
import image from "@/assets/class.png";

// Sample testimonial data
const testimonials = [
  {
    rating: 4,
    review:
      "The course was comprehensive and easy to follow. The hands-on projects were especially helpful, and I was able to apply the skills to real-life data problems!",
    name: "Saifur Rahman",
    position: "Product Manager",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I gained so much valuable knowledge from this course! The material was practical, and the live sessions with experts were really insightful.",
    name: "Saifur Rahman",
    position: "Product Manager",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "The step-by-step approach in the courses helped me break down complex concepts easily. I feel confident to start building websites on my own now!",
    name: "Saifur Rahman",
    position: "Product Manager",
    image: image.src,
  },
  {
    rating: 5,
    review:
      "The instructors were incredibly knowledgeable and supportive. They answered all my questions promptly and provided valuable feedback on my projects.",
    name: "Amina Khan",
    position: "UX Designer",
    image: image.src,
  },
  {
    rating: 5,
    review:
      "This platform has completely transformed my learning experience. The quality of content and teaching methodology is exceptional!",
    name: "Rahul Sharma",
    position: "Software Engineer",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I've tried many online learning platforms, but this one stands out for its practical approach and community support. Highly recommended!",
    name: "Priya Patel",
    position: "Data Analyst",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I've tried many online learning platforms, but this one stands out for its practical approach and community support. Highly recommended!",
    name: "Priya Patel",
    position: "Data Analyst",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I've tried many online learning platforms, but this one stands out for its practical approach and community support. Highly recommended!",
    name: "Priya Patel",
    position: "Data Analyst",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I've tried many online learning platforms, but this one stands out for its practical approach and community support. Highly recommended!",
    name: "Priya Patel",
    position: "Data Analyst",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I've tried many online learning platforms, but this one stands out for its practical approach and community support. Highly recommended!",
    name: "Priya Patel",
    position: "Data Analyst",
    image: image.src,
  },
  {
    rating: 4,
    review:
      "I've tried many online learning platforms, but this one stands out for its practical approach and community support. Highly recommended!",
    name: "Priya Patel",
    position: "Data Analyst",
    image: image.src,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Update slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total number of slides
  const totalSlides = Math.ceil(testimonials.length / slidesToShow);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * slidesToShow;
    return testimonials.slice(startIndex, startIndex + slidesToShow);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-[#F5F5F5]"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-30"
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
          badge="Testimonials"
          title="What Our Students Are Saying!"
          subtitle="Real stories from real students who have transformed their learning journey."
          centered
          className="mb-12"
        />

        {/* Slider Controls */}
        <div className="flex justify-end mb-6 gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          key={currentSlide} // Force re-render on slide change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentTestimonials().map((testimonial, index) => (
            <ReviewCard
              key={index + currentSlide * slidesToShow}
              rating={testimonial.rating}
              review={testimonial.review}
              name={testimonial.name}
              position={testimonial.position}
              image={testimonial.image}
              index={index}
            />
          ))}
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-primary w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

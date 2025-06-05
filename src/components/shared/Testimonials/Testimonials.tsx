"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bg from "@/assets/home/circle-bg.png";
import { useEffect } from "react";
import SectionHeader from "../SectionHeader";
import ReviewCard from "../cards/ReviewCard";
import { useGetSingleCourseReviewsQuery } from "@/redux/features/course/course";
import { useParams } from "next/navigation";

const Testimonials = () => {
  const subjectId = useParams().id;
  const { data, isLoading } = useGetSingleCourseReviewsQuery(subjectId, {
    skip: !subjectId,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

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

  // Reset slide when slidesToShow changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesToShow]);

  // Calculate total number of slides
  const reviews = data?.data?.reviews || [];
  const totalSlides = Math.max(1, Math.ceil(reviews.length / slidesToShow));

  // Navigation functions
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * slidesToShow;
    return reviews.slice(startIndex, startIndex + slidesToShow);
  };

  // Auto-slide functionality (optional)
  useEffect(() => {
    if (reviews.length <= slidesToShow) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, slidesToShow, reviews.length]);

  // Loading state
  if (isLoading) {
    return (
      <section className="relative py-16 md:py-24 overflow-hidden bg-[#F5F5F5]">
        <div className="container max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-sm animate-pulse"
              >
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no reviews
  if (!reviews.length) {
    return (
      <section className="relative py-16 md:py-24 overflow-hidden bg-[#F5F5F5]">
        <div className="container max-w-[1320px] mx-auto px-4 text-center">
          <SectionHeader
            badge="Testimonials"
            title="What Our Students Are Saying!"
            subtitle="Real stories from real students who have transformed their learning journey."
            centered
            className="mb-12"
          />
          <p className="text-secondary">No reviews available yet.</p>
        </div>
      </section>
    );
  }

  const currentTestimonials = getCurrentTestimonials();

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

        {/* Slider Controls - Only show if there are multiple slides */}
        {totalSlides > 1 && (
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Testimonial Cards Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              staggerChildren: 0.1,
            }}
          >
            {currentTestimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={`${currentSlide}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard
                  rating={testimonial?.rating}
                  review={testimonial?.message}
                  name={testimonial?.name}
                  image={testimonial?.profileImage}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots - Only show if there are multiple slides */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentSlide(index)}
                disabled={isAnimating}
                className={`h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  currentSlide === index
                    ? "bg-primary w-6"
                    : "bg-gray-300 w-3 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {totalSlides > 1 && (
          <div className="text-center mt-4 text-sm text-gray-600">
            {currentSlide + 1} / {totalSlides}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

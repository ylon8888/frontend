"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { TeamMemberCard } from "../shared/cards/TeamMemberCard";
import { teamMembers } from "@/lib/TeamMembers";
import SectionHeader from "../shared/SectionHeader";

const OurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-primary text-white py-16">
      <div className="container max-w-[1320px] mx-auto px-4">
        <SectionHeader
          title="Meet Our Team"
          subtitle="Behind [Company Name], there is a team of passionate, dedicated professionals committed to bringing you the best learning experience possible. Our team consists of educators, designers, developers, and support staff, all working together to create a platform that helps learners thrive."
          textColor="white"
          centered
          className="mb-12"
        />
        {/* Swiper container */}
        <div className="mb-10">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="team-swiper"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <TeamMemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-orange-500 w-6"
                  : "bg-white/60 w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;

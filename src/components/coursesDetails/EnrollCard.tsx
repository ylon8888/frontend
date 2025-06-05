"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Modal from "../shared/Testimonials/SharedModal";
import EnrollForm from "./EnrollForm";
import Link from "next/link";
import EnrollOtp from "./EnrollOtp";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const EnrollCard = ({ courseDetail }: any) => {
  const [enrollFormOpen, setEnrollFormOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [enrollData, setEnrollData] = useState<{ success?: boolean }>({});

  // Simulate enrollData success changing (replace with your actual logic)
  // For example, this could come from a form submission handler that sets enrollData
  useEffect(() => {
    if (enrollData?.success === true) {
      setEnrollFormOpen(false);
      setOtpOpen(true);
    }
  }, [enrollData]);
  const id = useParams().id;

  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-lg p-4 -mt-[200px]">
      <Image
        src="https://images.pexels.com/photos/2876659/pexels-photo-2876659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Science Biology Course"
        width={1000}
        height={1000}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <h2 className="text-3xl font-montserrat font-medium mb-2">
        {courseDetail?.data?.course?.subjectName}
      </h2>

      <div className="flex items-center gap-5 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 mr-1 ${
                i < Math.round(courseDetail?.data?.averageRating || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm">
          {courseDetail?.data?.averageRating?.toFixed(1)} Rating
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <Modal
          trigger={
            <button
              disabled={courseDetail?.data?.isEnroll}
              onClick={() => {
                if (courseDetail?.data?.isEnroll) {
                  toast.error("You are already enrolled");
                } else {
                }
              }}
              className={`flex-1 py-3 px-6 rounded-lg transition-colors
              ${
                courseDetail?.data?.isEnroll
                  ? "bg-secondary/70 text-white cursor-not-allowed"
                  : "bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
              }
            `}
            >
              Enroll Now
            </button>
          }
          open={enrollFormOpen}
          onOpenChange={setEnrollFormOpen}
          title="Enroll Form"
        >
          <EnrollForm setEnrollData={setEnrollData} />
        </Modal>

        <Modal
          trigger={null} // no trigger, controlled programmatically
          open={otpOpen}
          onOpenChange={setOtpOpen}
          title="Enter OTP"
        >
          <EnrollOtp />
        </Modal>
        {courseDetail?.data?.isEnroll ? (
          <Link
            href={`${id}/chapters`}
            className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            View Course
          </Link>
        ) : (
          <button
            onClick={() => toast.error("You need to enroll first")}
            className="flex-1 bg-gray-200 text-gray-400 py-3 px-6 rounded-lg font-semibold cursor-not-allowed text-center"
          >
            View Course
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center ">
          <span className="text-secondary mr-2">►</span>
          Total {courseDetail?.data?.chapterCount} Chapter
        </div>
        <div className="flex items-center ">
          <span className="text-secondary mr-2">►</span>
          Life-Time Support
        </div>
        <div className="flex items-center ">
          <span className="text-secondary mr-2">►</span>
          Video Record Class
        </div>
        <div className="flex items-center ">
          <span className="text-secondary mr-2">►</span>
          1K+ Learning Student
        </div>
        <div className="flex items-center ">
          <span className="text-secondary mr-2">►</span>9 Steps to Complete Each
          Chapter
        </div>
      </div>
    </div>
  );
};

export default EnrollCard;

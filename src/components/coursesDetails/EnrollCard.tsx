import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Modal from "../shared/Testimonials/SharedModal";
import EnrollForm from "./EnrollForm";
import Link from "next/link";

const EnrollCard = ({ courseDetail }: any) => {
  const id = window.location.pathname.split("/")[2];
  console.log(courseDetail);
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
            <button className="flex-1 bg-secondary text-white py-3 px-6 rounded-lg hover:bg-secondary/90 transition-colors">
              Enroll Now
            </button>
          }
        >
          <EnrollForm />
        </Modal>
        <Link
          href={`${id}/chapters`}
          className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
        >
          View Course
        </Link>
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

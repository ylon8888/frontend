import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

const EnrollCard = () => {
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
        Science - Biology
      </h2>

      <div className="flex items-center gap-5 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className=" text-sm">
          5.0 Star <span className="text-gray-600">(150 Review)</span>
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <button className="flex-1 bg-secondary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors">
          Enroll Now
        </button>
        <button className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          View Course
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center ">
          <span className="text-secondary mr-2">►</span>
          Total 10 Chapter
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

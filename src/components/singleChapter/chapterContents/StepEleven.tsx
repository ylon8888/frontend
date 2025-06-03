import React from "react";
import img from "@/assets/complete.png";
import Image from "next/image";

const StepEleven = ({ data }: { data: any }) => {
  return (
    <div className="my-10">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Image
          src={img}
          alt=""
          width={1000}
          height={1000}
          className="w-72 h-72"
        />

        <h1 className="text-secondary text-6xl font-semibold text-center mt-4 uppercase">
          Congratulations
        </h1>
        <p className="font-medium text-3xl text-center mt-2">
          on Completing <span> {data?.data?.chapters?.[0]?.chapterName}!</span>
        </p>
        <p className="text-center text-gray-600 font-light mt-4">
          Well done! You’ve successfully finished this Chapter. Keep up the
          great work and unlock the next Courses to continue your learning
          journey.
        </p>
      </div>
    </div>
  );
};

export default StepEleven;

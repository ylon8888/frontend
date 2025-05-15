import React from "react";
import Steps from "./Steps";
// import StepOne from "./chapterContents/StepOne";
// import StepTwo from "./chapterContents/StepTwo";
import StepThree from "./chapterContents/StepThree";

const ChapterLayout = () => {
  return (
    <div className="flex gap-10 w-full my-16 md:my-24">
      <div className="w-full lg:w-2/3">
        {/* <StepOne /> */}
        {/* <StepTwo /> */}
        <StepThree />
      </div>
      <div className="w-full lg:w-1/3 border shadow-lg p-5 rounded-2xl">
        <Steps />
      </div>
    </div>
  );
};

export default ChapterLayout;

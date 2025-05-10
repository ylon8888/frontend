"use client";
// import pageNotFound from "@/assets/lottieFiles/pageNotFound.json";
// import NextButton from "@/components/ui/buttons/NextButton/NextButton";
// import Lottie from "lottie-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-screen">
      {/* <Lottie
        className="h-[calc(100vh-300px)] py-5"
        animationData={pageNotFound}
        loop={true}
      /> */}
      <h3 className="text-center text-8xl font-semibold">Page Not Found</h3>
      <Link href="/" className="">
        <button className="flex items-center justify-center mt-10 mx-auto px-6 py-3 rounded-md bg-secondary font-montserrat text-white text-lg  shadow-md hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
          <span>Go to Home</span>
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

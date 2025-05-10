"use client";

import { useState, useEffect } from "react";
import underConstruction from "@/assets/lottieFiles/underconstruction.json";
import Lottie from "lottie-react";
import Link from "next/link";

const UnderConstruction = () => {
  const [isClient, setIsClient] = useState(false);

  // Ensures that code runs only on the client side
  useEffect(() => {
    setIsClient(true); // Set isClient to true once the component is mounted on the client
  }, []);

  if (!isClient) return null; // Render nothing on the server side

  return (
    <div className="h-screen">
      <Lottie
        className="h-[calc(100vh-300px)] py-5"
        animationData={underConstruction}
        loop={true}
      />
      <h3 className="text-center text-6xl font-semibold">
        Page Under Construction
      </h3>
      <Link href="/" className="block mt-10 mx-auto text-center">
        <button className="flex items-center justify-center mt-10 mx-auto px-14 py-3 rounded-md bg-orange-400 font-montserrat text-white text-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
          <span>Go to Home</span>
        </button>
      </Link>
    </div>
  );
};

export default UnderConstruction;

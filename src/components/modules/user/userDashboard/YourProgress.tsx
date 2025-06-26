"use client";

import { useGetProgressQuery } from "@/redux/features/userDashboard/userApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const YourProgress = () => {
  const { data, isLoading } = useGetProgressQuery({});
  console.log(data);

  if (isLoading) {
    return (
      <div className="w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
        <div className="grid gap-4 md:gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-4 bg-gray-100 rounded-lg p-4">
                <div className="w-24 h-20 bg-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-300 rounded mb-2 w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3 w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const progressData = data?.data || [];

  if (progressData.length === 0) {
    return (
      <div className="w-full p-6">
        <h2 className="text-3xl mb-6">Your Progress</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            No courses available yet. Start your learning journey!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-medium mb-6">Your Progress</h2>
      <div className="grid gap-4 md:gap-6">
        {progressData.map((subject: any) => (
          <div
            key={subject.subjectId}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4 p-4">
              {/* Educational Icon/Image */}
              {/* <div className="flex-shrink-0">
                <div className="w-24 h-20 bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1 left-1 w-3 h-3 bg-blue-600 rounded transform rotate-12"></div>
                    <div className="absolute top-3 right-2 w-2 h-6 bg-red-500 rounded-full transform -rotate-12"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-1 bg-green-600 rounded"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div className="text-white font-bold text-xs text-center z-10">
                    <div className="bg-blue-600 text-white px-1 py-0.5 rounded text-[8px] mb-1">
                      LEARN
                    </div>
                    <div className="text-[10px] font-semibold">
                      {subject.subjectName.slice(0, 8)}
                    </div>
                  </div>
                </div>
              </div> */}

              <div>
                {subject?.banner ? (
                  <Image
                    src={subject?.banner}
                    alt={subject?.subjectName}
                    width={500}
                    height={500}
                    className="w-60 h-40 bg-gray-100 object-cover rounded-lg"
                  />
                ) : (
                  <div>
                    <div className="w-60 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {subject.subjectName} Progress
                    </h3>
                    <p
                      className=" text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: subject.subjectDescription,
                      }}
                    />
                  </div>
                  <div className="text-right ml-4">
                    <span className=" font-medium text-gray-700">
                      Complete {subject.progress}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="flex h-full">
                      {/* Completed portion (green) */}
                      <div
                        className="bg-green-500 transition-all duration-500 ease-out"
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                      {/* Remaining portion (red/orange) */}
                      <div
                        className="bg-red-500 transition-all duration-500 ease-out"
                        style={{ width: `${100 - subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{subject.completedSteps} completed</span>
                    <span>{subject.totalSteps} total steps</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg font-montserrat  transition-colors">
                    {subject.progress === 0
                      ? "Start Course"
                      : subject.progress === 100
                      ? "Review Course"
                      : "Continue Course"}
                  </button>
                  <Link
                    href={`/courses/${subject.subjectId}/chapters`}
                    className="border border-secondary px-4 py-2 rounded-lg  font-montserrat  transition-colors"
                  >
                    <p className="text-secondary ">See Chapters</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourProgress;

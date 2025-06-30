/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetStudentQuery } from "@/redux/features/userDashboard/userApi";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ProfileBox = () => {
  const { data: studentData, isLoading } = useGetStudentQuery({});
  const student = studentData?.data;

  if (isLoading || !student) {
    return (
      <div className="bg-white space-y-4 px-6 py-10 rounded-xl shadow border border-gray-200 max-w-sm w-full h-fit text-center font-montserrat">
        {/* Skeleton Loader for Profile Image */}
        <div className="w-36 h-36 rounded-full bg-gray-200 mx-auto mb-4 animate-pulse"></div>

        {/* Skeleton Loader for Name */}
        <div className="w-2/3 h-6 bg-gray-200 mx-auto mb-2 animate-pulse"></div>

        {/* Skeleton Loader for Email */}
        <div className="w-1/2 h-4 bg-gray-200 mx-auto mb-4 animate-pulse"></div>

        {/* Skeleton Loader for Joined Date */}
        <div className="flex items-start gap-2 text-lg justify-center">
          <div className="w-1/4 h-4 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  }

  const { studentInfo } = student;
  const fullName = `${studentInfo?.firstName ?? ""} ${
    studentInfo?.lastName ?? ""
  }`;
  const joinedDate = dayjs(studentInfo?.createdAt).fromNow();
  const profileImage = studentInfo?.studentProfiles?.profileImage;

  return (
    <div className="bg-white space-y-4 px-6 py-10 rounded-xl shadow border border-gray-200 max-w-sm w-full h-fit text-center font-montserrat">
      {profileImage ? (
        <img
          src={profileImage}
          alt={fullName}
          className="bg-gray-100 w-36 h-36 rounded-full object-cover mx-auto mb-4"
        />
      ) : (
        <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-900">{fullName}</h2>
      <p className="text-gray-600 text-base">{studentInfo?.email}</p>

      <div className="mt-8 space-y-4 text-left text-gray-700">
        <div className="flex items-start gap-2 text-lg">
          <FaInfoCircle className="mt-1 text-black" />
          <span>Joined {joinedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;

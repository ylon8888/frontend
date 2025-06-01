"use client";

import { useGetStudentQuery } from "@/redux/features/userDashboard/userApi";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loading from "@/components/ui/core/Loading/Loading";

dayjs.extend(relativeTime);

const ProfileBox = () => {
  const { data: studentData, isLoading } = useGetStudentQuery({});
  const student = studentData?.data;

  if (isLoading || !student) {
    return <Loading />;
  }

  const { studentInfo } = student;
  const fullName = `${studentInfo?.firstName ?? ""} ${
    studentInfo?.lastName ?? ""
  }`;
  const joinedDate = dayjs(studentInfo?.createdAt).fromNow();
  const profileImage = studentInfo?.studentProfiles?.profileImage;

  return (
    <div className="bg-white space-y-4 px-6 py-10 rounded-xl shadow border border-gray-200 max-w-sm w-full text-center font-montserrat">
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
        <div className="flex items-start gap-2 text-lg">
          <FaInfoCircle className="mt-1 text-black" />
          <span>You enrolled in six chapters for your ninth-grade class.</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;

import LearningGraph from "@/components/modules/user/userDashboard/LearningGraph";
import ProfileBox from "@/components/modules/user/userDashboard/ProfileBox";
import StatCards from "@/components/modules/user/userDashboard/StateCards";
import React from "react";

const UserDashboardRoot = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
      <div className="w-full space-y-4">
        <StatCards />
        <LearningGraph />
      </div>
      <ProfileBox />
    </div>
  );
};

export default UserDashboardRoot;

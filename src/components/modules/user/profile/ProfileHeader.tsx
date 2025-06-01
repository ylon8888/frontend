"use client";

import { useState } from "react";
import { ProfileDisplay } from "./ProfileDisplay";
import { ProfileEdit } from "./ProfileEdit";
import { useGetStudentProfileQuery } from "@/redux/features/auth/authApi";
import ProfileInformation from "./ProfileInformation";

const ProfileHeader: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: studentProfile } = useGetStudentProfileQuery({});
  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = (updatedData: any) => {
    console.log("Updated profile data:", updatedData);
    // setProfileData(updatedData);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out">
      {isEditMode ? (
        <ProfileEdit
          profileData={studentProfile?.data}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <ProfileDisplay
            profileData={studentProfile?.data}
            onEdit={handleEdit}
          />
          <ProfileInformation profileData={studentProfile?.data} />
        </>
      )}
    </div>
  );
};

export default ProfileHeader;

"use client";

import { useState } from "react";
import { ProfileData } from "@/types/Common";
import { ProfileDisplay } from "./ProfileDisplay";
import { ProfileEdit } from "./ProfileEdit";

const initialProfileData: ProfileData = {
  name: "Sarah Johnson",
  role: "Senior Product Designer",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate product designer with 8+ years of experience creating intuitive digital experiences. Specializing in user-centered design and design systems.",
  avatarUrl: "",
  coverUrl:
    "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  socials: {
    twitter: "sarahj_design",
    linkedin: "sarahjohnsondesign",
    dribbble: "sarahjdesign",
  },
};

const ProfileHeader: React.FC = () => {
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = (updatedData: ProfileData) => {
    console.log("Updated profile data:", updatedData);
    setProfileData(updatedData);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out">
      {isEditMode ? (
        <ProfileEdit
          profileData={profileData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileDisplay profileData={profileData} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ProfileHeader;

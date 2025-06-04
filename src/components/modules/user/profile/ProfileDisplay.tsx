/* eslint-disable @next/next/no-img-element */
import { Button } from "antd";
import { Edit, Mail, Phone } from "lucide-react";
import default_profile from "@/assets/profile.png";
import cover from "@/assets/cover.webp";
export const ProfileDisplay: React.FC<{
  profileData: any;
  onEdit: () => void;
}> = ({ profileData, onEdit }) => {
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div
        className="h-52 w-full bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${cover.src})` }}
      />

      {/* Desktop Positioned Button */}
      <div className="hidden md:block absolute right-6 top-56 z-10">
        <Button
          type="primary"
          icon={<Edit size={16} />}
          onClick={onEdit}
          style={{ backgroundColor: "#0b7077", color: "#fff" }}
        >
          Edit Profile
        </Button>
      </div>

      <div className="px-4 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4 flex justify-center">
          <div className="relative group">
            <img
              src={
                typeof profileData?.studentProfiles?.profileImage === "string"
                  ? profileData?.studentProfiles?.profileImage
                  : profileData?.studentProfiles?.profileImage?.src ||
                    default_profile.src
              }
              alt={profileData?.firstName}
              width={1000}
              height={1000}
              className="bg-gray-50/60 rounded-full border-4 border-white h-32 w-32 object-cover shadow-sm"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-opacity-20 rounded-full border-4 border-white transition-all duration-200 ease-in-out" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div>
            <h1 className="text-2xl font-montserrat font-bold text-gray-900">
              {profileData?.firstName} {profileData?.lastName}
            </h1>
            <div className="mt-2 flex flex-col md:flex-row gap-4 text-lg">
              {/* Mail */}
              <div className="flex items-center justify-center hover:*:underline">
                <Mail size={18} className="mr-2 text-blue-500" />
                <a href={`mailto:${profileData?.email}`} className="text-black">
                  {profileData?.email}
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Positioned Button */}
          <div className="mt-4 md:hidden">
            <Button
              type="primary"
              icon={<Edit size={16} />}
              onClick={onEdit}
              style={{ backgroundColor: "#0b7077", color: "#fff" }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { StaticImageData } from "next/image";

export type T_FaqItem = {
  question: string;
  answer: string;
};

export type T_TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string | StaticImageData;
  socialLinks: {
    facebook: string;
    linkedin: string;
    twitter: string;
    message: string;
  };
};

export type T_Step = {
  id: string;
  number: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  isLast?: boolean;
};

export interface ProfileData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatarUrl: string | StaticImageData;
  coverUrl: string | StaticImageData;
  socials: {
    twitter: string;
    linkedin: string;
    dribbble: string;
  };
}

export interface ProfileDisplayModeProps {
  profileData: ProfileData;
  onEdit: () => void;
}

export interface ProfileEditModeProps {
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
  onCancel: () => void;
}

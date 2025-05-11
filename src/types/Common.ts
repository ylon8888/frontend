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

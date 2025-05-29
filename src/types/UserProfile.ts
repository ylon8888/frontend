export type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  studentProfiles: StudentProfile | null;
};

type StudentProfile = {
  id: string;
  userId: string;
  profileImage: string;
  gurdianContact: GuardianContact[];
  academicInformation: AcademicInformation[];
  experience: Experience[];
  hobbies: Hobby[];
  skill: Skill[];
  socialProfile: SocialProfile[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type GuardianContact = {
  gurdianName: string;
  gurdianNumber: string;
};

type AcademicInformation = {
  courseName: string;
  institutionName: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
};

type Experience = {
  companyName: string;
  position: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
};

type Hobby = {
  name: string;
};

type Skill = {
  skillName: string;
};

type SocialProfile = {
  socialMedia: string;
  socialLink: string;
};

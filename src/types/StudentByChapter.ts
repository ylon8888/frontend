interface User {
  id: string;
  email: string;
}

export interface CourseEnroll {
  id: string;
  createdAt: string;
  name: string;
  phoneNumber: string;
  user: User;
}

interface Subject {
  createdAt: string;
  subjectName: string;
  courseEnrolls: CourseEnroll[];
}

export interface Chapter {
  id: string;
  sLNumber: string;
  chapterName: string;
  subject: Subject;
}
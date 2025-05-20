import AllStudentByChapterPageComponent from '@/components/modules/AdminDashboard/AllStudentByChapterPage/AllStudentByChapterPageComponent';
import React from 'react';

const page = async ({ params }: { params: Promise<{ chapterId: string }> }) => {
  const { chapterId } = await params;
  return (
    <div>{<AllStudentByChapterPageComponent chapterId={chapterId} />}</div>
  );
};

export default page;

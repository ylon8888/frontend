import StudentDetailsPageComponent from '@/components/modules/AdminDashboard/StudentDetailsPage/StudentDetailsPageComponent';
import React from 'react';

const StudentDetailsPage = async ({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) => {
  const { studentId } = await params;
  return (
    <div>
      <StudentDetailsPageComponent studentId={studentId} />
    </div>
  );
};

export default StudentDetailsPage;

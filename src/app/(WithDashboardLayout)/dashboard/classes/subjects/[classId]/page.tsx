import SubjectsPageComponent from '@/components/modules/AdminDashboard/SubjectsPage/SubjectsPageComponent';
import React from 'react';

const SubjectsPage = async ({
  params,
}: {
  params: Promise<{ classId: string }>;
}) => {
  const { classId } = await params;
  return (
    <div>
      <SubjectsPageComponent classId={classId} />
    </div>
  );
};

export default SubjectsPage;

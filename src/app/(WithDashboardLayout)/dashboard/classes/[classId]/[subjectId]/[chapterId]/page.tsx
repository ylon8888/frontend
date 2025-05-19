import AllTopicsPageComponent from '@/components/modules/AdminDashboard/AllTopicsPage/AllTopicsPageComponent';
import React from 'react';

const page = async ({ params }: { params: Promise<{ chapterId: string }> }) => {
  const { chapterId } = await params;
  return <div>{<AllTopicsPageComponent chapterId={chapterId} />}</div>;
};

export default page;

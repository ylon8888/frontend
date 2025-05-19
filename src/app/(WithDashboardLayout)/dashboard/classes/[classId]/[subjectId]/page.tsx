import ChaptersPageComponent from '@/components/modules/AdminDashboard/ChaptersPage/ChaptersPageCoponent';

const ChaptersPage = async ({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) => {
  const { subjectId } = await params;
  return (
    <div>
      <ChaptersPageComponent subjectId={subjectId} />
    </div>
  );
};

export default ChaptersPage;

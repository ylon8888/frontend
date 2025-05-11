interface CourseDetailsProps {
  details: {
    description: string;
    structure: string;
  };
}

const CourseDetails = ({ details }: CourseDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Course details</h2>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600">{details.description}</p>
          </div>

          <div>
            <p className="text-gray-600">{details.structure}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

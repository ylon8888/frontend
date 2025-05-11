interface Step {
  number: number;
  title: string;
  duration: string;
}

interface CourseContentProps {
  steps: Step[];
}

const CourseContent = ({ steps }: CourseContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          What you will learn by doing the course
        </h2>
        <h3 className="text-xl font-semibold mb-4">
          {steps.length} Steps to Complete Each Chapter
        </h3>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-orange-100 hover:bg-orange-50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-semibold">
                {step.number}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800 font-medium">{step.title}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-sm text-gray-500">{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;

/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

interface InstructorProps {
  instructor: {
    name: string;
    title: string;
    image: string;
    description: string;
  };
}

const CourseInstructor = ({ instructor }: InstructorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-3xl font-montserrat font-semibold mb-6 font-montserrat">
          Course Instructor
        </h2>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={instructor?.image || "/placeholder.svg"}
              alt={instructor?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold font-montserrat mb-6">
              {instructor.name}
            </h3>
            <p className="text-gray-600 text-sm">{instructor.title}</p>

            <p className="mt-3 text-gray-700">{instructor.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;

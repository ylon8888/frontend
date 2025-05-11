import CoursesDetailsPage from "@/components/coursesDetails/CoursesDetailsPage";
import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import Testimonials from "@/components/shared/Testimonials/Testimonials";

const CourseDetails = () => {
  return (
    <div>
      <CoursesDetailsPage />
      <Testimonials />
      <SuccessInAcademicYear />
    </div>
  );
};

export default CourseDetails;

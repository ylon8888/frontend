import CoursesDetailsPage from "@/components/coursesDetails/CoursesDetailsPage";
import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import Testimonials from "@/components/shared/Testimonials/Testimonials";
import WithRole from "@/role-wrapper/WithAdmin";

const CourseDetails = () => {
  return (
    <WithRole allowedRoles={["STUDENT", "ADMIN"]}>
      <div>
        <CoursesDetailsPage />
        <Testimonials />
        <SuccessInAcademicYear />
      </div>
    </WithRole>
  );
};

export default CourseDetails;

import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import BlogDescription from "./BlogDescription";
import DetailsHero from "./DetailsHero";
import RecentBlog from "./RecentBlog";
import Testimonials from "@/components/shared/Testimonials/Testimonials";

const BlogDetails = () => {
  return (
    <div>
      <DetailsHero />
      <BlogDescription />
      <RecentBlog />
      {/* <Testimonials /> */}
      <SuccessInAcademicYear />
    </div>
  );
};

export default BlogDetails;

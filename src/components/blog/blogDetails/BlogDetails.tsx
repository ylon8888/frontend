import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import BlogDescription from "./BlogDescription";
import DetailsHero from "./DetailsHero";
import RecentBlog from "./RecentBlog";

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

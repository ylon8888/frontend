import AboutHero from "@/components/about/AboutHero";
import Abouts from "@/components/about/Abouts";
import whoWeAre from "@/assets/about/who-we-are.png";
import mission from "@/assets/about/mission.png";
import value from "@/assets/about/values.png";
import Testimonials from "@/components/shared/Testimonials/Testimonials";
import Faq from "@/components/home/Faq";
import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import OurTeam from "@/components/about/OurTeam";
const About = () => {
  return (
    <div>
      <AboutHero />
      <Abouts
        title="Who We Are"
        content={[
          "At Video Edu-platform, we are passionate about providing high-quality educational resources and solutions that help learners of all ages succeed. Our platform is designed to create an engaging, interactive, and supportive learning environment, where students can access the knowledge they need, at their own pace, and on their terms.",
          "Founded in 2010, we have been committed to making learning accessible, engaging, and rewarding. With a dedicated team of educators, designers, and developers, we strive to deliver content that empowers students to achieve their academic and personal goals.",
        ]}
        image={whoWeAre}
        reverseLayout={true}
        useList={false}
      />
      <Abouts
        title="Our Mission"
        content={[
          "Our mission is simple: To empower individuals by providing accessible, high-quality education that inspires personal growth and fosters lifelong learning.",
          "We believe in creating a community where everyone can learn, grow, and succeed—regardless of their background or learning style.",
          "We aim to build an inclusive learning platform that encourages creativity, collaboration, and curiosity while using the latest technology to enhance the educational experience.",
        ]}
        image={mission}
        reverseLayout={false}
        useList={false}
      />

      {/* Our Values Section with list content and reversed layout */}
      <Abouts
        title="Our Values"
        content={[
          "Integrity: We believe in being honest, transparent, and accountable in everything we do.",
          "Innovation: We are constantly evolving to stay ahead of the curve and bring the latest learning technologies to our platform.",
          "Inclusivity: We are committed to creating a space where everyone feels valued, heard, and supported in their learning journey.",
          "Collaboration: We work together with our learners, educators, and partners to create the best possible educational experience.",
        ]}
        image={value}
        reverseLayout={true}
        useList={true}
      />
      <OurTeam />
      <Testimonials />
      <Faq />
      <SuccessInAcademicYear />
    </div>
  );
};

export default About;

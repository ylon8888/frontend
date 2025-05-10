import ExpectfromPodcastClasses from "@/components/home/ExpectfromPodcastClasses";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import MakeSureYouCompletePreparation from "@/components/home/MakeSureYouCompletePreparation";
import SpecialClasses from "@/components/home/SpecialClasses";
import SuccessInAcademicYear from "@/components/home/SuccessInAcademicYear";
import Testimonials from "@/components/shared/Testimonials/Testimonials";
export default function HomeLayout() {
  return (
    <div className="">
      <Hero />
      <ExpectfromPodcastClasses />
      <SpecialClasses />
      <MakeSureYouCompletePreparation />
      <Testimonials />
      <Faq />
      <SuccessInAcademicYear />
    </div>
  );
}

import ExpectfromPodcastClasses from "@/components/home/ExpectfromPodcastClasses";
import Hero from "@/components/home/Hero";
import MakeSureYouCompletePreparation from "@/components/home/MakeSureYouCompletePreparation";
import SpecialClasses from "@/components/home/SpecialClasses";
export default function HomeLayout() {
  return (
    <div className="">
      <Hero />
      <ExpectfromPodcastClasses />
      <SpecialClasses />
      <MakeSureYouCompletePreparation />
    </div>
  );
}

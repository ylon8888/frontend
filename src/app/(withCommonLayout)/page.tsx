import ExpectfromPodcastClasses from "@/components/home/ExpectfromPodcastClasses";
import Hero from "@/components/home/Hero";
import SpecialClasses from "@/components/home/SpecialClasses";
export default function HomeLayout() {
  return (
    <div className="">
      <Hero />
      <ExpectfromPodcastClasses />
      <SpecialClasses />
    </div>
  );
}

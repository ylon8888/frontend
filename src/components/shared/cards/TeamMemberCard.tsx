import { useState } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// Import the social media images
import facebook from "@/assets/about/facebook.png";
import linkedin from "@/assets/about/linkedin.png";
import twitter from "@/assets/about/twitter.png";
import whatsapp from "@/assets/about/whatsapp.png";
import { T_TeamMember } from "@/types/Common";

export const TeamMemberCard = ({ member }: { member: T_TeamMember }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg h-[450px] shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <Image
        src={member?.image}
        alt={member?.name}
        className="w-full h-full object-cover"
        width={300}
        height={450}
      />

      {/* Overlay on hover */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Social Media Sidebar */}
      <div className="absolute right-0 bottom-32 translate-y-1/2 flex flex-col gap-3 p-4 z-10">
        <SocialButton
          href={member?.socialLinks?.facebook}
          icon={facebook}
          isVisible={isHovered}
          delay={0.1}
        />
        <SocialButton
          href={member?.socialLinks?.linkedin}
          icon={linkedin}
          isVisible={isHovered}
          delay={0.2}
        />
        <SocialButton
          href={member?.socialLinks?.message}
          icon={whatsapp}
          isVisible={isHovered}
          delay={0.3}
        />
        <SocialButton
          href={member?.socialLinks?.twitter}
          icon={twitter}
          isVisible={isHovered}
          delay={0.4}
        />
      </div>

      {/* Bottom Info Panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black/20 p-4 transform"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h3 className="text-xl font-bold text-white">{member?.name}</h3>
        <p className="text-white">{member?.role}</p>
      </motion.div>
    </div>
  );
};

interface SocialButtonProps {
  href: string;
  icon: string | StaticImageData;
  isVisible: boolean;
  delay: number;
}

const SocialButton = ({ href, icon, isVisible, delay }: SocialButtonProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ x: 50, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : 50,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        delay: isVisible ? delay : 0,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-2 rounded-full shadow-md"
    >
      <Image
        src={icon}
        alt="social icon"
        width={1000}
        height={1000}
        className="w-7 h-7"
      />
    </motion.a>
  );
};

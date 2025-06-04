import Image, { StaticImageData } from "next/image";
import React from "react";

interface AboutsProps {
  title: string;
  content: string[];
  image: string | StaticImageData;
  reverseLayout?: boolean; // Control layout direction (flex-reverse or normal flex)
  useList?: boolean; // Conditionally render list or paragraphs
}

const Abouts = ({
  title,
  content,
  image,
  reverseLayout = false,
  useList = true,
}: AboutsProps) => {
  return (
    <section className="py-16">
      <div className="container max-w-[1320px] mx-auto px-4">
        <div
          className={`flex flex-col md:flex-row items-center space-y-6 gap-20 md:space-y-0 ${
            reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            <Image
              src={image}
              alt={title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 md:pl-10">
            <h2 className="text-3xl lg:text-5xl font-bold font-montserrat text-gray-800 mb-4">
              {title}
            </h2>
            {useList ? (
              <ul className="list-disc pl-6 space-y-2 text-sm lg:text-lg text-gray-700">
                {content.map((item, index) => (
                  <li key={index}>
                    <strong>{item.split(":")[0]}:</strong> {item.split(":")[1]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm lg:text-lg text-gray-700">
                {content.join(" ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Abouts;

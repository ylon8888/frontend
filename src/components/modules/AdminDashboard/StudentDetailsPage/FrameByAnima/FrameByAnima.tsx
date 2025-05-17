/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const FrameByAnima = () => {
  // Personal information data
  const personalInfo = [
    { label: 'Student Name:', value: 'Saifur Rahman' },
    { label: 'Enroll Date:', value: 'March 12, 2025' },
    { label: 'Contact Number:', value: '+880 1567808747' },
    { label: 'Email Address:', value: 'ux.saifur.info@gmail.com' },
  ];

  // Social profile data
  const socialProfiles = [
    { label: 'Facebook:', value: 'www.facebook.com', isLink: true },
    { label: 'Instagram:', value: 'www.instagram.com', isLink: true },
  ];

  // Guardian contact data
  const guardianInfo = [
    { label: 'Guardian Number:', value: '+880 1567808747' },
    { label: 'Guardian Email:', value: 'ux.saifur.info@gmail.com' },
  ];

  // Skills data
  const skills = ['UI/UX Designer', 'Font-end Developer'];

  // Professional experience data
  const professionalExp = [
    { label: 'Company Name:', value: 'SM Technology' },
    { label: 'Position:', value: 'uxdesigner' },
    { label: 'Start date:', value: 'Merch 12, 2020' },
    { label: 'End date:', value: 'Merch 12, 2025' },
  ];

  // Hobbies data
  const hobbies = ['Travelling'];

  return (
    <div className="flex flex-col md:flex-row items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
      {/* Left Column */}
      <div className="flex flex-col w-full md:w-1/2 items-start gap-6 relative">
        {/* Personal Information Card */}
        <div className="w-full border border-[#12b2e3] rounded-2xl p-4 md:p-6">
          <div className="pb-2">
            <h2 className="font-semibold text-xl md:text-2xl font-['Montserrat',Helvetica]">
              Personal Information
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col items-start justify-center gap-2 w-full">
                <span className="font-['Montserrat',Helvetica] font-medium text-[#101010] text-base md:text-lg tracking-[0.54px] leading-[28.8px]">
                  Profile Picture:
                </span>
                <div className="relative w-full flex justify-center md:justify-start">
                  <div className="w-[180px] h-[180px] md:w-[234px] md:h-[234px] rounded-full overflow-hidden">
                    <img
                      src="/student.png"
                      alt="Profile picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                {personalInfo.map((item, index) => (
                  <div
                    key={index}
                    className="font-['Montserrat',Helvetica] text-[#101010] w-full break-words"
                  >
                    <span className="font-semibold text-lg md:text-xl tracking-[0.12px]">
                      {item.label}
                    </span>
                    <span className="font-medium text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                      &nbsp;&nbsp;
                    </span>
                    <span className="text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Profile Card */}
        <div className="w-full border border-[#12b2e3] rounded-2xl p-4 md:p-6">
          <div className="pb-2">
            <h2 className="font-semibold text-xl md:text-2xl font-['Montserrat',Helvetica]">
              Your Social Profile
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {socialProfiles.map((item, index) => (
              <div
                key={index}
                className="font-['Montserrat',Helvetica] w-full break-words"
              >
                <span className="text-[#101010] font-semibold text-lg md:text-xl tracking-[0.12px]">
                  {item.label}
                </span>
                <span className="text-[#101010] font-medium text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                  &nbsp;&nbsp;
                  <br />
                </span>
                {item.isLink ? (
                  <span className="text-[#00bbff] underline text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                    {item.value}
                  </span>
                ) : (
                  <span className="text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-full md:w-1/2 items-start gap-6 relative">
        {/* Guardian/Emergency Contact Card */}
        <div className="w-full border border-[#12b2e3] rounded-2xl p-4 md:p-6">
          <div className="pb-2">
            <h2 className="font-semibold text-xl md:text-2xl font-['Montserrat',Helvetica]">
              Guardian/Emergency Contact
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {guardianInfo.map((item, index) => (
              <div
                key={index}
                className="font-['Montserrat',Helvetica] text-[#101010] w-full break-words"
              >
                <span className="font-semibold text-lg md:text-xl tracking-[0.12px]">
                  {item.label}
                </span>
                <span className="font-medium text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                  &nbsp;&nbsp;
                </span>
                <span className="text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Card */}
        <div className="w-full border border-[#12b2e3] rounded-2xl p-4 md:p-6">
          <div className="pb-2">
            <h2 className="font-semibold text-xl md:text-2xl font-['Montserrat',Helvetica]">
              What Skills do you have?
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="font-['Montserrat',Helvetica] font-medium text-[#101010] text-base md:text-lg tracking-[0.54px] leading-[28.8px]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience Card */}
        <div className="w-full border border-[#12b2e3] rounded-2xl p-4 md:p-6">
          <div className="pb-2">
            <h2 className="font-semibold text-xl md:text-2xl font-['Montserrat',Helvetica]">
              Professional Experience
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {professionalExp.map((item, index) => (
              <div
                key={index}
                className="font-['Montserrat',Helvetica] text-[#101010] w-full break-words"
              >
                <span className="font-semibold text-lg md:text-xl tracking-[0.12px]">
                  {item.label}
                </span>
                <span className="font-medium text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                  &nbsp;&nbsp;
                </span>
                <span className="text-base md:text-lg tracking-[0.10px] leading-[28.8px]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies Card */}
        <div className="w-full border border-[#12b2e3] rounded-2xl p-4 md:p-6">
          <div className="pb-2">
            <h2 className="font-semibold text-xl md:text-2xl font-['Montserrat',Helvetica]">
              Hobbies and Interests
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className="font-['Montserrat',Helvetica] font-medium text-[#101010] text-base md:text-lg tracking-[0.54px] leading-[28.8px]"
              >
                {hobby}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

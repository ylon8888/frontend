/* eslint-disable @next/next/no-img-element */
import { UserProfile } from '@/types/UserProfile';
import Link from 'next/link';
import React from 'react';

export const FrameByAnima = ({ studentData }: { studentData: UserProfile }) => {
  // Personal information data
  const personalInfo = [
    {
      label: 'Student Name:',
      value: studentData?.firstName + ' ' + studentData?.lastName || 'N/A',
    },
    // { label: 'Enroll Date:', value: 'March 12, 2025' },
    // {
    //   label: 'Contact Number:',
    //   value:
    //     studentData?.studentProfiles?.gurdianContact[0]?.gurdianNumber || 'N/A',
    // },
    { label: 'Email Address:', value: studentData?.email || 'N/A' },
  ];

  // Social profile data
  const socialProfiles = (
    studentData?.studentProfiles?.socialProfile || []
  ).map((profile) => ({
    label: profile?.socialMedia || 'Social Media',
    value: profile?.socialLink || 'N/A',
    isLink: !!profile?.socialLink,
  }));

  // Guardian contact data
  const guardianInfo = (studentData?.studentProfiles?.gurdianContact || []).map(
    (contact) => ({
      label: contact?.gurdianName,
      value: contact?.gurdianNumber || 'N/A',
    })
  );

  // Skills data
  const skills = (studentData?.studentProfiles?.skill || []).map(
    (skill) => skill?.skillName
  );

  // Professional experience data
  const professionalExp = (
    studentData?.studentProfiles?.experience || []
  ).flatMap((ex) => [
    {
      label: 'Company Name:',
      value: ex?.companyName || 'N/A',
    },
    {
      label: 'Designation:',
      value: ex?.position || 'N/A',
    },
    {
      label: 'Start Date:',
      value: ex?.startDate || 'N/A',
    },
    {
      label: 'End Date:',
      value: ex?.endDate || 'N/A',
    },
  ]);

  // Hobbies data
  const hobbies = (studentData?.studentProfiles?.hobbies || []).map(
    (hobby) => hobby.name
  );

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
                    {studentData?.studentProfiles?.profileImage ? (
                      <img
                        src={studentData?.studentProfiles?.profileImage}
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 64 64"
                        >
                          <circle cx="32" cy="24" r="16" strokeWidth="4" />
                          <path
                            d="M8 56c0-8.837 10.745-16 24-16s24 7.163 24 16"
                            strokeWidth="4"
                          />
                        </svg>
                      </div>
                    )}
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
                  <Link
                    href={item.value}
                    target="_blank"
                    className="text-[#00bbff] underline text-base md:text-lg tracking-[0.10px] leading-[28.8px]"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <Link
                    href={item.value}
                    target="_blank"
                    className="text-base md:text-lg tracking-[0.10px] leading-[28.8px]"
                  >
                    {item.value}
                  </Link>
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

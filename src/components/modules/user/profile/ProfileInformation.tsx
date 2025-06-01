import React from "react";
import { Card, Typography, Tag, Row, Col, Empty } from "antd";
import {
  User,
  Phone,
  GraduationCap,
  Briefcase,
  Heart,
  Award,
  Globe,
  Calendar,
} from "lucide-react";

const { Text } = Typography;

const ProfileInformation = ({ profileData }: { profileData: any }) => {
  const profile = profileData?.studentProfiles;

  if (!profile) {
    return (
      <div className="p-6">
        <Empty description="No profile data available" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      <Row gutter={[24, 24]}>
        {/* Guardian/Emergency Contacts */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center space-x-5">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-2xl">Guardian/Emergency Contacts</span>
              </div>
            }
            className="h-full shadow-sm"
          >
            {profile.gurdianContact && profile.gurdianContact.length > 0 ? (
              <div className="space-y-4">
                {profile.gurdianContact.map((contact: any, index: number) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <Text strong>{contact.gurdianName}</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <Text>{contact.gurdianNumber}</Text>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="No emergency contacts" />
            )}
          </Card>
        </Col>

        {/* Academic Information */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center space-x-5">
                <GraduationCap className="w-6 h-6 text-purple-500" />
                <span className="text-2xl">Academic Information</span>
              </div>
            }
            className="h-full shadow-sm"
          >
            {profile.academicInformation &&
            profile.academicInformation.length > 0 ? (
              <div className="space-y-4">
                {profile.academicInformation.map((info: any, index: number) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <Text strong className="block mb-2">
                      {info.institutionName}
                    </Text>
                    <Text className="block mb-2 text-gray-600">
                      {info.courseName}
                    </Text>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(info.startDate)}</span>
                      </div>
                      <span>-</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(info.endDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="No academic information" />
            )}
          </Card>
        </Col>

        {/* Professional Experience */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center space-x-5">
                <Briefcase className="w-5 h-5 text-orange-500" />
                <span className="text-2xl">Professional Experience</span>
              </div>
            }
            className="h-full shadow-sm"
          >
            {profile.experience && profile.experience.length > 0 ? (
              <div className="space-y-4">
                {profile.experience.map((exp: any, index: number) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg">
                    <Text strong className="block mb-2">
                      {exp.companyName}
                    </Text>
                    <Text className="block mb-2 text-gray-600">
                      {exp.position}
                    </Text>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(exp.startDate)}</span>
                      </div>
                      <span>-</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(exp.endDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="No professional experience" />
            )}
          </Card>
        </Col>

        {/* Skills */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center space-x-5">
                <Award className="w-6 h-6 text-green-500" />
                <span className="text-2xl">Skills</span>
              </div>
            }
            className="h-full shadow-sm"
          >
            {profile.skill && profile.skill.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skill.map((skill: any, index: number) => (
                  <Tag key={index} color="green" className="mb-2">
                    {skill.skillName}
                  </Tag>
                ))}
              </div>
            ) : (
              <Empty description="No skills listed" />
            )}
          </Card>
        </Col>

        {/* Hobbies and Interests */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center space-x-5">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-2xl">Hobbies and Interests</span>
              </div>
            }
            className="h-full shadow-sm"
          >
            {profile.hobbies && profile.hobbies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby: any, index: number) => (
                  <Tag key={index} color="pink" className="mb-2">
                    {hobby.name}
                  </Tag>
                ))}
              </div>
            ) : (
              <Empty description="No hobbies listed" />
            )}
          </Card>
        </Col>

        {/* Social Profiles */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center space-x-5">
                <Globe className="w-6 h-6 text-cyan-500" />
                <span className="text-2xl">Social Profiles</span>
              </div>
            }
            className="h-full shadow-sm"
          >
            {profile.socialProfile && profile.socialProfile.length > 0 ? (
              <div className="space-y-3">
                {profile.socialProfile.map((social: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <Text strong className="capitalize">
                          {social.socialMedia}
                        </Text>
                        <br />
                        <Text
                          className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            window.open(social.socialLink, "_blank")
                          }
                        >
                          {social.socialLink}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="No social profiles" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInformation;

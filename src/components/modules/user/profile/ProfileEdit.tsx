"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Select,
  DatePicker,
} from "antd";
import { X, Upload, Plus } from "lucide-react";
import { useCreateStudentProfileMutation } from "@/redux/features/auth/authApi";
import { ButtonLoading } from "@/components/shared/button-loading/LoadingButton";
import dayjs from "dayjs";
const { Title } = Typography;
const { Option } = Select;

type ProfileData = {
  avatarUrl?: string | { src: string };
  name?: string;
  emergencyContacts?: { name?: string; number?: string }[];
  academicInfo?: {
    schoolName?: string;
    courseName?: string;
    startDate?: any;
    endDate?: any;
  }[];
  professionalExp?: {
    companyName?: string;
    position?: string;
    startDate?: any;
    endDate?: any;
  }[];
  skills?: { name?: string }[];
  hobbies?: { interest?: string }[];
  socialProfiles?: { platform?: string; link?: string }[];
  socials?: Record<string, any>;
  [key: string]: any;
};

export const ProfileEdit: React.FC<any> = ({
  profileData,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<ProfileData>({});
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [emergencyContacts, setEmergencyContacts] = useState([{ id: 1 }]);
  const [academicInfo, setAcademicInfo] = useState([{ id: 1 }]);
  const [professionalExp, setProfessionalExp] = useState([{ id: 1 }]);
  const [skills, setSkills] = useState([{ id: 1 }]);
  const [hobbies, setHobbies] = useState([{ id: 1 }]);
  const [socialProfiles, setSocialProfiles] = useState([{ id: 1 }]);
  const [createStudentProfile, { isLoading }] =
    useCreateStudentProfileMutation();

  // Initialize form with profile data
  useEffect(() => {
    if (profileData?.studentProfiles) {
      const {
        profileImage,
        gurdianContact = [],
        academicInformation = [],
        experience = [],
        hobbies: apiHobbies = [],
        skill = [],
        socialProfile = [],
      } = profileData.studentProfiles;

      // Prepare initial form values
      const initialValues: any = {
        name: `${profileData.firstName} ${profileData.lastName}`,
        avatarUrl: profileImage,
        emergencyContacts: gurdianContact.map((contact: any) => ({
          name: contact.gurdianName,
          number: contact.gurdianNumber,
        })),
        academicInfo: academicInformation.map((info: any) => ({
          schoolName: info.institutionName,
          courseName: info.courseName,
          startDate: info.startDate ? dayjs(info.startDate) : null,
          endDate: info.endDate ? dayjs(info.endDate) : null,
        })),
        professionalExp: experience.map((exp: any) => ({
          companyName: exp.companyName,
          position: exp.position,
          startDate: exp.startDate ? dayjs(exp.startDate) : null,
          endDate: exp.endDate ? dayjs(exp.endDate) : null,
        })),
        skills: skill.map((s: any) => ({ name: s.skillName })),
        hobbies: apiHobbies.map((h: any) => ({ interest: h.name })),
        socialProfiles: socialProfile.map((profile: any) => ({
          platform: profile.socialMedia,
          link: profile.socialLink,
        })),
      };

      // Set initial form values
      form.setFieldsValue(initialValues);
      setFormData(initialValues);

      // Set dynamic sections based on data
      if (gurdianContact.length > 0) {
        setEmergencyContacts(
          gurdianContact.map((_: any, index: number) => ({ id: index + 1 }))
        );
      }
      if (academicInformation.length > 0) {
        setAcademicInfo(
          academicInformation.map((_: any, index: number) => ({
            id: index + 1,
          }))
        );
      }
      if (experience.length > 0) {
        setProfessionalExp(
          experience.map((_: any, index: number) => ({ id: index + 1 }))
        );
      }
      if (skill.length > 0) {
        setSkills(skill.map((_: any, index: number) => ({ id: index + 1 })));
      }
      if (apiHobbies.length > 0) {
        setHobbies(
          apiHobbies.map((_: any, index: number) => ({ id: index + 1 }))
        );
      }
      if (socialProfile.length > 0) {
        setSocialProfiles(
          socialProfile.map((_: any, index: number) => ({ id: index + 1 }))
        );
      }
    }
  }, [profileData, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev: any) => ({ ...prev, avatarUrl: imageUrl }));
    }
  };

  const handleFieldChange = (changedFields: any) => {
    const updatedData = { ...formData };

    changedFields.forEach((field: any) => {
      const pathArray = field.name as (keyof ProfileData)[];

      if (pathArray.length === 1) {
        updatedData[pathArray[0]] = field.value;
      } else if (pathArray.length === 2) {
        const parentKey = pathArray[0];
        const childKey = pathArray[1];
        if (!updatedData[parentKey]) {
          updatedData[parentKey] = {};
        }
        updatedData[parentKey][childKey] = field.value;
      }
    });

    setFormData(updatedData);
  };

  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      // Helper function to format dates
      const formatDate = (date: any) => {
        if (!date) return null;
        if (typeof date === "string") return date;
        return date.format ? date.format("YYYY-MM-DD") : date;
      };

      // Format Emergency Contacts
      const formattedGuardianContacts = (values.emergencyContacts || [])
        .filter((contact: any) => contact?.number || contact?.email)
        .map((contact: any) => ({
          gurdianNumber: contact.number || "",
          gurdianName: contact.name || "",
        }));

      // Format Academic Information
      const formattedAcademicInfo = (values.academicInfo || [])
        .filter((info: any) => info?.schoolName || info?.courseName)
        .map((info: any) => ({
          institutionName: info.schoolName || "",
          courseName: info.courseName || "",
          startDate: formatDate(info.startDate),
          endDate: formatDate(info.endDate),
        }));

      // Format Professional Experience
      const formattedExperience = (values.professionalExp || [])
        .filter((exp: any) => exp?.companyName || exp?.position)
        .map((exp: any) => ({
          companyName: exp.companyName || "",
          position: exp.position || "",
          startDate: formatDate(exp.startDate),
          endDate: formatDate(exp.endDate),
        }));

      // Format Hobbies
      const formattedHobbies = (values.hobbies || [])
        .filter((hobby: any) => hobby?.interest)
        .map((hobby: any) => ({
          name: hobby.interest,
        }));

      // Format Skills
      const formattedSkills = (values.skills || [])
        .filter((skill: any) => skill?.name)
        .map((skill: any) => ({
          skillName: skill.name,
        }));

      // Format Social Profiles
      const formattedSocialProfiles = (values.socialProfiles || [])
        .filter((profile: any) => profile?.platform || profile?.link)
        .map((profile: any) => ({
          socialMedia: profile.platform || "",
          socialLink: profile.link || "",
        }));

      // Original updated data for component use
      const updatedData: ProfileData = {
        ...values,
        avatarUrl:
          formData?.avatarUrl || profileData?.studentProfiles?.profileImage,
        socials: {
          ...(profileData?.socials || {}),
          ...values.socials,
        },
      };

      try {
        const formDataToSubmit = new FormData();
        // Append avatar if it exists
        if (avatarInputRef.current?.files?.[0]) {
          formDataToSubmit.append(
            "file",
            avatarInputRef.current.files[0],
            avatarInputRef.current.files[0].name
          );
        }
        formDataToSubmit.append(
          "gurdianContact",
          JSON.stringify(formattedGuardianContacts) || ""
        );
        formDataToSubmit.append(
          "academicInformation",
          JSON.stringify(formattedAcademicInfo) || ""
        );
        formDataToSubmit.append(
          "experience",
          JSON.stringify(formattedExperience) || ""
        );
        formDataToSubmit.append(
          "hobbies",
          JSON.stringify(formattedHobbies) || ""
        );
        formDataToSubmit.append("skill", JSON.stringify(formattedSkills) || "");
        formDataToSubmit.append(
          "socialProfile",
          JSON.stringify(formattedSocialProfiles) || ""
        );

        // Call the API to create or update the profile
        const res = await createStudentProfile(formDataToSubmit);

        if ("data" in res && res.data?.success) {
          onSave(updatedData);
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }

      onSave(updatedData);
    });
  };

  // Add functions for dynamic sections
  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { id: Date.now() }]);
  };

  const addAcademicInfo = () => {
    setAcademicInfo([...academicInfo, { id: Date.now() }]);
  };

  const addProfessionalExp = () => {
    setProfessionalExp([...professionalExp, { id: Date.now() }]);
  };

  const addSkill = () => {
    setSkills([...skills, { id: Date.now() }]);
  };

  const addHobby = () => {
    setHobbies([...hobbies, { id: Date.now() }]);
  };

  const addSocialProfile = () => {
    setSocialProfiles([...socialProfiles, { id: Date.now() }]);
  };

  return (
    <div className="p-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onFieldsChange={handleFieldChange}
        className=""
      >
        <div className="mb-8">
          <Title level={4} className="mb-6">
            Edit Profile
          </Title>

          {/* Avatar Section */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className="relative group mr-4">
                <Avatar
                  size={80}
                  src={
                    formData?.avatarUrl ||
                    profileData?.studentProfiles?.profileImage
                  }
                  className="border-2 border-white"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-40 rounded-full transition-all duration-200 cursor-pointer"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Upload
                    size={16}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={avatarInputRef}
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                <p className="text-gray-700 text-sm mb-1">Profile Picture</p>
                <Button
                  size="small"
                  icon={<Upload size={14} />}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Full Name">
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Guardian/Emergency Contact */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title level={3} className="">
              Guardian/Emergency Contact
            </Title>
            {emergencyContacts.map((contact, index) => (
              <div key={contact.id} className="mb-4">
                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name={["emergencyContacts", index, "name"]}
                      label="Guardian Name"
                    >
                      <Input placeholder="John Doe" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name={["emergencyContacts", index, "number"]}
                      label="Guardian Number"
                    >
                      <Input placeholder="+880 1571508737" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              type="dashed"
              onClick={addEmergencyContact}
              icon={<Plus size={14} />}
            >
              Add Emergency Contact
            </Button>
          </div>

          {/* Academic Information */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title level={3} className="mb-4 text-3xl">
              Academic Information
            </Title>
            {academicInfo.map((info, index) => (
              <div key={info.id} className="mb-4">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["academicInfo", index, "schoolName"]}
                      label="School/College Name"
                    >
                      <Input placeholder="SIT" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["academicInfo", index, "courseName"]}
                      label="Course Name"
                    >
                      <Input placeholder="CSE" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["academicInfo", index, "startDate"]}
                      label="Start date"
                    >
                      <DatePicker
                        className="w-full"
                        placeholder="March 12, 2020"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["academicInfo", index, "endDate"]}
                      label="End date"
                    >
                      <DatePicker
                        className="w-full"
                        placeholder="March 12, 2025"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              type="dashed"
              onClick={addAcademicInfo}
              icon={<Plus size={14} />}
            >
              Add Academic Information
            </Button>
          </div>

          {/* Professional Experience */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title level={3} className="mb-4">
              Professional Experience
            </Title>
            {professionalExp.map((exp, index) => (
              <div key={exp.id} className="mb-4">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["professionalExp", index, "companyName"]}
                      label="Company Name"
                    >
                      <Input placeholder="SW Technology" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["professionalExp", index, "position"]}
                      label="What's your Position"
                    >
                      <Input placeholder="Senior Developer" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["professionalExp", index, "startDate"]}
                      label="Start date"
                    >
                      <DatePicker
                        className="w-full"
                        placeholder="March 12, 2020"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["professionalExp", index, "endDate"]}
                      label="End date"
                    >
                      <DatePicker
                        className="w-full"
                        placeholder="March 12, 2025"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              type="dashed"
              onClick={addProfessionalExp}
              icon={<Plus size={14} />}
            >
              Add Professional Experience
            </Button>
          </div>

          {/* Skills */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title level={3} className="mb-4">
              What Skills do you have?
            </Title>
            {skills.map((skill, index) => (
              <Row gutter={16} key={skill.id} className="mb-4">
                <Col xs={24}>
                  <Form.Item
                    name={["skills", index, "name"]}
                    label="Skill Name"
                  >
                    <Input placeholder="UI/UX Design" />
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Button type="dashed" onClick={addSkill} icon={<Plus size={14} />}>
              Add Skills
            </Button>
          </div>

          {/* Hobbies and Interests */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title level={3} className="mb-4">
              Hobbies and Interests
            </Title>
            {hobbies.map((hobby, index) => (
              <Row gutter={16} key={hobby.id} className="mb-4">
                <Col xs={24}>
                  <Form.Item
                    name={["hobbies", index, "interest"]}
                    label="Interest"
                  >
                    <Input placeholder="Travelling" />
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Button type="dashed" onClick={addHobby} icon={<Plus size={14} />}>
              Add Hobbies And Interests
            </Button>
          </div>

          {/* Social Profile */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Title level={3} className="mb-4">
              Your Social Profile
            </Title>
            {socialProfiles.map((profile, index) => (
              <Row gutter={16} key={profile.id} className="mb-4">
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={["socialProfiles", index, "platform"]}
                    label="Social Media"
                  >
                    <Select placeholder="Facebook">
                      <Option value="facebook">Facebook</Option>
                      <Option value="twitter">Twitter</Option>
                      <Option value="linkedin">LinkedIn</Option>
                      <Option value="instagram">Instagram</Option>
                      <Option value="youtube">YouTube</Option>
                      <Option value="github">GitHub</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={["socialProfiles", index, "link"]}
                    label="Link"
                  >
                    <Input placeholder="https://facebook.com/username" />
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              onClick={addSocialProfile}
              icon={<Plus size={14} />}
            >
              Add Social Profile
            </Button>
          </div>

          {/* Actions */}
          <Form.Item className="mt-8">
            <Space>
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: "#ff6b35", color: "#fff" }}
                size="large"
              >
                {isLoading ? <ButtonLoading /> : "Save Changes"}
              </Button>
              <Button onClick={onCancel} icon={<X size={16} />} size="large">
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

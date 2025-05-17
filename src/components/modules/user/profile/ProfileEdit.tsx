"use client";

import React, { useRef, useState } from "react";
import { Form, Input, Button, Row, Col, Avatar, Typography, Space } from "antd";
import { Save, X, Upload } from "lucide-react";
import { ProfileData, ProfileEditModeProps } from "@/types/Common";
const { Title } = Typography;

export const ProfileEdit: React.FC<ProfileEditModeProps> = ({
  profileData,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<ProfileData>(profileData);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatarUrl: imageUrl }));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, coverUrl: imageUrl }));
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
          // @ts-expect-error: parentKey may be a nested object key in ProfileData
          updatedData[parentKey] = {};
        }
        // @ts-expect-error: parentKey may be a nested object key in ProfileData
        updatedData[parentKey][childKey] = field.value;
      }
    });

    setFormData(updatedData);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const updatedData: ProfileData = {
        ...profileData,
        ...values,
        avatarUrl: formData.avatarUrl,
        coverUrl: formData.coverUrl,
        socials: {
          ...profileData.socials,
          ...values.socials,
        },
      };
      onSave(updatedData);
    });
  };

  return (
    <div className="p-6 animate-fadeIn">
      <Form
        form={form}
        layout="vertical"
        initialValues={profileData}
        onFieldsChange={handleFieldChange}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <Title level={4} className="mb-6">
            Edit Profile
          </Title>

          {/* Cover Image */}
          <div className="mb-6">
            <div
              className="h-48 rounded-lg bg-cover bg-center mb-4 relative flex items-center justify-center"
              style={{
                backgroundImage: `url(${formData.coverUrl})`,
                backgroundSize: "cover",
              }}
            >
              <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                <Button
                  icon={<Upload size={16} />}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100"
                  onClick={() => coverInputRef.current?.click()}
                >
                  Change Cover
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={coverInputRef}
                  onChange={handleCoverChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Avatar Image */}
            <div className="flex items-center">
              <div className="relative group mr-4">
                <Avatar
                  size={80}
                  src={
                    typeof formData.avatarUrl === "string"
                      ? formData.avatarUrl
                      : formData.avatarUrl?.src
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
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="location" label="Location">
            <Input placeholder="City, Country" />
          </Form.Item>

          {/* Actions */}
          <Form.Item className="mt-8">
            <Space>
              <Button
                onClick={handleSubmit}
                icon={<Save size={16} />}
                style={{ backgroundColor: "#0b7077", color: "#fff" }}
              >
                Save Changes
              </Button>
              <Button onClick={onCancel} icon={<X size={16} />}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

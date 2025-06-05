"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnrollCourseMutation } from "@/redux/features/course/course";
import { toast } from "sonner";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";

const EnrollForm = ({ setEnrollData }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
  });

  const id = window.location.pathname.split("/")[2];
  const [enrollCourse, { isLoading }] = useEnrollCourseMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Special handler for the Checkbox component

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      phoneNumber: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Mobile number is required";
      valid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid mobile number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    const res = await handleAsyncWithToast(async () => {
      return enrollCourse({ data: formData, id });
    });

    if (res?.data?.success) {
      setEnrollData(res?.data);
      setFormData({
        name: "",
        phoneNumber: "",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-montserrat font-semibold mb-6 font-montserrat">
          Enroll Now
        </h2>
        <p className="mb-4">
          Join our Learning Platform and start your educational journey today!
        </p>
        <p className="text-sm text-gray-500">
          Fill out the form below to enroll in your desired course and gain
          access to all the materials, quizzes, and resources you need to
          succeed.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name" className="font-montserrat">
            Enter Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Saifur Rahman"
            className="w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile" className="font-montserrat">
            Mobile Number
          </Label>
          <Input
            id="mobile"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="+880 1678901747"
            className="w-full"
          />

          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
          disabled={Object.values(errors).some(Boolean)}
        >
          {isLoading ? <ButtonLoading /> : "Submit to verify"}
        </button>
      </form>
    </div>
  );
};

export default EnrollForm;

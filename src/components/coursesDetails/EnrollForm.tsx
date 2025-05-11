"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const EnrollForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    terms: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    terms: "",
  });

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
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      terms: checked,
    }));
    if (errors.terms) {
      setErrors((prev) => ({ ...prev, terms: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      mobile: "",
      email: "",
      terms: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2
          className="text-3xl font-montserrat font-semibold mb-6 font-montserrat"
          //   className="text-2xl font-bold mb-2"
        >
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
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="+880 1678901747"
            className="w-full"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-montserrat">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ui.saifur.info@gmail.com"
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={formData.terms}
            onCheckedChange={handleCheckboxChange}
          />

          <p className="text-sm leading-tight">
            By enrolling, you agree to our{" "}
            <span className="font-semibold underline underline-offset-2">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold underline underline-offset-2">
              Privacy Policy
            </span>
          </p>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
          disabled={Object.values(errors).some(Boolean)}
        >
          Submit to verify
        </button>
      </form>
    </div>
  );
};

export default EnrollForm;

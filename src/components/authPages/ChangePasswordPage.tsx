"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";

const ChangePasswordPage = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear password error when user types
    if (passwordError) {
      setPasswordError("");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async () => {
    // Validate passwords
    if (!formData.newPassword) {
      setPasswordError("New password is required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const token = searchParams.get("token"); // Get the token from the URL
      if (!token) {
        // Handle missing token case if necessary
        setPasswordError("Token is missing");
        return;
      }

      const formDataToSend = {
        email: email,
        password: formData.newPassword,
      };
      const response = await resetPassword({
        userInfo: formDataToSend,
        token,
      }).unwrap();
      if (response?.success) {
        // Handle successful password reset logic here
        toast.success(response.message);
        router.push("/login"); // Redirect to login page after successful reset
      } else {
        // Handle error from the server
        setPasswordError(response?.message || "Failed to reset password");
      }
    } catch (error) {
      const errorMessage =
        (typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined) || "An error occurred while resetting the password";
      toast.error(errorMessage);
      console.error("Error resetting password:", error);
      setPasswordError("An error occurred while resetting the password");
    }
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Brain Drawer */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <span className="text-4xl font-bold text-teal-600">
                Brain Drawer
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center">
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-2">
              {" "}
              Change Your Password!
            </h1>
            <p className="text-gray-600">
              Enter A Different Password With The Previous!
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="BFlofgvsb***JJ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="BFlofgvsb***JJ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Error */}
          {passwordError && (
            <div className="text-red-500 text-sm">{passwordError}</div>
          )}

          {/* Reset Password Button */}
          <button
            onClick={handleResetPassword}
            className="mx-auto block text-center w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? <ButtonLoading /> : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

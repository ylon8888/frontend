"use client";

import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";

interface T_Response {
  success: boolean;
  message: string;
  data?: any;
}

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res: T_Response = await forgetPassword({ email }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        router.push(
          `/verification-code?reset-email=${encodeURIComponent(email)}`
        );
        // Handle successful code sending logic here
      }
    } catch (error) {
      console.error("Error sending code:", error);
      toast.error("Failed to send code. Please try again.");
      // Handle error logic here, e.g., show a toast notification
    }
    // Handle navigation to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Link href="/" className="text-4xl font-bold text-primary">
                Brain Drawer
              </Link>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">Forget Password! 👋</h1>
          <p className="text-gray-600">Enter Your Registered Email Below</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="georgia.young@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
            />
          </div>

          {/* Remember Password Link */}
          <div className="text-left">
            <span className="text-gray-600">Remember the password? </span>
            <Link
              href="/login"
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors hover:underline"
            >
              Login
            </Link>
          </div>

          {/* Send Code Button */}
          <button
            onClick={handleSubmit}
            className="mx-auto block text-center w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? <ButtonLoading /> : "Send Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

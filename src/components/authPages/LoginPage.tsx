"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { JwtPayload } from "jwt-decode";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";
interface DecodedUser extends JwtPayload {
  role: string; // Add role explicitly
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Define the expected response type for login
  interface LoginResponse {
    success: boolean;
    message: string;
    data?: any;
  }
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      const res = await login(formData);

      if (res?.data?.success == true) {
        router.push("/");
      }

      if (res?.data?.success) {
        const user = (await verifyToken(
          res?.data?.data?.accessToken
        )) as DecodedUser;
        await dispatch(
          setUser({
            user: user,
            access_token: res?.data?.data?.accessToken,
            refresh_token: res?.data?.data?.refreshToken,
          })
        );
      }
    } catch (error) {
      console.log("=== ADMIN LOGIN ERROR ===", error);
    }
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <span className="text-4xl font-bold text-primary">LOGO</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">Hi, Welcome Back! 👋</h1>
          <p className="text-gray-600">
            Please Enter Your Email And Password Below!
          </p>
        </div>

        {/* Form */}
        <div className="mt-20 space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-500 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="georgia.young@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-500 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="BFlofgvsb***JJ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forget-password"
              type="button"
              className="text-secondary hover:text-secondary/80 font-medium transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-secondary hover:bg-secondary/80 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? <ButtonLoading /> : " Log in"}
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            If you don&apos;t have any account please{" "}
            <Link
              href="/register"
              className="text-primary underline hover:text-primary/80 font-medium transition-colors"
            >
              Register Here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import Link from "next/link";
import React, { useState } from "react";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSendCode = () => {
    console.log("Send code to email:", email);
    // Handle send code logic here
  };

  const handleLoginClick = () => {
    console.log("Redirect to login page");
    // Handle navigation to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <span className="text-4xl font-bold text-teal-600">LOOO</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
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
            <button
              onClick={handleLoginClick}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors hover:underline"
            >
              Login
            </button>
          </div>

          {/* Send Code Button */}
          <Link
            href="/verification-code"
            onClick={handleSendCode}
            className="mx-auto block text-center w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Send Code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

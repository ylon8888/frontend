"use client";

import React, { useState, useRef } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const VerificationCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
      // Handle verification logic here
    } else {
      console.log("Please enter all 6 digits");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <span className="text-4xl font-bold text-teal-600">LOOO</span>
            </div>
          </div>
        </div>

        {/* Success Icon */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">Success 👋</h1>
          <p className="text-gray-600">
            Please Check Your Email For Verification Code!
          </p>
        </div>

        {/* Verification Code Input */}
        <div className="space-y-6">
          <div className="flex justify-center space-x-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              />
            ))}
          </div>

          {/* Submit Button */}

          <Link
            href="/change-password"
            onClick={handleSubmit}
            className="mx-auto block text-center w-full bg-secondary hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Submit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodePage;

"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOtpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { JwtPayload } from "jwt-decode";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";

interface DecodedUser extends JwtPayload {
  role: string; // Add role explicitly
}

const VerificationCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const email =
    searchParams.get("email") || searchParams.get("reset-email") || ""; // Get email from query params, default to empty string if not found
  const [otp, { isLoading }] = useOtpMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();
  // const email=
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

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
      try {
        otp({
          email: email,
          otp: verificationCode,
        })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message);
              if (searchParams.get("reset-email")) {
                router.push("/change-password?email=" + email);
              } else {
                router.push("/");
              }
              if (res?.success) {
                const user = verifyToken(
                  res?.data?.data?.accessToken
                ) as DecodedUser;
                dispatch(
                  setUser({
                    user: user,
                    access_token: res?.data?.data?.accessToken,
                    refresh_token: res?.data?.data?.refreshToken,
                  })
                );
              }
            } else {
              console.error("OTP verification failed:", res?.message);
            }
          })
          .catch((error) => {
            toast.error(error?.data?.message);
            console.error("Error verifying OTP:", error);
          });
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <span className="text-4xl font-bold text-teal-600">
                Brain Drawer
              </span>
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

          <button
            onClick={handleSubmit}
            className="mx-auto block text-center w-full bg-secondary hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            {isLoading ? <ButtonLoading /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodePage;

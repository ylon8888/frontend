"use client";

import { useState } from "react";
import { useVerifyEnrollMutation } from "@/redux/features/course/course";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";

const EnrollOtp = () => {
  const [isPasting, setIsPasting] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [errors, setErrors] = useState({
    otp: "",
  });

  const id = window.location.pathname.split("/")[2];
  const [enrollCourse, { isLoading }] = useVerifyEnrollMutation();

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1 || (value && isNaN(Number(value)))) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    if (!isPasting && value && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (errors.otp) {
      setErrors({ ...errors, otp: "" });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsPasting(true); // flag we are pasting

    const pasteData = e.clipboardData.getData("Text").trim();
    const digits = pasteData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const newOtpDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newOtpDigits[i] = digits[i] || "";
    }

    setOtpDigits(newOtpDigits);

    const nextIndex = digits.length < 6 ? digits.length : 5;
    const nextInput = document.getElementById(`otp-digit-${nextIndex}`);
    if (nextInput) nextInput.focus();

    setTimeout(() => setIsPasting(false), 100); // clear after short delay
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      otp: "",
    };

    if (otpDigits.some((digit) => !digit)) {
      newErrors.otp = "Please enter all OTP digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const otp = otpDigits.join("");
    const res = await handleAsyncWithToast(async () => {
      return enrollCourse({ otp, id });
    });

    if (res?.success) {
      setOtpDigits(["", "", "", "", "", ""]);
    }
  };

  const handleResendCode = async () => {
    await handleAsyncWithToast(async () => {
      // You might need to adjust this based on your API
      return enrollCourse({ data: { resend: true }, id });
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-4 font-montserrat">
          Check Your Email
        </h2>
        <p className="text-sm text-gray-500">
          A verification email has been sent to the email address you provided
          during enrollment. Please click the link in that email to verify your
          account.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Enter OTP</h3>
        <div className="flex gap-4 mb-6">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              id={`otp-digit-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpDigits[index]}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ))}
        </div>
        {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

        <p className="text-sm text-gray-500 mb-6">
          Click the button below to resend the verification email.
        </p>
      </div>

      <div className="space-y-4">
        <button className="w-full" onClick={handleResendCode}>
          Resend Code
        </button>

        <button
          className="w-full bg-secondary hover:bg-secondary/80 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
          onClick={handleSubmit}
          disabled={otpDigits.some((digit) => !digit)}
        >
          {isLoading ? <ButtonLoading /> : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default EnrollOtp;

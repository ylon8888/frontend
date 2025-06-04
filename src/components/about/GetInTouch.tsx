"use client";

import { useCreateContactMutation } from "@/redux/features/contact/contactApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { ButtonLoading } from "../shared/button-loading/LoadingButton";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAsyncWithToast(async () => {
      return createContact(formData);
    });
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="py-16 px-4">
      <div className="container max-w-[1320px] mx-auto flex flex-col lg:flex-row  justify-between items-start lg:items-center gap-28">
        {/* Contact Form */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl md:text-5xl font-semibold mb-10 font-montserrat">
            Get in Touch
          </h2>
          <p className="md:text-lg mb-20">
            Drop us a message using the contact form below and we&apos;ll get
            back to you within 24 hours (Monday–Friday).
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-lg mb-2 font-montserrat"
                  htmlFor="name"
                >
                  Enter Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-gray-800 rounded-lg border"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-lg mb-2 font-montserrat"
                  htmlFor="phone"
                >
                  Enter Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white text-gray-800 rounded-lg border"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg mb-2 font-montserrat"
                htmlFor="email"
              >
                Enter Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white text-gray-800 rounded-lg border"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                className="block text-lg mb-2 font-montserrat"
                htmlFor="message"
              >
                Enter Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-white text-gray-800 rounded-lg border"
                placeholder="Write a message..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-white text-lg font-montserrat rounded-lg"
            >
              {isLoading ? <ButtonLoading /> : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full lg:w-1/3 ">
          <h3 className="text-2xl font-montserrat font-semibold mb-4">
            Contact Information
          </h3>
          <p className="mb-8">Say something to start a live chat!</p>
          <div className="space-y-5">
            <div className="flex items-center text-[#475467]">
              <span className="mr-5">
                <PhoneCall className="w-5 h-5" />
              </span>
              <span>(316) 555-0116</span>
            </div>
            <div className="flex items-center text-[#475467]">
              <span className="mr-5">
                {" "}
                <Mail className="w-5 h-5" />
              </span>
              <span>deanna.curtis@example.com</span>
            </div>
            <div className="flex items-center text-[#475467]">
              <span className="mr-5">
                {" "}
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                132 Dartmouth Street, Boston, Massachusetts 02156, United States
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

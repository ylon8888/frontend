'use client';

import type React from 'react';

import MyButton from '@/components/ui/core/MyButton/MyButton';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

type TStepProps = {
  goNext: () => void;
};

const Step1 = ({ goNext }: TStepProps) => {
  const preAddedClassData: any = JSON.parse(
    sessionStorage.getItem('classData') || '{}'
  );
  const [formData, setFormData] = useState({
    className: preAddedClassData?.className || '',
    classDescription: preAddedClassData?.classDescription || '',
    totalSubjects: preAddedClassData?.totalSubjects || '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('classData', JSON.stringify(formData));
    toast.success('Successfully added the class');
    goNext();
  };
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-1">Step 01</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Class Basic Information
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="className" className="block text-gray-800 mb-2">
              Class Name
            </label>
            <input
              type="text"
              id="className"
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="Enter the name of the class"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="classDescription"
              className="block text-gray-800 mb-2"
            >
              Class Description
            </label>
            <textarea
              id="classDescription"
              name="classDescription"
              value={formData.classDescription}
              onChange={handleChange}
              placeholder="Provide a brief description of the class. This helps students understand the course content and objectives."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="totalSubjects" className="block text-gray-800 mb-2">
              Select Total Subject
            </label>
            <div className="relative">
              <select
                id="totalSubjects"
                name="totalSubjects"
                value={formData.totalSubjects}
                onChange={handleChange}
                className="w-full cursor-pointer appearance-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                required
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <MyButton
            label="Next: Add Subjects"
            type="submit"
            fullWidth
            isArrow
          />
        </form>
      </div>
    </div>
  );
};

export default Step1;

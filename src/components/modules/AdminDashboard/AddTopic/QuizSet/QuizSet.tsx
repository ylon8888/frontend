'use client';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormTextArea from '@/components/ui/core/MyForm/MyFormTextArea/MyFormTextArea';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { z } from 'zod';

const addQuizSetValidationSchema = z.object({
  setName: z
    .string()
    .min(1, 'Set name is required')
    .max(50, 'Set name must be less than 50 characters'),
  setDescription: z
    .string()
    .min(1, 'Set description is required')
    .max(200, 'Set description must be less than 200 characters'),
});

const quizLevels = [
  {
    id: 'easy',
    title: 'Easy Quiz Step',
    description:
      "Think you're an expert? This category will really test your understanding of the material. Prepare for tough questions!",
    isSelected: true,
  },
  {
    id: 'medium',
    title: 'Medium Quiz Step',
    description:
      "Think you're an expert? This category will really test your understanding of the material. Prepare for tough questions!",
    isSelected: false,
  },
  {
    id: 'hard',
    title: 'Hard Quiz Step',
    description:
      "Think you're an expert? This category will really test your understanding of the material. Prepare for tough questions!",
    isSelected: false,
  },
];

const QuizSet = ({ currentStep }: { currentStep: number }) => {
  const [isQuizSetFormOpen, setIsQuizSetFormOpen] = useState(false);
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);
  const handleSubmit = (data: any, reset: any) => {
    // Handle adding a new topic
    console.log('New topic data:', data);
    reset();
    setIsQuizSetFormOpen(false);
    setIsSeeAllOpen(true);
  };
  return (
    <>
      {!isQuizSetFormOpen && !isSeeAllOpen && (
        <div className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-gray-600 font-medium mb-1">
                Step-0{currentStep}
              </h2>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Create Quiz Set
              </h1>
            </div>

            <MyButton
              onClick={() => setIsQuizSetFormOpen(true)}
              fullWidth
              label="Create Quiz Set"
            />
          </div>
        </div>
      )}
      {isQuizSetFormOpen && (
        <div className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-gray-600 font-medium mb-1">
              Step-0{currentStep}
            </h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Create Quiz Set
            </h1>
            {/* Quiz Set Form goes here */}
            <MyFormWrapper
              onSubmit={handleSubmit}
              resolver={zodResolver(addQuizSetValidationSchema)}
            >
              <div className="mb-4">
                <MyFormInput
                  label="Set Name"
                  // value={preAddedClassData.className}
                  name="setName"
                  placeHolder="Enter the name of the topic"
                  inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="mb-4">
                <MyFormTextArea
                  label="Description"
                  // value={preAddedClassData.classDescription}
                  name="setDescription"
                  placeHolder="Topic description"
                  inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <MyButton type="submit" label="Create Quiz Set" fullWidth />
              </div>
            </MyFormWrapper>
          </div>
        </div>
      )}
      {isSeeAllOpen && (
        <div className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-gray-600 font-medium mb-1">
              Step-0{currentStep}
            </h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              All Quiz Set
            </h1>
            <div className="space-y-6 mb-6">
              {quizLevels.map((level) => (
                <div
                  key={level.id}
                  className="border-b pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="text-orange-500 text-sm font-medium mb-1">
                    Already Added Quiz
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {level.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {level.description}
                      </p>

                      <button className="px-4 cursor-pointer py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                        Upload Quiz
                      </button>
                    </div>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11.9961 12H12.0051"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 12H16.009"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 12H8.00898"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                          stroke="#333333"
                          stroke-width="1.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <MyButton
              onClick={() => {
                setIsSeeAllOpen(false);
                setIsQuizSetFormOpen(true);
              }}
              fullWidth
              label="Create Another Quiz Set"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizSet;

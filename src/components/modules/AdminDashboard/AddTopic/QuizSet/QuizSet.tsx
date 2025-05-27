'use client';
import RichTextEditor from '@/components/shared/rich-text-editor';
import Loading from '@/components/ui/core/Loading/Loading';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import MyFormExcelUpload from '@/components/ui/core/MyForm/MyFormExcelUpload/MyFormExcelUpload';
import MyFormInput from '@/components/ui/core/MyForm/MyFormInput/MyFormInput';
import MyFormWrapper from '@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper';
import { cn } from '@/lib/utils';
import {
  useCreateStepMutation,
  useDisableQuizMutation,
  useGetAllQuizQuestionByQuizSetQuery,
  useGetAllQuizSetByChapterQuery,
  useUploadQuizFileMutation,
} from '@/redux/features/step/step.admin.api';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const addQuizSetValidationSchema = z.object({
  setName: z
    .string()
    .min(1, 'Set name is required')
    .max(50, 'Set name must be less than 50 characters'),
  // setDescription: z
  //   .string()
  //   .min(1, 'Set description is required')
  //   .max(200, 'Set description must be less than 200 characters'),
});

export const addQuizUploadValidationSchema = z.object({
  quizFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'File is required',
    })
    .refine(
      (file) =>
        [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'application/vnd.ms-excel', // .xls
          'text/csv', // .csv
        ].includes(file.type),
      {
        message: 'Only .xlsx, .xls, or .csv files are allowed',
      }
    ),
});

// const quizQuestions = [
//   {
//     id: '01',
//     question: "What does the term 'photosynthesis' mean?",
//     options: [
//       'Making with water',
//       'Making with light',
//       'Making with carbon dioxide',
//       'Making with chlorophyll',
//     ],
//     selectedOption: null,
//   },
//   {
//     id: '02',
//     question: 'What are the three main inputs required for photosynthesis?',
//     options: [
//       'Glucose, water, and oxygen',
//       'Oxygen, glucose, and chlorophyll',
//       'Water, carbon dioxide, and sunlight',
//       'Chlorophyll, water, and carbon dioxide',
//     ],
//     selectedOption: null,
//   },
//   {
//     id: '03',
//     question:
//       'What is the name of the green pigment that captures energy from sunlight?',
//     options: ['Stomata', 'Glucose', 'Chlorophyll', 'Chloroplasts'],
//     selectedOption: null,
//   },
// ];

type QuizQuestion = {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption?: 'optionA' | 'optionB' | 'optionC' | 'optionD'; // Optional field for correct answer
  explanation?: string; // Optional field for explanation
};

type SeeAddedQuizBySetComponentProps = {
  quizSetId: string;
  setSeeAddedQuiz: any;
  setIsSeeAllOpen: any;
};

const SeeAddedQuizBySetComponent: React.FC<SeeAddedQuizBySetComponentProps> = ({
  quizSetId,
  setSeeAddedQuiz,
  setIsSeeAllOpen,
}) => {
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllQuizQuestionByQuizSetQuery(quizSetId);

  const quizQuestions: QuizQuestion[] = response?.data?.stepEightQuizzes || [];

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6 flex justify-between gap-5 items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {response?.data?.questionType}
            </h1>
            <p className="text-gray-600">
              <div
                dangerouslySetInnerHTML={{
                  __html: response?.data?.questionDescription,
                }}
              />
            </p>
          </div>
          <MyButton
            onClick={() => {
              setSeeAddedQuiz(false);
              setIsSeeAllOpen(true);
            }}
            label="< Back"
            className="!text-gray-500 !bg-slate-400 !border-0"
          />
        </div>

        <div className="mb-6">
          {/* <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
            Part 1: Photosynthesis
          </h2> */}

          <div className="space-y-6">
            {quizQuestions?.map((question: QuizQuestion, idx: number) => (
              <div
                key={question?.id}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-gray-800 font-medium mb-4">
                  Quiz -{idx + 1} {question?.questionText}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 cursor-pointer border-gray-300`}
                    ></div>
                    <span className="text-gray-700">{question?.optionA}</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 cursor-pointer border-gray-300`}
                    ></div>
                    <span className="text-gray-700">{question?.optionB}</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 cursor-pointer border-gray-300`}
                    ></div>
                    <span className="text-gray-700">{question?.optionC}</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 cursor-pointer border-gray-300`}
                    ></div>
                    <span className="text-gray-700">{question?.optionD}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizSet = ({ currentStep }: { currentStep: number }) => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [showError, setShowError] = useState(false);
  const searchParams = useSearchParams();
  const chapterId = searchParams.get('chapterId');
  const [quizSetIdForUpload, setQuizSetIdForUpload] = useState('');
  const [quizSetIdForWatch, setQuizSetIdForWatch] = useState('');

  const [isQuizSetFormOpen, setIsQuizSetFormOpen] = useState(false);
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [seeAddedQuiz, setSeeAddedQuiz] = useState(false);

  const [createStep] = useCreateStepMutation();
  const [disableQuiz] = useDisableQuizMutation();

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllQuizSetByChapterQuery(chapterId);

  const quizSets = response?.data?.quizes || [];

  const handleSubmit = async (data: any, reset: any) => {
    if (isEditorEmpty(description)) {
      setShowError(true);
      return;
    }
    const payload = {
      questionType: data.setName,
      questionDescription: description,
    };
    const res = await handleAsyncWithToast(async () => {
      return createStep({
        data: payload,
        stepNumber:
          currentStep === 1
            ? 'one'
            : currentStep === 2
            ? 'two'
            : currentStep === 3
            ? 'three'
            : currentStep === 4
            ? 'four'
            : currentStep === 5
            ? 'five'
            : currentStep === 6
            ? 'six'
            : currentStep === 7
            ? 'seven'
            : currentStep === 8
            ? 'eight'
            : '',
        chapterId: chapterId,
      });
    });
    if (res?.data?.success) {
      reset();
      setIsQuizSetFormOpen(false);
      setIsSeeAllOpen(true);
    }
  };

  const [uploadQuiz] = useUploadQuizFileMutation();

  const handleQuizUpload = async (data: any, reset: any) => {
    // Handle uploading quiz file
    const formData = new FormData();
    formData.append('quiz', data.quizFile);
    const res = await handleAsyncWithToast(async () => {
      return uploadQuiz({
        data: formData,
        quizId: quizSetIdForUpload,
      });
    });
    if (res?.data?.success) {
      reset();
      setIsUploadFileOpen(false);
      setIsSeeAllOpen(true);
    }
  };

  const isEditorEmpty = (html: string) => {
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    return textContent === '';
  };

  const onChange = (content: string) => {
    setDescription(content);
    if (content && !isEditorEmpty(content)) {
      setShowError(false);
    }
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <>
      {!isQuizSetFormOpen &&
        !isSeeAllOpen &&
        !isUploadFileOpen &&
        !seeAddedQuiz && (
          <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
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
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
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
                <p className="mb-2 text-base">Topic Description</p>
                <RichTextEditor content={description} onChange={onChange} />
                {showError && isEditorEmpty(description) && (
                  <p className="text-red-500 text-base mt-2">
                    Description is required
                  </p>
                )}
              </div>
              <div className="mb-4 space-y-4">
                <MyButton type="submit" label="Create Quiz Set" fullWidth />
                {quizSets?.length > 0 ? (
                  <MyButton
                    onClick={() => {
                      setIsQuizSetFormOpen(false);
                      setIsSeeAllOpen(true);
                    }}
                    type="submit"
                    label="See Added Sets >"
                    className="!bg-slate-400"
                    fullWidth
                  />
                ) : (
                  ''
                )}
              </div>
            </MyFormWrapper>
          </div>
        </div>
      )}
      {isSeeAllOpen && (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-gray-600 font-medium mb-1">
              Step-0{currentStep}
            </h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              All Quiz Set
            </h1>
            <div className="space-y-6 mb-6">
              <div className="text-orange-500 text-sm font-medium mb-3">
                Already Added Quiz
              </div>
              {quizSets?.map((level: any) => (
                <div
                  key={level.id}
                  className={cn(
                    'border-b pb-6 last:border-b-0 shadow-sm p-4 rounded-md relative'
                  )}
                >
                  {level.isDisable && (
                    <div className="absolute inset-0 bg-white/70 z-20 rounded-md flex items-center justify-center"></div>
                  )}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {level.questionType}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: level.questionDescription,
                          }}
                        />
                      </p>

                      <button
                        onClick={() => {
                          setIsSeeAllOpen(false);
                          setIsUploadFileOpen(true);
                          setQuizSetIdForUpload(level.id);
                        }}
                        disabled={level.isDisable}
                        className="px-4 cursor-pointer py-2 border disabled:cursor-not-allowed border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Upload Quiz
                      </button>
                    </div>
                    <div className="relative z-30">
                      <button
                        onClick={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            [level.id]: !prev[level.id],
                          }))
                        }
                        className="p-1 cursor-pointer"
                        type="button"
                      >
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 12H16.009"
                            stroke="#333333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 12H8.00898"
                            stroke="#333333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                            stroke="#333333"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                      {dropdownOpen?.[level.id] && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <button
                            className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              // handle see quiz question
                              setDropdownOpen({});
                              setIsSeeAllOpen(false);
                              setSeeAddedQuiz(true);
                              setQuizSetIdForWatch(level.id);
                            }}
                          >
                            See Quiz Question
                          </button>
                          <button
                            className="block cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            onClick={async () => {
                              // handle disable set
                              setDropdownOpen({});
                              await handleAsyncWithToast(async () => {
                                return disableQuiz({
                                  data: { isDisable: !level.isDisable },
                                  quizId: level.id,
                                });
                              });
                            }}
                          >
                            {level.isDisable ? 'Enable Set' : 'Disable Set'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <MyButton
                onClick={() => {
                  setIsSeeAllOpen(false);
                  setIsQuizSetFormOpen(true);
                }}
                fullWidth
                label="Create Another Quiz Set"
              />
              {quizSets?.length > 0 ? (
                <MyButton
                  onClick={() => {
                    router.push(
                      `/dashboard/classes/add-topic?step=${
                        currentStep + 1
                      }&chapterId=${chapterId}`
                    );
                  }}
                  className="!bg-slate-400"
                  fullWidth
                  label="Next step >"
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
      {isUploadFileOpen && (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-gray-600 font-medium mb-1">
              Step-0{currentStep}
            </h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Upload Quiz
            </h1>
            {/* Upload Quiz Form goes here */}
            <MyFormWrapper
              onSubmit={handleQuizUpload}
              resolver={zodResolver(addQuizUploadValidationSchema)}
            >
              <div className="mb-4">
                <MyFormExcelUpload
                  label="Quiz Excel Sheet Upload"
                  // value={preAddedClassData.className}
                  name="quizFile"
                  placeHolder="Upload quiz file"
                >
                  <div className="border-2 border-gray-300 bg-gray-50 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <p className="text-gray-700 mb-1">Drop file or browse</p>
                    <p className="text-xs text-gray-500 mb-3">
                      Format: Excel File Only Max file size: 2 GB
                    </p>

                    <p className="px-4 py-1 cursor-pointer bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                      Browse Files
                    </p>
                  </div>
                </MyFormExcelUpload>
              </div>

              <div className="mb-4 space-y-3">
                <MyButton type="submit" label="Upload Quiz" fullWidth />
                <MyButton
                  onClick={() => {
                    setIsUploadFileOpen(false);
                    setIsSeeAllOpen(true);
                    setQuizSetIdForUpload('');
                  }}
                  label="< Back"
                  className="!text-gray-500 !bg-slate-400 !border-0"
                  fullWidth
                />
              </div>
            </MyFormWrapper>
          </div>
        </div>
      )}
      {seeAddedQuiz && (
        <SeeAddedQuizBySetComponent
          quizSetId={quizSetIdForWatch}
          setSeeAddedQuiz={setSeeAddedQuiz}
          setIsSeeAllOpen={setIsSeeAllOpen}
        />
      )}
    </>
  );
};

export default QuizSet;

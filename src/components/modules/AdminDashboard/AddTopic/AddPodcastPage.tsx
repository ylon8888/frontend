"use client";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import MyFormImageUpload from "@/components/ui/core/MyForm/MyFormImageUpload/MyFormImageUpload";
import MyFormInput from "@/components/ui/core/MyForm/MyFormInput/MyFormInput";
import MyFormVideoUpload from "@/components/ui/core/MyForm/MyFormVideoUpload/MyFormVideoUpload";
import MyFormWrapper from "@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper";
import { useCreateStepMutation } from "@/redux/features/step/step.admin.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const addTopicValidationSchema = z.object({
  topicName: z
    .string()
    .min(1, "Topic name is required")
    .max(50, "Topic name must be less than 50 characters"),
  topicVideo: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "video/mp4",
          "video/webm",
          "audio/mpeg",
          "audio/mp3",
          "audio/wav",
          "audio/x-wav",
          "audio/x-pn-wav",
        ].includes(file.type),
      "Only videos and audios are allowed"
    ),
  thumbnail: z.instanceof(File),
});

const AddPodcastPage = ({
  currentStep,
  isEditMode,
}: {
  currentStep: number;
  isEditMode?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterId = searchParams.get("chapterId");

  const [createStep] = useCreateStepMutation();

  const handleSubmit = async (data: any, reset: any) => {
    const formData = new FormData();
    formData.append("poadcast", data.topicVideo);
    formData.append("thumbnail", data?.thumbnail);
    formData.append(
      "data",
      JSON.stringify({
        podcastName: data.topicName,
      })
    );

    const payload = {
      data: formData,
      stepNumber:
        currentStep === 1
          ? "one"
          : currentStep === 2
          ? "two"
          : currentStep === 3
          ? "three"
          : currentStep === 4
          ? "four"
          : currentStep === 5
          ? "five"
          : currentStep === 6
          ? "six"
          : currentStep === 7
          ? "seven"
          : currentStep === 8
          ? "eight"
          : "",
      chapterId: chapterId,
    };
    const res = await handleAsyncWithToast(async () => {
      return createStep(payload);
    });
    if (res?.data?.success) {
      reset();
      router.push(
        `/dashboard/classes/add-topic?step=${
          currentStep + 1
        }&chapterId=${chapterId}&edit=${isEditMode ? "true" : "false"}`
      );
    }
  };
  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100"'>
      <div className="max-w-md w-full bg-white mx-auto p-6 rounded-lg shadow-md flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Step-0{currentStep}</h2>
        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(addTopicValidationSchema)}
        >
          <div className="mb-4">
            <MyFormInput
              label="Topic Name"
              // value={preAddedClassData.className}
              name="topicName"
              placeHolder="Enter the name of the topic"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* <div className="mb-4">
            <MyFormTextArea
              label="Topic Description"
              // value={preAddedClassData.classDescription}
              name="topicDescription"
              placeHolder="Topic description"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div> */}
          <div className="space-y-4 mb-4">
            <MyFormImageUpload
              name="thumbnail"
              label="Thumbnail"
              inputClassName="cursor-pointer"
            >
              <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
                <UploadCloud className="w-5 h-5 mr-2" />
                <span className="text-sm text-center font-medium">
                  Upload Podcast Thumbnail
                </span>
                <p className="mt-1 text-xs text-center text-gray-500">
                  PNG, JPG up to 3MB
                </p>
              </div>
            </MyFormImageUpload>
            <MyFormVideoUpload
              name="topicVideo"
              label="Upload Podcast"
              defaultValue=""
            >
              <div className="flex items-center flex-col justify-center text-primary border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer">
                <UploadCloud className="w-5 h-5 mr-2" />
                <span className="text-sm text-center font-medium">
                  Click to upload audio/video
                </span>
              </div>
            </MyFormVideoUpload>
          </div>
          <MyButton label="Next Step" type="submit" fullWidth isArrow />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default AddPodcastPage;

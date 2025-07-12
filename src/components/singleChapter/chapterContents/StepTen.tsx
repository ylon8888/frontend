import { ButtonLoading } from "@/components/shared/button-loading/LoadingButton";
import {
  useCreateChapterProgressMutation,
  useGiveChapterFeedbackMutation,
} from "@/redux/features/course/course";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const StepTen = ({ data }: { data: any; isLoading: boolean }) => {
  const [submitFeedback, { isLoading: isSubmitting }] =
    useGiveChapterFeedbackMutation();
  const [createChapterProgress] = useCreateChapterProgressMutation();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const id = window.location.pathname.split("/")[4];
  interface Errors {
    rating?: string;
    message?: string;
  }

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
    setErrors((prev: Errors) => ({ ...prev, rating: "" }));
  };

  interface HandleStarHover {
    (starValue: number): void;
  }

  const handleStarHover: HandleStarHover = (starValue) => {
    setHoveredRating(starValue);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleMessageChange = (e: any) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
    if (value.length >= 20) {
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (message.length < 20) {
      newErrors.message = `Review must be at least 20 characters (${
        20 - message.length
      } more needed)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const reviewData = {
        rating: rating,
        message: message,
      };
      const res = await handleAsyncWithToast(async () => {
        return submitFeedback({ data: reviewData, id });
      });
      // Reset form
      if (res?.data?.success) {
        setRating(0);
        setMessage("");
        setCharCount(0);
        setErrors({});
      }
    }
  };

  // const handleCancel = () => {
  //   setRating(0);
  //   setMessage("");
  //   setCharCount(0);
  //   setErrors({});
  // };
  const chapterData = data?.data?.chapters?.[0];
  const router = useRouter();
  const subjectId = useParams().id;
  const handleCompleteChapter = async () => {
    try {
      const response = await createChapterProgress({
        chapterId: id,
        stepId: chapterData?.stepNine?.id,
        stepSerial: "9",
      });

      if (response.data?.success) {
        toast.success(response.data.message);
        router.push(`/courses/${subjectId}/chapters`);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Title */}
      <div className="bg-white rounded-lg px-6 py-6 shadow-sm">
        <h2 className="font-semibold text-2xl font-montserrat">
          {data?.data?.chapters?.[0]?.chapterName}
        </h2>
      </div>

      <div className="bg-white rounded-lg p-8 border border-primary shadow-xl">
        {/* Content Sections */}
        <h2 className="font-semibold text-3xl font-montserrat text-center mb-8">
          Provide Your Feedback
        </h2>
        <div className="mb-10">
          <h2 className="font-semibold text-lg font-montserrat">
            Rate This Chapter
          </h2>
          <p className=" text-gray-600 mb-4">
            We’d love to hear your thoughts! Please rate the article and let us
            know your feedback.
          </p>
        </div>

        {/* Rate this course section */}
        <div className="mb-10">
          <h2 className="font-semibold text-lg font-montserrat mb-2">
            Rate this course
          </h2>
          <p className="text-gray-600 mb-4">
            We’d love to hear your thoughts! Please rate the article and let us
            know your feedback.
          </p>

          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = starValue <= (hoveredRating || rating);
              return (
                <button
                  key={starValue}
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => handleStarHover(starValue)}
                  onMouseLeave={handleStarLeave}
                  className="focus:outline-none rounded transition-all duration-150"
                >
                  <Star
                    size={32}
                    className={`transition-colors duration-150 ${
                      isFilled
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300 hover:text-orange-300"
                    }`}
                  />
                </button>
              );
            })}
            {rating > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                {rating} out of 5 stars
              </span>
            )}
          </div>

          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Review this Chapter section */}
        <div className="mb-10">
          <h2 className="font-semibold text-lg font-montserrat mb-2">
            Review this Chapter{" "}
            <span className="font-medium text-sm text-gray-600">
              (Must be at Least 20 characters)
            </span>
          </h2>

          <div className="relative">
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="Write a message..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows={6}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {charCount}/20 characters minimum
              </div>
              <div
                className={`text-sm ${
                  charCount >= 20 ? "text-green-600" : "text-gray-500"
                }`}
              >
                {charCount >= 20
                  ? "✓ Minimum reached"
                  : `${20 - charCount} more needed`}
              </div>
            </div>
          </div>

          {errors.message && (
            <p className="text-red-500 text-sm mt-2">{errors.message}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCompleteChapter}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {isSubmitting ? <ButtonLoading /> : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTen;

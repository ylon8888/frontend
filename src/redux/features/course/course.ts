import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //     getAllCourse: builder.query({
    //       query: (data) => {
    //         const params = new URLSearchParams();
    //         if (data?.queryObj) {
    //           data?.queryObj.forEach((item: any) => {
    //             params.append(item.name, item.value as string);
    //           });
    //         }
    //         return {
    //           url: `course`,
    //           method: "GET",
    //           params: params,
    //         };
    //       },
    //       providesTags: ["course"],
    //     }),
    getSingleCourse: builder.query({
      query: (id) => ({
        url: `/class/class-wise-chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getSingleCourseDetails: builder.query({
      query: (id) => ({
        url: `/course/course-details/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getChapters: builder.query({
      query: (id) => ({
        url: `/subject/subject-wise-chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getCoursesOfChapter: builder.query({
      query: (id) => ({
        url: `chapter/chapter-wise-steps/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getQuizByType: builder.query({
      query: (id) => ({
        url: `/step/quiz-question/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    submitQuiz: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/step/submit-quiz/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),
    getQuizResults: builder.query({
      query: (id) => ({
        url: `/step/quiz-result/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    handleStepProgress: builder.mutation({
      query: (data) => {
        return {
          url: `/progress/create-progress`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),
    giveChapterFeedback: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/course/course-review/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),
    enrollCourse: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/course/course-enroll/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),
    verifyEnroll: builder.mutation({
      query: (data) => {
        return {
          url: `/course/verify-enrollment`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),
    resendOtp: builder.mutation({
      query: (id) => {
        return {
          url: `/course/resend-otp/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["course"],
    }),
    getSingleCourseReviews: builder.query({
      query: (id) => ({
        url: `/course/course-review/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const {
  useGetSingleCourseQuery,
  useGetSingleCourseDetailsQuery,
  useGetChaptersQuery,
  useGetCoursesOfChapterQuery,
  useGetQuizByTypeQuery,
  useSubmitQuizMutation,
  useGetQuizResultsQuery,
  useHandleStepProgressMutation,
  useGiveChapterFeedbackMutation,
  useEnrollCourseMutation,
  useVerifyEnrollMutation,
  useResendOtpMutation,
  useGetSingleCourseReviewsQuery,
} = courseApi;

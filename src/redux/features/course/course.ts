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
  }),
});

export const {
  useGetSingleCourseQuery,
  useGetSingleCourseDetailsQuery,
  useGetChaptersQuery,
  useGetCoursesOfChapterQuery,
  useGiveChapterFeedbackMutation,
  useEnrollCourseMutation,
  useVerifyEnrollMutation,
} = courseApi;

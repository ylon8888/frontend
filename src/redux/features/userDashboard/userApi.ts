import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => ({
        url: `student/progress`,
        method: "GET",
      }),
    }),
    getProgress: builder.query({
      query: () => ({
        url: `student/course-progress`,
        method: "GET",
      }),
    }),
    enrolledCourse: builder.query({
      query: () => ({
        url: `/student/enroll-course`,
        method: "GET",
      }),
    }),
    coursesOfChapter: builder.query({
      query: (chapterId) => ({
        url: `/student/enroll-course-chapter/${chapterId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetProgressQuery,
  useEnrolledCourseQuery,
  useCoursesOfChapterQuery,
} = userApi;

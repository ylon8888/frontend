import { baseApi } from "../../api/baseApi";

const chapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllChapter: builder.query({
      query: (subjectId) => {
        return {
          url: `subject/subject-wise-chapter/${subjectId}`,
          method: "GET",
        };
      },
      providesTags: ["chapter"],
    }),

    getAllStudentByChapter: builder.query({
      query: ({ objectQuery, chapterId }) => {
        const params = new URLSearchParams();
        if (objectQuery) {
          objectQuery?.forEach((item: any) => {
            params.append(item?.name, item?.value as string);
          });
        }
        return {
          url: `course/chapter-enroll-student/${chapterId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["chapter"],
    }),

    getSingleChapter: builder.query({
      query: (id) => ({
        url: `chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["chapter"],
    }),

    getStudentAnalysisReportByChapter: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        params.append("chapterId", data?.chapterId);
        params.append("studentId", data?.studentId);
        return {
          url: `course/chapter-quiz-details`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["chapter"],
    }),

    createChapter: builder.mutation({
      query: ({ data, subjectId }) => {
        return {
          url: `chapter/${subjectId}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["chapter"],
    }),

    updateChapter: builder.mutation({
      query: (data) => {
        return {
          url: `chapter/${data?.id}`,
          method: "POST",
          body: data?.formData,
        };
      },
      invalidatesTags: ["chapter"],
    }),
    deleteChapter: builder.mutation({
      query: (id) => {
        return {
          url: `chapter/delete/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["chapter"],
    }),
  }),
});

export const {
  useGetAllChapterQuery,
  useCreateChapterMutation,
  useGetAllStudentByChapterQuery,
  useGetStudentAnalysisReportByChapterQuery,
  useDeleteChapterMutation,
} = chapterApi;

import { baseApi } from '../../api/baseApi';

const stepApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStep: builder.query({
      query: (subjectId) => {
        return {
          url: `subject/subject-wise-step/${subjectId}`,
          method: 'GET',
        };
      },
      providesTags: ['step'],
    }),

    getSingleStep: builder.query({
      query: (id) => ({
        url: `step/${id}`,
        method: 'GET',
      }),
      providesTags: ['step'],
    }),

    createStep: builder.mutation({
      query: ({ data, stepNumber, chapterId }) => {
        return {
          url: `step/${stepNumber}/${chapterId}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['step'],
    }),

    getAllQuizSetByChapter: builder.query({
      query: (chapterId) => {
        return {
          url: `step/get-quizes/${chapterId}`,
          method: 'GET',
        };
      },
      providesTags: ['step'],
    }),

    getAllQuizQuestionByQuizSet: builder.query({
      query: (quizSetId) => {
        return {
          url: `step/quiz-question/${quizSetId}`,
          method: 'GET',
        };
      },
      providesTags: ['step'],
    }),

    disableQuiz: builder.mutation({
      query: ({ data, quizId }) => {
        return {
          url: `step/disable-quiz/${quizId}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['step'],
    }),
    uploadQuizFile: builder.mutation({
      query: ({ data, quizId }) => {
        return {
          url: `step/quiz/${quizId}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['step'],
    }),

    deleteStep: builder.mutation({
      query: (id) => {
        return {
          url: `step/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['step'],
    }),
  }),
});

export const {
  useCreateStepMutation,
  useGetAllQuizSetByChapterQuery,
  useDisableQuizMutation,
  useGetAllQuizQuestionByQuizSetQuery,
  useUploadQuizFileMutation,
} = stepApi;

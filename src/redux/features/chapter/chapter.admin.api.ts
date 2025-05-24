import { baseApi } from '../../api/baseApi';

const chapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllChapter: builder.query({
      query: (subjectId) => {
        return {
          url: `subject/subject-wise-chapter/${subjectId}`,
          method: 'GET',
        };
      },
      providesTags: ['chapter'],
    }),

    getSingleChapter: builder.query({
      query: (id) => ({
        url: `chapter/${id}`,
        method: 'GET',
      }),
      providesTags: ['chapter'],
    }),

    createChapter: builder.mutation({
      query: (data) => {
        return {
          url: 'chapter',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['chapter'],
    }),

    updateChapter: builder.mutation({
      query: (data) => {
        return {
          url: `chapter/${data?.id}`,
          method: 'POST',
          body: data?.formData,
        };
      },
      invalidatesTags: ['chapter'],
    }),
    deleteChapter: builder.mutation({
      query: (id) => {
        return {
          url: `chapter/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['chapter'],
    }),
  }),
});

export const {useGetAllChapterQuery} = chapterApi;

import { baseApi } from '../../api/baseApi';

const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: (classID) => {
        return {
          url: `subject/class-wise-subject/${classID}`,
          method: 'GET',
        };
      },
      providesTags: ['subject'],
    }),
    getSingleSubject: builder.query({
      query: (id) => ({
        url: `subject/${id}`,
        method: 'GET',
      }),
      providesTags: ['subject'],
    }),

    createSubject: builder.mutation({
      query: ({ data, classID }) => {
        return {
          url: `subject/${classID}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['subject', 'class'],
    }),

    updateSubject: builder.mutation({
      query: (data) => {
        return {
          url: `subject/${data?.id}`,
          method: 'PATCH',
          body: data?.formData,
        };
      },
      invalidatesTags: ['subject'],
    }),

    updateSubjectVisibility: builder.mutation({
      query: (data) => {
        return {
          url: `subject/update-visibility/${data?.id}`,
          method: 'PATCH',
          body: data?.action,
        };
      },
      invalidatesTags: ['subject'],
    }),

    deleteSubject: builder.mutation({
      query: (id) => {
        return {
          url: `subject/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['subject'],
    }),
  }),
});

export const { useCreateSubjectMutation, useGetAllSubjectQuery, useUpdateSubjectVisibilityMutation } = subjectApi;

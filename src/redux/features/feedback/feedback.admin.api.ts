import { baseApi } from '../../api/baseApi';

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `course/course-review`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['feedback'],
    }),
    getSingleFeedback: builder.query({
      query: (id) => ({
        url: `feedback/${id}`,
        method: 'GET',
      }),
      providesTags: ['feedback'],
    }),
  }),
});

export const { useGetAllFeedbackQuery } = feedbackApi;

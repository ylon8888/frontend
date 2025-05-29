import { baseApi } from '../../api/baseApi';

const studentAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `student/admin-get-all-students`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['student'],
    }),
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `/student/admin-get-student/${id}`,
        method: 'GET',
      }),
      providesTags: ['student'],
    }),
    getStats: builder.query({
      query: () => ({
        url: `student/retrive-student-details`,
        method: 'GET',
      }),
      providesTags: ['student'],
    }),
    getParticipationRateGraph: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `student/participation`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['student'],
    }),
    getOverallGraph: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `student/overall-graph`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['student'],
    }),
  }),
});

export const {
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
  useGetStatsQuery,
  useGetParticipationRateGraphQuery,
  useGetOverallGraphQuery,
} = studentAdminApi;

import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => ({
        url: `student/progress`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStudentQuery } = userApi;

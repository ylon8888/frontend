import { baseApi } from "../../api/baseApi";

const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClass: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `class`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["class"],
    }),
    getSingleClass: builder.query({
      query: (id) => ({
        url: `class/${id}`,
        method: "GET",
      }),
      providesTags: ["class"],
    }),
    createClass: builder.mutation({
      query: (data) => {
        return {
          url: "class",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["class"],
    }),
    updateClass: builder.mutation({
      query: (data) => {
        return {
          url: `class/${data?.id}`,
          method: "POST",
          body: data?.formData,
        };
      },
      invalidatesTags: ["class"],
    }),
    deleteClass: builder.mutation({
      query: (id) => {
        return {
          url: `class/delete/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["class"],
    }),
  }),
});

export const { useCreateClassMutation, useGetAllClassQuery, useDeleteClassMutation } = classApi;

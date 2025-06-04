import { baseApi } from "../../api/baseApi";

const ContactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => {
        return {
          url: "/contact",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateContactMutation } = ContactApi;

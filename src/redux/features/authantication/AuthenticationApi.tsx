import { baseApi } from "../../api/baseApi";

const authenticationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
        query: (data) => {
          return {
            url: "auth/login",
            method: "POST",
            body: data,
          };
        },
      }),
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authenticationApi;

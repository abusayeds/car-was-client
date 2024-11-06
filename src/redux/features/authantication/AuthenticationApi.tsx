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
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/change-password",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useChangePasswordMutation,
} = authenticationApi;

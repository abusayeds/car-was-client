import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => {
        return {
          url: "/create-review",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["review"],
    }),
    getAllReview: builder.query({
      query: () => {
        return {
          url: "/get-review",
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    getTwoReview: builder.query({
      query: () => {
        return {
          url: "/get-last-two-review",
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
  }),
});

export const { useAddReviewMutation, useGetAllReviewQuery , useGetTwoReviewQuery} = reviewApi;

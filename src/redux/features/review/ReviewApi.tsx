/* eslint-disable @typescript-eslint/no-explicit-any */
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
    updateReview: builder.mutation({
      query: (args) => {
        return {
          url: `/update-review/${args.id}`,
          method: "PUT",
          body: args?.data,
        };
      },
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        console.log(id);

        return {
          url: `/delete-review/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["review"],
    }),
    myReview: builder.query({
      query: (id) => {
        return {
          url: `/my-review/${id}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    singleReview: builder.query({
      query: (id) => {
        return {
          url: `/single-review/${id}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    getAllReview: builder.query({
      query: (paginate) => {
        const params = new URLSearchParams();
        if (paginate) {
          paginate.forEach((item: any) => {
            params?.append(item?.name, item?.value);
          });
        }

        return {
          url: "/get-review",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),
    getAllReviewLength: builder.query({
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

export const {
  useAddReviewMutation,
  useGetAllReviewQuery,
  useGetTwoReviewQuery,
  useMyReviewQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useSingleReviewQuery,
  useGetAllReviewLengthQuery,
} = reviewApi;

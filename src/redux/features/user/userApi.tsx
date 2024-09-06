/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  singleUser: builder.query({
      query: (id) => {
        return {
          url: `/single-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  UserBookings: builder.query({
      query: () => {
        return {
          url: `my-bookings`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const {useSingleUserQuery, useUserBookingsQuery} = userApi;

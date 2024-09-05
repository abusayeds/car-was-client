import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    booking: builder.query({
      query: (id) => {
        return {
          url: `/single-slot/${id}`,
          method: "GET",
        };
      },
      providesTags : ["booking"]
    }),
    addbooking: builder.mutation({
      query: (data) => {
        return {
          url: `/bookings`,
          method: "POST",
          body : data
        };
      },
      invalidatesTags : ["booking"]
    }),
    updateSlot: builder.mutation({
      query: (args) => {
        return {
          url: `/update-slot/${args.id}`,
          method: "PUT",
          body : args.data
        };
      },
      invalidatesTags : ["slot"]
    }),
  }),
});

export const {useBookingQuery, useAddbookingMutation, useUpdateSlotMutation} = bookingApi;

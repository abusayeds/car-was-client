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
      providesTags: ["userBooking"],
    }),
    addbooking: builder.mutation({
      query: (data) => {
        return {
          url: `/bookings`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["userBooking"],
    }),
    deletebooking: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-booking/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["userBooking"],
    }),
    updateSlot: builder.mutation({
      query: (args) => {
        return {
          url: `/update-slot/${args.id}`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useBookingQuery,
  useAddbookingMutation,
  useUpdateSlotMutation,
  useDeletebookingMutation,
} = bookingApi;

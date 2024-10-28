/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: (data) => {
        return {
          url: "/services",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["service"],
    }),
    adminServise: builder.query({
      query: () => {
        return {
          url: `/services`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),
    updateServise: builder.mutation({
      query: (args) => {
        return {
          url: `/services/${args.id}`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["service"],
    }),
    deleteServise: builder.mutation({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["service"],
    }),
    getSlot: builder.query({
      query: () => {
        return {
          url: `/slots/availability`,
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),
    serviseName: builder.query({
      query: () => {
        return {
          url: "/services?fields=name",
          method: "GET",
        };
      },
    }),
    createslot: builder.mutation({
      query: (data) => {
        return {
          url: "/services/slots",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["slot"],
    }),
    deleteSlot: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-slot/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slot"],
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
    updateuser: builder.mutation({
      query: (args) => {
        return {
          url: `/update-user/${args.id}`,
          method: "PUT",
          body: args.data,
        };
      },
      invalidatesTags: ["user"],
    }),
    getAllBooking: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
      providesTags: ["userBooking"],
    }),
  }),
});

export const {
  useAdminServiseQuery,
  useAddServiceMutation,
  useUpdateServiseMutation,
  useDeleteServiseMutation,
  useGetSlotQuery,
  useServiseNameQuery,
  useCreateslotMutation,
  useDeleteSlotMutation,
  useGetAllBookingQuery,
  useUpdateuserMutation,
} = adminApi;

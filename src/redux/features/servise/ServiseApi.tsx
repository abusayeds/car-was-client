/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const serviseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    servise: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.data?.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/services?searchTerm=${args.search}&sort=${args.sort}`,
          method: "GET",
          params: params,
        };
      },
    }),
    serviseDetails: builder.query({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "GET",
        };
      },
    }),
    slots: builder.query({
      query: (id) => {
        return {
          url: `/services-slots/${id}`,
          method: "GET",
        };
      },
      providesTags : ["slot"]
    }),
  }),
});

export const { useServiseQuery, useServiseDetailsQuery, useSlotsQuery } =
  serviseApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const serviseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    servise: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args?.data) {
          args?.data?.forEach((item: any) => {
            params?.append(item?.name, item?.value);
          });
        }

        return {
          url: `/services?searchTerm=${args.search}&sort=${args.sort}`,

          method: "GET",
          params: params,
        };
      },
    }),
    paginateAllServise: builder.query({
      query: () => {
        return {
          url: `/services`,
          method: "GET",
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
      providesTags: ["slot"],
    }),
    subServise: builder.query({
      query: (id) => {
        return {
          url: `/all/sub-services/${id}?`,
          method: "GET",
        };
      },
    }),
    singleSubServise: builder.query({
      query: (id) => {
        {
          return {
            url: `/single-sub-services/${id}`,
            method: "GET",
          };
        }
      },
    }),
  }),
});

export const {
  useServiseQuery,
  useServiseDetailsQuery,
  useSlotsQuery,
  useSubServiseQuery,
  useSingleSubServiseQuery,
  usePaginateAllServiseQuery,
} = serviseApi;

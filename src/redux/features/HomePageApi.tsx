import { baseApi } from "../api/baseApi";

const homePageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    HomePageFeatures: builder.query({
      query: () => {
        return {
          url: "/services?limit=6",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useHomePageFeaturesQuery } = homePageApi;

import { apiSlice } from "../../api/ApiSlice";

export const TimeZoneApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    timeZoneListing: builder.query({
      query: () => ({
        url: `/Location/get-all-time-zones`,
      }),
    }),
  }),
});

export const { useTimeZoneListingQuery } = TimeZoneApiSlice;

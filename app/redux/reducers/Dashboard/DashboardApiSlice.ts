import {apiSlice} from "../../api/ApiSlice";

export const DashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    dashboardStatsListing: builder.query({
      query: () => ({
        url: `Dashboard/get-dashboard-statistics`,
        method: "GET",
      }),
    }),
    dashboardMemberships: builder.query({
      query: () => ({
        url: `Dashboard/get-member-statistics`,
        method: "GET",
      }),
    }),
    dashboardRevenus: builder.query({
      query: () => ({
        url: `Dashboard/get-revenue-statistics`,
        method: "GET",
      }),
    }),
    dashboardBookingToday: builder.query({
      query: () => ({
        url: `Dashboard/get-todays-booking`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDashboardStatsListingQuery,
  useDashboardMembershipsQuery,
  useDashboardRevenusQuery,
  useDashboardBookingTodayQuery,
} = DashboardApiSlice;

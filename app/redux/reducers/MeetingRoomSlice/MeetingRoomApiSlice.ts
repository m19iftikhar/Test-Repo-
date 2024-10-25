import { Pagination, KeywordQuery } from "@/app/Utility/commonTypes";
import { apiSlice } from "../../api/ApiSlice";

export const MeetingRoomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    meetingRoom: builder.query({
      query: (data: Pagination) => ({
        url: `/MeetingRoom/get-all-meeting-rooms?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
    getMeetingRoomById: builder.query({
      query: (id: string) => ({
        url: `/MeetingRoom/get-meeting-room-by-id?id=${id}`,
        method: "GET",
      }),
    }),
    allAmenities: builder.query({
      query: () => ({
        url: `/MeetingRoom/get-all-amenities`,
        method: "GET",
      }),
    }),
    allRevenues: builder.query({
      query: (data: any) => ({
        url: `/MeetingRoom/get-all-revenue-accounts?taxRateId=${data.taxRateId}&locationId=${data.locationId}`,
        method: "GET",
      }),
    }),
    allTaxeRates: builder.query({
      query: () => ({
        url: `/MeetingRoom/get-all-tax-rates`,
        method: "GET",
      }),
    }),
    getAllResourcePriceDurations: builder.query({
      query: (params: KeywordQuery) => ({
        url: `/MeetingRoom/get-all-resource-price-durations`,
        method: "GET",
        params: params,
      }),
    }),
    getAllLocations: builder.query({
      query: (params: KeywordQuery) => ({
        url: `/Location/get-all-locations`,
        method: "GET",
        params: params,
      }),
    }),
    getAllResourcePriceDuration: builder.query({
      query: () => ({
        url: `/MeetingRoom/get-all-resource-price-durations`,
        method: "GET",
      }),
    }),
    addMeetingRoom: builder.mutation({
      query: (newMeetingRoom: any) => ({
        url: `/MeetingRoom/add-meeting-room`,
        method: "POST",
        body: newMeetingRoom,
      }),
    }),
    editMeetingRoom: builder.mutation({
      query: (updatedMeetingRoom: any) => ({
        url: `/MeetingRoom/edit-meeting-room`,
        method: "POST",
        body: updatedMeetingRoom,
      }),
    }),
    deleteMeetingRoom: builder.mutation({
      query: (recId: string) => ({
        url: `/MeetingRoom/delete-meeting-room?recId=${recId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useMeetingRoomQuery,
  useGetMeetingRoomByIdQuery,
  useAllAmenitiesQuery,
  useAllTaxeRatesQuery,
  useAllRevenuesQuery,
  useGetAllResourcePriceDurationsQuery,
  useGetAllLocationsQuery,
  useGetAllResourcePriceDurationQuery,
  useAddMeetingRoomMutation,
  useEditMeetingRoomMutation,
  useDeleteMeetingRoomMutation,
} = MeetingRoomApiSlice;

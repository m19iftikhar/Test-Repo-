import { Pagination } from "@/app/Utility/commonTypes";
import { apiSlice } from "../../api/ApiSlice";

export const LocationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addLocation: builder.mutation({
      query: (data: any) => {
        return {
          url: `Location/add-location`,
          method: "POST",
          body: data,
        };
      },
    }),
    editLocation: builder.mutation({
      query: (data: any) => {
        return {
          url: `Location/edit-location`,
          method: "POST",
          body: data,
        };
      },
    }),
    deleteLocation: builder.mutation({
      query: (id: string) => ({
        url: `Location/delete-location?recId=${id}`,
        method: "POST",
      }),
    }),
    locationListing: builder.query({
      query: (data: any) => ({
        url: `/Location/get-all-locations?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      }),
    }),
    locationById: builder.query({
      query: (id: any) => ({
        url: `/Location/get-location-by-id?Id=${id}`,
      }),
    }),
  }),
});

export const {
  useLocationByIdQuery,
  useLocationListingQuery,
  useAddLocationMutation,
  useEditLocationMutation,
  useDeleteLocationMutation,
} = LocationsApiSlice;

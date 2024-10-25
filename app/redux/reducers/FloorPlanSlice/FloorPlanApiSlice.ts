import { apiSlice } from "../../api/ApiSlice";

export const FloorPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addFloorPlans: builder.mutation({
      query: (data: any) => {
        return {
          url: `/Floor/add-floor`,
          method: "POST",
          body: data,
        };
      },
    }),
    editFloorPlans: builder.mutation({
      query: (data: string) => {
        return {
          url: `Floor/edit-floor`,
          method: "POST",
          body: data,
        };
      },
    }),
    removeFloorPlan: builder.mutation({
      query: (id: string) => {
        return {
          url: `/Floor/delete-floor?recId=${id}`,
          method: "POST",
        };
      },
    }),
    floorPlanListing: builder.query({
      query: () => ({
        url: `/Floor/get-all-floors`,
      }),
    }),
    floorPlanById: builder.query({
      query: (id: any) => ({
        url: `/Floor/get-floor-by-id?Id=${id}`,
      }),
    }),
  }),
});

export const {
  useFloorPlanByIdQuery,
  useFloorPlanListingQuery,
  useAddFloorPlansMutation,
  useEditFloorPlansMutation,
  useRemoveFloorPlanMutation,
} = FloorPlanApiSlice;

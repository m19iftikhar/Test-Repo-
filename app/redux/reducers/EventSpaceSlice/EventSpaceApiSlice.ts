import { KeywordQuery } from "@/app/Utility/commonTypes";
import { apiSlice } from "../../api/ApiSlice";

export const EventSpaceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllEventSpaces: builder.query({
      query: (params: KeywordQuery) => ({
        url: `/EventSpaces/get-all-event-spaces`,
        method: "GET",
        params,
      }),
    }),
    addEventSpace: builder.mutation({
      query: (newEventSpace: any) => ({
        url: `/EventSpaces/add-event-space`,
        method: "POST",
        body: newEventSpace,
      }),
    }),
    editEventSpace: builder.mutation({
      query: (updatedEventSpace: any) => ({
        url: `/EventSpaces/edit-event-space`,
        method: "POST",
        body: updatedEventSpace,
      }),
    }),
    deleteEventSpace: builder.mutation({
      query: (recId: string) => ({
        url: `/EventSpaces/delete-event-space?recId=${recId}`,
        method: "POST",
      }),
    }),
    getEventSpaceById: builder.query({
      query: (id: string) => ({
        url: `/EventSpaces/get-event-space-by-id?Id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllEventSpacesQuery,
  useAddEventSpaceMutation,
  useEditEventSpaceMutation,
  useDeleteEventSpaceMutation,
  useGetEventSpaceByIdQuery,
} = EventSpaceApiSlice;

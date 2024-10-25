import { apiSlice } from "../../api/ApiSlice";

export const LockersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    lockerById: builder.query({
      query: (id: any) => ({
        url: `Locker/get-locker-by-id?Id=${id}`,
        method: "GET",
      }),
    }),
    deleteLocker: builder.mutation({
      query: (id: any) => ({
        url: `Locker/delete-locker?recId=${id}`,
        method: "POST",
      }),
    }),
    getAllResourcePriceDurations: builder.query({
      query: () => ({
        url: `MeetingRoom/get-all-resource-price-durations`,
      }),
    }),
    createLocker: builder.mutation({
      query: (data: any) => ({
        url: `Locker/add-locker`,
        method: "POST",
        body: data,
      }),
    }),
    editLocker: builder.mutation({
      query: (data: any) => ({
        url: `Locker/edit-locker`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLockerByIdQuery,
  useDeleteLockerMutation,
  useGetAllResourcePriceDurationsQuery,
  useCreateLockerMutation,
  useEditLockerMutation
} = LockersApiSlice;

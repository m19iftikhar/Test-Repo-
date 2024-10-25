import { apiSlice } from "../../api/ApiSlice";

export const ClosedOfficesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addClosedOffice: builder.mutation({
      query: (data: any) => {
        return {
          url: `/ClosedOffice/add-closed-office`,
          method: "POST",
          body: data,
        };
      },
    }),
    editClosedOffice: builder.mutation({
      query: (data: string) => {
        return {
          url: `/ClosedOffice/edit-closed-office`,
          method: "POST",
          body: data,
        };
      },
    }),
    removeClosedOffice: builder.mutation({
      query: (id: string) => {
        return {
          url: `/ClosedOffice/delete-closed-office?recId=${id}`,
          method: "POST",
        };
      },
    }),
    closedOfficesListing: builder.query({
      query: (data: any) => ({
        url: `/ClosedOffice/get-all-closed-offices?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      }),
    }),
    closedOfficeById: builder.query({
      query: () => ({
        url: `/ClosedOffice//get-closed-office-by-id`,
      }),
    }),
  }),
});

export const {
  useClosedOfficeByIdQuery,
  useClosedOfficesListingQuery,
  useAddClosedOfficeMutation,
  useEditClosedOfficeMutation,
  useRemoveClosedOfficeMutation,
} = ClosedOfficesApiSlice;

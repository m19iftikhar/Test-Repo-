import { KeywordQuery } from "@/app/Utility/commonTypes";
import { apiSlice } from "../../api/ApiSlice";

export const DeskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllDesks: builder.query({
      query: (data: any) => ({
        url: `/Desk/get-all-desks?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
    }),
    getDeskById: builder.query({
      query: (id: string) => ({
        url: `/Desk/get-desk-by-id?id=${id}`,
        method: "GET",
      }),
    }),
    getDeskTypes: builder.query({
      query: () => ({
        url: `/Desk/get-all-desk-types`,
        method: "GET",
      }),
    }),
    addDesk: builder.mutation({
      query: (newDesk: any) => ({
        url: `/Desk/add-desk`,
        method: "POST",
        body: newDesk,
      }),
    }),
    editDesk: builder.mutation({
      query: (updatedDesk: any) => ({
        url: `/Desk/edit-desk`,
        method: "POST",
        body: updatedDesk,
      }),
    }),
    deleteDesk: builder.mutation({
      query: (id: any) => ({
        url: `/Desk/delete-desk?recId=${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddDeskMutation,
  useEditDeskMutation,
  useDeleteDeskMutation,
  useGetAllDesksQuery,
  useGetDeskByIdQuery,
  useGetDeskTypesQuery,
  useGetSingleDeskQuery,
} = DeskApiSlice;

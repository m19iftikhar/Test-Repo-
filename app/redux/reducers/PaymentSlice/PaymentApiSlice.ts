import { apiSlice } from "../../api/ApiSlice";

export const PaymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    updatePaymentStatus: builder.mutation({
      query: (data: any) => {
        console.log(data,"police123")
        return {
          url: `v1/Payment/update-payment-status?paymentId=${data?.paymentId}&status=${data?.status}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useUpdatePaymentStatusMutation,
} = PaymentApiSlice;

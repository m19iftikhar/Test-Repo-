import { apiSlice } from "../../api/ApiSlice";

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    forgetPassword: builder.mutation({
      query: (email: string) => ({
        url: `/v${process.env.API_VERSION1}/Auth/forget-password?email=${email}`,
        method: "POST",
      }),
    }),
    forgetPasswordOtp: builder.mutation({
      query: (data: any) => ({
        url: `/v${process.env.API_VERSION1}/Auth/forget-password-otp?email=${data.email}&otp=${data.otp}`,
        method: "POST",
      }),
    }),
    updateForgetPassword: builder.mutation({
      query: (data: any) => ({
        url: `/v${process.env.API_VERSION1}/Auth/update-password?password=${data.password}&otp=${data.otp}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useForgetPasswordMutation,
  useForgetPasswordOtpMutation,
  useUpdateForgetPasswordMutation,
} = UserApiSlice;

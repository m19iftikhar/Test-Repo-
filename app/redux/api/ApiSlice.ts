import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import {useSession, getSession, signOut} from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/`,
  // credentials: "same-origin",
  prepareHeaders: async (headers, {getState}) => {
    const session: any = await getSession();

    if (session?.accessToken) {
      headers.set("Authorization", `Bearer ${session.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args?: any,
  api?: any,
  extraOptions?: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    // TODO: add toast
    await signOut({callbackUrl: "/login"});
  }
  return result;
};

export const apiSlice: any = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

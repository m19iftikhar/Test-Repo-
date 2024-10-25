import { getSession, useSession } from "next-auth/react";

interface ApiParams {
  version?: string;
  path: string;
  endpoint: string;
  token?: string;
  pageNumber?: number;
  pageSize?: number;
  headers?: Record<string, string>;
  filterTerm?: string;
  queryParams?: Record<string, any>; // New field for dynamic query parameters
  returnType?: string;
}

export const getApiData = async (param: ApiParams) => {
  const session: any = await getSession();
  const token = session?.accessToken;
  // const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v${param.version}/${param.path}/${param.endpoint}`;
  const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${param.path}/${param.endpoint}`;
  const urlParams = new URLSearchParams();
  if (param.queryParams) {
    Object.entries(param.queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        urlParams.append(key, value.toString());
      }
    });
  }
  const url = `${baseUrl}?${urlParams.toString()}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...param.headers,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data", { cause: res });
    } else {
      if (param?.returnType === "blob") {
        return await res.blob(); // Return the blob for binary data
      } else {
        return await res.json(); // Default to JSON
      }
    }
  } catch (error) {
    console.log("Error While GET Request", error, `${baseUrl}`);

    throw new Error("Failed to fetch data");
  }
};

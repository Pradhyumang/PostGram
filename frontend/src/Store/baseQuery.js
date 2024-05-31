import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseURL = "http://localhost:5000";
import { getCookie } from "../Cookie/cookie";

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const isAuthenticated = getState()?.persistedReducer?.auth?.isAuthenticated;
    const token = getCookie("accessToken");

    // If we have a token set in state, let's assume that we should be passing it.
    if (isAuthenticated && token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

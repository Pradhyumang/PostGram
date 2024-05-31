import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery.js";
// Define a service using a base URL and expected endpoints

const signInApi = createApi({
  reducerPath: "signInApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      transformResponse: (res) => {
        return res;
      },
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "sign-up",
        method: "POST",
        body,
      }),
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignInMutation, useSignUpMutation } = signInApi;
export default signInApi;

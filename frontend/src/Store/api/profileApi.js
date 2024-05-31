import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery.js";
const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    profileInfo: builder.query({
      query: () => ({
        url: "/users/get-user",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (res) => {
        return res;
      },
    }),
    profileUpdate: builder.mutation({
      query: (body) => ({
        url: "users/update-user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useProfileInfoQuery, useProfileUpdateMutation } = profileApi;
export default profileApi;

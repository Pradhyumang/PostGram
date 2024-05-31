import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery.js";
const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery,
  tagTypes: ["Post", "fetchPost"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts/create-post",
        method: "POST",
        body,
      }),
      providesTags: ["Post"],
      transformResponse: (res) => {
        return res;
      },
    }),

    fetchPost: builder.query({
      query: ({ page, perPage, search, isMyPostsOnly, isPrivate }) => ({
        url: `/posts/get-feed-posts?page=${page}&perPage=${perPage}&search=${search}&isMyPostsOnly=${isMyPostsOnly}&isPrivate=${isPrivate}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      transformResponse: (res) => {
        return res;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 0 || (arg.search && arg.isSearch) || arg.isSearchEmpty) {
          return newItems;
        }
        // console.log(JSON.parse(JSON.stringify(currentCache)), "currentCache");
        // console.log(newItems, "newItems");
        currentCache.data.data.push(...newItems.data.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["fetchPost"],
    }),
    fetchImage: builder.query({
      query: (postId) => ({
        url: `/posts/get-feed-image?postId=${postId}`,
        method: "GET",
      }),
      // providesTags: ["Post"],
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
});

export const { useCreatePostMutation, useFetchImageQuery, useFetchPostQuery } =
  postApi;
export default postApi;

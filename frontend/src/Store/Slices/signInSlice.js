import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../Cookie/cookie.js";
import signInApi from "../api/signInApi";

// import {} from "querystring";
const initialState = {
  isAuthenticated: false,
  profile: {},
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    initialize: (state, { payload }) => {
      state.isAuthenticated = payload;
      state.profile = {};
    },
    // login: (state, action) => {
    //   setCookie("accessToken", action.payload, 1);
    //   (state.name = action.payload.name), (state.token = action.payload.token);
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      signInApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data?.accessToken) {
          setCookie("accessToken", payload.data.accessToken, 1);
          state.isAuthenticated = true;
          delete state.profile.accessToken;
          state.profile = payload;
        }
      }
    );
  },
});

export const { initialize } = authSlice.actions;

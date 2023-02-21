import { configureStore } from "@reduxjs/toolkit";
import aboutSlice from "../components/features/about/aboutSlice";
import applySlice from "../components/features/apply/applySlice";
import homeSlice from "../components/features/home/homeSlice";
import teamsSlice from "../components/features/teams/teamsSlice";
import tokenSlice from "../components/features/token/tokenSlice"

const store = configureStore({
  reducer: {
    about: aboutSlice,
    apply: applySlice,
    home: homeSlice,
    teams: teamsSlice,
    token: tokenSlice,
  },
});

export default store;

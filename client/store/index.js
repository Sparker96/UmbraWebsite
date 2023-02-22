import { configureStore } from "@reduxjs/toolkit";
import aboutSlice from "../components/features/about/aboutSlice";
import applySlice from "../components/features/apply/applySlice";
import guildSlice from "../components/features/guild/guildSlice";
import memberSlice from "../components/features/member/memberSlice";
import teamsSlice from "../components/features/teams/teamsSlice";
import tokenSlice from "../components/features/token/tokenSlice"

const store = configureStore({
  reducer: {
    about: aboutSlice,
    apply: applySlice,
    guild: guildSlice,
    member: memberSlice,
    teams: teamsSlice,
    token: tokenSlice,
  },
});

export default store;

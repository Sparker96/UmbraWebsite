import { configureStore } from "@reduxjs/toolkit";
import aboutSlice from "../components/features/about/aboutSlice";
import applySlice from "../components/features/apply/applySlice";
import guildSlice from "../components/features/guild/guildSlice";
import membersSlice from "../components/features/members/membersSlice";
import memberSlice from "../components/features/member/memberSlice";
import memberMediaSlice from "../components/features/memberMedia/memberMediaSlice";
import teamsSlice from "../components/features/teams/teamsSlice";
import tokenSlice from "../components/features/token/tokenSlice"

const store = configureStore({
  reducer: {
    about: aboutSlice,
    apply: applySlice,
    guild: guildSlice,
    members: membersSlice,
    member: memberSlice,
    memberMedia: memberMediaSlice,
    teams: teamsSlice,
    token: tokenSlice,
  },
});

export default store;

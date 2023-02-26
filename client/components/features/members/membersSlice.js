import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
const initialState = [];

export const fetchMembersAsync = createAsyncThunk("members", async () => {
  try {
    const { data } = await axios.get(`/api/members`);
    data.sort((a, b) => a.guildRankId - b.guildRankId);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    sortGuildRankDescending: (state) => {
      state.sort((a, b) => a.guildRankId - b.guildRankId);
    },
    sortGuildRankAscending: (state) => {
      state.sort((a, b) => b.guildRankId - a.guildRankId);
    },
    sortLevelAscending: (state) => {
      state.sort((a, b) => a.level - b.level);
    },
    sortLevelDescending: (state) => {
      state.sort((a, b) => b.level - a.level);
    },
    sortClassAscending: (state) => {
      state.sort((a, b) => a.classId - b.classId);
    },
    sortClassDescending: (state) => {
      state.sort((a, b) => b.classId - a.classId);
    },
    sortItemLevelAscending: (state) => {
      state.sort((a, b) => a.itemLevel - b.itemLevel);
    },
    sortItemLevelDescending: (state) => {
      state.sort((a, b) => b.itemLevel - a.itemLevel);
    },
    sortNameAscending: (state) => {
      state.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
    },
    sortNameDescending: (state) => {
      state.sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  sortGuildRankDescending,
  sortGuildRankAscending,
  sortLevelAscending,
  sortLevelDescending,
  sortClassAscending,
  sortClassDescending,
  sortItemLevelAscending,
  sortItemLevelDescending,
  sortNameAscending,
  sortNameDescending,
} = membersSlice.actions;

export const selectMembers = (state) => {
  return state.members;
};

export default membersSlice.reducer;

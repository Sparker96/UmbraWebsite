import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchMembersAsync = createAsyncThunk("members", async () => {
  try {
    const { data } = await axios.get(`/api/members`);
    return data.members;
  } catch (err) {
    console.log(err);
  }
});

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMembersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectMembers = (state) => {
  return state.members;
};

export default membersSlice.reducer;

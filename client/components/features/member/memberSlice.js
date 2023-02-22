import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchMembersAsync = createAsyncThunk("members", async () => {
  try {
    const { data } = await axios.get(`/api/members`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMembersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectMember = (state) => {
  console.log(state)
  return state.member;
};

export default memberSlice.reducer;

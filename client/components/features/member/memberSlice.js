import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchMemberAsync = createAsyncThunk("member", async (name) => {
  try {
    const { data } = await axios.get(`/api/members/${name}`);
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
    builder.addCase(fetchMemberAsync.fulfilled, (state, action) => {
      return action.payload;
    }).then;
  },
});

export const selectMember = (state) => {
  return state.member;
};

export default memberSlice.reducer;

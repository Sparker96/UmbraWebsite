import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchMemberMediaAsync = createAsyncThunk(
  "member/media",
  async (name) => {
    try {
      const { data } = await axios.get(`/api/member/${name}/media`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const memberMediaSlice = createSlice({
  name: "memberMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMemberMediaAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectMemberMedia = (state) => {
  return state.memberMedia;
};

export default memberMediaSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchGuildAsync = createAsyncThunk("guild", async () => {
  try {
    const { data } = await axios.get(`/api/guild`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const guildSlice = createSlice({
  name: "guild",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuildAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectGuild = (state) => {
  return state.guild;
};

export default guildSlice.reducer;

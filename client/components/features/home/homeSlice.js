import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchGuildAsync = createAsyncThunk("guild", async () => {
  try {
    const { data } = await axios.get(`https://us.api.blizzard.com/data/wow/guild/illidan/umbra?namespace=profile-us&locale=en_US&access_token=${token}`);
    console.log(data)
    return data.name;
  } catch (err) {
    console.log(err);
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuildAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectHome = (state) => {
  console.log(state.home);
  return state.home;
};

export default homeSlice.reducer;

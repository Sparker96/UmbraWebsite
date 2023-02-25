import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {main:null};

export const fetchRaidersAsync = createAsyncThunk("raiders", async () => {
  try {
    const { data } = await axios.get(`/api/raiders`);
    return data;
  } catch (err) {
    console.log(err);
  }
});


  const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchRaidersAsync.fulfilled, (state, action) => {
        state.main = action.payload;
      });
    },
  });
  
  export const selectTeams = (state) => {
    return state.teams;
  };
  
  export default teamsSlice.reducer;
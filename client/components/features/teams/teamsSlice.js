import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchSomethingAsync = createAsyncThunk("something", async () => {
    try {
      const { data } = await axios.get(`/api/testRoute`);
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
      builder.addCase(fetchSomethingAsync.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  export const selectTeams = (state) => {
    return state.teams;
  };
  
  export default teamsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchTokenAsync = createAsyncThunk("token", async () => {
  try {
    const {data} = await axios.post(
      "https://oauth.battle.net/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        auth: {
          username: `af5b660122684487a5383450a1e40545`,
          password: `l5NSWsunme74jVEFUecnYlmOD2zkvgIA`,
        },
      }
    );
    return data.access_token;
  } catch (err) {
    console.log(err);
  }
});

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTokenAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectToken = (state) => {
  console.log(state.token);
  return state.token;
};

export default tokenSlice.reducer;

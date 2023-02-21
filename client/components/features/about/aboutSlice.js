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


  const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchSomethingAsync.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  export const selectAbout = (state) => {
    return state.about;
  };
  
  export default aboutSlice.reducer;
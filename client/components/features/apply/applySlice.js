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


  const applySlice = createSlice({
    name: "apply",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchSomethingAsync.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  export const selectApply = (state) => {
    return state.apply;
  };
  
  export default applySlice.reducer;
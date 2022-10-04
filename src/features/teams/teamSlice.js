import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchString: "",
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { search } = teamsSlice.actions;
export default teamsSlice.reducer;

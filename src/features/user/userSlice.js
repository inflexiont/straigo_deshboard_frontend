import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUser: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getAllUser } = usersSlice.actions;
export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsersToAction: (state, action) => {
      state.users = action.payload;
    },
    setUserToAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAllUsersToAction, setUserToAction } = usersSlice.actions;
export default usersSlice.reducer;

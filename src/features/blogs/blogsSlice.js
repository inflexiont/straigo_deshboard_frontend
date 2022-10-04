import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "project",
  initialState: {
    blogs: [],
    blog: {},
  },

  reducers: {
    setBlogsToAction: (state, action) => {
      state.projects = action.payload;
    },
    setBlogToAction: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlogsToAction, search, setBlogToAction } = blogsSlice.actions;
export default blogsSlice.reducer;

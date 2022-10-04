import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
  },

  reducers: {
    setProjectsToAction: (state, action) => {
      state.projects = action.payload;
    },
    search: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { setProjectsToAction, search } = projectsSlice.actions;
export default projectsSlice.reducer;

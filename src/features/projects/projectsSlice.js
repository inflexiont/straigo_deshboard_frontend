import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: {},
  },

  reducers: {
    setProjectsToAction: (state, action) => {
      state.projects = action.payload;
    },
    search: (state, action) => {
      state.searchString = action.payload;
    },
    setProjectToAction: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { setProjectsToAction, search, setProjectToAction } =
  projectsSlice.actions;
export default projectsSlice.reducer;

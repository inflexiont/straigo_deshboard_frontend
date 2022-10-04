import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import blogReducer from "../features/blogs/blogsSlice";
import projectReducer from "../features/projects/projectsSlice";
import reviewReducer from "../features/review/reviewsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    projects: projectReducer,
    blogs: blogReducer,
    reviews: reviewReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

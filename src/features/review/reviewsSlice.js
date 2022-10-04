import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "project",
  initialState: {
    reviews: [],
    review: {},
  },

  reducers: {
    setReviewsToAction: (state, action) => {
      state.reviews = action.payload;
    },
    setReviewToAction: (state, action) => {
      state.review = action.payload;
    },
  },
});

export const { setReviewToAction, setReviewsToAction } = reviewsSlice.actions;
export default reviewsSlice.reducer;

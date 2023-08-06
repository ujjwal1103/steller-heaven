import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  totalReviews: 0,
};

const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviews(state, action) {
      console.log(action.payload);
      state.reviews = action.payload;
      state.totalReviews = action.payload.length;
    },
    addReview(state, action) {
      state.reviews.push(action.payload);
      state.totalReviews++;
    },
    updateLikes() {},
  },
});

export const { addReview, setReviews, updateLikes } = ReviewSlice.actions;
export default ReviewSlice.reducer;

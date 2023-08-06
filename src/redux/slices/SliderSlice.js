import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  images: [],
};

const sliderSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getImages(state, action) {
      state.images = action.payload;
    },
    addImage(state, action) {
      const newImage = action.payload;
      state.images.push(newImage);
    },
    deleteImage(state, action) {
      const imageIdToDelete = action.payload;
      state.images = state.images.filter(image => image.id !== imageIdToDelete);
    },
  },
});

export const { getImages, addImage, deleteImage } = sliderSlice.actions;
export default sliderSlice.reducer;

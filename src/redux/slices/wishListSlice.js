import { createSlice } from "@reduxjs/toolkit";

const initialWishListState = {
    wishlistProducts: [],
    totalProducts: 0
  };

  const wishListSlice = createSlice({
    name: 'wishlist',
    initialState: initialWishListState,
    reducers: {
      addToWishList(state, action) {
        const productToAdd = action.payload;
        const existingProduct = state.wishlistProducts.find(
          product => product._id === productToAdd._id
        );
        if (!existingProduct) {
          state.wishlistProducts.push(productToAdd);
          state.totalProducts++;
        }
      },
      removeFromWishList(state, action) {
        const productId = action.payload;
        state.wishlistProducts = state.wishlistProducts.filter(product => product._id !== productId);
        state.totalProducts = Math.max(0, state.totalProducts - 1);
      },
    },
  });
  export const { addToWishList, removeFromWishList } = wishListSlice.actions;
  export default wishListSlice.reducer;
  
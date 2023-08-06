import { configureStore, combineReducers } from "@reduxjs/toolkit";

import productsReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import subCategoryReducer from "./slices/subCategorySlice.js";
import sliderReducer from "./slices/SliderSlice.js";
import cartReducer from "./slices/cartSlice.js";
import wishReducer from "./slices/wishListSlice.js";
import filterReducer from "./slices/filterSlice.js";
import userReducer from "./slices/userSlice.js";
import authReducer from "./slices/authSlice.js";
import reviweReducer from "./slices/reviewSlice.js";
import messengerReducer from "./slices/messengerSlice.js";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoryReducer,
  subcategories: subCategoryReducer,
  sliderImages: sliderReducer,
  cart: cartReducer,
  wishList: wishReducer,
  filter: filterReducer,
  users: userReducer,
  user: authReducer,
  reviews: reviweReducer,
  messenger: messengerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


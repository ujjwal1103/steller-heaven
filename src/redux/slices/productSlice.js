import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: {},
  totalProducts: 0,
};

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload.data;
      state.totalProducts = action.payload.total;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
      state.totalProducts++;
    },
    deleteProduct(state, action) {
      const productId = action.payload;
      state.products = state.products.filter(product => product._id !== productId);
      state.totalProducts--;
    }
  },
});

export const { getProducts, addProduct, setProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
